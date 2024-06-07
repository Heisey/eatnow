
import * as Query from 'react-query'

import * as Api from '@/api'

export const useCreateUser = () => Query.useMutation({
  mutationFn: Api.user.create,
  onSuccess: () => {
    const client = Query.useQueryClient()
    client.invalidateQueries(['user'])
  }
})