
export interface Context {
  loginModalShow: boolean
  toggleLoginModalShow: () => void

  resturantCitySearchValue: string
  changeResturantCitySearchValue: (args: string) => void
}