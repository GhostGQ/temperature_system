import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Auth from './pages/auth/index';
import Layout from './components/layout/Layout';
import Alerts from './pages/alerts/Alerts';
import PrivateRoutes from './shared/lib/private-routes/PrivateRoutes';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/login',
        element: <Auth />,
      },
      {
        path: '/alerts',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <Alerts />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
