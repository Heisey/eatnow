

import * as React from 'react'


export interface OutletProps extends React.PropsWithChildren {


}


const Outlet: React.FC<OutletProps> = (props) => {


 return (
   <div>
     Outlet
   </div>
 )
}


export default Outlet