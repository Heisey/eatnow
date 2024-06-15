
import * as firebaseAuth from 'firebase/auth'
import * as React from 'react'

import * as Services from '@/services'

import * as CtxApp from './Context'

const Provider: React.FC<React.PropsWithChildren> = (props) => {
  const [user, setUser] = React.useState<firebaseAuth.User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return firebaseAuth.createUserWithEmailAndPassword(Services.firebase.auth, email, password);
  };


  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return firebaseAuth.signInWithEmailAndPassword(Services.firebase.auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return firebaseAuth.signOut(Services.firebase.auth);
  };

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
        loading
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export default Provider