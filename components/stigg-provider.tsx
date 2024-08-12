"use client"

import * as React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { StiggProvider as ReactStiggProvider } from "@stigg/react-sdk"

import { providerTheme } from "@/components/stigg-theme"

type StiggProviderProps = {
  children: React.ReactNode
}

export function StiggProvider({ children }: StiggProviderProps) {
  const { user } = useUser()

  return (
    <ReactStiggProvider
      theme={providerTheme}
      apiKey={process.env.NEXT_PUBLIC_STIGG_CLIENT_API_KEY}
      customerId={user?.org_id || undefined}
    >
      {children}
    </ReactStiggProvider>
  )
}
