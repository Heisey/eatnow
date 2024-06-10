
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useGetUserByEmail = (args?: string) => Query.useQuery({
  queryKey: ['user'],
  enabled: !!args,
  queryFn: () => Api.user.getByEmail(args!)
})

