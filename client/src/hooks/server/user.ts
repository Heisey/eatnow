
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

export const useCreateUser = () => Query.useMutation({
  mutationFn: Api.user.create,
  onSuccess: () => {
    const client = Query.useQueryClient()
    client.invalidateQueries({
      queryKey: ['user']
    })
  }
})

export const useGetUserByEmail = (args?: string) => Query.useQuery({
  queryKey: ['user'],
  enabled: !!args,
  queryFn: () => Api.user.getByEmail(args!)
})

// export const useLogin =  () => {
//   const auth = Hooks.common.useAuth()

//   return Query.useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       const token = await auth.getAccessTokenSilently()
//       Cookie.set('etnw_auth', token)
//       return Api.user.login({ email: auth.user?.email!, auth0id: auth.user?.sub! })
//     },
//     enabled: !!auth.user?.email && !!auth.user.sub,
//     // onSuccess: () => {
//     //   client.invalidateQueries({
//     //     queryKey: ['user']
//     //   })
//     //   navigate('/')
//     // }
//   })
// }

export const useUpdateById = () => {
  const client = Query.useQueryClient()

  return Query.useMutation({
    mutationFn: Api.user.update,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['user']
      })
    }
  })
}