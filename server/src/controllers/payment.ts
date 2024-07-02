
import * as Services from '../services'
import * as Utils from '../utilities'

export const getToken = Utils.catchAsync(async (req, res, next) => res.status(200).json({ token: process.env.STRIPE_KEY}))

export const create = Utils.catchAsync(async (req, res, next) => {
  // const payment = await Services.stripe.paymentIntents.create({
  //   currency: 'CAD',
  //   amount: req.body.amount,
  //   automatic_payment_methods: {
  //     enabled: true
  //   }
  // })
  console.log('pyppy', req.body)
  // res.status(201).json({ token: payment.client_secret })
})