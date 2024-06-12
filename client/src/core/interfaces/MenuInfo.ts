
import * as I from '@/core/interfaces'
import * as Keys from '@/core/keys'

export interface MenuInfo {
  [Keys.menuCategories.appetizers]?: I.MenuItemRecord[]
  [Keys.menuCategories.mains]?: I.MenuItemRecord[]
  [Keys.menuCategories.drinks]?: I.MenuItemRecord[]
  [Keys.menuCategories.deserts]?: I.MenuItemRecord[]
}