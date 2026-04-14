// Hook for fetching helper listings with TanStack Query
import { useQuery } from '@tanstack/react-query'
import { helperService } from '@services/helperService'

export const useHelpers = (filters = {}) =>
  useQuery({
    queryKey: ['helpers', filters],
    queryFn:  () => helperService.search(filters).then((r) => r.data),
    staleTime: 60_000,
  })

export const useHelper = (id) =>
  useQuery({
    queryKey: ['helper', id],
    queryFn:  () => helperService.getById(id).then((r) => r.data),
    enabled:  !!id,
  })

export const useFeaturedHelpers = () =>
  useQuery({
    queryKey: ['helpers', 'featured'],
    queryFn:  () => helperService.getFeatured().then((r) => r.data),
    staleTime: 5 * 60_000,
  })
