import {Box} from '@mantine/core';
import AlertCreation from '../../components/alerts-modals/AlertCreation';
import AlertsList from '../../components/alerts-modals/AlertsList';
import AlertSettings from '../../components/alerts-modals/AlertSettings';
import {useState} from 'react';

const Alerts = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [alertId, setAlertId] = useState<number | null>(null);

  return (
    <Box className='px-4'>
      <AlertsList
        setQueryAlertId={setAlertId}
        setOpenCreateModal={setOpenCreateModal}
        setOpenEditModal={setOpenEditModal}
      />
      <AlertCreation
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <AlertSettings
        alertId={alertId}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </Box>
  );
};

export default Alerts;
