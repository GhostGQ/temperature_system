import {
  Box,
  Button,
  Group,
  Input,
  Loader,
  Switch,
  TextInput,
} from '@mantine/core';
import TrailersSearchInput from '../inputs/TrailersSearchInput';
import {RxReset} from 'react-icons/rx';
import {useForm} from 'react-hook-form';
import {
  useGetAlert,
  useGetTrailers,
  useUpdateAlert,
  type AlertPost,
} from '../../app/services/alertService';
import {useEffect, useState} from 'react';
import { requestStatusNotify } from '../../shared/utils';

const AlertSettings = ({
  alertId,
  setAlertId,
}: {
  alertId: number | null;
  setAlertId: (alertId: number | null) => void;
}) => {
  const editAlert = useUpdateAlert();
  const {data: alert, refetch, isFetching} = useGetAlert(alertId);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitted, isDirty},
  } = useForm<AlertPost>({defaultValues: alert});

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {data: trailers, isLoading} = useGetTrailers();

  useEffect(() => {
    if (alertId) {
      refetch();
      setSelectedId(alert?.trailer?.id ?? null);
      setSearch(alert?.trailer?.name ?? '');
      setIsActive(alert?.is_active ?? false);
      reset({
        trailer_id: alert?.trailer?.id,
        allowed_temperature: Math.ceil(alert?.allowed_temperature),
        allowed_positive_error: Math.ceil(alert?.allowed_positive_error),
        allowed_negative_error: Math.ceil(alert?.allowed_negative_error),
        is_active: alert?.is_active ?? false,
        truck_name: alert?.truck_name ?? '',
      });
    }
  }, [alertId, alert, refetch, reset]);

  const onSubmit = async (data: AlertPost) => {
    if (!alert) return;
    if (isDirty) {
      await editAlert.mutate(
        {
          id: alert.id,
          trailer_id: selectedId as number,
          allowed_temperature: data.allowed_temperature,
          allowed_positive_error: data.allowed_positive_error,
          allowed_negative_error: data.allowed_negative_error,
          is_active: data.is_active,
          truck_name: data.truck_name,
        },
        alert.id
      );

      requestStatusNotify('Alert updated!', 'success')
      refetch();
    }
  };

  return (
    <Box className='bg-white shadow-lg rounded-lg p-6 w-full h-fit flex flex-col'>

      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold '>Alert settings</h2>
        {alertId && (
          <RxReset
            size={22}
            cursor={'pointer'}
            title='Reset'
            onClick={() => setAlertId(null)}
          />
        )}
      </div>
      {!alertId ? (
        <Box className='w-full h-[376px] flex items-center justify-center'>
          <h2 className='text-2xl font-semibold'>Select an alert</h2>
        </Box>
      ) : isFetching ? (
        <Box className='w-full h-[376px] flex items-center justify-center'>
          <Loader />
        </Box>
      ) : (
        <Box
          className='mt-4'
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
              {...register('is_active', {
                onChange: event => setIsActive(event.currentTarget.checked),
              })}
              checked={isActive}
              // onChange={event => {
              //   setIsActive(event.currentTarget.checked);
              // }}
              width={'100%'}
              size='lg'
              onLabel='ON'
              offLabel='OFF'
            />
          </Group>

          <Button type='submit' fullWidth className='mt-3' radius={'md'}>
            Update Alert
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AlertSettings;
