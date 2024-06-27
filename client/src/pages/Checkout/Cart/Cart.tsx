

import * as React from 'react'


export interface CartProps extends React.PropsWithChildren {


}


const Cart: React.FC<CartProps> = (props) => {


 return (
   <div>
     Cart
   </div>
 )
}


export default Cart