import {Box} from '@mantine/core';
import {TbTemperatureFahrenheit} from 'react-icons/tb';
import {GoDotFill} from 'react-icons/go';
import {FaTemperatureLow} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {getTargetTemp} from '../../shared/utils';

interface AlertCardProps {
  alert: any;
}

export const AlertCard = ({alert}: AlertCardProps) => {
  const navigate = useNavigate();

  const {text: targetTemp, isDanger} = getTargetTemp(
    alert.allowed_negative_error,
    alert.allowed_temperature,
    alert.allowed_positive_error,
    alert.current_temperature
  );
  const handleClick = () => {
    navigate(`/alerts/${alert.truck_name}`, {state: alert});
  };

  return (
    <Box
      onClick={handleClick}
      key={alert.id}
      style={{border: isDanger ? 'solid 3px red' : undefined}}
      className='bg-white shadow-lg rounded-lg p-4 w-full h-fit flex flex-col cursor-pointer hover:shadow-2xl transition-shadow duration-300'
    >
      <div className='flex justify-between items-start'>
        <h2 className='text-xl font-semibold mb-2'>{alert.truck_name}</h2>
        <GoDotFill size={26} color={alert.is_triggered ? 'red' : 'gray'} />
      </div>

      <div className='flex justify-between gap-4'>
        <span className='text-[17px] font-semibold'>Trailer Name:</span>
        <p className='flex items-center'>{alert?.trailer?.name}</p>
      </div>

      <div className='flex justify-between gap-4 mt-2'>
        <div className='border p-2'>
          <span className='flex gap-2 items-center text-[17px] font-semibold'>
            Target <FaTemperatureLow size={20} />
          </span>
          <span className='flex justify-center items-center'>
            {targetTemp} <TbTemperatureFahrenheit size={20} />
          </span>
        </div>
        <div className='border p-2'>
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
