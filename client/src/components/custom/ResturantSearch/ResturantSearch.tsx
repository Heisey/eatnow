

import * as React from 'react'
import * as Lucide from 'lucide-react'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'
import { Button } from '@/components/ui/button'

export interface ResturantSearchProps extends React.PropsWithChildren {


}


const ResturantSearch: React.FC<ResturantSearchProps> = (props) => {
  const location = Hooks.common.useLocation()
  const nav = Hooks.common.useNavigate()
  const appCtx = App.Ctx.useContext()

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    appCtx.changeResturantCitySearchValue(e.currentTarget.value)
    if (location.pathname === '/' ) nav(Core.keys.paths.RESTURANTS)
  }


  return (
    <div className='px-8 flex items-center justify-center'>
      <Lucide.Search className='mr-2' />
      <input className='grow' value={appCtx.resturantCitySearchValue} onChange={onSearch} placeholder='What are you in the mood for' />
      <Button >Search</Button>
    </div>
  )
}


export default ResturantSearch