// src/components/premium/PremiumLockCard.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { formatPrice, PLAN_CATALOG, PLAN_IDS } from '../../data/plans'
import { ENTITLEMENTS } from '../header/headerConfig'

/**
 * PremiumLockCard
 *
 * Shown inside premium feature pages when the user does NOT have ADMISSION_PASS.
 * Handles three user states:
 *   - Guest (not logged in)
 *   - Preview (logged in, no entitlements)
 *   - Gói Tháng / Gói Năm (workspace only, without ADMISSION_PASS)
 */
export default function PremiumLockCard({ className = '' }) {
  const { isAuthenticated, hasEntitlement } = useAuth()
  const hasAdmissionPass = hasEntitlement(ENTITLEMENTS.ADMISSION_PASS)
  const hasPersonalWorkspace = hasEntitlement(ENTITLEMENTS.PERSONAL_WORKSPACE)
  const admissionPassPrice = formatPrice(PLAN_CATALOG[PLAN_IDS.ADMISSION_PASS].price)

  // If user already has the pass, render nothing
  if (hasAdmissionPass) return null

  const hasCorePlanOnly = isAuthenticated && hasPersonalWorkspace && !hasAdmissionPass
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-[#EFF6FF] via-white to-[#FFF1F2] shadow-lg ${className}`}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1D4ED8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/4 h-40 w-40 rounded-full bg-[#FB7185]/10 blur-3xl" />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              fillRule="evenodd"
            />
          </svg>
          ADMISSION PASS THEO MÙA TUYỂN SINH
        </div>

        {/* Heading */}
        <h2 className="mb-2 text-xl font-extrabold tracking-tight text-[#172033] sm:text-2xl">
          Mở khóa tính năng này với Admission Pass
        </h2>

        {/* Existing exploration subscription note */}
        {hasCorePlanOnly && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <span className="font-semibold">Gói khám phá của bạn chưa bao gồm công cụ tuyển sinh này.</span>
            <span className="ml-1 text-amber-700">Mở thêm Admission Pass cho năm tuyển sinh cần theo dõi.</span>
          </div>
        )}

        {/* Package + price */}
        <div className="mb-5 flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold text-[#667085]">Admission Pass</span>
          <span className="text-2xl font-extrabold text-[#172033]">{admissionPassPrice}</span>
          <span className="text-sm text-[#667085]">/ mùa tuyển sinh</span>
        </div>
        <p className="-mt-3 mb-5 text-xs font-semibold text-[#A93349]">Đã bao gồm trong Gói Năm</p>

        {/* What you get */}
        <ul className="mb-6 space-y-2">
          {[
            'Decision Board cá nhân hóa đầy đủ',
            'Admission Route Mapping theo hồ sơ thực tế',
            'Scenario Comparison đa tham số',
            'Đối chiếu học lực với tất cả phương thức tuyển sinh',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#172033]">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admission-pass"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            Xem quyền lợi Admission Pass
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#172033] shadow-sm transition-colors hover:bg-slate-50"
          >
            Xem đầy đủ quyền lợi
          </Link>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-[#1D4ED8] shadow-sm transition-colors hover:bg-blue-100"
            >
              Đăng nhập để tiếp tục
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
