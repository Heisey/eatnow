
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useGetToken = () => Query.useQuery({
  queryFn: Api.payment.getToken,
  queryKey: ['payment']
})

export const useCreatePayment = () => Query.useMutation({
  mutationFn: Api.payment.createToken
})