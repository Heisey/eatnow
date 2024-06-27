
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'

import * as CtxApp from './'

const defaultCart: Core.I.Cart = {
  resturantId: '',
  deliveryPrice: 0,
  items: []
}

const Provider: React.FC<React.PropsWithChildren> = (props) => {

  const localStore = Hooks.common.useLocalStore('cart')
  const [resturantCitySearchValue, resturantCitySearchValueHandler] = React.useState('')
  const [loginModalShow, toggleLoginModalShow] = Hooks.common.useToggle(false)
  const [cart, cartHandler] = React.useState<Core.I.Cart>(defaultCart)
  
  React.useEffect(() => {
    if (cart.items.length === 0 && localStore.get()) cartHandler(localStore.get() as Core.I.Cart || {})
  }, [cart])

  const updateCartItems = (args: Core.I.CartItem[]) => {
    const update = { ...cart, items: args }
    cartHandler(update)
    if (args.length === 0) return localStore.clear()
    localStore.set(update)
  }

  const setCart = (args: Core.I.Cart) => cartHandler(args)

  return (
    <CtxApp.Context.Provider
      value={{
        loginModalShow,
        toggleLoginModalShow,
        resturantCitySearchValue,
        changeResturantCitySearchValue: resturantCitySearchValueHandler,
        cart,
        setCart,
        updateCartItems
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)