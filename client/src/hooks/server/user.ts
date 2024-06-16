
import * as Query from '@tanstack/react-query'

import * as Api from '@/api'

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

export const useLogin = () => {
  const client = Query.useQueryClient()
  return Query.useMutation({
    mutationFn: Api.user.login,
    onSuccess: (args) => {
      client.invalidateQueries({
        queryKey: ['user', args?.email]
      })
    }
  })
}

export const useGetUserByEmail = (args?: string) => Query.useQuery({
  queryKey: ['user', args],
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
    onSuccess: (args) => {
      client.invalidateQueries({
        queryKey: ['user', args?.email]
      })
    }
  })
}