
import * as React from 'react'
import * as firebaseAuth from 'firebase/auth'

interface AuthContext {
  createUser: (email: string, password: string) => Promise<firebaseAuth.UserCredential>
  user: firebaseAuth.User | null
  loginUser: (email: string, password: string) => Promise<firebaseAuth.UserCredential>
  logOut: () => Promise<void>
  loading: boolean
}

export const Context = React.createContext<AuthContext | null>(null)