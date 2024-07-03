

import * as React from 'react'
import * as ReactStripe from '@stripe/react-stripe-js'

import * as Core from '@/core'
import { Button } from '@/components/ui/button'


export interface PaymentFormProps extends React.PropsWithChildren {
  token: string  

}


const PaymentForm: React.FC<PaymentFormProps> = (props) => {

  const stripe = ReactStripe.useStripe()  
  const elements = ReactStripe.useElements()

  React.useEffect(() => {
    const fetch = async () => {
      console.log('token' ,props.token)
      const res = await stripe?.retrievePaymentIntent(props.token)
      if (!res) return
      console.log('res puppy, ', res.paymentIntent?.status)
    }

    fetch()
  }, [stripe])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    if (!stripe || !elements) return
    console.log('puppies credit start')
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: 'https://www.google.ca/'
        return_url: `http://localhost:3000${Core.keys.paths.CHECKOUT_RECEIPT}`
      }
    })
  }

 return (
   <form onSubmit={onSubmit}>
    <span>payment form</span>
    <ReactStripe.PaymentElement options={{ layout: 'tabs' }} />
    <Button type='submit'>Proceed</Button>
   </form>
 )
}


export default PaymentForm