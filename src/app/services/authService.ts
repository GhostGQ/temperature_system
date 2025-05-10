import { useQuery } from "@tanstack/react-query"
import { fetchWithBasicAuth } from "../api/fetcher"

export const useAuthMe = () => {
  return useQuery({
    queryKey: ['authMe'],
    queryFn: () => fetchWithBasicAuth('/me'),
    enabled: false,
  })
}