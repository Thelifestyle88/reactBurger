import { Navigate, NavigateProps, useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '../../../index';
import { FC, ReactElement } from 'react';

const ProtectedRoute: FC<{ children: ReactElement; onlyUnAuth?: boolean }> = ({
  children,
  onlyUnAuth = false,
}): ReactElement<NavigateProps> => {
  const location: Location = useLocation();
  const from: string = location.state?.from || '/';
  const user = useAppSelector((store) => store.profileInformationReducer.profileData);
  const isLoading = useAppSelector(
    (store) => store.profileInformationReducer.profileInformationRequest,
  );
  if (user && onlyUnAuth) {
    console.log(from);
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
