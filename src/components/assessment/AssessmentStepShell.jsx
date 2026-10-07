import { Link } from 'react-router-dom'

const steps = [
  {
    number: 1,
    label: 'Sở thích nghề nghiệp',
    to: '/assessment/riasec',
  },
  {
    number: 2,
    label: 'Phong cách tư duy',
    to: '/assessment/preferences',
  },
  {
    number: 3,
    label: 'Hoạt động thực tế',
    to: '/assessment/experience',
  },
  {
    number: 4,
    label: 'Hồ sơ & điều kiện',
    to: '/assessment/quick-profile',
  },
]

export default function AssessmentStepShell({
  step,
  eyebrow,
  children,
}) {
  return (
    <main className="min-h-[calc(100vh-74px)] bg-surface">
      <div className="border-b border-surface-container-high bg-surface-container-lowest/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-space-md px-margin py-space-md md:px-margin-md lg:px-gutter-lg">
          <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="rounded-full bg-primary px-3.5 py-1.5 font-label-sm text-label-sm font-semibold uppercase tracking-wide text-on-primary">
                Bước {step} / 4
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {eyebrow}
              </span>
            </div>

            <Link
              to="/assessment"
              className="inline-flex items-center gap-1 self-start font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary md:self-auto"
            >
              <span className="material-symbols-outlined text-base">
                exit_to_app
              </span>
              Lưu và thoát
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-space-xs lg:grid-cols-4">
            {steps.map((item) => {
              const completed = item.number < step
              const active = item.number === step

              return (
                <Link
                  key={item.number}
                  to={item.to}
                  className={`flex items-center gap-space-xs rounded-xl px-space-sm py-space-xs transition-colors ${
                    active
                      ? 'bg-primary-container text-on-primary'
                      : completed
                        ? 'bg-primary-fixed/50 text-primary'
                        : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? 'bg-white text-primary'
                        : completed
                          ? 'bg-primary text-white'
                          : 'bg-surface-container-high text-outline'
                    }`}
                  >
                    {completed ? (
                      <span className="material-symbols-outlined text-sm">
                        check
                      </span>
                    ) : (
                      item.number
                    )}
                  </span>
                  <span className="truncate text-xs font-semibold sm:text-sm">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {children}
    </main>
  )
}
