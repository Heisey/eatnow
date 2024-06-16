
import * as React from 'react'
import * as firebaseAuth from 'firebase/auth'

interface AuthContext {
  isLoading: boolean
  loginWithGoogle: () => Promise<void>
  logOut: () => void
  user?: firebaseAuth.User
}

export const Context = React.createContext<AuthContext | null>(null)