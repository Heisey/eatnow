

import * as React from 'react'


export interface MenuProps extends React.PropsWithChildren {


}


const Menu: React.FC<MenuProps> = (props) => {

 return (
   <div>
     Menu
     <div>
      <h2>Appetizers</h2>

     </div>
   </div>
 )
}


export default Menu