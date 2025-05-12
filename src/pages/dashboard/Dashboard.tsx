import {Box} from '@mantine/core';
import AlertsList from '../../components/alerts-list/AlertsList';

const Dashboard = () => {
  return (
    <div className='h-full w-full flex justify-center items-center relative'>
      <Box className='w-full h-full p-6'>
        <h1 className='text-2xl font-semibold mb-3'>Search for the alerts</h1>
        <AlertsList />
      </Box>
    </div>
  );
};

export default Dashboard;
