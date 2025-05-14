import {Box} from '@mantine/core';
import Header from '../header/Header';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

const Layout = () => {
  return (
    <Box>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='light'
      />
      <Header />
      <Box className='w-screen h-screen pt-18 overflow-hidden'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
