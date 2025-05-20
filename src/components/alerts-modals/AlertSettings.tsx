import {
  Box,
  Button,
  Group,
  Input,
  Loader,
  Modal,
  TextInput,
} from '@mantine/core';
import TrailersSearchInput from '../inputs/TrailersSearchInput';
import {Controller, useForm} from 'react-hook-form';
import {
  useGetAlert,
  useGetTrailers,
  useUpdateAlert,
  type AlertPost,
} from '../../app/services/alertService';
import {useEffect, useState} from 'react';
import {requestStatusNotify} from '../../shared/utils';
import {DatePickerInput} from '@mantine/dates';

interface Props {
  alertId: number | null;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
}

const AlertSettings = (props: Props) => {
  const {alertId, openEditModal, setOpenEditModal} = props;
  const {mutate, isSuccess} = useUpdateAlert();
  const {data: alert, refetch, isFetching} = useGetAlert(alertId);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isSubmitted, isDirty},
  } = useForm<AlertPost>();

  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {data: trailers, isLoading} = useGetTrailers();

  useEffect(() => {
    if (alertId) {
      refetch();
      setSelectedId(alert?.trailer?.id ?? null);
      setSearch(alert?.trailer?.name ?? '');
      reset({
        trailer_id: alert?.trailer?.id,
        allowed_temperature: Math.ceil(alert?.allowed_temperature),
        allowed_positive_error: Math.ceil(alert?.allowed_positive_error),
        allowed_negative_error: Math.ceil(alert?.allowed_negative_error),
        truck_name: alert?.truck_name ?? '',
        load_number: alert?.load_number ?? '',
        date_range: [alert?.pickup_date, alert?.delivery_date],
      });
    }
  }, [alertId, alert, reset]);

  const onSubmit = async (data: AlertPost) => {
    if (!alert) return;
    mutate(
      {
        id: alert.id,
        trailer_id: selectedId as number,
        allowed_temperature: data.allowed_temperature,
        allowed_positive_error: data.allowed_positive_error,
        allowed_negative_error: data.allowed_negative_error,
        is_active: alert.is_active,
        truck_name: data.truck_name,
        load_number: data.load_number,
        pickup_date: String(data?.date_range?.[0] ?? ''),
        delivery_date: String(data?.date_range?.[1] ?? ''),
      },
      alert.id
    );
  };

  useEffect(() => {
    if (isSuccess) {
      requestStatusNotify('Alert updated!', 'success');
      setOpenEditModal(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={openEditModal}
      key={alertId}
      onClose={() => setOpenEditModal(false)}
      centered
      size='lg'
      radius='lg'
      className='bg-white shadow-lg rounded-lg flex flex-col'
      styles={{body: {paddingInline: '24px', paddingBottom: '24px'}}}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold '>Alert settings</h2>
      </div>
      {isFetching ? (
        <Box className='w-full h-[376px] flex items-center justify-center'>
          <Loader />
        </Box>
      ) : (
        <Box
          className='mt-4 flex flex-col gap-2'
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box className='mb-2'>
            <h3 className='font-semibold'>Trailer</h3>
            <TrailersSearchInput
              disabled={true}
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
              placeholder='40'
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

          <Controller
            control={control}
            name='date_range'
            rules={{
              validate: value =>
                value && value[0] && value[1]
                  ? true
                  : 'Pick up and delivery date is required',
            }}
            render={({field}) => (
              <DatePickerInput
                type='range'
                label='Pick up and delivery date'
                placeholder='Pick dates range'
                valueFormat='YYYY-MMM-DD'
                className='mt-2'
                value={field.value}
                onChange={field.onChange}
                error={errors.date_range?.message}
              />
            )}
          />

          <Button
            disabled={!isDirty}
            type='submit'
            fullWidth
            className='mt-4'
            radius={'md'}
          >
            Update Alert
          </Button>
          {isSubmitted && !isDirty ? (
            <p className='text-center text-red-500'>Nothing Changed!</p>
          ) : null}
        </Box>
      )}
    </Modal>
  );
};

export default AlertSettings;
