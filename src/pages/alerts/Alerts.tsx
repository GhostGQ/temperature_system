import {Box, Grid} from '@mantine/core';
import AlertCreation from '../../components/alerts-modals/AlertCreation';
import AlertsList from '../../components/alerts-modals/AlertsList';
import AlertSettings from '../../components/alerts-modals/AlertSettings';
import {useState} from 'react';
import {ToastContainer} from 'react-toastify';

const Alerts = () => {
  const [alertId, setAlertId] = useState<number | null>(null);
  return (
    <Box>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='light'
      />
      <Grid grow gutter='xs' className='w-full h-full overflow-x-hidden px-3'>
        <Grid.Col span={4}>
          <AlertCreation />
        </Grid.Col>
        <Grid.Col span={window.innerWidth > 728 ? 4 : 10}>
          <AlertSettings alertId={alertId} setAlertId={setAlertId} />
        </Grid.Col>
        <Grid.Col span={10} className='h-full mb-3'>
          <AlertsList setQueryAlertId={setAlertId} />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Alerts;
