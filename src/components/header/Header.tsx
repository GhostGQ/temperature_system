import {Box, Button} from '@mantine/core';
import logo from '../../shared/assets/logo.png';
import {IoMdLogIn} from 'react-icons/io';
import {useAuthStore} from '../../app/store/authStore';
import ProfileMenu from './ProfileMenu';
import {useNavigate} from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  const navigate = useNavigate();
  const {username} = useAuthStore();

  return (
    <Box className='bg-[#efefef] shadow-lg fixed z-50 w-full h-14 flex items-center justify-between'>
      {username && <NavMenu />}
      <div className={`flex justify-center items-center`}>
        <img src={logo} alt='logo' className='w-[150px]' />
      </div>
      <div className=''>
        {username ? (
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
