

import * as React from 'react'
import Cookie from 'js-cookie'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'

export interface LoginRedirectProps extends React.PropsWithChildren {


}


const LoginRedirect: React.FC<LoginRedirectProps> = () => {

  // const [token, tokenHandler] = React.useState<string | undefined>(undefined)
  // const auth = Hooks.common.useAuth()
  // const navigate = Hooks.common.useNavigate()
  const loginUser = Hooks.user.useLogin()

  if (loginUser.isLoading) return <div>loading</div>

  // const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  // const createUser = Hooks.user.useCreateUser()
  // const loginUser = Hooks.user.login({ token: ), email })
  // const createUser = Hooks.user.useCreateUser(auth.user?.email)
  // const userCreated = React.useRef(!!user.data?.id)

  // loginUser.then(() => navigate('/'))

  // React.useEffect(() => {
  //   const loginUser = async () => {
  //     // let user: Core.I.UserRecord | undefined = undefined
      
  //     if (!auth.user?.email || !auth.user.sub || userCreated.current) return
      
  //     const token = await auth.getAccessTokenSilently()
      
  //     Cookie.set('etnw_auth', token)
  //     console.log('puppy user data, ', !user.data, !user.isLoading, !user.data && !user.isLoading)
      
  //     if (!user.data?.email) await createUser.mutateAsync({ email: auth.user.email, auth0id: auth.user.sub })
      
  //     userCreated.current = true

  //     navigate('/')
  //   }
    
  //   loginUser()
  // }, [user.data, user.isLoading, createUser.data])

 return (
   <div>
     LoginRedirect
   </div>
 )
}


export default LoginRedirect