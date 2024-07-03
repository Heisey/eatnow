

import * as React from 'react'
import * as ReactStripe from '@stripe/react-stripe-js'

import * as App from '@/App'
import * as Hooks from '@/hooks'
import * as Services from '@/services'
import PaymentForm from '@/components/custom/PaymentForm'

export interface PaymentProps extends React.PropsWithChildren {


}


const Payment: React.FC<PaymentProps> = (props) => {

  const appCtx = App.Ctx.useContext()
  const createPayment = Hooks.payment.useCreatePayment()
  const [token, tokenHandler] = React.useState<string | undefined>(undefined)
  
  React.useEffect(() => {
    if (!token) createPayment.mutateAsync(appCtx.cart).then(res => tokenHandler(res))
  }, [])

  if (!token) return <div>loading</div>

  return (
    <div>
      <ReactStripe.Elements stripe={Services.stripe} options={{ clientSecret: token }} >
        Payment
        <PaymentForm token={token} />
      </ReactStripe.Elements>
    </div>
  )
}

export default Payment