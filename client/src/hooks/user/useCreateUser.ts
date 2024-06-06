
import * as Query from 'react-query'

import * as Api from '@/api'
import * as Core from '@/core'

export const useCreateUser = (args: Core.I.Credentials) => Query.useMutation({
  mutationFn: () => Api.user.create(args),
  mutationKey: ['user', args.email]
})