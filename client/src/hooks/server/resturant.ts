
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useSearchByCity = (args: Api.resturant.GetAllByCityArgs) => {
  const limit = args.params?.limit || 50
  const cuisines = args.params?.cuisines || []
  
  return Query.useQuery({
    queryKey: ['resturant_search', args.city, limit, ...cuisines],
    queryFn: () => Api.resturant.getAllByCity(args)
  })
}