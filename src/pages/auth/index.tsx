import {Box, Button, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from 'react-hook-form';
import {useAuthStore} from '../../app/store/authStore';
import {useAuthMe} from '../../app/services/authService';
import {useNavigate} from 'react-router-dom';
import {requestStatusNotify} from '../../shared/utils';

interface AuthForm {
  username: string;
  password: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const {setCredentials, setName, setAuth, clearCredentials} = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {refetch, isLoading} = useAuthMe();

  const onSubmit = async (formData: AuthForm) => {
    setCredentials(formData.username, formData.password);

    try {
      const result = await refetch();
      if (result.isSuccess) {
        requestStatusNotify('Login successful!', 'success');
        if (result?.data?.name) {
          setName(result.data.name);
        }
        setAuth(true);
        navigate('/alerts');
      } else if (result.error) {
        const message = (result.error as Error).message;

        const statusMatch = message.match(/(\d{3})/);
        const status = statusMatch ? parseInt(statusMatch[1]) : null;

        if (status === 401) {
          requestStatusNotify('Incorrect username or password', 'error');
          clearCredentials();
        } else if (status === 500) {
          requestStatusNotify('Server error', 'error');
          clearCredentials();
        } else if (!status) {
          requestStatusNotify('No connection to the server', 'error');
          clearCredentials();
        } else {
          requestStatusNotify(`Unknown error: ${status}`, 'error');
          clearCredentials();
        }
      }
    } catch (err) {
      requestStatusNotify('An unexpected error occurred', 'error');
      clearCredentials();
    }
  };

  return (
    <Box className='flex items-center justify-center h-full'>
      <Box className='w-96 p-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>Login</h2>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('username', {required: true})}
            error={errors.username ? 'Username is required' : undefined}
            label='Username'
            placeholder='Enrter your username'
          />
          <PasswordInput
            {...register('password', {required: true})}
            error={errors.password ? 'Password is required' : undefined}
            label='Password'
            placeholder='Enter your password'
          />
          <Button
            loading={isLoading}
            type='submit'
            variant='filled'
            className='mt-2'
            bg={'#6495ED'}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Auth;
