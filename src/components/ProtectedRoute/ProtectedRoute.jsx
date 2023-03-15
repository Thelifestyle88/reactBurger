import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const authChecked = useSelector((store) => store.profileInformationReducer.success);
  const user = useSelector((store) => store.profileInformationReducer.user);
  const location = useLocation();
  const navigate = useNavigate();
  if (!authChecked) {
    return null;
  }
  if (onlyUnAuth && user) {
    console.log(location());
  }
  if (!onlyUnAuth && !user) {
    navigate('/login');
  }
  if (!onlyUnAuth && user) {
    return children;
  }
  if (authChecked && user) {
    navigate('/');
    return children;
  }
};

export default ProtectedRoute;
