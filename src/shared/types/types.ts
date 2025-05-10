export interface Alert {
  id: number
  trailer: Trailer
  allowed_temperature: number
  allowed_positive_error: number
  allowed_negative_error: number
  created_by: CreatedBy
  is_active: boolean
  truck_name: string
  created_at: string
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