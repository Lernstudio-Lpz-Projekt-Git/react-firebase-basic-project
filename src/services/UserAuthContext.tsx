import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firebasedb } from "./firebase-config";
import React from "react";

const userAuthContext = createContext<any>({});

export function UserAuthContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState();

  // function signUp(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  function appLogIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function appLogout() {
    return signOut(auth);
  }

  function getCurrentUser() {
    return user;
  }

  useEffect(() => {
    const unsubscribte = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribte();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, appLogIn, appLogout, getCurrentUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
