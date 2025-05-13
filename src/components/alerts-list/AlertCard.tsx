import {Box} from '@mantine/core';
import {TbTemperatureFahrenheit} from 'react-icons/tb';
import {GoDotFill} from 'react-icons/go';
import {FaTemperatureLow} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {getTargetTemp, getTemperatureStatus} from '../../shared/utils';
import type {Alert} from '../../shared/types/types';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({alert}: AlertCardProps) => {
  const navigate = useNavigate();

  const {text: targetTemp} = getTargetTemp(
    alert.allowed_negative_error,
    alert.allowed_temperature,
    alert.allowed_positive_error,
    alert.current_temperature
  );

  const tempStatus = getTemperatureStatus(alert?.delta);
  const handleClick = () => {
    navigate(`/alerts/${alert.truck_name}`, {state: alert});
  };

  return (
    <Box
      onClick={handleClick}
      key={alert.id}
      style={{border: `solid 3px ${tempStatus.color}`}}
      className='bg-white shadow-lg rounded-lg p-4 w-full h-fit flex flex-col cursor-pointer hover:shadow-2xl transition-shadow duration-300'
    >
      <div className='flex justify-between items-start'>
        <h2 className='text-xl font-semibold mb-2'>{alert?.trailer?.name}</h2>
        <GoDotFill size={26} color={tempStatus.color} />
      </div>

      <div className='flex justify-between gap-4'>
        <span className='text-[17px] font-semibold'>Truck Name:</span>
        <p className='flex items-center'>{alert.truck_name}</p>
      </div>

      <div className='flex justify-between gap-4 mt-2'>
        <div className='border-2 p-2 rounded-md'>
          <span className='flex gap-2 items-center text-[17px] font-semibold'>
            Target <FaTemperatureLow size={20} />
          </span>
          <span className='flex justify-center items-center'>
            {targetTemp} <TbTemperatureFahrenheit size={20} />
          </span>
        </div>
        <div
          className={`p-2 rounded-md`}
          style={{
            border: `2px solid ${tempStatus.color}`,
          }}
        >
          <span className='flex gap-2 items-center text-[17px] font-semibold'>
            Actual <FaTemperatureLow size={20} />
          </span>
          <span className='flex justify-center items-center'>
            {Math.ceil(alert.current_temperature)}
            <TbTemperatureFahrenheit size={20} />
          </span>
        </div>
      </div>
    </Box>
  );
};
