import {Box, Group, Text} from '@mantine/core';

export const InfoItem = ({
  icon,
  label,
  value,
  isCritical = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  isCritical?: boolean;
}) => (
  <Group gap='sm'>
    {icon && <Box c='dimmed'>{icon}</Box>}
    <Text size='sm' c='dimmed' style={{flex: 1}}>
      {label}
    </Text>
    <Text
      size='sm'
      fw={isCritical ? 700 : 500}
      c={isCritical ? 'red.6' : 'dark'}
    >
      {value}
    </Text>
  </Group>
);
