import { toast } from "react-toastify";


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

export const fixedNum = (num: number) => {
  return num.toFixed(1)
}

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