import {Box} from '@mantine/core';
import logo from '../../shared/assets/logo.png';

const Header = () => {
  return (
    <Box>
      <Box className='bg-[#efefef] shadow-lg fixed w-full h-14 flex items-center justify-center'>
        <img src={logo} alt='logo' className='w-[150px]' />
      </Box>
    </Box>
  );
};

export default Header;
