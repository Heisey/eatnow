
import axios from 'axios'
import Cookie from 'js-cookie'

import * as Core from '@/core'

export const makeRequest = axios.create({
  baseURL: Core.config.urls.SERVER,
  headers: {
    "Content-Type": "application/json"
  },
  transformRequest: function(data, headers) {

    headers['Authorization'] = `Bearer ${Cookie.get('etnw_auth')}`
    
    return JSON.stringify(data)
  }
})