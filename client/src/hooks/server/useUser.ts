
import * as Query from 'react-query'

import * as Api from '@/api'

export const useUser = () => {
  const create = Query.useMutation(Api.user.create)

  const exists = Query.useMutation(Api.user.checkIfUserExists)

  const update = Query.useMutation(Api.user.update)
  
  return {
    create,
    exists,
    update
  }
}

