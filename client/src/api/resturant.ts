
import * as Core from '@/core'
import * as Utils from '@/utils'

export const create = async (args: Core.I.ResturantInfo) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.ResturantRecord>>('/resturants', args)).data.records

export const getById = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.ResturantRecord>>(`/resturants/${args}`)).data.records