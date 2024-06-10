
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useCreate = () => Query.useMutation({
  mutationFn: Api.resturant.create,
  mutationKey: ['resturant']
})