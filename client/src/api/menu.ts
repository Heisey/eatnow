
import * as Core from '@/core'
import * as Utils from '@/utils'

export const getAllByResturantId = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.MenuItemRecord[]>>(`/menu/${args}/menuItems`)).data.records

export const getById = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.MenuRecord>>(`/menu/${args}`)).data.records

export const updateById = async (args: Core.I.MenuInfo & Core.I.Entity) => (await Utils.server.makeRequest.put<Core.I.ServerRequest<Core.I.MenuRecord>>(`/menu/${args.id}`, args)).data.records

export interface AddItemArgs {
  menuId: string
  category: keyof typeof Core.keys.menuCategories
  menuItemId: string
}

export const addItem = async (args: AddItemArgs) => (await Utils.server.makeRequest.put<Core.I.ServerRequest<Core.I.MenuRecord>>(`/menu/${args.menuId}/addItem`, args)).data.records