
import * as Query from 'react-query'

import * as Api from '@/api'

export const useGetById = (args?: string) => Query.useQuery({
  queryKey: ['resturant'],
  enabled: !!args,
  queryFn: () => Api.resturant.getById(args!)
})