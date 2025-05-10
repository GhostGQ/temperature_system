import {Box} from '@mantine/core';
import Header from '../header/Header';
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
      <Header />
      <Box className='w-screen h-screen pt-18 bg-[#91b2ee9f] px-3'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
