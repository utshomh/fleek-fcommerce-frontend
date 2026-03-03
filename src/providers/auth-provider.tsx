"use client";

import axios from "axios";
import { createContext, use, useEffect, useState } from "react";

import { User } from "@/types/user";

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  error: string;

  isError: boolean;
  isLoading: boolean;

  reFetchUser: () => Promise<void>;
  signUp: (
    name: string,
    email: string,
    phone: number,
    password: string,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
  error: "",

  isError: false,
  isLoading: false,

  async reFetchUser() {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(name, email, phone, password) {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(email, password) {},
  async signOut() {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setIsLoading(true);

    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
      setUser(response.data);
    } catch (err: unknown) {
      console.error(err);
      setIsError(true);
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        error,

        isError,
        isLoading,

        async reFetchUser() {
          await fetchUser();
        },

        async signUp(name, email, phone, password) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
            name,
            email,
            phone,
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
          setAccessToken(response.accessToken as string);
        },

        async signOut() {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`,
            {},
          );
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
