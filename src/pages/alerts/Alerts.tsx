import {Grid} from '@mantine/core';
import AlertCreation from '../../components/alerts-modals/AlertCreation';
import AlertsList from '../../components/alerts-modals/AlertsList';
import AlertSettings from '../../components/alerts-modals/AlertSettings';
import {useState} from 'react';

const Alerts = () => {
  const [alertId, setAlertId] = useState<number | null>(null);
  return (
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
  );
};

export default Alerts;
