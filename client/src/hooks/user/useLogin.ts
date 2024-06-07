
import Cookie from 'js-cookie'
import * as Query from 'react-query'

import * as Api from '@/api'
import * as Hooks from '@/hooks'

export const useLogin =  () => {

  const auth = Hooks.common.useAuth()
  const navigate = Hooks.common.useNavigate()

  return Query.useQuery({
    queryKey: ['user', auth.user?.email],
    queryFn: async () => {
      const token = await auth.getAccessTokenSilently()
      Cookie.set('etnw_auth', token)
      return Api.user.login({ email: auth.user?.email!, auth0id: auth.user?.sub! })
    },
    enabled: !!auth.user?.email && !!auth.user.sub,
    onSuccess: () => navigate('/')
  })
}
