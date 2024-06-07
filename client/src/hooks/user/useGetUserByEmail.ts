
import * as Query from 'react-query'

import * as Api from '@/api'

export const useGetUserByEmail = (args?: string) => Query.useQuery({
  queryKey: ['user', args],
  enabled: !!args,
  queryFn: () => Api.user.getByEmail(args!)
})

