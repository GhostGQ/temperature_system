import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWithBasicAuth } from '../api/fetcher';

export interface AlertPost {
  trailer_id: number;
  allowed_temperature: number | string;
  allowed_positive_error: number;
  allowed_negative_error: number;
  is_active: boolean;
  truck_name: string;
}

export const useGetAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => fetchWithBasicAuth('/alerts'),
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AlertPost) =>
      fetchWithBasicAuth('/alerts/create', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
};

export const useDeleteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | null) => {
      return fetchWithBasicAuth(`/alerts/${id}/delete`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  })
}

export const useGetTrailers = () => {
  return useQuery({
    queryKey: ['trailers'],
    queryFn: () => fetchWithBasicAuth('/trailers'),
  });
};
