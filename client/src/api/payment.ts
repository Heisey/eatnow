
import * as Core from '@/core'
import * as Utils from '@/utils'

export const getToken = async () => (await Utils.server.makeRequest.get<{ token: string }>('/payment/token')).data.token

export const createToken = async (args: Core.I.Cart) => (await Utils.server.makeRequest.post<{ token?: string }>('/payment/token', args)).data.token