import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  FaTrailer,
  FaUser,
  FaExclamationCircle,
  FaTemperatureHigh,
} from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMediaQuery} from '@mantine/hooks';
import {InfoItem} from './InfoItem';
import {getTemperatureStatus} from '../../shared/utils';

const AlertInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alertData = location.state || {};
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const allowedTemp = Math.ceil(alertData.allowed_temperature || 0);
  const currentTemp = Math.ceil(alertData.current_temperature || 0);
  const delta = Math.ceil(alertData.delta);
  const minTemp = Math.ceil(
    allowedTemp - (alertData.allowed_negative_error || 0)
  );
  const maxTemp = Math.ceil(
    allowedTemp + (alertData.allowed_positive_error || 0)
  );

  const tempStatus = getTemperatureStatus(delta);

  return (
    <Box
      p='md'
      style={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        shadow='lg'
        radius='lg'
        style={{
          width: isMobile ? '100%' : '80%',
          maxWidth: 1200,
          height: isMobile ? 'auto' : '150%',
        }}
      >
        <Paper
          p={isMobile ? 'sm' : 'md'}
          radius={0}
          style={{
            backgroundColor: tempStatus.isCritical
              ? theme.colors.red[6]
              : tempStatus.isWarning
              ? theme.colors.orange[6]
              : theme.colors.gray[6],
            color: 'white',
          }}
        >
          <Group wrap='nowrap'>
            <FaExclamationCircle size={isMobile ? 20 : 24} />
            <Box style={{flex: 1}}>
              <Text size={isMobile ? 'md' : 'xl'} fw={700} lineClamp={1}>
                ALERT #{alertData.id} - TEMPERATURE {tempStatus.status}
              </Text>
              <Text size={isMobile ? 'xs' : 'sm'}>
                {tempStatus.isCritical ? 'Triggered' : 'Last check'}:{' '}
                {new Date(alertData.temperature_time).toLocaleString()}
              </Text>
            </Box>
            <Badge
              variant='filled'
              color={tempStatus.color}
              size={isMobile ? 'md' : 'lg'}
            >
              {tempStatus.status}
            </Badge>
          </Group>
        </Paper>

        <Grid p={isMobile ? 'sm' : 'md'} gutter={isMobile ? 'sm' : 'md'}>
          <Grid.Col span={{base: 12, sm: 6}}>
            <Stack h='100%' gap={isMobile ? 'xs' : 'sm'}>
              <Group gap='sm'>
                <FaTrailer size={isMobile ? 16 : 18} />
                <Text size={isMobile ? 'md' : 'lg'} fw={600} c='dimmed'>
                  TRAILER INFORMATION
                </Text>
              </Group>

              <Divider />

              <InfoItem
                icon={<FaTrailer size={isMobile ? 14 : 16} />}
                label='Samsara ID'
                value={alertData.trailer?.samsara_id || 'N/A'}
              />
              <InfoItem
                icon={<FaTrailer size={isMobile ? 14 : 16} />}
                label='Trailer Name'
                value={alertData.trailer?.name || 'N/A'}
              />
              <InfoItem
                icon={<FaTrailer size={isMobile ? 14 : 16} />}
                label='Truck Name'
                value={alertData.truck_name || 'N/A'}
              />
              <InfoItem
                icon={<FaUser size={isMobile ? 14 : 16} />}
                label='Reported By'
                value={alertData.created_by?.name || 'N/A'}
              />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{base: 12, sm: 6}}>
            <Stack h='100%' gap={isMobile ? 'xs' : 'sm'}>
              <Group gap='sm'>
                <FaTemperatureHigh size={isMobile ? 16 : 18} />
                <Text size={isMobile ? 'md' : 'lg'} fw={600} c='dimmed'>
                  TEMPERATURE DATA
                </Text>
              </Group>

              <Divider />

              <InfoItem
                label='Current Temperature'
                value={`${currentTemp}°F`}
                isCritical={tempStatus.isCritical}
              />
              <InfoItem
                label='Allowed Temperature'
                value={`${allowedTemp}°F`}
              />
              <InfoItem
                label='Temperature Delta'
                value={`${delta > 0 ? '+' : ''}${delta}°F`}
                isCritical={tempStatus.isCritical}
              />
              <InfoItem
                label='Allowed Range'
                value={`${minTemp}°F - ${maxTemp}°F`}
              />

              <Box mt='auto' pt='md'>
                <Text size='sm' c='dimmed' mb='xs'>
                  Temperature deviation visualization:
                </Text>

                <Box pos='relative'>
                  <Progress
                    value={100}
                    color={
                      tempStatus.isCritical
                        ? 'red.3'
                        : tempStatus.isWarning
                        ? 'orange.3'
                        : 'blue.3'
                    }
                    size={isMobile ? 'sm' : 'xl'}
                    radius='xl'
                  />

                  <Box
                    style={{
                      position: 'absolute',
                      left: `${
                        ((allowedTemp - minTemp) / (maxTemp - minTemp)) * 100
                      }%`,
                      top: 0,
                      height: '100%',
                      width: 1,
                      backgroundColor: 'var(--mantine-color-green-6)',
                      transform: 'translateX(-1px)',
                    }}
                  />

                  {/* Current indicator */}
                  <Box
                    style={{
                      position: 'absolute',
                      left: `${
                        ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100
                      }%`,
                      top: 0,
                      height: '100%',
                      width: isMobile ? 8 : 10,
                      backgroundColor: tempStatus.isCritical
                        ? 'var(--mantine-color-red-6)'
                        : tempStatus.isWarning
                        ? 'var(--mantine-color-orange-6)'
                        : 'var(--mantine-color-blue-6)',
                      borderRadius: '50%',
                      transform: `translateX(-${isMobile ? 4 : 5}px)`,
                    }}
                  />

                  <Group justify='space-between' mt='xs' gap='xs'>
                    <Text size='xs' c='dimmed'>
                      {minTemp}°F
                    </Text>
                    <Text size='xs' c='dimmed'>
                      Target: {allowedTemp}°F
                    </Text>
                    <Text size='xs' c='dimmed'>
                      {maxTemp}°F
                    </Text>
                  </Group>
                </Box>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider />
        <Button
          variant='default'
          className='mt-3'
          onClick={() => navigate('/')}
        >
          Go to dashboard
        </Button>
      </Card>
    </Box>
  );
};

export default AlertInfo;
