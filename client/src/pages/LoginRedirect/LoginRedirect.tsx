

import * as React from 'react'
import * as Hooks from '@/hooks'

export interface LoginRedirectProps extends React.PropsWithChildren {


}

const LoginRedirect: React.FC<LoginRedirectProps> = () => {

  const loginUser = Hooks.user.useLogin()

  if (loginUser.isLoading) return <div>loading</div>

 return (
   <div>
     LoginRedirect
   </div>
 )
}


export default LoginRedirect