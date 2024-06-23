
import * as Core from '@/core'
import * as Utils from '@/utils'

export interface GetAllByCityArgs {
  city: string
  params?: any
}

export const getAllByCity = async (args: GetAllByCityArgs) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.ResturantRecord>>(`/api/v1/resturant/search/${args.city}`, { params: args.params })).data