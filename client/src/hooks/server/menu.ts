
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'
import * as Core from '@/core'

export const useGetAllByResturantId = (args?: string) => Query.useQuery({
  queryKey: ['menu_items', args],
  enabled: !!args,
  queryFn: () => Api.menu.getAllByResturantId(args!)
})

export const useGetById = (args?: string) => {

  return Query.useQuery({
    queryFn: () => Api.menu.getById(args!),
    queryKey: ['menu', args],
    enabled: !!args
  })
}

export const useUpdateById = (args: Core.I.MenuInfo & Core.I.Entity) => {
  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: () => Api.menu.updateById(args),
    onSuccess(data) {
      client.invalidateQueries({
        queryKey: ['menu', data?.id]
      })
    },
  })
}