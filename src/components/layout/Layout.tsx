import {Box, Button} from '@mantine/core';
import {Outlet, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {useAuthStore} from '../../app/store/authStore';
import ProfileMenu from '../header/ProfileMenu';
import {IoMdLogIn} from 'react-icons/io';

const Layout = () => {
  const navigate = useNavigate();
  const {authorized} = useAuthStore();
  return (
    <Box className='relative'>
      <div className='fixed top-2 right-0'>
        {authorized ? (
          <ProfileMenu />
        ) : (
          <Button variant='transparent' onClick={() => navigate('/login')}>
            <IoMdLogIn size={32} cursor={'pointer'} />
          </Button>
        )}
      </div>
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
      {/* <Header /> */}
      <Box className='w-screen h-screen pt-12 overflow-x-hidden'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
