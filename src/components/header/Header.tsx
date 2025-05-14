import {Box, Button, Image} from '@mantine/core';
import logo from '../../shared/assets/logo.png';
import {IoMdLogIn} from 'react-icons/io';
import {useAuthStore} from '../../app/store/authStore';
import ProfileMenu from './ProfileMenu';
import {useNavigate} from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  const navigate = useNavigate();
  const {authorized} = useAuthStore();

  return (
    <Box className='bg-[#efefef] shadow-lg fixed top-0 left-0 z-50 w-full min-h-[56px] max-h-[56px] flex items-center justify-between'>
      {authorized && <NavMenu />}
      <div className={`flex justify-center items-center`}>
        <Image
          src={logo}
          alt='logo'
          className='w-[150px] max-w-[150px] h-auto object-contain'
        />
      </div>
      <div className=''>
        {authorized ? (
          <ProfileMenu />
        ) : (
          <Button variant='transparent' onClick={() => navigate('/login')}>
            <IoMdLogIn size={28} cursor={'pointer'} />
          </Button>
        )}
      </div>
    </Box>
  );
};

export default Header;
