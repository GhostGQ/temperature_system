export const getTargetTemp = (
  n: number | null,
  act: number,
  p: number | null,
  delta: number
): { text: string; isDanger: boolean } => {
  const start = act - (n ?? 0);
  const end = act + (p ?? 0);
  const isDanger = delta < start || delta > end;

  const text =
    start === end ? String(act) : `${Math.ceil(start)} - ${Math.ceil(end)}`;

  return { text, isDanger };
};

interface TemperatureRange {
  min: number;
  max: number;
}

export function getActualTemperatureColor(
  actualTemp: number,
  targetRange: TemperatureRange
): { color: string; emoji: string } {
  const { min, max } = targetRange;

  if (actualTemp >= min && actualTemp <= max) {
    return {
      color: '#28a745',
      emoji: '✅'
    };
  }

  const deviation = actualTemp < min
    ? min - actualTemp
    : actualTemp - max;

  if (deviation >= 1 && deviation <= 2) {
    return {
      color: '#ffc107',
      emoji: '⚠️'
    };
  }

  return {
    color: '#dc3545',
    emoji: '❌'
  };
}