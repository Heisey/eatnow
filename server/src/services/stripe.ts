
import Stripe from 'stripe'

export const stripe = new Stripe.Stripe(process.env.STRIPE_KEY as string)