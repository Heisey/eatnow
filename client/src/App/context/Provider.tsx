
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as Hooks from '@/hooks'

import * as CtxApp from './'

const Provider: React.FC<React.PropsWithChildren> = (props) => {

  const [loginModalShow, toggleLoginModalShow] = Hooks.common.useToggle(false)
  
  return (
    <CtxApp.Context.Provider
      value={{
        loginModalShow,
        toggleLoginModalShow
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)