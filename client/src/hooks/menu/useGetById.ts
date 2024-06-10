
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useGetById = (args?: string) => {

  return Query.useQuery({
    queryFn: () => Api.menu.getById(args!),
    queryKey: ['menu', args],
    enabled: !!args
  })
}