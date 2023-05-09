import { DOMElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth: boolean;
  children: any;
};

const ProtectedRoute = ({ onlyUnAuth = false, children }: TProtectedRouteProps) => {
  let location = useLocation();
  const isAuth = useSelector(
    (store: any) => store.profileInformationReducer.isAithorizationSucceed,
  );
  const user = useSelector((store: any) => store.profileInformationReducer.profileData);
  if (user && onlyUnAuth) {
    return <Navigate to={'/'} state={{ from: location }} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
