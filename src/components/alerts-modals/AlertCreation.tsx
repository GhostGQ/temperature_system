import {
  Box,
  Button,
  Group,
  Input,
  Modal,
  Switch,
  TextInput,
} from '@mantine/core';
import {
  useCreateAlert,
  useGetTrailers,
  type AlertPost,
} from '../../app/services/alertService';
import {useEffect, useState} from 'react';
import TrailersSearchInput from '../inputs/TrailersSearchInput';
import {DatePickerInput} from '@mantine/dates';
import type {DatesRangeValue, DateValue} from '@mantine/dates';
import {useForm} from 'react-hook-form';
import {requestStatusNotify} from '../../shared/utils';

interface Props {
  openCreateModal: boolean;
  setOpenCreateModal: (value: boolean) => void;
}

const AlertCreation = ({openCreateModal, setOpenCreateModal}: Props) => {
  const {mutate, isSuccess} = useCreateAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitted},
  } = useForm<AlertPost>();
  const [search, setSearch] = useState('');
  const [value, setValue] = useState<DatesRangeValue<DateValue>>([null, null]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {data: trailers, isLoading} = useGetTrailers();

  const onSubmit = async (data: AlertPost) => {
    mutate({
      trailer_id: selectedId as number,
      allowed_temperature: data.allowed_temperature,
      allowed_positive_error: data.allowed_positive_error,
      allowed_negative_error: data.allowed_negative_error,
      is_active: data.is_active,
      truck_name: data.truck_name,
      load_number: data.load_number,
      pickup_date: String(value[0]),
      delivery_date: String(value[1]),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      requestStatusNotify('Alert created!', 'success');
      setSelectedId(null);
      setOpenCreateModal(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={openCreateModal}
      onClose={() => setOpenCreateModal(false)}
      centered
      size='lg'
      radius='lg'
      className='bg-white shadow-lg rounded-lg flex flex-col'
      styles={{body: {paddingInline: '24px', paddingBottom: '24px'}}}
    >
      <h2 className='text-2xl font-semibold '>Create Alert</h2>
      <Box
        className='mt-4 flex flex-col gap-2'
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className='my-2'>
          <h3 className='font-semibold'>Trailer</h3>
          <TrailersSearchInput
            disabled={false}
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

        <Group grow className='mt-2'>
          <TextInput
            {...register('truck_name', {required: true})}
            error={errors.truck_name ? 'Truck name is required' : undefined}
            label='Truck Name'
            placeholder='Enter truck name'
          />
          <TextInput
            {...register('load_number', {required: true})}
            error={errors.load_number ? 'Load number is required' : undefined}
            label='Load Number'
            placeholder='Enter load number'
          />
        </Group>

        <DatePickerInput
          type='range'
          label='Pick up and delivery date'
          placeholder='Pick dates range'
          valueFormat='YYYY-MMM-DD'
          className='mt-2'
          value={value}
          onChange={setValue}
          error={
            isSubmitted && (!value[0] || !value[1])
              ? 'Pick up and delivery date is required'
              : undefined
          }
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
    </Modal>
  );
};

export default AlertCreation;
