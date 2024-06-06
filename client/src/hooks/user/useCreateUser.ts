
import * as Query from 'react-query'

import * as Api from '@/api'

export const useCreateUser = () => Query.useMutation({
  mutationFn: Api.user.create,
  mutationKey: ['user']
})