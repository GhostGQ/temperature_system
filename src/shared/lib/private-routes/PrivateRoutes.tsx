import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from '../../../app/store/authStore';

const PrivateRoutes = () => {
  const {username, password} = useAuthStore.getState();

  return username && password ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoutes;
