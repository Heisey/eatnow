
import Cookie from 'js-cookie'
import * as firebaseAuth from 'firebase/auth'
import * as React from 'react'

import * as Services from '@/services'

import * as CtxApp from './Context'

const Provider: React.FC<React.PropsWithChildren> = (props) => {
  const [user, setUser] = React.useState<firebaseAuth.User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const setToken = async (args: firebaseAuth.UserCredential | null) => {
    const token = await args?.user.getIdToken()
    if (token) Cookie.set('etnw_auth', token)
    return args
  }

  const clearToken = () => Cookie.remove('etnw_auth')

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return firebaseAuth.createUserWithEmailAndPassword(Services.firebase.auth, email, password).then(setToken);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return firebaseAuth.signInWithEmailAndPassword(Services.firebase.auth, email, password).then(setToken);
  };

  const logOut = () => {
    setLoading(true);
    return firebaseAuth.signOut(Services.firebase.auth).then(clearToken);
  };

  const loginWithPopup = async () => await firebaseAuth.signInWithPopup(Services.firebase.auth, Services.firebase.googleProvider).then(setToken)

  React.useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(Services.firebase.auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
  
  return (
    <CtxApp.Context.Provider
      value={{
        createUser,
        user,
        loginUser,
        logOut,
        loading,
        loginWithPopup
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export default Provider