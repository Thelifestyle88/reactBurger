import { DOMElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../index';

type TProtectedRouteProps = {
  onlyUnAuth: boolean;
  children: any;
};

const ProtectedRoute = ({ onlyUnAuth = false, children }: TProtectedRouteProps) => {
  let location = useLocation();
  const isAuth = useAppSelector((store) => store.profileInformationReducer.isAithorizationSucceed);
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);
  console.log(user);
  if (user && onlyUnAuth) {
    return <Navigate to={'/'} state={{ from: location }} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
