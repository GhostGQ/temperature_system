import {Box, Loader, TextInput} from '@mantine/core';
import {useGetAlertsInfo} from '../../app/services/alertService';
import {AlertCard} from './AlertCard';
import {useState, useMemo, useEffect} from 'react';
import type {Alert} from '../../shared/types/types';
import {RiSearch2Line} from 'react-icons/ri';

const AlertsList = () => {
  const {data, isLoading, refetch} = useGetAlertsInfo();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000 * 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  const filteredAlerts = useMemo(() => {
    if (!data?.alerts) return [];

    return data.alerts.filter((alert: Alert) => {
      const searchLower = debouncedSearchQuery.toLowerCase();
      return (
        alert.trailer.name.toLowerCase().includes(searchLower) ||
        alert.trailer.samsara_id.toString().includes(debouncedSearchQuery) ||
        (alert.truck_name &&
          alert.truck_name.toLowerCase().includes(searchLower))
      );
    });
  }, [data, debouncedSearchQuery]);

  return (
    <Box className='flex flex-col gap-4'>
      <TextInput
        placeholder='Search by trailer name, Samsara ID or truck name...'
        leftSection={<RiSearch2Line size={16} />}
        value={searchQuery}
        onChange={e => setSearchQuery(e.currentTarget.value)}
        mb='md'
      />

      {isLoading ? (
        <Box className='w-full h-full flex items-center justify-center'>
          <Loader />
        </Box>
      ) : filteredAlerts.length === 0 ? (
        <Box className='w-full h-full flex items-center justify-center'>
          {debouncedSearchQuery ? (
            <div>No alerts found matching your search</div>
          ) : (
            <div>No alerts available</div>
          )}
        </Box>
      ) : (
        <Box className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {filteredAlerts.map((alert: Alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AlertsList;
