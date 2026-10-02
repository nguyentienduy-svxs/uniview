import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const pageModules = import.meta.glob([
  '../pages/*Page.jsx',
  '!../pages/AllPagesPage.jsx',
  '!../pages/NotFoundPage.jsx',
])
const pageComponents = Object.fromEntries(
  Object.entries(pageModules).map(([path, loader]) => [path.match(/([^/]+)\.jsx$/)?.[1], lazy(loader)]),
)

const routeByDataPath = {
  'academic-benchmark': '/admission-checker',
  'admission-checker': '/admission-checker',
  'assessment-dashboard': '/assessment/result',
  'assessment-exit': '/',
  'assessment-intro': '/assessment',
  'assessment-introduction': '/assessment',
  'assessment-result': '/assessment/result',
  'assessment-so-thich': '/assessment',
  'assessment-step-1': '/assessment/riasec',
  'assessment-step3': '/assessment/quick-profile',
  'ban-do-dinh-huong': '/admission-roadmap',
  'bang-gia-va-goi-dich-vu': '/pricing',
  'bang-quyet-dinh': '/decision-board',
  'bao-mat-du-lieu': '/#bao-mat-du-lieu',
  'bat-dau-kham-pha': '/assessment',
  'chinh-sach-bao-mat': '/#chinh-sach-bao-mat',
  'chinh-sach-diem-chuan': '/admission-checker',
  'cong-cu-tuyen-sinh': '/admission-roadmap',
  'dang-nhap': '/login',
  'danh-cho-phu-huynh': '/#danh-cho-phu-huynh',
  'decision-board': '/decision-board',
  'dieu-khoan-su-dung': '/#dieu-khoan-su-dung',
  'dinh-huong-ca-nhan': '/reports/personal-direction',
  'du-toan-hoc-phi': '/scenario-comparison',
  'exit-confirmation': '/',
  'hoc-bong-tai-nang': '/universities',
  'interests-evaluation': '/assessment/interest-result',
  'kham-pha-nganh': '/majors',
  'kham-pha-truong': '/universities',
  'landing-page': '/',
  'lien-he': '/#lien-he',
  'lien-he-co-van': '/register',
  'lo-trinh-dgnl-ielts': '/admission-roadmap',
  'minh-bach-thuat-toan': '/#phuong-phap-du-lieu',
  'phuong-phap-du-lieu': '/#phuong-phap-du-lieu',
  'report-summary': '/reports/personal-direction',
  'so-sanh': '/compare',
  'so-sanh-hoc-phi': '/scenario-comparison',
  'step-1-interests': '/assessment/riasec',
  'step-2-question-4': '/assessment/preferences',
  'strengths-evaluation': '/assessment/preferences',
  'trac-nghiem': '/assessment/riasec',
  'trang-chu': '/',
  've-uniview': '/#ve-uniview',
  'xac-suat-nguyen-vong': '/admission-checker',
}

const routeByLabel = [
  [/trang chủ/i, '/'],
  [/đăng nhập/i, '/login'],
  [/đăng ký/i, '/register'],
  [/admission checker|kiểm tra lựa chọn/i, '/admission-checker'],
  [/route mapping|bản đồ con đường|lộ trình tuyển sinh/i, '/admission-roadmap'],
  [/scenario comparison|so sánh học phí/i, '/scenario-comparison'],
  [/decision board|bảng quyết định/i, '/decision-board'],
  [/shortlist/i, '/shortlist'],
  [/báo cáo định hướng|báo cáo chuyên sâu/i, '/reports/personal-direction'],
  [/bảng giá|gói dịch vụ|quyền lợi/i, '/pricing'],
  [/trắc nghiệm|khảo sát|khám phá bản thân/i, '/assessment'],
  [/so sánh/i, '/compare'],
  [/trường|university/i, '/universities'],
  [/ngành/i, '/majors'],
  [/bắt đầu khám phá|bắt đầu với uniview/i, '/assessment'],
]

function inferRouteFromLabel(target) {
  const label = target.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  return routeByLabel.find(([pattern]) => pattern.test(label))?.[1]
}

function LoadingPage() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center bg-[#f9f9ff] px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#dce1ff] border-t-[#1d4ed8]" />
        <p className="text-sm font-semibold text-[#434655]">Đang mở giao diện UniView…</p>
      </div>
    </div>
  )
}

function MissingPage({ title }) {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f9f9ff] px-6 text-center">
      <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
        <span className="material-symbols-outlined mb-3 text-4xl text-red-500">error</span>
        <h1 className="font-['Epilogue'] text-2xl font-bold text-[#172033]">Thiếu component React</h1>
        <p className="mt-2 text-[#667085]">Không tìm thấy component cho {title}.</p>
      </div>
    </main>
  )
}

function PageRenderer({ page }) {
  const navigate = useNavigate()
  const PageComponent = pageComponents[page.component]

  useEffect(() => {
    document.title = `${page.shortTitle} | UniView`
  }, [page.shortTitle])

  const handleClick = (event) => {
    const target = event.target.closest('a, button, [data-path]')
    if (!target) return

    const dataPath = target.dataset.path
    if (dataPath && routeByDataPath[dataPath]) {
      event.preventDefault()
      navigate(routeByDataPath[dataPath])
      return
    }

    const inferredRoute = inferRouteFromLabel(target)
    if (inferredRoute && (target.tagName !== 'A' || target.getAttribute('href') === '#')) {
      event.preventDefault()
      navigate(inferredRoute)
      return
    }

    if (target.tagName === 'A') {
      const href = target.getAttribute('href')
      if (!href || href === '#') {
        event.preventDefault()
        return
      }

      if (href.startsWith('#')) {
        event.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  if (!PageComponent) return <MissingPage title={page.title} />

  return (
    <div className="stitch-page" onClick={handleClick} onSubmit={(event) => event.preventDefault()}>
      <Suspense fallback={<LoadingPage />}>
        <PageComponent />
      </Suspense>
    </div>
  )
}

export default PageRenderer
