
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

// only use for admin purposes, users are crewated as need on login
export const useCreateUser = () => {
  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.user.create,
    onSuccess: (args) => {
      client.invalidateQueries({
        queryKey: ['user', args?.email]
      })
    }
  }) 
}

export const useGetUserByEmail = (args?: string | null) => Query.useQuery({
  queryKey: ['user', args],
  enabled: !!args,
  queryFn: () => Api.user.getByEmail(args!)
})

export const useUpdateById = () => {
  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.user.update,
    onSuccess: (args) => {
      client.invalidateQueries({
        queryKey: ['user', args?.email]
      })
    }
  })
}