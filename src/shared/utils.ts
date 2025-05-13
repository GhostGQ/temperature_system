import { toast } from "react-toastify";

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

  if (deviation >= 0 && deviation <= 2) {
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


interface TemperatureStatus {
  color: string;
  status: string;
  isCritical: boolean;
  isWarning: boolean;
}

export const getTemperatureStatus = (
  delta: number
): TemperatureStatus => {
  const deltaCeil = Math.ceil(delta)

  if (deltaCeil === 1 || deltaCeil === -1) {
    return {
      color: 'gray',
      status: 'NORMAL',
      isCritical: false,
      isWarning: false,
    };
  } else if (deltaCeil < 3 && deltaCeil > -3) {
    return {
      color: 'orange',
      status: 'WARNING',
      isCritical: false,
      isWarning: true,
    };
  } else return {
    color: 'red',
    status: 'CRITICAL',
    isCritical: true,
    isWarning: false,
  };
};

type statusTypes = 'success' | 'error'

export const requestStatusNotify = (msg: string, type: statusTypes) => {
  toast(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: type
  })
}