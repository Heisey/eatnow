
import * as Auth0 from '@auth0/auth0-react'
import * as Router from 'react-router-dom'
import * as ReactHookForm from 'react-hook-form'

// Rexporting common used hooks from packages
// From Auth0 package
export const useAuth = Auth0.useAuth0

// From React-hook-form package
export const useForm = ReactHookForm.useForm

// From react-router-dom package
export const useLocation = Router.useLocation
export const useNavigate =  Router.useNavigate



// Project made hooks
export * from './useImagePreview'

export * from './useToggle'