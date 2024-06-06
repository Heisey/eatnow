
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'

import * as CtxApp from './'

const Provider: React.FC<React.PropsWithChildren> = (props) => {

  const auth = Hooks.common.useAuth()
  const userApi = Hooks.server.useUser()

  const [user, userHandler] = React.useState<Core.I.UserRecord | undefined>(undefined)
  React.useEffect(() => {
    // if (!auth.user?.email || !auth.user?.sub || user) return
    // async () => await userHandler((await userApi.exists.mutateAsync(auth.user?.email!)).data.records)
    const fetchUser = async () => {
      if (!auth.user?.email || !auth.user.sub || !!user) return

      const res = await userApi.exists.mutateAsync(auth.user?.email)
      
      userHandler(res.data.records)
    }
    
    fetchUser()
  }, [auth, user])
  return (
    <CtxApp.Context.Provider
      value={{
        user,
        setUser: userHandler
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)