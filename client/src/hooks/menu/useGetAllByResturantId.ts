
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useGetAllByResturantId = (args?: string) => Query.useQuery({
  queryKey: ['menu_items', args],
  enabled: !!args,
  queryFn: () => Api.menu.getAllByResturantId(args!)
})