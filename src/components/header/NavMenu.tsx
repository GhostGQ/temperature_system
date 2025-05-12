import {Button, Menu} from '@mantine/core';
import {IoMdSettings} from 'react-icons/io';
import {GiHamburgerMenu} from 'react-icons/gi';
import {useNavigate} from 'react-router-dom';
import {MdDashboard} from 'react-icons/md';

const NavMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button variant='transparent'>
          <GiHamburgerMenu size={26} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
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
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavMenu;
