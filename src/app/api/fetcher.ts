import { useAuthStore } from '../store/authStore'

const API_BASE_URL = import.meta.env.VITE_BASE_API

export const fetchWithBasicAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const { username, password } = useAuthStore.getState()
  const token = btoa(`${username}:${password}`)

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    ...options,
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? options.body : undefined,
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Ошибка: ${response.status}. ${errorBody}`)
  }

  return response.json()
}