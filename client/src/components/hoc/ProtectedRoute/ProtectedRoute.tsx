

import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Hooks from '@/hooks'

export interface ProtectedRouteProps extends React.PropsWithChildren {


}

export default function ProtectedRoute<T extends {}>(Component: React.FC<T>){

  return function(props: T) {
    const auth = Hooks.common.useAuth()

    if (!auth.user) return <Router.Navigate to='/' replace />

    return <Component { ...props} />
  }
}
