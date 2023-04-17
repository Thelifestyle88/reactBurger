import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  let location = useLocation();
  const isAuth = useSelector((store) => store.profileInformationReducer.isAithorizationSucceed);
  const user = useSelector((store) => store.profileInformationReducer.profileData);
  console.log(user, onlyUnAuth, isAuth);
  if (user && onlyUnAuth) {
    return <Navigate to={'/'} state={{ from: location }} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
