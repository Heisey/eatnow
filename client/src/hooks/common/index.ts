
import * as Router from 'react-router-dom'
import * as ReactHookForm from 'react-hook-form'

import * as AuthProvider from '@/components/providers/Auth'

// Rexporting common used hooks from packages

// From React-hook-form package
export const useForm = ReactHookForm.useForm

// From react-router-dom package
export const useLocation = Router.useLocation
export const useNavigate =  Router.useNavigate


export const useAuth = AuthProvider.useContext

// Project made hooks
export * from './useImagePreview'

export * from './useToggle'