import { Claims } from "@auth0/nextjs-auth0"

import { openFgaClient } from "@/lib/fga"
import { stiggClient } from "@/lib/stigg"

export const booleanFeatures = {
  sso: "feature-sso",
}

export const meteredFeatures = {
  mau: "feature-mau",
}

export const features = { ...booleanFeatures, ...meteredFeatures }

export type Feature = keyof typeof features

export type MeteredFeature = keyof typeof meteredFeatures

function getCustomerId(user: Claims) {
  return user.org_id
}

export async function checkAccess(user: Claims, feature: Feature) {
  const customerId = getCustomerId(user)
  const featureId = features[feature]

  // Check entitlement using OpenFGA
  const { allowed: hasAccess } = await openFgaClient.check({
    user: `organization:${getCustomerId(user)}`,
    relation: "entitlement",
    object: `feature:${featureId}`,
  })

  return hasAccess
}

export async function checkUsageLimit(
  user: Claims,
  feature: MeteredFeature,
  requestedUsage = 0
) {
  const customerId = getCustomerId(user)
  const featureId = features[feature]

  // Get the current metered usage from Stigg
  const { currentUsage } = await stiggClient.getMeteredEntitlement({
    customerId,
    featureId,
  })

  // Check entitlement using OpenFGA
  const { allowed: hasAccess } = await openFgaClient.check({
    user: `organization:${getCustomerId(user)}`,
    relation: "entitlement",
    object: `feature:${featureId}`,
    context: {
      current_usage: currentUsage,
      requested_usage: requestedUsage,
    },
  })

  return hasAccess
}
