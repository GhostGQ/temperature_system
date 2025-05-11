import {Box, Modal, Table} from '@mantine/core';
import {useDeleteAlert, useGetAlerts} from '../../app/services/alertService';
import type {Alert} from '../../shared/types/types';
import {AiFillEdit} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useDisclosure} from '@mantine/hooks';
import {useState} from 'react';

interface AlertsListProps {
  setQueryAlertId: (id: number | null) => void;
}

const AlertsList = ({setQueryAlertId}: AlertsListProps) => {
  const {data: alerts} = useGetAlerts();
  const [alertId, setAlertId] = useState<number | null>(null);
  const deleteAlert = useDeleteAlert();
  const [opened, {open, close}] = useDisclosure(false);

  const handleOpen = (id: number) => {
    open();
    setAlertId(id);
  };

  const handleDelete = () => {
    deleteAlert.mutate(alertId);
    close();
  };

  const rows = alerts?.map((element: Alert) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.truck_name}</Table.Td>
      <Table.Td>{element.trailer.name}</Table.Td>
      <Table.Td>{Math.ceil(element.allowed_temperature)}F</Table.Td>
      <Table.Td>
        <div className='flex gap-2'>
          <button
            className='cursor-pointer'
            onClick={() => setQueryAlertId(element.id)}
          >
            <AiFillEdit size={24} color='blue' />
          </button>
          <button
            className='cursor-pointer'
            onClick={() => handleOpen(element.id)}
          >
            <MdDelete size={24} color='red' />
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className='bg-white shadow-lg rounded-lg p-6 w-full h-full flex flex-col'>
      <Modal opened={opened} onClose={close} title='Confirmation'>
        <Box className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Delete Alert</h2>
          <p>Are you sure you want to delete this alert?</p>
          <div className='flex justify-end gap-4'>
            <button
              onClick={close}
              className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete()} // Replace with the actual ID
              className='bg-red-600 text-white px-4 py-2 rounded'
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
      <h2 className='text-2xl font-semibold '>Alerts</h2>

      <Box className='overflow-y-auto max-h-[350px]'>
        <Table withColumnBorders className='h-full'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Truck</Table.Th>
              <Table.Th>Trailer</Table.Th>
              <Table.Th>Allowed Temp</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AlertsList;
