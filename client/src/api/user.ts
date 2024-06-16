

import * as Core from '@/core'
import * as Utils from '@/utils'

export const create = async (args: Core.I.Credentials) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.UserRecord>>(`/user`, args)).data.records

export const getByEmail = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.UserRecord>>(`/user/exists/${args}`)).data.records

export const update = async (args: Core.I.UserEntityInfo) => (await Utils.server.makeRequest.put<Core.I.ServerRequest<Core.I.UserRecord>>(`/user/${args.id}`, args)).data.records

export const login = async (args: Core.I.Credentials) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.UserRecord>>('/user/login', args)).data.records