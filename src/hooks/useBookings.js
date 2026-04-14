// Hook for bookings with TanStack Query + mutations
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingService } from '@services/bookingService'

export const useBookings = (params) =>
  useQuery({
    queryKey: ['bookings', params],
    queryFn:  () => bookingService.getAll(params).then((r) => r.data),
  })

export const useBooking = (id) =>
  useQuery({
    queryKey: ['booking', id],
    queryFn:  () => bookingService.getById(id).then((r) => r.data),
    enabled:  !!id,
  })

export const useCreateBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: bookingService.create,
    onSuccess:  () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  })
}
