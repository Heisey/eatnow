
import * as Core from '@/core'

export interface Context {
  loginModalShow: boolean
  toggleLoginModalShow: () => void

  resturantCitySearchValue: string
  changeResturantCitySearchValue: (args: string) => void

  cart: Core.I.CartItem[],
  updateCart: (args: Core.I.CartItem[]) => void
}