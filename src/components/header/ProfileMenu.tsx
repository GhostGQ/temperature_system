import {Button, Menu} from '@mantine/core';
import {RxAvatar} from 'react-icons/rx';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '../../app/store/authStore';
import {MdDashboard} from 'react-icons/md';
import {IoMdSettings} from 'react-icons/io';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const {username, name} = useAuthStore();
  const {clearCredentials} = useAuthStore();

  const logout = () => {
    clearCredentials();
    navigate('/login', {replace: true});
  };

  return (
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
        <Button variant='transparent'>
          <RxAvatar size={32} cursor={'pointer'} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown className='w-[500px]'>
        <Menu.Label>Navigation</Menu.Label>
        <Menu.Item
          leftSection={<MdDashboard size={14} />}
          onClick={() => navigate('/')}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          leftSection={<IoMdSettings size={14} />}
          onClick={() => navigate('/alerts')}
        >
          Alerts Settings
        </Menu.Item>
        <Menu.Divider />

        <Menu.Label>Profile</Menu.Label>
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
  );
};

export default ProfileMenu;
