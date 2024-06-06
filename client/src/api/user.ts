

import * as Core from '@/core'
import * as Utils from '@/utils'

export const create = async (args: Core.I.Credentials) => (await Utils.server.makeRequest.post<Core.I.ServerRequest<Core.I.UserRecord>>(`/user`, args)).data.records

export const checkIfUserExists = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.UserRecord>>(`/user/exists/${args}`)).data.records

export const get = async (args: Core.I.Credentials) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.UserRecord>>(`/user/${args.auth0id}`)).data.records

export const getByEmail = async (args: string) => (await Utils.server.makeRequest.get<Core.I.ServerRequest<Core.I.UserRecord>>(`/user/exists/${args}`)).data.records

export const update = async (args: Core.I.UserEntityInfo) => Utils.server.makeRequest.put<Core.I.ServerRequest<Core.I.UserRecord>(`/user/${args.id}`, args).data.records