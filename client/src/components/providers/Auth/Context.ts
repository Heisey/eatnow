
import * as React from 'react'
import * as firebaseAuth from 'firebase/auth'

interface AuthContext {
  createUser: (email: string, password: string) => Promise<firebaseAuth.UserCredential | null>
  user: firebaseAuth.User | null
  loginUser: (email: string, password: string) => Promise<firebaseAuth.UserCredential | null>
  logOut: () => Promise<void>
  loading: boolean
  loginWithPopup: () => Promise<firebaseAuth.UserCredential | null>
}

export const Context = React.createContext<AuthContext | null>(null)