

import * as React from 'react'
import * as Lucide from 'lucide-react'

import { Button } from '@/components/ui/button'

export interface SidebarProps extends React.PropsWithChildren {

}


const Sidebar: React.FC<SidebarProps> = (props) => {


  return (
    <div className='w-[200px] border-r min-h-screen'>
      <div className='w-fit ml-auto mb-5'>
        <Button className='' variant='ghost'><Lucide.MoveLeft /></Button>
      </div>
      <div className='flex flex-col gap-y-3'>
        {props.children}
      </div>
    </div>
  )
}


export default Sidebar