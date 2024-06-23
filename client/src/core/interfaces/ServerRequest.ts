
import * as I from '.'

export interface ServerRequest<T> {
  records?: T
  pagination?: I.Pagination
}