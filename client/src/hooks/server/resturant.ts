
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useCreate = () => Query.useMutation({
  mutationFn: Api.resturant.create,
  mutationKey: ['resturant']
})

export const useCreateMenuItem = () => {

  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.resturant.createMenuItem,
    onSuccess: (data) => {
      client.resetQueries({
        queryKey: ['menu_items', data?.resturantId]
      })
    }  
  })
}

export const useGetById = (args?: string) => Query.useQuery({
  queryKey: ['resturant'],
  enabled: !!args,
  queryFn: () => Api.resturant.getById(args!)
})
