
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'

import * as CtxApp from './'

const Provider: React.FC<React.PropsWithChildren> = (props) => {

  const appCtx = App.Ctx.useContext()
  const resturantApi = Hooks.server.useResturant()

  const [resturant, resturantHandler] = React.useState<Core.I.ResturantRecord | undefined>(undefined)

  React.useEffect(() => {
    const fetchResturant = async () => {
      if (!appCtx.user || !appCtx.user.resturantId) return

      const res = await resturantApi.getById.mutateAsync(appCtx.user.resturantId)
      
      resturantHandler(res.data.records)
    }
    
    if (!resturant) fetchResturant()
  }, [appCtx.user?.resturantId, resturant])

  return (
    <CtxApp.Context.Provider
      value={{
        resturant,
        setResturant: resturantHandler
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)