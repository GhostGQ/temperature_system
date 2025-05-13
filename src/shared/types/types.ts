export interface Alert {
  id: number
  trailer: Trailer
  current_temperature: number
  allowed_temperature: number
  temperature_time: string
  allowed_positive_error: number
  allowed_negative_error: number
  truck_name: string
  created_by: CreatedBy
  is_triggered: boolean | null
  delta: number
}

export interface Trailer {
  id: number
  samsara_id: number
  name: string
}

export interface CreatedBy {
  id: number
  name: string
  username: string
}