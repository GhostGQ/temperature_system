import {
  Table,
  ScrollArea,
  Paper,
  LoadingOverlay,
  Divider,
  Button,
} from '@mantine/core';
import type {Alert} from '../../shared/types/types';
import {useGetAlertsInfo} from '../../app/services/alertService';
import {fixedNum, formatDate, formatDateTime} from '../../shared/utils';
import {useDisclosure} from '@mantine/hooks';
import AlertInfo from '../alerts/AlertInfo';
import {useState} from 'react';
import {MdErrorOutline} from 'react-icons/md';
import {LuCircleCheckBig} from 'react-icons/lu';
import {IoWarningOutline} from 'react-icons/io5';

const statusIcons = {
  ok: <LuCircleCheckBig size={18} color='green' />,
  warning: <IoWarningOutline size={20} color='orange' />,
  error: <MdErrorOutline size={20} color='red' />,
};

const statusColors = {
  ok: '',
  warning: 'var(--mantine-color-orange-1)',
  error: 'var(--mantine-color-red-1)',
};

const Dashboard = () => {
  const {data, isLoading} = useGetAlertsInfo();
  const [alertData, setAlertData] = useState<Alert>();
  const [opened, {open, close}] = useDisclosure(false);

  const rows = data?.alerts?.map((alert: Alert) => (
    <Table.Tr
      key={alert.id}
      style={{backgroundColor: statusColors[alert.state]}}
    >
      <Table.Td style={{textAlign: 'center'}}>
        {statusIcons[alert.state]}
      </Table.Td>
      <Table.Td>{alert.trailer.name}</Table.Td>
      <Table.Td>
        {alert.truck_name} | {alert.load_number}
      </Table.Td>
      <Table.Td
        style={{
          color:
            alert.state === 'ok'
              ? ''
              : alert.state === 'warning'
              ? '#f39c12'
              : 'red',
        }}
      >
        {fixedNum(alert.current_temperature)}°F
      </Table.Td>
      <Table.Td>
        {fixedNum(alert.allowed_temperature - alert.allowed_negative_error)}°F -{' '}
        {fixedNum(alert.allowed_temperature + alert.allowed_positive_error)}°F
      </Table.Td>
      <Table.Td>
        {formatDate(alert?.pickup_date)} - {formatDate(alert?.delivery_date)}
      </Table.Td>
      <Table.Td>{formatDateTime(alert.temperature_time)}</Table.Td>
      <Table.Td>{alert.created_by.name}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => {
            console.log(alert);
            setAlertData(alert);
            open();
          }}
          style={{border: '1px solid #b2babb'}}
          variant='white'
          size='compact-sm'
        >
          Details
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper
      p='md'
      shadow='sm'
      radius='md'
      maw={1500}
      mx='auto'
      pos='relative'
      className='overflow-y-auto'
    >
      <AlertInfo opened={opened} close={close} alertData={alertData} />

      <LoadingOverlay visible={isLoading} overlayProps={{blur: 2}} />

      <h2 style={{textAlign: 'center', color: '#7f8c8d'}}>
        Temperature alerts as of {formatDateTime(data?.time)}
      </h2>

      <Divider m={'16px 8px'} />

      <ScrollArea type='auto'>
        <Table verticalSpacing='sm'>
          <Table.Thead>
            <Table.Tr bg={'var(--mantine-color-blue-light)'}>
              <Table.Th w={40}>Status</Table.Th>
              <Table.Th w={200}>Trailer</Table.Th>
              <Table.Th w={120}>Truck / Load</Table.Th>
              <Table.Th w={100}>Current Temp</Table.Th>
              <Table.Th w={110}>Allowed Range</Table.Th>
              <Table.Th w={150}>Pick up & delivery time</Table.Th>
              <Table.Th w={160}>Updated</Table.Th>
              <Table.Th w={150}>Reported By</Table.Th>
              <Table.Th w={80}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows?.length ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={8} ta='center'>
                  {isLoading ? 'Loading...' : 'No alerts found'}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};

export default Dashboard;
