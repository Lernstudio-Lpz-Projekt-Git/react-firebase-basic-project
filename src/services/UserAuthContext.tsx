import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

const userAuthContext = createContext("");

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  // function signUp(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  function appLogIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function appLogout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribte = onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribte();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, appLogIn, appLogout }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
