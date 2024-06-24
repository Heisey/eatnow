
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useSearchByCity = (args: Api.resturant.GetAllByCityArgs) => Query.useQuery({
  queryKey: ['resturant_search', args.city ],
  queryFn: () => Api.resturant.getAllByCity(args)
})