import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const authChecking = useSelector((store) => store.authorizationReducer.authorizationRequest);
  let location = useLocation();
  const isAuth = useSelector((store) => store.authorizationReducer.isAithorizationSucceed);
  const user = useSelector((store) => store.authorizationReducer.profileData);
  if (authChecking) {
    return <p>Загруузка</p>;
  }
  if (user && onlyUnAuth) {
    return <Navigate to={'/'} state={{ from: location }} />;
  }
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
