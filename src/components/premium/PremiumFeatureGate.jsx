// src/components/premium/PremiumFeatureGate.jsx
import { useAuth } from '../../context/AuthContext'
import { ENTITLEMENTS } from '../header/headerConfig'

/**
 * PremiumFeatureGate
 *
 * Wraps a premium feature page.
 * - If user has the required entitlement, renders children (unlocked UI).
 * - Otherwise renders the preview prop (locked preview UI).
 *
 * Usage:
 *   <PremiumFeatureGate
 *     entitlement={ENTITLEMENTS.ADMISSION_PASS}
 *     preview={<LockedPreview />}
 *   >
 *     <UnlockedContent />
 *   </PremiumFeatureGate>
 */
export default function PremiumFeatureGate({
  entitlement,
  preview,
  children,
}) {
  const { hasEntitlement } = useAuth()

  if (hasEntitlement(entitlement)) {
    return <>{children}</>
  }

  return <>{preview}</>
}
