import { Navigate, NavigateProps, useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '../../../index';
import { FC, ReactElement } from 'react';

const ProtectedRoute: FC<{ children: ReactElement; onlyUnAuth?: boolean }> = ({
  children,
  onlyUnAuth = false,
}): ReactElement<NavigateProps> => {
  const location: Location = useLocation();
  const from: string = location.state?.from || '/' || '/profile';
  const asAuth = useAppSelector((store) => store.authorizationReducer.isAithorizationSucceed);
  const autRequest = useAppSelector((store) => store.authorizationReducer.authorizationRequest);
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);

  if (autRequest) {
    return <p>Loading...</p>;
  }
  if (user && onlyUnAuth) {
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
