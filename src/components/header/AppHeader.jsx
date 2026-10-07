// src/components/header/AppHeader.jsx

import { useEffect, useState } from 'react'

import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'

import {
  admissionTools,
  ENTITLEMENTS,
  mainNavigation,
} from './headerConfig'

import {
  ArrowIcon,
  CloseIcon,
  HeartIcon,
  LockIcon,
  MenuIcon,
} from './HeaderIcons'

import {
  AdmissionToolsDropdown,
  UserDropdown,
} from './HeaderMenus'

import { useAuth } from '../../context/AuthContext'

// ======================================================
// NAV LINK STYLE
// ======================================================

const desktopNavClass = ({ isActive }) =>
  `
    relative
    whitespace-nowrap
    py-2
    transition-colors

    after:absolute
    after:bottom-0
    after:left-0
    after:h-[2.5px]
    after:rounded-full
    after:bg-[#1D4ED8]
    after:transition-all

    ${
      isActive
        ? 'font-semibold text-[#1D4ED8] after:w-full'
        : 'text-[#172033] after:w-0 hover:text-[#1D4ED8] hover:after:w-full'
    }
  `

const mobileNavClass = ({ isActive }) =>
  `
    rounded-xl
    px-4 py-3
    text-sm
    font-semibold
    transition-colors

    ${
      isActive
        ? 'bg-blue-50 text-[#1D4ED8]'
        : 'text-[#172033] hover:bg-slate-50'
    }
  `

// ======================================================
// APP HEADER
// ======================================================

export default function AppHeader() {
  const location = useLocation()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [toolsOpen, setToolsOpen] =
    useState(false)

  const [userOpen, setUserOpen] =
    useState(false)

  // ====================================================
  // AUTH
  // ====================================================

  const {
    user,
    admissionSeason,
    isAuthenticated,
    hasEntitlement,
    logout,
    resetDemoAccount,
  } = useAuth()

  const isLoggedIn =
    isAuthenticated

  const hasAdmissionPass =
    hasEntitlement(
      ENTITLEMENTS.ADMISSION_PASS,
    )

  const hasDirectionSnapshot =
    hasEntitlement(
      ENTITLEMENTS.DIRECTION_SNAPSHOT,
    ) || hasAdmissionPass

  // ====================================================
  // CHECK ACTIVE ADMISSION TOOL
  // ====================================================

  const admissionToolActive =
    admissionTools.some((tool) =>
      location.pathname.startsWith(tool.to),
    )

  // ====================================================
  // CLOSE DROPDOWNS WHEN ROUTE CHANGES
  // ====================================================

  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
    setUserOpen(false)
  }, [
    location.pathname,
    location.search,
    location.hash,
  ])

  // ====================================================
  // CLOSE DROPDOWNS WITH ESC
  // ====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return

      setMobileOpen(false)
      setToolsOpen(false)
      setUserOpen(false)
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [])

  return (
    <header
      className="
        sticky
        left-0
        right-0
        top-0
        z-50
        w-full

        border-b
        border-slate-200/70

        bg-[#FFFDFB]/[0.88]

        font-['Be_Vietnam_Pro']

        backdrop-blur-[12px]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[74px]
          max-w-[1280px]
          items-center
          justify-between
          gap-4
          px-4

          md:px-6
          lg:px-8
        "
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          aria-label="UniView — Trang chủ"
          className="
            flex
            shrink-0
            items-center
            gap-3
            py-1
          "
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <img
            src="/stitch-assets/uniview-logo.png"
            alt="UniView"
            className="
              h-12
              max-h-[50px]
              w-auto
              max-w-[145px]
              object-contain
              object-left
            "
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          aria-label="Điều hướng chính"
          className="
            hidden
            items-center
            gap-5
            text-[15px]
            font-medium

            lg:flex
            xl:gap-7
          "
        >
          {/* TRANG CHỦ + NGÀNH + TRƯỜNG */}

          {mainNavigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={desktopNavClass}
            >
              {item.label}
            </NavLink>
          ))}

          {/* CÔNG CỤ TUYỂN SINH */}

          <AdmissionToolsDropdown
            open={toolsOpen}
            active={admissionToolActive}
            hasAdmissionPass={
              hasAdmissionPass
            }
            onToggle={() => {
              setToolsOpen(
                (current) => !current,
              )

              setUserOpen(false)
            }}
            onClose={() =>
              setToolsOpen(false)
            }
          />

            <NavLink
              to="/assessment"
              className={desktopNavClass}
            >
              Làm khảo sát
            </NavLink>
        
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* =================================================
              GUEST
          ================================================= */}

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className="
                  hidden
                  items-center
                  justify-center

                  rounded-xl
                  border
                  border-slate-200

                  bg-white/70

                  px-4
                  py-2

                  text-[14px]
                  font-medium
                  text-[#172033]

                  transition-colors

                  hover:bg-blue-50/60

                  sm:flex
                "
              >
                Đăng nhập
              </NavLink>

              <NavLink
                to="/assessment"
                className="
                  group

                  hidden
                  items-center
                  justify-center
                  gap-1.5

                  rounded-[11px]

                  bg-[#1D4ED8]

                  px-5
                  py-[9px]

                  text-[14px]
                  font-semibold
                  text-white

                  shadow-sm

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-[#1e40af]
                  hover:shadow-md

                  md:inline-flex
                "
              >
                <span>
                  Bắt đầu khám phá
                </span>

                <span
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                >
                  <ArrowIcon />
                </span>
              </NavLink>
            </>
          )}

          {/* =================================================
              LOGGED IN
          ================================================= */}

          {isLoggedIn && (
            <>
              {/* ADMISSION PASS BADGE */}

              {hasAdmissionPass && (
                <span
                  className="
                    hidden
                    rounded-full

                    border
                    border-blue-100

                    bg-[#EFF6FF]

                    px-3
                    py-1.5

                    text-[11px]
                    font-semibold
                    text-[#1D4ED8]

                    xl:block
                  "
                >
                  Admission Pass
                </span>
              )}

              {/* WISHLIST */}

              <NavLink
                to="/wishlist"
                title="Wishlist"
                className={({ isActive }) =>
                  `
                    hidden
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl
                    border

                    transition

                    md:inline-flex

                    ${
                      isActive
                        ? 'border-blue-200 bg-[#EFF6FF] text-[#1D4ED8]'
                        : 'border-slate-200 bg-white text-[#172033] hover:bg-[#EFF6FF] hover:text-[#1D4ED8]'
                    }
                  `
                }
              >
                <HeartIcon />
              </NavLink>

              {/* USER DROPDOWN */}

              <UserDropdown
                user={user}
                admissionSeason={
                  admissionSeason
                }
                open={userOpen}
                hasDirectionSnapshot={
                  hasDirectionSnapshot
                }
                hasAdmissionPass={
                  hasAdmissionPass
                }
                onToggle={() => {
                  setUserOpen(
                    (current) => !current,
                  )

                  setToolsOpen(false)
                }}
                onClose={() =>
                  setUserOpen(false)
                }
                onLogout={logout}
                onResetDemo={resetDemoAccount}
              />
            </>
          )}

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? 'Đóng menu'
                : 'Mở menu'
            }
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(
                (current) => !current,
              )

              setToolsOpen(false)
              setUserOpen(false)
            }}
            className="
              inline-flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              border
              border-slate-200

              bg-white

              text-[#172033]

              lg:hidden
            "
          >
            {mobileOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      {mobileOpen && (
        <MobileNavigation
          isLoggedIn={isLoggedIn}
          hasAdmissionPass={
            hasAdmissionPass
          }
        />
      )}
    </header>
  )
}

// ======================================================
// MOBILE NAVIGATION
// ======================================================

function MobileNavigation({
  isLoggedIn,
  hasAdmissionPass,
}) {
  return (
    <nav
      aria-label="Điều hướng di động"
      className="
        border-t
        border-slate-200/70

        bg-[#FFFDFB]

        px-4
        py-4

        shadow-lg

        lg:hidden
      "
    >
      <div className="mx-auto grid max-w-[1280px] gap-1">

        {/* MAIN NAVIGATION */}

        {mainNavigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={mobileNavClass}
          >
            {item.label}
          </NavLink>
        ))}

        {/* ADMISSION TOOLS */}

        <div
          className="
            mt-1
            rounded-2xl

            border
            border-slate-200

            bg-white

            p-2
          "
        >
          <p
            className="
              px-3
              pb-2
              pt-1

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.08em]

              text-slate-400
            "
          >
            Công cụ tuyển sinh
          </p>

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
                className="
                  flex
                  items-center
                  justify-between

                  rounded-xl

                  px-3
                  py-2.5

                  text-sm
                  font-medium
                  text-[#172033]

                  transition

                  hover:bg-[#EFF6FF]
                "
              >
                <span>
                  {tool.label}
                </span>

                {locked && (
                  <span
                    className="
                      rounded-full
                      bg-[#FFF1F2]

                      px-2
                      py-0.5

                      text-[10px]
                      font-semibold
                      text-[#FB7185]
                    "
                  >
                    89k
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>

        {/* COMPARE */}

        <NavLink
          to="/compare"
          className={mobileNavClass}
        >
          So sánh
        </NavLink>

        {/* GUEST */}

        {!isLoggedIn && (
          <div
            className="
              mt-2

              grid
              grid-cols-2
              gap-2

              border-t
              border-slate-200

              pt-3
            "
          >
            <NavLink
              to="/login"
              className="
                rounded-xl

                border
                border-slate-200

                px-4
                py-3

                text-center
                text-sm
                font-semibold
                text-[#172033]
              "
            >
              Đăng nhập
            </NavLink>

            <NavLink
              to="/assessment"
              className="
                rounded-xl

                bg-[#1D4ED8]

                px-4
                py-3

                text-center
                text-sm
                font-semibold
                text-white
              "
            >
              Khám phá
            </NavLink>
          </div>
        )}

        {/* LOGGED IN */}

        {isLoggedIn && (
          <>
            <NavLink
              to={
                hasAdmissionPass
                  ? '/decision-board'
                  : '/feature-preview/decision-board'
              }
              className={mobileNavClass}
            >
              Bảng quyết định
              {!hasAdmissionPass && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#FFF1F2] px-2 py-1 text-[10px] font-semibold text-[#FB7185]">
                  <LockIcon />
                  89k
                </span>
              )}
            </NavLink>

            <NavLink
              to="/wishlist"
              className={mobileNavClass}
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/profile"
              className={mobileNavClass}
            >
              Hồ sơ của tôi
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
