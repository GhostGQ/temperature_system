export interface Alert {
  id: number;
  trailer: {
    id: number;
    samsara_id: number;
    name: string;
  };
  current_temperature: number;
  allowed_temperature: number;
  temperature_time: string;
  allowed_positive_error: number;
  allowed_negative_error: number;
  truck_name: string;
  created_by: {
    id: number;
    name: string;
    username: string;
  };
  state: 'ok' | 'warning' | 'error';
  state_value: number;
  delta: number;
}