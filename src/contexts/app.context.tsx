import React, { createContext, useState, useEffect } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileToLS, clearLS } from 'src/utils/auth'
import { CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { ExtendedPurchase } from 'src/types/order.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  handleGoogleLoginSuccess: (response: CredentialResponse) => void
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  handleGoogleLoginSuccess: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)

  useEffect(() => {
    const storedProfile = getProfileFromLS()
    const storedIsAuthenticated = Boolean(getAccessTokenFromLS())

    if (storedProfile && storedIsAuthenticated) {
      setIsAuthenticated(storedIsAuthenticated)
      setProfile(storedProfile)
    }
  }, [])

  const handleGoogleLoginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const user: User = jwtDecode<User>(response.credential)

        // Save token and profile to localStorage
        setAccessTokenToLS(response.credential)
        setProfileToLS(user)

        setIsAuthenticated(true)
        setProfile(user)
        console.log('Google User:', user)
      } catch (error) {
        console.error('Invalid token:', error)
        console.log('Full Response:', response) // Log the full response for debugging
      }
    } else {
      console.error('Credential response is missing the credential field:', response)
    }
  }

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        handleGoogleLoginSuccess,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
