

import * as Core from '@/core'
import * as Utils from '@/utils'

export const create = (args: Core.I.Credentials) => Utils.server.makeRequest.post<Core.I.UserRecord>(`/user`, args)

export const checkIfUserExists = async (args: string) => await Utils.server.makeRequest.get<{ records?: Core.I.UserRecord }>(`/user/exists/${args}`)

export const get = (args: Core.I.Credentials) => Utils.server.makeRequest.get(`/user/${args.auth0id}`)

export const getByEmail = async (args: string) => await Utils.server.makeRequest.get<{ records?: Core.I.UserRecord }>(`/user/exists/${args}`)

export const update = (args: Core.I.UserEntityInfo) =>  Utils.server.makeRequest.put(`/user/${args.id}`, args)