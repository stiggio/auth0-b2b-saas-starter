import { PageHeader } from "@/components/page-header"

import { CustomerPortal } from "./customer-portal"

export default async function Billing() {
  return (
    <div className="space-y-2">
      <PageHeader
        title="Billing"
        description="Manage your organization's billing settings."
      />
      <CustomerPortal />
    </div>
  )
}
