'use client'

import {
  useEffect,
  useState,
} from 'react'

import { type Auth, onAuthStateChanged, type User } from 'firebase/auth'

export const useAuth = (auth: Auth) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const listener = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser)
          setIsLoading(false)
        } else {
          setUser(null)
          setIsLoading(false)
        }
      },
      () => {
        setIsLoading(false)
      },
    )

    return () => {
      listener()
    }
  }, [auth])

  return {
    user,
    isLogin: !!user,
    isLoading,
  }
}