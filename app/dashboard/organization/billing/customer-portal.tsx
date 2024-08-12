"use client"

import * as React from "react"
import { CustomerPortal as StiggCustomerPortal } from "@stigg/react-sdk"
import { CustomerPortalTheme } from "@stigg/react-sdk/src/components/customerPortal/customerPortalTheme"
import { DeepPartial } from "@stigg/react-sdk/src/types"

import { StiggProvider } from "@/components/stigg-provider"
import { Paywall } from "@/app/dashboard/organization/billing/paywall"

const customerPortalTheme: DeepPartial<CustomerPortalTheme> = {
  backgroundColor: "#0E0E10",
  borderColor: "#303036",
}

export function CustomerPortal() {
  return (
    <div>
      <StiggProvider>
        <StiggCustomerPortal
          theme={customerPortalTheme}
          paywallComponent={<Paywall />}
        />
      </StiggProvider>
    </div>
  )
}
