
import Cookie from 'js-cookie'
import * as firebaseAuth from 'firebase/auth'
import * as React from 'react'

import * as Hooks from '@/hooks'
import * as Services from '@/services'

import * as CtxApp from './Context'

const Provider: React.FC<React.PropsWithChildren> = (props) => {
  
  const [user, userHandler] = React.useState<firebaseAuth.User | undefined>(undefined)
  const loginUser = Hooks.user.useLogin()
  const [isLoading, isLoadingHandler] = React.useState(true);

  const setToken = async (args?: string) => {
    if (!args) return clearToken()
    Cookie.set('etnw_auth', args)
    return args
  }

  const clearToken = () => Cookie.remove('etnw_auth')

  const logOut = () => {
    isLoadingHandler(true);
    return firebaseAuth.signOut(Services.firebase.auth).then(clearToken);
  };

  const loginWithGoogle = async () => {
    const firebaseUser = await firebaseAuth.signInWithPopup(Services.firebase.auth, Services.firebase.googleProvider)
    const tokenResult = await Services.firebase.auth.currentUser?.getIdTokenResult()
    setToken(tokenResult?.token)
    const email = firebaseUser?.user.email
    if (!email) return
    loginUser.mutateAsync({ email })
  }

  React.useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(Services.firebase.auth, async (currentUser) => {
      userHandler(currentUser || undefined)
      isLoadingHandler(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
  
  return (
    <CtxApp.Context.Provider
      value={{
        logOut,
        isLoading,
        loginWithGoogle,
        user
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export default Provider