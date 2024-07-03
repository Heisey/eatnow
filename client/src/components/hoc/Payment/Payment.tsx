

import * as React from 'react'


export interface PaymentProps extends React.PropsWithChildren {


}


export function Payment<T extends {}> (Component: React.FC<T>){
  return function(props: T) {
    
    // console.log('payment,' , payment)

    return (
      <div></div>
      // <ReactStripe.Elements stripe={Services.stripe}>
      //   <Component { ...props } />
      // </ReactStripe.Elements>
    )
  }
}


export default Payment