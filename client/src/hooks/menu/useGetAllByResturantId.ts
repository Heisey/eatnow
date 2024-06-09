
import * as Query from 'react-query'

import * as Api from '@/api'

export const useGetAllByResturantId = (args?: string) => Query.useQuery({
  queryKey: ['menu_items', args],
  enabled: !!args,
  queryFn: () => Api.menu.getAllByResturantId(args!)
})