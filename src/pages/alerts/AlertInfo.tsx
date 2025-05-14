import {
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  Progress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  FaTrailer,
  FaUser,
  FaCheck,
  FaExclamationTriangle,
  FaTemperatureHigh,
  FaTruck,
  FaIdCard,
} from 'react-icons/fa';
import {useMediaQuery} from '@mantine/hooks';
import {InfoItem} from './InfoItem';
import type {Alert} from '../../shared/types/types';
import { MdErrorOutline } from 'react-icons/md';

// Конфигурация статусов
const STATUS_CONFIG = {
  ok: {
    color: 'green',
    icon: <FaCheck />,
    label: 'OK',
    bgColor: 'gray.6',
  },
  warning: {
    color: 'orange',
    icon: <FaExclamationTriangle />,
    label: 'Warning',
    bgColor: 'orange.6',
  },
  error: {
    color: 'red',
    icon: <MdErrorOutline />,
    label: 'Critical',
    bgColor: 'red.6',
  },
};

interface AlertInfoProps {
  opened: boolean;
  alertData: Alert | undefined;
  close: () => void;
}

const AlertInfo = ({opened, close, alertData}: AlertInfoProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  if (!alertData) return null;

  // Вычисляемые значения
  const statusConfig = STATUS_CONFIG[alertData.state];
  const allowedTemp = Math.ceil(alertData.allowed_temperature);
  const currentTemp = Math.ceil(alertData.current_temperature);
  const delta = Math.ceil(alertData.delta);
  const minTemp = Math.ceil(allowedTemp - alertData.allowed_negative_error);
  const maxTemp = Math.ceil(allowedTemp + alertData.allowed_positive_error);
  const targetPosition = ((allowedTemp - minTemp) / (maxTemp - minTemp)) * 100;
  const currentPosition = ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Text fw={600}>Alert Details</Text>}
      centered
      radius='lg'
      size='xl'
      padding='md'
      styles={{
        title: {
          fontSize: isMobile ? '1.1rem' : '1.3rem',
        },
      }}
    >
      {/* Шапка с информацией о статусе */}
      <Paper
        h={'100px'}
        p='sm'
        radius='md'
        mb='md'
        bg={statusConfig.bgColor}
        c='white'
      >
        <Group wrap='nowrap'>
          {statusConfig.icon}
          <Box flex={1}>
            <Text size={isMobile ? 'md' : 'lg'} fw={700} truncate>
              ALERT #{alertData.id} - TEMPERATURE {statusConfig.label}
            </Text>
            <Text size='xs'>
              {alertData.state === 'error' ? 'Triggered' : 'Last check'}:{' '}
              {new Date(alertData.temperature_time).toLocaleString()}
            </Text>
          </Box>
        </Group>
      </Paper>

      {/* Основное содержимое */}
      <Grid
        gutter={isMobile ? 'sm' : 'md'}
        style={{
          overflowY: 'hidden',
          overflowX: 'hidden',
          height: !isMobile ? '30vh' : '100%',
        }}
      >
        {/* Колонка с информацией о трейлере */}
        <Grid.Col span={{base: 12, sm: 6}}>
          <Stack gap='sm'>
            <SectionTitle
              icon={<FaTrailer />}
              title='TRAILER INFORMATION'
              isMobile={isMobile || false}
            />

            <Divider />

            <InfoItem
              icon={<FaIdCard size={14} />}
              label='Samsara ID'
              value={alertData.trailer.samsara_id || 'N/A'}
            />
            <InfoItem
              icon={<FaTrailer size={14} />}
              label='Trailer Name'
              value={alertData.trailer.name || 'N/A'}
            />
            <InfoItem
              icon={<FaTruck size={14} />}
              label='Truck Name'
              value={alertData.truck_name || 'N/A'}
            />
            <InfoItem
              icon={<FaUser size={14} />}
              label='Reported By'
              value={alertData.created_by.name || 'N/A'}
            />
          </Stack>
        </Grid.Col>

        {/* Колонка с температурными данными */}
        <Grid.Col span={{base: 12, sm: 6}}>
          <Stack gap='sm'>
            <SectionTitle
              icon={<FaTemperatureHigh />}
              title='TEMPERATURE DATA'
              isMobile={isMobile || false}
            />

            <Divider />

            <InfoItem
              label='Current Temperature'
              value={`${currentTemp}°F`}
              isCritical={alertData.state === 'error'}
            />
            <InfoItem label='Allowed Temperature' value={`${allowedTemp}°F`} />
            <InfoItem
              label='Temperature Delta'
              value={`${delta > 0 ? '+' : ''}${delta}°F`}
              isCritical={alertData.state === 'error'}
            />
            <InfoItem
              label='Allowed Range'
              value={`${minTemp}°F - ${maxTemp}°F`}
            />

            {/* Визуализация отклонения температуры */}
            <Box mt='sm'>
              <Text size='sm' c='dimmed' mb='xs'>
                Temperature deviation:
              </Text>

              <Box pos='relative'>
                <Progress
                  value={100}
                  color={`${statusConfig.color}.3`}
                  size='xl'
                  radius='xl'
                />

                {/* Линия целевой температуры */}
                <Box
                  style={{
                    position: 'absolute',
                    left: `${targetPosition}%`,
                    top: 0,
                    height: '100%',
                    width: 1,
                    backgroundColor: theme.colors.green[6],
                    transform: 'translateX(-1px)',
                  }}
                />

                {/* Индикатор текущей температуры */}
                <Box
                  style={{
                    position: 'absolute',
                    left: `${currentPosition}%`,
                    top: 0,
                    height: '100%',
                    width: 10,
                    backgroundColor: theme.colors[statusConfig.color][6],
                    borderRadius: '50%',
                    transform: 'translateX(-5px)',
                    boxShadow: theme.shadows.sm,
                  }}
                />

                <Flex justify='space-between' mt='xs' gap='xs'>
                  <Text size='xs' c='dimmed'>
                    {minTemp}°F
                  </Text>
                  <Text size='xs' c='dimmed'>
                    Target: {allowedTemp}°F
                  </Text>
                  <Text size='xs' c='dimmed'>
                    {maxTemp}°F
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my='md' />
    </Modal>
  );
};

// Вспомогательный компонент для заголовков секций
const SectionTitle = ({
  icon,
  title,
  isMobile,
}: {
  icon: React.ReactNode;
  title: string;
  isMobile: boolean;
}) => (
  <Group gap='sm'>
    {icon}
    <Text size={isMobile ? 'md' : 'lg'} fw={600} c='dimmed'>
      {title}
    </Text>
  </Group>
);

export default AlertInfo;
