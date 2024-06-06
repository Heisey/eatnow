
import * as I from '.'

export interface MenuInfo {
  appetizers?: I.MenuItemRecord[],
  mains?: I.MenuItemRecord[]
  drinks?: I.MenuItemRecord[]
  deserts?: I.MenuItemRecord[]
}