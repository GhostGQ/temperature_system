import {Box, Menu} from '@mantine/core';
import logo from '../../shared/assets/logo.png';
import {RxAvatar} from 'react-icons/rx';
import {useAuthStore} from '../../app/store/authStore';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const {username, name} = useAuthStore();
  const {clearCredentials} = useAuthStore();

  const logout = () => {
    clearCredentials();
    navigate('/login', {replace: true});
  };

  return (
    <Box className='bg-[#efefef] shadow-lg fixed z-50 w-full h-14 flex items-center justify-center'>
      <div className='md:w-[95%] w-[80%] flex justify-center items-center'>
        <img src={logo} alt='logo' className='w-[150px]' />
      </div>
      <div className='justify-end'>
        <Menu
          withArrow
          position='bottom-end'
          trigger='click'
          openDelay={100}
          closeDelay={400}
          styles={{
            dropdown: {
              width: '200px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            } as any,
          }}
        >
          <Menu.Target>
            <RxAvatar size={32} cursor={'pointer'} />
          </Menu.Target>

          <Menu.Dropdown className='w-[500px]'>
            <div className='w-full flex justify-between items-start gap-2 p-2'>
              <h4 className='font-semibold'>Name: </h4>
              <span className='text-right'>{name}</span>
            </div>
            <div className='w-full flex justify-between items-start gap-2 p-2'>
              <h4 className='font-semibold'>Username: </h4>
              <span className='text-right'>{username}</span>
            </div>

            <Menu.Divider />
            <Menu.Item onClick={logout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
