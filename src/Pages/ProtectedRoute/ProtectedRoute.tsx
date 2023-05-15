import { Navigate, NavigateProps, useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '../../index';
import { FC, ReactElement } from 'react';
import { getCookie } from '../../utils/cookie';

const ProtectedRoute: FC<{ children: ReactElement; onlyUnAuth?: boolean }> = ({
  children,
  onlyUnAuth = false,
}): ReactElement<NavigateProps> => {
  const location: Location = useLocation();
  const from: string = location.state?.from || '/' || '/profile';
  const asAuth = getCookie('accessToken');
  const autRequest = useAppSelector((store) => store.authorizationReducer.authorizationRequest);
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);

  if (asAuth && onlyUnAuth) {
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !asAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
