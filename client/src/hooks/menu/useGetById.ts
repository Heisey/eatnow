
import * as Query from 'react-query'

import * as Api from '@/api'

export const useGetById = (args?: string) => {

  return Query.useQuery({
    queryFn: () => Api.resturant.getById(args!),
    queryKey: ['menu', args],
    enabled: !!args
  })
}