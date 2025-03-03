"use client"
import { createContext, type ReactNode, type FunctionComponent, useState, useEffect, useCallback } from "react"
import { catchError } from "../components/constants/catchError"
import { fetchUserFromDb } from "../api/services/fetchUserFromDb"
import type { UserCredentialsSub } from "../models/IUser"
import { useSession } from "next-auth/react"
import { UserProfileResponse } from "../models/IUserProfileResponse"
import { useFetchUserProfile } from "../api/apiClients"


export type AdminUserContextData = {
  userProfileInformation: UserProfileResponse | null;
  userCredentials: UserCredentialsSub | null
  fetchUserCredentials: () => Promise<UserCredentialsSub | null>
  fetchUserProfileInformation: () => Promise<void>
}

const AdminUserContext = createContext<AdminUserContextData | undefined>(undefined)

type AdminUserProviderProps = {
  children: ReactNode
}

const AdminUserProvider: FunctionComponent<AdminUserProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()
  const fetchUserProfile = useFetchUserProfile()
  const [userProfileInformation, setUserProfileInformation] = useState<UserProfileResponse | null>(null)
  const [userCredentials, setUserCredentials] = useState<UserCredentialsSub | null>(null)

  // Fetch user credentials using session accessToken if available
  const fetchUserCredentials = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.accessToken) {
      console.warn("User not authenticated or access token missing.");
      return null;
    }

    try {
      const user = await fetchUserFromDb(); // Pass accessToken directly
      const userCredentials: UserCredentialsSub = {
        id: 1,
        userId: "", // Provide a value for userId
        email: "", // Provide a value for email
        accessToken: user.accessToken as string,
        expiresIn: "", // Provide a value for expiresIn
        createdAt: "", // Provide a value for createdAt
        updatedAt: "", // Provide a value for updatedAt
      };
      setUserCredentials(userCredentials);
      return userCredentials;
    } catch (error) {
      console.error("Error fetching user credentials:", error);
      catchError(error);
      return null;
    }
  }, [status, session]);

  const fetchUserProfileInformation = useCallback(async () => {
    try {
      if (session?.user?.accessToken) {
        console.log("Fetching user profile with token:", session.user.accessToken)
        const userProfile = await fetchUserProfile(session.user.accessToken);
        setUserProfileInformation(userProfile.data)
      } else {
        console.warn("Access token is missing from session.")
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      setUserProfileInformation(null)
      catchError(error)
    }
  }, [session])



  // Automatically fetch user credentials if authenticated
  useEffect(() => {
    if (status === "authenticated" && !userCredentials) {
      fetchUserCredentials()
    }
  }, [status, userCredentials, fetchUserCredentials])



  const contextValue: AdminUserContextData = {
    userProfileInformation,
    userCredentials,
    fetchUserCredentials,
    fetchUserProfileInformation,
  }

  return <AdminUserContext.Provider value={contextValue}>{children}</AdminUserContext.Provider>
}

export { AdminUserProvider, AdminUserContext }
