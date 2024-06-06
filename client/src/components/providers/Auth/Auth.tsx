

import * as Auth0 from '@auth0/auth0-react'
import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'

export interface AuthProps extends React.PropsWithChildren {


}

const Auth: React.FC<AuthProps> = (props) => {
  const domain = import.meta.env.VITE_AUTH_DOMAIN
  const clientId = import.meta.env.VITE_CLIENT_ID
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI
  const audience = import.meta.env.VITE_AUTH_AUDIENCE
  
  const navigate = Hooks.common.useNavigate()

  if (!domain || !clientId || !redirect_uri || !audience) throw new Error('unable in initialize auth')

  const onRedirect = async () => {
    navigate(Core.keys.paths.REDIRECT_LOGIN)
  }
  
 return (
    <Auth0.Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      authorizationParams={{ redirect_uri, audience }}
      onRedirectCallback={onRedirect}
    >
      {props.children}
    </Auth0.Auth0Provider>
 )
}


export default Auth