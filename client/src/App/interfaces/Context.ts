
import * as Core from '@/core'

export interface Context {
  loginModalShow: boolean
  toggleLoginModalShow: () => void

  resturantCitySearchValue: string
  changeResturantCitySearchValue: (args: string) => void

  cart: Core.I.Cart,
  setCart: (args: Core.I.Cart) => void
  updateCartItems: (args: Core.I.CartItem[]) => void
}