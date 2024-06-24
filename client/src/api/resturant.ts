
import * as Core from '@/core'
import * as Utils from '@/utils'

export interface GetAllByCityArgs {
  city: string
  params?: {
    [key: string]: any
  }
}

export const getAllByCity = async (args: GetAllByCityArgs) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.ResturantRecord[]>>(`/resturant/search/${args.city}`, { params: args.params })).data