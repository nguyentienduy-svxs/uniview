import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PREMIUM_FEATURES } from '../data/premiumFeatures'
import { ArrowIcon, LockIcon } from '../components/header/HeaderIcons'

const featureStats = {
  'decision-board': [
    ['8', 'lựa chọn đang theo dõi'],
    ['3', 'trường ưu tiên'],
    ['2', 'câu hỏi cần làm rõ'],
  ],
  'admission-route-mapping': [
    ['5/5', 'phương thức xét đồng thời'],
    ['0.1s', 'cập nhật theo điểm mới'],
    ['100%', 'dữ liệu quy chế kiểm chuẩn'],
  ],
  'scenario-comparison': [
    ['+7', 'lựa chọn mới xuất hiện'],
    ['3', 'biến số có thể thử'],
    ['0.1s', 'phản hồi khi thay đổi'],
  ],
}

function PremiumFeaturePreviewPage() {
  const { feature } = useParams()
  const { isAuthenticated, hasEntitlement } = useAuth()
  const content = PREMIUM_FEATURES[feature]

  if (!content) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f9f9ff] px-6 text-center font-['Be_Vietnam_Pro']">
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">Không tìm thấy tính năng</h1>
          <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-[#1D4ED8]">Về trang chủ</Link>
        </div>
      </main>
    )
  }

  const hasAdmissionPass = hasEntitlement('ADMISSION_PASS')
  const stats = featureStats[feature] ?? featureStats['decision-board']

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f9f9ff] font-['Be_Vietnam_Pro'] text-[#121b2e]">
      <FeatureStatusBar content={content} isAuthenticated={isAuthenticated} />

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FFFDFB] py-10 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#dce1ff]/70 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[360px] w-[360px] rounded-full bg-[#FFF1F2]/80 blur-[110px]" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF1F2] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#A93349] shadow-sm">
              <LockIcon />
              Personalized Admission Pass · 89.000đ / mùa tuyển sinh
            </div>
            <div className="mt-6 space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#434655]">
                <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />
                {content.eyebrow}
              </span>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#121b2e] sm:text-5xl lg:text-[56px] lg:leading-[1.12]">
                {content.title}
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#434655] sm:text-lg">
              {content.description}
            </p>
            <div className="mt-5 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-xl bg-[#f1f3ff] px-3 py-3">
                  <strong className="block text-xl font-extrabold text-[#1D4ED8]">{value}</strong>
                  <span className="mt-1 block text-[11px] leading-4 text-[#434655]">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={isAuthenticated ? '/admission-pass' : '/register'}
                className="group inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0037B0] hover:shadow-xl"
              >
                {isAuthenticated ? 'Mở tính năng: Admission Pass' : 'Đăng ký miễn phí'}
                <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
              <a href="#feature-preview" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#121b2e] shadow-sm transition hover:bg-[#f1f3ff]">
                Xem dữ liệu minh họa
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#747686]">
              <span>Không tự động gia hạn</span>
              <span>Truy cập ngay sau thanh toán</span>
              <span>Dữ liệu theo hồ sơ cá nhân</span>
            </div>
          </div>

          <FeatureWidget feature={feature} />
        </div>
      </section>

      <section id="feature-preview" className="bg-[#f1f3ff]/70 py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] space-y-6 px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8]">Dữ liệu minh họa</span>
              <h2 className="mt-2 text-2xl font-bold text-[#121b2e] sm:text-3xl">Xem trước không gian làm việc</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#434655]">Một phần giao diện thực tế để bạn hình dung cách UniView hỗ trợ quá trình ra quyết định.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#747686] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#F9BD22]" /> Chế độ xem trước · Read-only
            </span>
          </div>
          <PreviewCanvas feature={feature} />
        </div>
      </section>

      <UnlockCard content={content} hasAdmissionPass={hasAdmissionPass} />
      <ValueSection content={content} />
    </main>
  )
}

function FeatureStatusBar({ content, isAuthenticated }) {
  return (
    <div className="border-b border-slate-200 bg-[#e9edff] px-4 py-3 text-xs sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#434655]">
          <span className="h-2 w-2 rounded-full bg-[#747686]" />
          <span>Tài khoản: <strong className="text-[#1D4ED8]">{isAuthenticated ? 'Đã đăng nhập' : 'Khách xem thử'}</strong></span>
          <span className="hidden text-[#747686] sm:inline">•</span>
          <span className="hidden sm:inline">{content.shortTitle}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF1F2] px-2.5 py-1 font-bold uppercase tracking-[0.08em] text-[#A93349]">
          <LockIcon /> Chế độ xem trước
        </span>
      </div>
    </div>
  )
}

function FeatureWidget({ feature }) {
  return (
    <div className="relative lg:col-span-5">
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-xl sm:p-7">
        <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#1D4ED8]/10 px-4 py-1.5 text-[11px] font-bold tracking-wide text-[#1D4ED8]">MÔ HÌNH MINH HỌA</div>
        <div className="pt-3">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e1e8ff] text-2xl">{feature === 'decision-board' ? '▦' : feature === 'scenario-comparison' ? '⇄' : '⌁'}</div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#747686]">Hồ sơ mẫu</span>
              <h2 className="mt-1 text-lg font-bold text-[#121b2e]">Nguyễn Minh Quân</h2>
              <p className="text-xs text-[#747686]">Kỹ thuật Phần mềm · UIT</p>
            </div>
          </div>
          <PreviewWidgetBody feature={feature} />
        </div>
      </div>
    </div>
  )
}

function PreviewWidgetBody({ feature }) {
  if (feature === 'decision-board') {
    return (
      <div className="mt-5 space-y-2">
        {['Đang cân nhắc nhiều · 3 trường', 'Cần thêm thông tin · 2 trường', 'Đã loại · 1 trường'].map((item, index) => (
          <div key={item} className="flex items-center justify-between rounded-xl bg-[#f1f3ff] px-3 py-2.5 text-xs">
            <span className="flex items-center gap-2 font-semibold text-[#121b2e]"><span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-[#1D4ED8]' : index === 1 ? 'bg-[#F9BD22]' : 'bg-[#A93349]'}`} />{item}</span>
            <span className="text-[#747686]">Read-only</span>
          </div>
        ))}
      </div>
    )
  }

  if (feature === 'scenario-comparison') {
    return (
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-[#EFF6FF] p-3"><span className="text-[10px] font-bold uppercase text-[#1D4ED8]">Kịch bản A</span><strong className="mt-2 block text-lg text-[#121b2e]">25.00đ</strong><span className="text-[11px] text-[#747686]">35 triệu / năm</span></div>
        <div className="rounded-2xl bg-[#FFF1F2] p-3"><span className="text-[10px] font-bold uppercase text-[#A93349]">Kịch bản B</span><strong className="mt-2 block text-lg text-[#A93349]">27.00đ</strong><span className="text-[11px] text-[#747686]">50 triệu / năm</span></div>
        <div className="col-span-2 rounded-xl bg-[#f1f3ff] px-3 py-2 text-xs font-semibold text-[#1D4ED8]">+7 lựa chọn mới xuất hiện khi thay đổi điều kiện</div>
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-2">
      {['THPT · 25.50 điểm · Vùng biên', 'ĐGNL · 875 điểm · An toàn', 'IELTS + Học bạ · Khóa với Pass'].map((item, index) => (
        <div key={item} className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs ${index === 2 ? 'bg-[#d9e2fc]/60 text-[#747686]' : 'bg-[#f1f3ff] text-[#121b2e]'}`}>
          <span>{item}</span><span className="font-semibold">{index === 2 ? 'Khóa' : 'Xem'}</span>
        </div>
      ))}
    </div>
  )
}

function PreviewCanvas({ feature }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d9e2fc] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#121b2e]">
          {feature === 'decision-board' ? 'Không gian tổ chức quyết định' : feature === 'scenario-comparison' ? 'Mô hình thay đổi biến số' : 'Bản đồ 5 phương thức tuyển sinh'}
        </span>
        <span className="text-xs text-[#747686]">Tự động đồng bộ hóa đang tạm khóa</span>
      </div>
      {feature === 'decision-board' ? <DecisionPreview /> : feature === 'scenario-comparison' ? <ScenarioPreview /> : <RoutePreview />}
    </div>
  )
}

function DecisionPreview() {
  const columns = [
    ['ĐANG KHÁM PHÁ', '2', 'bg-slate-50'],
    ['ĐANG CÂN NHẮC NHIỀU', '3', 'bg-[#EFF6FF]'],
    ['CẦN THÊM THÔNG TIN', '2', 'bg-[#FFFBEB]'],
    ['ĐÃ LOẠI', '1', 'bg-[#FFF1F2]'],
  ]
  return <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{columns.map(([title, count, tone]) => <div key={title} className={`${tone} min-h-[190px] rounded-2xl p-3.5`}><div className="flex items-center justify-between border-b border-slate-200/70 pb-2"><span className="text-[11px] font-bold text-[#434655]">{title}</span><span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#121b2e]">{count}</span></div><div className="mt-3 space-y-2"><div className="rounded-xl bg-white p-3 shadow-sm"><strong className="block text-xs text-[#121b2e]">ĐH Công nghệ Thông tin</strong><span className="mt-1 block text-[11px] text-[#1D4ED8]">Kỹ thuật phần mềm</span></div><div className="rounded-xl bg-white p-3 shadow-sm"><strong className="block text-xs text-[#121b2e]">ĐH Bách Khoa</strong><span className="mt-1 block text-[11px] text-[#747686]">Khoa học máy tính</span></div></div></div>)}</div>
}

function RoutePreview() {
  return <div className="grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-[#f1f3ff] p-4"><span className="text-[11px] font-bold uppercase tracking-wide text-[#747686]">Hồ sơ đối chiếu mẫu</span><div className="mt-4 grid grid-cols-2 gap-2">{[['THPT', '25.50'], ['ĐGNL', '875'], ['IELTS', '6.5'], ['Học bạ', '8.84']].map(([label, value]) => <div key={label} className="rounded-xl bg-white p-3"><span className="block text-[10px] uppercase text-[#747686]">{label}</span><strong className="mt-1 block text-lg text-[#1D4ED8]">{value}</strong></div>)}</div></div><div className="space-y-2">{['Điểm thi THPT · Biên độ rủi ro trung bình', 'ĐGNL ĐHQG · Cao hơn chuẩn tham khảo', 'IELTS + Học bạ · Khóa với Pass'].map((route, index) => <div key={route} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"><span className="text-xs font-semibold text-[#121b2e]">{route}</span><span className={`text-[11px] font-bold ${index === 1 ? 'text-[#1D4ED8]' : index === 2 ? 'text-[#747686]' : 'text-[#A93349]'}`}>{index === 2 ? 'Khóa' : index === 1 ? 'An toàn' : 'Cần chú ý'}</span></div>)}</div></div>
}

function ScenarioPreview() {
  return <div className="grid gap-3 lg:grid-cols-2"><div className="rounded-2xl bg-[#EFF6FF] p-4"><span className="text-[11px] font-bold uppercase text-[#1D4ED8]">Kịch bản A · Gốc tham chiếu</span><strong className="mt-3 block text-2xl text-[#121b2e]">25.00 / 35M</strong><div className="mt-4 h-3 rounded-full bg-[#d9e2fc]"><div className="h-3 w-[72%] rounded-full bg-[#1D4ED8]" /></div><span className="mt-2 block text-xs text-[#747686]">18 ngành phù hợp</span></div><div className="rounded-2xl bg-[#FFF1F2] p-4"><span className="text-[11px] font-bold uppercase text-[#A93349]">Kịch bản B · Mục tiêu</span><strong className="mt-3 block text-2xl text-[#A93349]">27.00 / 50M</strong><div className="mt-4 h-3 rounded-full bg-[#ffb2b9]"><div className="h-3 w-[90%] rounded-full bg-[#A93349]" /></div><span className="mt-2 block text-xs text-[#747686]">25 ngành phù hợp · +7 mới</span></div></div>
}

function UnlockCard({ content, hasAdmissionPass }) {
  return <section id="pricing-lock-card" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-12"><div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl sm:p-10 lg:p-14"><div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#1D4ED8] via-[#fe7488] to-[#f9bd22]" /><div className="relative grid gap-10 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-7"><div className="flex items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1D4ED8] text-white shadow-lg"><LockIcon /></div><div><span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A93349]">Mở khóa toàn bộ dữ liệu</span><h2 className="mt-1 text-2xl font-extrabold text-[#121b2e]">Mở khóa {content.shortTitle} với Admission Pass</h2></div></div><p className="mt-5 max-w-2xl leading-7 text-[#434655]">Tính năng này thuộc Personalized Admission Pass, dành cho học sinh và phụ huynh muốn phân tích hồ sơ thực tế, thử các lựa chọn và ra quyết định có cơ sở.</p><ul className="mt-6 space-y-3">{content.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm text-[#121b2e]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] font-bold text-[#1D4ED8]">✓</span><span>{benefit}</span></li>)}</ul></div><div className="rounded-2xl bg-[#f1f3ff] p-5 lg:col-span-5 lg:p-7"><span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#747686]">Gói quyền lợi cao cấp</span><h3 className="mt-2 text-xl font-bold text-[#121b2e]">Personalized Admission Pass</h3><div className="mt-5 border-y border-[#d9e2fc] py-5"><strong className="text-4xl font-extrabold text-[#1D4ED8]">89.000đ</strong><span className="ml-2 text-sm text-[#747686]">/ mùa tuyển sinh</span><p className="mt-2 text-xs font-semibold text-[#A93349]">Thanh toán một lần · Không tự động gia hạn</p></div><Link to={hasAdmissionPass ? content.to : '/admission-pass'} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0037B0]">{hasAdmissionPass ? `Mở ${content.shortTitle}` : 'Mở Admission Pass — 89.000đ'}<ArrowIcon /></Link><Link to="/pricing" className="mt-3 block text-center text-xs font-semibold text-[#1D4ED8] hover:underline">Xem đầy đủ quyền lợi và so sánh gói</Link></div></div></div></section>
}

function ValueSection({ content }) {
  return <section className="bg-[#e9edff] px-4 py-12 sm:px-6 sm:py-16 lg:px-12"><div className="mx-auto max-w-[1120px]"><div className="text-center"><span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8]">Giá trị chiến lược</span><h2 className="mt-2 text-2xl font-extrabold text-[#121b2e] sm:text-3xl">Công cụ hỗ trợ tư duy, không thay thế quyết định của bạn</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#434655]">UniView cung cấp bức tranh dữ liệu rõ ràng để bạn và gia đình tự tin lựa chọn.</p></div><div className="mt-8 grid gap-4 md:grid-cols-3">{['Nhìn rõ toàn cảnh', 'Biết mình còn thiếu gì', 'Chủ động chọn bước tiếp theo'].map((title, index) => <div key={title} className="rounded-3xl bg-white p-6 shadow-sm"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${index === 0 ? 'bg-[#EFF6FF] text-[#1D4ED8]' : index === 1 ? 'bg-[#FFF1F2] text-[#A93349]' : 'bg-[#FFFBEB] text-[#594100]'}`}>{index === 0 ? '◫' : index === 1 ? '!' : '↗'}</div><h3 className="mt-5 text-lg font-bold text-[#121b2e]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#434655]">{index === 0 ? `Tập trung vào ${content.shortTitle} và những dữ liệu có ảnh hưởng trực tiếp đến lựa chọn của bạn.` : index === 1 ? 'Các cảnh báo và điều kiện còn thiếu được trình bày rõ ràng, dễ trao đổi cùng gia đình.' : 'Không áp đặt câu trả lời; công cụ giúp bạn cân nhắc minh bạch trước khi chốt.'}</p></div>)}</div><div className="mt-8 rounded-2xl bg-white p-5 text-center shadow-sm"><strong className="text-sm text-[#121b2e]">Bạn có câu hỏi trước khi mở Pass?</strong><p className="mt-1 text-sm text-[#434655]">Admission Pass là thanh toán một lần cho toàn bộ công cụ chiến lược tuyển sinh.</p></div></div></section>
}

export default PremiumFeaturePreviewPage
