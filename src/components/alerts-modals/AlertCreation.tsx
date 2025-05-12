import {Box, Button, Group, Input, Switch, TextInput} from '@mantine/core';
import {
  useCreateAlert,
  useGetTrailers,
  type AlertPost,
} from '../../app/services/alertService';
import {useState} from 'react';
import TrailersSearchInput from '../inputs/TrailersSearchInput';
import {useForm} from 'react-hook-form';

const AlertCreation = () => {
  const createAlert = useCreateAlert();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<AlertPost>();

  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {data: trailers, isLoading} = useGetTrailers();

  const onSubmit = (data: AlertPost) => {
    createAlert.mutate({
      trailer_id: selectedId as number,
      allowed_temperature: data.allowed_temperature,
      allowed_positive_error: data.allowed_positive_error,
      allowed_negative_error: data.allowed_negative_error,
      is_active: data.is_active,
      truck_name: data.truck_name,
    });
  };

  return (
    <Box className='bg-white shadow-lg rounded-lg p-6 w-full h-fit flex flex-col'>
      <h2 className='text-2xl font-semibold '>Create Alert</h2>
      <Box className='mt-4' component='form' onSubmit={handleSubmit(onSubmit)}>
        <Box className='mb-2'>
          <h3 className='font-semibold'>Trailer</h3>
          <TrailersSearchInput
            trailers={trailers}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            isSubmitted={isSubmitted}
            register={register}
          />
        </Box>

        <Input.Wrapper
          label='Allowed temperature °F'
          error={
            errors.allowed_temperature ? 'Temperature is required' : undefined
          }
        >
          <Input
            type='number'
            {...register('allowed_temperature', {required: true})}
            error={errors.allowed_temperature ? true : undefined}
            placeholder='5'
          />
        </Input.Wrapper>

        <Group grow className='mt-2'>
          <Input.Wrapper
            label='Positive error margin °F'
            error={
              errors.allowed_positive_error
                ? 'Temperature is required'
                : undefined
            }
          >
            <Input
              type='number'
              {...register('allowed_positive_error', {required: true})}
              error={errors.allowed_negative_error ? true : undefined}
              placeholder='5'
            />
          </Input.Wrapper>

          <Input.Wrapper
            label='Negative error margin °F'
            error={
              errors.allowed_negative_error
                ? 'Temperature is required'
                : undefined
            }
          >
            <Input
              type='number'
              {...register('allowed_negative_error', {required: true})}
              error={errors.allowed_negative_error ? true : undefined}
              placeholder='5'
            />
          </Input.Wrapper>
        </Group>

        <TextInput
          {...register('truck_name', {required: true})}
          error={errors.truck_name ? 'Truck name is required' : undefined}
          className='mt-2'
          label='Track Name'
          placeholder='Enter track name'
        />

        <Group justify='space-between' className='mt-4'>
          <span className='text-md font-semibold'>Is Active</span>
          <Switch
            {...register('is_active')}
            width={'100%'}
            size='lg'
            onLabel='ON'
            offLabel='OFF'
            defaultChecked
          />
        </Group>

        <Button type='submit' fullWidth className='mt-3' radius={'md'}>
          Create Alert
        </Button>
      </Box>
    </Box>
  );
};

export default AlertCreation;
