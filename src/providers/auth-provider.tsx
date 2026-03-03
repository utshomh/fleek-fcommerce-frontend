"use client";

import axios from "axios";
import { createContext, use, useEffect, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(name, email, password) {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(email, password) {},
  signOut() {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("accessToken");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccessToken(stored);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,

        async signUp(name, email, password) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
            name,
            email,
            password,
          });
        },

        async signIn(email, password) {
          const response = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
              email,
              password,
            })
            .then((res) => res.data);
          console.log(response);
          setAccessToken(response.accessToken as string);
        },

        signOut() {
          setAccessToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("useAuth is only usable inside AuthContext");
  }

  return auth;
}
