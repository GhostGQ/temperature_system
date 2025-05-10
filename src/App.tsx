import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Auth from './pages/auth/index';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoutes from './shared/lib/private-routes/PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/alerts',
            element: <Dashboard />,
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
