
import * as Query from 'react-query'

import * as Api from '@/api'

export const useCreateMenuItem = () => {

  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.resturant.createMenuItem,
    onSuccess: (data) => {
      console.log('puppies create, ', data)
      client.resetQueries(['menu_items', data?.resturantId])
    }  
  })
}