
import * as React from 'react'
import * as firebaseAuth from 'firebase/auth'

interface AuthContext {
  loading: boolean
  loginWithGoogle: () => Promise<void>
  logOut: () => void
  user?: firebaseAuth.User
}

export const Context = React.createContext<AuthContext | null>(null)