
import * as Lucide from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean

}


const LoadingButton: React.FC<LoadingButtonProps> = (props) => {


  return (
    <Button {...props}>
      {props.isLoading && <Lucide.Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {props.children}
    </Button>
  )
}

export default LoadingButton