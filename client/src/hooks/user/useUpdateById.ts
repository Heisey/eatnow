
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useUpdateById = () => {
  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.user.update,
    onSuccess: () => {
      client.invalidateQueries('user')
    }
  })
}