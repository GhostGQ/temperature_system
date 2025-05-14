import {
  Table,
  ScrollArea,
  Group,
  Paper,
  LoadingOverlay,
  Divider,
  Button,
} from '@mantine/core';
import {FaCheck, FaExclamationTriangle, FaTimes} from 'react-icons/fa';
import type {Alert} from '../../shared/types/types';
import {useGetAlertsInfo} from '../../app/services/alertService';
import {fixedNum} from '../../shared/utils';
import {useDisclosure} from '@mantine/hooks';
import AlertInfo from '../alerts/AlertInfo';
import {useState} from 'react';

const statusIcons = {
  ok: <FaCheck size={20} color='green' />,
  warning: <FaExclamationTriangle color='orange' />,
  error: <FaTimes size={20} color='red' />,
};

const statusColors = {
  ok: '',
  warning: 'var(--mantine-color-orange-1)',
  error: 'var(--mantine-color-red-1)',
};

const statusLabels = {
  ok: 'OK',
  warning: 'Warning',
  error: 'Critical',
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
      <Table.Td>
        <Group gap='xs'>
          {statusIcons[alert.state]}
          <span>{statusLabels[alert.state]}</span>
        </Group>
      </Table.Td>
      <Table.Td>{alert.trailer.name}</Table.Td>
      <Table.Td>{alert.truck_name}</Table.Td>
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
      <Table.Td>{new Date(alert.temperature_time).toLocaleString()}</Table.Td>
      <Table.Td>{alert.created_by.name}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => {
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
    <Paper p='md' shadow='sm' radius='md' maw={1200} mx='auto' pos='relative'>
      <AlertInfo opened={opened} close={close} alertData={alertData} />

      <LoadingOverlay visible={isLoading} overlayProps={{blur: 2}} />

      <h2 style={{textAlign: 'center', color: '#7f8c8d'}}>
        Temperature alerts as of {new Date().toLocaleString()}
      </h2>

      <Divider m={'16px 8px'} />

      <ScrollArea type='auto'>
        <Table highlightOnHover verticalSpacing='sm'>
          <Table.Thead>
            <Table.Tr bg={'var(--mantine-color-blue-light)'}>
              <Table.Th w={120}>Status</Table.Th>
              <Table.Th w={100}>Trailer</Table.Th>
              <Table.Th w={100}>Truck</Table.Th>
              <Table.Th w={120}>Current Temp</Table.Th>
              <Table.Th w={180}>Allowed Range</Table.Th>
              <Table.Th w={180}>Updated</Table.Th>
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
