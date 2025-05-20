import {Box, Button, Modal, Table} from '@mantine/core';
import {useDeleteAlert, useGetAlerts} from '../../app/services/alertService';
import {useDisclosure} from '@mantine/hooks';
import {useState} from 'react';
import {requestStatusNotify} from '../../shared/utils';
import AlertListRows from './AlertListRows';
import {LuCirclePlus} from 'react-icons/lu';
import type {Alert} from '../../shared/types/types';

interface AlertsListProps {
  setQueryAlertId: (id: number | null) => void;
  setOpenCreateModal: (value: boolean) => void;
  setOpenEditModal: (value: boolean) => void;
}

const AlertsList = ({
  setQueryAlertId,
  setOpenCreateModal,
  setOpenEditModal,
}: AlertsListProps) => {
  const [opened, {open, close}] = useDisclosure(false);
  const {data: alerts} = useGetAlerts();
  const {mutate} = useDeleteAlert();
  const [alertId, setAlertId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    open();
    setAlertId(id);
  };

  const handleEditModalOpen = (id: number) => {
    setQueryAlertId(id);
    setOpenEditModal(true);
  };

  const handleDelete = async () => {
    await mutate(alertId);
    requestStatusNotify('Alert deleted!', 'success');
    close();
  };

  const rows = alerts?.map((element: Alert) => (
    <AlertListRows
      key={element.id}
      alert={element}
      handleOpen={handleOpen}
      handleEditModalOpen={handleEditModalOpen}
    />
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

      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-2xl font-semibold '>Alerts</h2>
        <Button variant='transparent' onClick={() => setOpenCreateModal(true)}>
          <LuCirclePlus size={28} />
        </Button>
      </div>

      <Box className='max-h-[80vh] overflow-y-auto'>
        <Table withColumnBorders className='h-full'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Truck / Load</Table.Th>
              <Table.Th>Trailer</Table.Th>
              <Table.Th>Allowed Temp</Table.Th>
              <Table.Th>Pickup & delivery dates</Table.Th>
              <Table.Th>Actions</Table.Th>
              <Table.Th>Active</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AlertsList;
