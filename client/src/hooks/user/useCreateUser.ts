
import * as Query from 'react-query'

import * as Api from '@/api'
import * as Core from '@/core'

export const useCreateUser = () => Query.useMutation({
  mutationFn: Api.user.create,
  onSuccess: (data) => {
    const client = Query.useQueryClient()
    client.setQueryData(['user', data?.email], data)
  }
})