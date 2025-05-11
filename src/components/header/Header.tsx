import {Box} from '@mantine/core';
import logo from '../../shared/assets/logo.png';
import {IoMdLogIn} from 'react-icons/io';
import {useAuthStore} from '../../app/store/authStore';
import ProfileMenu from './ProfileMenu';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const {username} = useAuthStore();

  return (
    <Box className='bg-[#efefef] shadow-lg fixed z-50 w-full h-14 flex items-center justify-center'>
      <div className='md:w-[95%] w-[80%] flex justify-center items-center'>
        <img src={logo} alt='logo' className='w-[150px]' />
      </div>
      <div className='justify-end'>
        {username ? (
          <ProfileMenu />
        ) : (
          <IoMdLogIn
            size={28}
            cursor={'pointer'}
            onClick={() => navigate('/login')}
          />
        )}
      </div>
    </Box>
  );
};

export default Header;
