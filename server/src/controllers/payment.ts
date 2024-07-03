
import * as Services from '../services'
import * as Utils from '../utilities'

export const getToken = Utils.catchAsync(async (req, res, next) => res.status(200).json({ token: process.env.STRIPE_KEY}))

export const create = Utils.catchAsync(async (req, res, next) => {
  
  // const payment = await Services.stripe.checkout.sessions.create({
  //   ui_mode: 'embedded',
  //   line_items: req.body.items.map((dataSet: { quantity: number, id: string }) => ({ quantity: dataSet.quantity, price: dataSet.id })),
  //   mode: 'payment',
  //   return_url: 'http://localhost:3000/checkout/confirm'
  // })

  let price = 0

  req.body.items.map((dataSet: { quantity: number, price: number }) => price = price + (dataSet.quantity * dataSet.price))
  
  const payment = await Services.stripe.paymentIntents.create({
    amount: price * 100,
    currency: 'CAD',
    automatic_payment_methods: {
      enabled: true
    }
  })
  
  res.status(201).json({ token: payment.client_secret })
})