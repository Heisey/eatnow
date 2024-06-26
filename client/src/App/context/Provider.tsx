
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'

import * as CtxApp from './'

const Provider: React.FC<React.PropsWithChildren> = (props) => {

  const localStore = Hooks.common.useLocalStore('cart')
  const [resturantCitySearchValue, resturantCitySearchValueHandler] = React.useState('')
  const [loginModalShow, toggleLoginModalShow] = Hooks.common.useToggle(false)
  const [cart, cartHandler] = React.useState<Core.I.CartItem[]>([])
  
  React.useEffect(() => {
    if (cart.length === 0 && localStore.get()) cartHandler(localStore.get() as Core.I.CartItem[] || [])
  }, [cart])

  const updateCart = (args: Core.I.CartItem[]) => {
    cartHandler(args)
    localStore.set(args)
  }

  return (
    <CtxApp.Context.Provider
      value={{
        loginModalShow,
        toggleLoginModalShow,
        resturantCitySearchValue,
        changeResturantCitySearchValue: resturantCitySearchValueHandler,
        cart,
        updateCart
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)