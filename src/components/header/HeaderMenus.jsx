import { NavLink } from 'react-router-dom'

import {
  ChevronDownIcon,
  LockIcon,
} from './HeaderIcons'

import { admissionTools } from './headerConfig'

export function AdmissionToolsDropdown({
  open,
  active,
  hasAdmissionPass,
  onToggle,
  onClose,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`
          flex
          items-center
          gap-1.5
          whitespace-nowrap
          py-2
          transition-colors
          ${
            active
              ? 'font-semibold text-[#1D4ED8]'
              : 'text-[#172033] hover:text-[#1D4ED8]'
          }
        `}
      >
        Công cụ tuyển sinh
        <ChevronDownIcon />
      </button>

      {open && (
        <div
          className="
            absolute
            left-1/2
            top-[48px]
            z-50
            w-[320px]
            -translate-x-1/2
            rounded-[20px]
            border
            border-slate-200
            bg-white
            p-2.5
            shadow-[0_16px_45px_rgba(15,23,42,0.14)]
          "
        >
          {admissionTools.map((tool) => {
            const locked =
              tool.requiredEntitlement &&
              !hasAdmissionPass

            return (
              <NavLink
                key={tool.to}
                to={
                  locked
                    ? `/feature-preview/${tool.to.slice(1)}`
                    : tool.to
                }
                onClick={onClose}
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  rounded-2xl
                  px-3
                  py-3
                  transition-colors
                  hover:bg-[#EFF6FF]
                "
              >
                <span>
                  <span className="block text-sm font-semibold text-[#172033]">
                    {tool.label}
                  </span>

                  <span className="mt-1 block text-[11px] text-slate-500">
                    {tool.description}
                  </span>
                </span>

                {locked && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF1F2] px-2 py-1 text-[10px] font-semibold text-[#FB7185]">
                    <LockIcon />
                    89k
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function UserDropdown({
  user,
  admissionSeason,
  open,
  hasDirectionSnapshot,
  hasAdmissionPass,
  onToggle,
  onClose,
  onLogout,
}) {
  let planLabel = 'Free'

  if (hasDirectionSnapshot) {
    planLabel = 'Direction Snapshot'
  }

  if (hasAdmissionPass) {
    planLabel = admissionSeason
      ? `Admission Pass ${admissionSeason}`
      : 'Admission Pass'
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="
          flex items-center gap-2
          rounded-xl
          border border-slate-200
          bg-white/80
          p-1.5 pr-2
          transition
          hover:bg-white
        "
      >
        <div
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            bg-[#EFF6FF]
            text-[13px]
            font-bold
            text-[#1D4ED8]
          "
        >
          {user?.initials ?? 'U'}
        </div>

        <div className="hidden text-left xl:block">
          <p className="max-w-[120px] truncate text-[13px] font-semibold text-[#172033]">
            {user?.fullName ?? 'User'}
          </p>

          <p className="text-[10px] text-slate-500">
            {planLabel}
          </p>
        </div>

        <span className="hidden text-slate-400 xl:block">
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-[52px]
            w-[295px]
            rounded-[20px]
            border border-slate-200
            bg-white
            p-2.5
            shadow-[0_16px_45px_rgba(15,23,42,0.14)]
          "
        >
          <div className="rounded-2xl bg-[#F8FAFC] px-4 py-3">
            <p className="text-sm font-semibold text-[#172033]">
              {user?.fullName}
            </p>

            <p className="mt-1 text-xs font-medium text-[#1D4ED8]">
              {(hasDirectionSnapshot ||
                hasAdmissionPass) &&
                '✓ '}

              {planLabel}
            </p>
          </div>

          <MenuDivider />

          <UserMenuLink
            to="/profile"
            onClick={onClose}
          >
            Hồ sơ của tôi
          </UserMenuLink>

          {hasDirectionSnapshot && (
            <UserMenuLink
              to="/direction-snapshot"
              onClick={onClose}
            >
              Direction Snapshot
            </UserMenuLink>
          )}

          <UserMenuLink
            to="/wishlist"
            onClick={onClose}
          >
            Wishlist
          </UserMenuLink>

          <UserMenuLink
            to={
              hasAdmissionPass
                ? '/decision-board'
                : '/feature-preview/decision-board'
            }
            onClick={onClose}
          >
            Bảng quyết định
            {!hasAdmissionPass && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#FFF1F2] px-2 py-1 text-[10px] font-semibold text-[#FB7185]">
                <LockIcon />
                89k
              </span>
            )}
          </UserMenuLink>

          <MenuDivider />

          {!hasDirectionSnapshot &&
            !hasAdmissionPass && (
              <NavLink
                to="/pricing"
                onClick={onClose}
                className="block rounded-2xl bg-[#EFF6FF] px-3 py-3"
              >
                <p className="text-sm font-semibold text-[#1D4ED8]">
                  Khám phá các gói UniView
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Direction Snapshot 39k hoặc Admission Pass 89k
                </p>
              </NavLink>
            )}

          {hasDirectionSnapshot &&
            !hasAdmissionPass && (
              <NavLink
                to="/admission-pass"
                onClick={onClose}
                className="block rounded-2xl bg-[#EFF6FF] px-3 py-3"
              >
                <p className="text-sm font-semibold text-[#1D4ED8]">
                  Personalized Admission Pass
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Mở cá nhân hóa nâng cao · 89.000đ
                </p>
              </NavLink>
            )}

          {hasAdmissionPass && (
            <UserMenuLink
              to="/my-plan"
              onClick={onClose}
            >
              Quản lý gói
            </UserMenuLink>
          )}

          <UserMenuLink
            to="/settings"
            onClick={onClose}
          >
            Cài đặt
          </UserMenuLink>

          <button
            type="button"
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="
              mt-1 w-full
              rounded-xl
              px-3 py-2.5
              text-left
              text-sm font-medium
              text-[#FB7185]
              hover:bg-[#FFF1F2]
            "
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  )
}

function MenuDivider() {
  return <div className="my-2 h-px bg-slate-100" />
}

function UserMenuLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#172033] hover:bg-slate-50"
    >
      {children}
    </NavLink>
  )
}