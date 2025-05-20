import {Switch, Table} from '@mantine/core';
import {AiFillEdit} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useUpdateAlert} from '../../app/services/alertService';
import {useState} from 'react';
import {formatDate} from '../../shared/utils';
import type {Alert} from '../../shared/types/types';

interface Props {
  alert: Alert;
  handleOpen: (id: number) => void;
  handleEditModalOpen: (id: number) => void;
}

const AlertListRows = ({alert, handleOpen, handleEditModalOpen}: Props) => {
  const {mutate} = useUpdateAlert();
  const [toggle, setToggle] = useState<boolean | null>(alert.is_active);

  const handleActivityChange = (alert: any) => {
    setToggle(!alert.is_active);
    const updatedAlert = {...alert, is_active: !alert.is_active};
    mutate(updatedAlert);
  };

  return (
    <Table.Tr key={alert.id} style={{height: '50px'}}>
      <Table.Td>{alert.truck_name}</Table.Td>
      <Table.Td>{alert.trailer.name}</Table.Td>
      <Table.Td>{Math.ceil(alert.allowed_temperature)}°F</Table.Td>
      <Table.Td>
        {formatDate(alert.pickup_date)} - {formatDate(alert.delivery_date)}
      </Table.Td>
      <Table.Td>
        <div className='flex gap-2'>
          <button
            className='cursor-pointer'
            onClick={() => handleEditModalOpen(alert.id)}
          >
            <AiFillEdit size={24} color='blue' />
          </button>
          <button
            className='cursor-pointer'
            onClick={() => handleOpen(alert.id)}
          >
            <MdDelete size={24} color='red' />
          </button>
        </div>
      </Table.Td>
      <Table.Td>
        <Switch
          styles={{track: {cursor: 'pointer'}}}
          width={'100%'}
          size='sm'
          onLabel='ON'
          offLabel='OFF'
          checked={toggle || alert.is_active}
          onClick={() => handleActivityChange(alert)}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default AlertListRows;
