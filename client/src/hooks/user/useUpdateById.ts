
import * as Query from 'react-query'

import * as Api from '@/api'
import * as Core from '@/core'

export const useUpdateById = (args: Core.I.UserEntityInfo) => Query.useMutation({
  mutationFn: () => Api.user.update(args),
  mutationKey: ['user', args.id]
})