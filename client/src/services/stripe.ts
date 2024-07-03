
import * as Stripe from '@stripe/stripe-js'

export const stripe = Stripe.loadStripe(import.meta.env.VITE_STRIPE_KEY)