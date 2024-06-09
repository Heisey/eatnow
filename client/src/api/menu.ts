
import * as Core from '@/core'
import * as Utils from '@/utils'

export const getAllByResturantId = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.MenuItemRecord[]>>(`/menu/${args}/menuItems`)).data.records