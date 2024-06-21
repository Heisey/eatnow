
import * as Core from '@/core'
import * as Utils from '@/utils'

export const create = async (args: Core.I.ResturantInfo) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.ResturantRecord>>('/resturant_profile', args)).data.records

export const getById = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.ResturantRecord>>(`/resturant_profile/${args}`)).data.records

export const createMenuItem = async (args: Core.I.MenuItemInfo) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.MenuItemRecord>>(`/resturant_profile/menuItems`, args)).data.records