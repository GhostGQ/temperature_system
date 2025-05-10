import {Box, Grid} from '@mantine/core';
import AlertCreation from '../../components/alerts-modals/AlertCreation';
import AlertsList from '../../components/alerts-modals/AlertsList';

const Dashboard = () => {
  return (
    <Grid grow gutter='xs' className='w-full h-full'>
      <Grid.Col span={4}>
        <AlertCreation />
      </Grid.Col>
      <Grid.Col span={4}>
        <Box className='bg-white shadow-lg rounded-lg p-6 w-full flex'>
          <h2 className='text-2xl font-semibold '>Alert settings</h2>
        </Box>
      </Grid.Col>
      <Grid.Col span={6} className='h-full '>
        <AlertsList />
      </Grid.Col>
    </Grid>
  );
};

export default Dashboard;
