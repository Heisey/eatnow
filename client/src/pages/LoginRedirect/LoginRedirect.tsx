

import * as React from 'react'
import Cookie from 'js-cookie'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'

export interface LoginRedirectProps extends React.PropsWithChildren {


}


const LoginRedirect: React.FC<LoginRedirectProps> = () => {

  const appCtx = App.Ctx.useContext()
  const auth = Hooks.common.useAuth()
  const navigate = Hooks.common.useNavigate()
  const userApi = Hooks.server.useUser()
  const createUser = Hooks.user.useCreateUser()

  const userCreated = React.useRef(false)

  React.useEffect(() => {
    const loginUser = async () => {
      let user: Core.I.UserRecord | undefined = undefined
      
      if (!auth.user?.email || !auth.user.sub || userCreated.current) return
      
      const userResponse = await userApi.exists.mutateAsync(auth.user?.email)

      if (userResponse.data.records) user = userResponse.data.records

      const token = await auth.getAccessTokenSilently()
      
      Cookie.set('etnw_auth', token)
      
      if (!userResponse.data.records) await createUser.mutate({ email: auth.user.email, auth0id: auth.user.sub })
      
      userCreated.current = true

      appCtx.setUser(user)

      navigate('/')
    }
    
    loginUser()
  }, [])

 return (
   <div>
     LoginRedirect
   </div>
 )
}


export default LoginRedirect