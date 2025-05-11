import {Box, Loader} from '@mantine/core';
import {useGetAlertsInfo} from '../../app/services/alertService';
import {AlertCard} from './AlertCard';

const AlertsList = () => {
  const {data, isLoading, refetch} = useGetAlertsInfo();

  setTimeout(() => {
    refetch();
  }, 1000 * 60);

  return (
    <Box className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
      {isLoading ? (
        <Box className='w-full h-full flex items-center justify-center'>
          <Loader />
        </Box>
      ) : (
        data?.alerts?.map((alert: any) => (
          <AlertCard key={alert.id} alert={alert} />
        ))
      )}
    </Box>
  );
};

export default AlertsList;
