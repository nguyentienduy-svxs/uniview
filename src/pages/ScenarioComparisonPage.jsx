import { useAuth } from '../context/AuthContext'
import { ENTITLEMENTS } from '../components/header/headerConfig'
import DemoDataBadge from '../components/premium/DemoDataBadge'
import PremiumLockCard from '../components/premium/PremiumLockCard'

function ScenarioComparisonPage() {
  const { hasEntitlement } = useAuth()
  const hasAdmissionPass = hasEntitlement(ENTITLEMENTS.ADMISSION_PASS)

  return <ScenarioComparisonPreview locked={!hasAdmissionPass} />
}

function ScenarioComparisonPreview({ locked = true }) {
  return (
<>
<main className="w-full pt-6 bg-[#FFFDFB] min-h-[calc(100vh-80px)] pb-16"><div className="flex flex-col w-full font-['Be_Vietnam_Pro'] text-[#172033]">
<div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-12">

<section className="relative bg-gradient-to-b from-[#EFF6FF]/60 via-[#FFFDFB] to-transparent rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
<div className="absolute -right-20 -top-20 w-96 h-96 bg-[#EFF6FF] rounded-full blur-3xl pointer-events-none opacity-70"></div>
<div className="absolute right-1/4 -bottom-24 w-80 h-80 bg-[#FFF1F2] rounded-full blur-3xl pointer-events-none opacity-50"></div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
<div className="lg:col-span-7 space-y-5">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-semibold tracking-wide uppercase">
<span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse"></span>
            ADMISSION PASS • SCENARIO PLANNING
          </div>
{locked && <DemoDataBadge className="mt-1" />}
<h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172033] tracking-tight leading-tight">
            Nếu điều kiện thay đổi thì <br className="hidden sm:inline" />
<span className="text-[#1D4ED8]">lựa chọn sẽ thay đổi ra sao?</span>
</h1>
<p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl">
            Thử thay đổi điểm, ngân sách hoặc khu vực để nhìn rõ những lựa chọn nào có thể xuất hiện, biến mất hoặc thay đổi trạng thái theo các tiêu chí bạn đặt.
          </p>
<div className="flex flex-wrap items-center gap-4 pt-1">
<div className="flex items-center gap-2 text-xs font-medium text-[#172033] bg-white px-3 py-1.5 rounded-lg shadow-sm">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Độc lập thang điểm THPT &amp; ĐGNL
            </div>
<div className="flex items-center gap-2 text-xs font-medium text-[#172033] bg-white px-3 py-1.5 rounded-lg shadow-sm">
<svg className="w-4 h-4 text-[#FB7185]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Đối chiếu đa tiêu chí khách quan
            </div>
</div>
</div>

<div className="lg:col-span-5 flex justify-center">
<div className="w-full max-w-md bg-white p-5 rounded-2xl shadow-md space-y-4">
<div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#667085]">
<span>Mô hình đối chiếu giả định</span>
<span className="text-[#1D4ED8]">Interactive Flow</span>
</div>
<svg className="w-full h-auto" fill="none" viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg">
<rect fill="#F8FAFC" height="110" rx="14" stroke="#E2E8F0" strokeWidth="1.5" width="130" x="10" y="30"></rect>
<circle cx="32" cy="52" fill="#667085" r="6"></circle>
<text fill="#172033" fontSize="12" fontWeight="700" x="46" y="56">Scenario A</text>
<text fill="#667085" fontSize="10" x="24" y="82">Điểm: 25.0 / 800</text>
<text fill="#667085" fontSize="10" x="24" y="100">Học phí: ≤ 35M</text>
<text fill="#667085" fontSize="10" x="24" y="118">TP.HCM • Công lập</text>
<path d="M145 85 C 175 85, 175 85, 205 85" stroke="#1D4ED8" strokeDasharray="4 4" strokeWidth="2"></path>
<polygon fill="#1D4ED8" points="212,85 204,80 204,90"></polygon>
<rect fill="#EFF6FF" height="130" rx="14" stroke="#1D4ED8" strokeWidth="1.5" width="180" x="220" y="20"></rect>
<circle cx="242" cy="44" fill="#1D4ED8" r="6"></circle>
<text fill="#1D4ED8" fontSize="12" fontWeight="700" x="256" y="48">Scenario B (Giả định)</text>
<text fill="#172033" fontSize="10" fontWeight="600" x="236" y="74">Điểm: 27.0 (+2.0) | 900 (+100)</text>
<text fill="#172033" fontSize="10" fontWeight="600" x="236" y="94">Học phí: ≤ 50M (+15M)</text>
<text fill="#172033" fontSize="10" fontWeight="600" x="236" y="114">+ Bình Dương lân cận</text>
<text fill="#FB7185" fontSize="10" fontWeight="700" x="236" y="132">⚡ Xuất hiện +7 phương án mới</text>
</svg>
<p className="text-[11px] text-center text-[#667085]">
              Mỗi thông số điều chỉnh sẽ mở rộng hoặc thu hẹp tập hợp chương trình đào tạo khả thi.
            </p>
</div>
</div>
</div>

<div className="mt-8 rounded-xl p-4 bg-[#EFF6FF] flex items-start sm:items-center gap-3.5 text-[#172033]">
<div className="p-2 rounded-lg bg-white shrink-0 text-[#1D4ED8] shadow-sm">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<p className="text-xs sm:text-sm leading-relaxed text-[#1e40af]">
<strong className="font-semibold">Nguyên tắc hệ thống:</strong> Scenario là công cụ giả định để hỗ trợ so sánh đối chiếu đa chiều dựa trên dữ liệu công khai. Kết quả không phải dự đoán tương lai, không đại diện cho dự báo điểm chuẩn và không có tính chất cam kết tuyển sinh.
        </p>
</div>
</section>

<section className="space-y-6">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
<span>Bộ điều khiển tham số</span>
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
<span>Scenario Workspace</span>
</div>
<h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight mt-1">
            Không gian thiết lập giả định
          </h2>
<p className="text-sm text-[#667085] mt-1">
            Đặt hai kịch bản cạnh nhau để quan sát trực quan sự dịch chuyển của các lựa chọn.
          </p>
</div>
<div className="flex items-center gap-3 text-xs text-[#667085]">
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg shadow-sm">
<span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Hồ sơ tham chiếu gốc (A)
          </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] font-semibold rounded-lg shadow-sm">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span> Giả định mục tiêu thử nghiệm (B)
          </span>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

<div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-6 relative overflow-hidden">
<div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-2.5">
<span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider bg-slate-100 text-[#667085] uppercase">
                Hồ sơ gốc
              </span>
<h3 className="text-lg font-bold text-[#172033]">Scenario A — Hiện tại</h3>
</div>
<a className="text-xs font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1" href="#">
<span>Đồng bộ từ Profile</span>
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</a>
</div>
<p className="text-xs text-[#667085] -mt-3">
            Dữ liệu trích xuất từ Academic Profile đã lưu trữ của bạn (dành cho tổ hợp Khối A &amp; A1).
          </p>
<div className="space-y-4 pt-1">

<div className="p-3.5 rounded-xl bg-[#F8FAFC]">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span>Điểm thi THPT dự kiến (Thang 30)</span>
<span className="font-semibold text-slate-700">Tổ hợp A00, A01</span>
</div>
<div className="mt-1.5 flex items-baseline justify-between">
<span className="text-xl font-extrabold text-[#172033]">25.00 <span className="text-xs font-normal text-[#667085]">/ 30.00</span></span>
<span className="text-xs text-[#667085] bg-white px-2.5 py-1 rounded-md">Toán: 8.4 • Lý: 8.2 • Hóa: 8.4</span>
</div>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC]">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span>Điểm ĐGNL ĐHQG TP.HCM (Thang 1200)</span>
<span className="font-semibold text-slate-700">Đợt 1 / 2024</span>
</div>
<div className="mt-1.5 flex items-baseline justify-between">
<span className="text-xl font-extrabold text-[#172033]">800 <span className="text-xs font-normal text-[#667085]">/ 1200</span></span>
<span className="text-xs text-[#667085] bg-white px-2.5 py-1 rounded-md">Phân vị ~82%</span>
</div>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC]">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span>Học phí dự kiến tối đa</span>
<span className="font-semibold text-slate-700">Ngân sách gia đình</span>
</div>
<div className="mt-1.5 flex items-baseline justify-between">
<span className="text-xl font-extrabold text-[#172033]">35 triệu <span className="text-xs font-normal text-[#667085]">/ năm học</span></span>
<span className="text-xs text-[#667085] bg-white px-2.5 py-1 rounded-md">Tương đương ~17.5M / học kỳ</span>
</div>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC]">
<div className="text-xs text-[#667085] mb-2">Khu vực địa lý ưu tiên</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-lg bg-white text-xs font-semibold text-[#172033] shadow-sm flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  TP. Hồ Chí Minh
                </span>
<span className="px-3 py-1 rounded-lg bg-slate-100 text-xs text-slate-400">Không mở rộng ngoại tỉnh</span>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div className="p-3 rounded-xl bg-[#F8FAFC]">
<div className="text-[11px] text-[#667085]">Loại hình đào tạo</div>
<div className="text-xs font-bold text-[#172033] mt-1">Ưu tiên Công lập</div>
</div>
<div className="p-3 rounded-xl bg-[#F8FAFC]">
<div className="text-[11px] text-[#667085]">Nhóm ngành quan tâm</div>
<div className="text-xs font-bold text-[#172033] mt-1 truncate" title="CNTT &amp; Kỹ thuật Phần mềm">CNTT &amp; Phần mềm</div>
</div>
</div>
</div>
<div className="p-3.5 rounded-xl bg-[#EFF6FF]/60 flex items-center justify-between text-xs">
<span className="text-[#1D4ED8] font-medium">Hiện có <strong>12 chương trình</strong> đối chiếu phù hợp.</span>
<span className="text-[11px] text-[#667085]">Bộ lọc khắt khe</span>
</div>
</div>

<div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md space-y-6 relative overflow-hidden bg-gradient-to-b from-white to-[#EFF6FF]/20">
<div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-2.5">
<span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider bg-[#1D4ED8] text-white uppercase shadow-sm">
                Giả định mục tiêu
              </span>
<h3 className="text-lg font-bold text-[#172033]">Scenario B — Giả định</h3>
</div>
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] text-xs font-bold">
<span>Đã thay đổi 4 tiêu chí</span>
</div>
</div>
<p className="text-xs text-[#667085] -mt-3">
            Tự do điều chỉnh các chỉ số điểm thi, tài chính hoặc địa bàn để kiểm tra các phương án mới.
          </p>
<form className="space-y-4 pt-1">

<div className="p-3.5 rounded-xl bg-white shadow-sm space-y-2">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#172033]">Điểm thi THPT Quốc gia (Thang 30)</span>
<span className="text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-md">Tăng +2.00 điểm</span>
</div>
<div className="flex items-center gap-4">
<input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1D4ED8]" max="30" min="20" step="0.25" type="range" defaultValue="27" />
<div className="flex items-center gap-1 shrink-0">
<input className="w-16 px-2 py-1 text-sm font-extrabold text-[#172033] bg-[#F8FAFC] rounded-lg text-center focus:outline-none focus:bg-white shadow-sm" step="0.1" type="number" defaultValue="27.0" />
<span className="text-xs text-[#667085]">/ 30</span>
</div>
</div>
</div>

<div className="p-3.5 rounded-xl bg-white shadow-sm space-y-2">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#172033]">Điểm ĐGNL ĐHQG TP.HCM (Thang 1200)</span>
<span className="text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-md">Tăng +100 điểm</span>
</div>
<div className="flex items-center gap-4">
<input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1D4ED8]" max="1100" min="600" step="10" type="range" defaultValue="900" />
<div className="flex items-center gap-1 shrink-0">
<input className="w-20 px-2 py-1 text-sm font-extrabold text-[#172033] bg-[#F8FAFC] rounded-lg text-center focus:outline-none focus:bg-white shadow-sm" step="10" type="number" defaultValue="900" />
<span className="text-xs text-[#667085]">/ 1200</span>
</div>
</div>
</div>

<div className="p-3.5 rounded-xl bg-white shadow-sm space-y-2">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#172033]">Ngân sách học phí trần tối đa</span>
<span className="text-xs font-bold text-[#FB7185] bg-[#FFF1F2] px-2 py-0.5 rounded-md">Mở rộng +15 triệu</span>
</div>
<div className="grid grid-cols-3 gap-2">
<button className="py-1.5 px-3 rounded-lg text-xs font-medium bg-slate-100 text-[#667085] hover:bg-slate-200" type="button">≤ 35M / năm</button>
<button className="py-1.5 px-3 rounded-lg text-xs font-bold bg-[#1D4ED8] text-white shadow-sm" type="button">≤ 50M / năm</button>
<button className="py-1.5 px-3 rounded-lg text-xs font-medium bg-slate-100 text-[#667085] hover:bg-slate-200" type="button">≤ 75M / năm</button>
</div>
</div>

<div className="p-3.5 rounded-xl bg-white shadow-sm space-y-2">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#172033]">Khu vực có thể theo học</span>
<span className="text-xs text-[#1D4ED8] font-medium">+1 tỉnh lân cận</span>
</div>
<div className="flex flex-wrap gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1D4ED8] text-white flex items-center gap-1.5 shadow-sm" type="button">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  TP. Hồ Chí Minh
                </button>
<button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1D4ED8] text-white flex items-center gap-1.5 shadow-sm" type="button">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Bình Dương
                </button>
<button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-[#667085] hover:bg-slate-200" type="button">
                  + Đồng Nai
                </button>
<button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-[#667085] hover:bg-slate-200" type="button">
                  + Cần Thơ
                </button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div className="p-3 rounded-xl bg-white shadow-sm space-y-1.5">
<div className="text-[11px] font-semibold text-[#172033]">Mô hình cơ sở đào tạo</div>
<div className="flex gap-1.5">
<span className="px-2.5 py-1 rounded bg-[#1D4ED8] text-white text-[11px] font-bold">Công lập</span>
<span className="px-2.5 py-1 rounded bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-bold">Tư thục chọn lọc</span>
</div>
</div>
<div className="p-3 rounded-xl bg-white shadow-sm space-y-1.5">
<div className="text-[11px] font-semibold text-[#172033]">Nhóm ngành quan tâm</div>
<div className="text-xs font-bold text-[#172033] py-1 text-slate-700">CNTT &amp; Phần mềm (Cố định)</div>
</div>
</div>
</form>
<div className="flex items-center justify-between pt-2">
<button className="text-xs font-semibold text-[#667085] hover:text-[#172033] flex items-center gap-1 transition-colors" type="button">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Đặt lại về Scenario A
            </button>
<span className="text-xs text-[#1D4ED8] font-semibold">Tự động đồng bộ hóa kết quả so sánh</span>
</div>
</div>
</div>
</section>

<div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#172033] rounded-2xl text-white shadow-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FBBF24]">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<div>
<h4 className="font-bold text-sm sm:text-base">Đối chiếu sự thay đổi danh mục</h4>
<p className="text-xs text-slate-400">Kết quả cập nhật theo 4 biến số đã thay đổi ở Scenario B</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
<button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2">
<svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Lưu Scenario (Target 2027)
        </button>
<button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2">
<svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Xuất tóm tắt đối chiếu (PDF)
        </button>
<button className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-xs font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
<span>So sánh Scenario ngay</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
</div>

<section className="space-y-6">
<div className="bg-gradient-to-r from-[#EFF6FF] via-white to-[#FFF1F2] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<span className="text-xs font-extrabold uppercase tracking-wider text-[#FB7185]">Tổng kết phân tích dịch chuyển</span>
<h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033] mt-1">
              Điều gì thay đổi khi chuyển từ Scenario A → B?
            </h3>
</div>
<div className="px-4 py-2 rounded-xl bg-white text-xs font-semibold text-[#172033] shadow-sm flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
<span>Tổng cộng: <strong>19 chương trình</strong> đủ điều kiện đối chiếu (Tăng +7)</span>
</div>
</div>

<div className="p-3.5 bg-white/80 backdrop-blur rounded-xl text-xs sm:text-sm font-medium text-[#172033] flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold">A</span>
<span>THPT 25.0 • ĐGNL 800 • ≤ 35M • TP.HCM</span>
</div>
<div className="flex items-center gap-2 text-[#1D4ED8] font-bold text-xs uppercase tracking-wider">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Nâng giả định điều kiện</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-[#1D4ED8] text-white text-xs font-bold">B</span>
<span>THPT 27.0 • ĐGNL 900 • ≤ 50M • TP.HCM &amp; Bình Dương</span>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-[#1D4ED8]">
<span className="text-xs font-bold uppercase tracking-wider">Lựa chọn mới</span>
<div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</div>
<div className="mt-3 text-3xl font-extrabold text-[#172033]">+7</div>
<p className="mt-1 text-xs text-[#667085]">Chương trình mới xuất hiện trong phạm vi bộ lọc mở rộng.</p>
</div>

<div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-[#FB7185]">
<span className="text-xs font-bold uppercase tracking-wider">Từ ngân sách</span>
<div className="w-7 h-7 rounded-lg bg-[#FFF1F2] flex items-center justify-center">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</div>
<div className="mt-3 text-3xl font-extrabold text-[#172033]">4</div>
<p className="mt-1 text-xs text-[#667085]">Lựa chọn khả dụng khi trần học phí nâng lên mức 50 triệu/năm.</p>
</div>

<div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-[#FBBF24]">
<span className="text-xs font-bold uppercase tracking-wider">Khu vực mở rộng</span>
<div className="w-7 h-7 rounded-lg bg-[#FFFBEB] flex items-center justify-center">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</div>
<div className="mt-3 text-3xl font-extrabold text-[#172033]">+2</div>
<p className="mt-1 text-xs text-[#667085]">Trường đại học tại Bình Dương lân cận nằm trong bán kính xe buýt/metro.</p>
</div>

<div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-[#10B981]">
<span className="text-xs font-bold uppercase tracking-wider">Đổi trạng thái</span>
<div className="w-7 h-7 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</div>
<div className="mt-3 text-3xl font-extrabold text-[#172033]">3</div>
<p className="mt-1 text-xs text-[#667085]">Chuyển từ ‘Cần cân nhắc ngân sách’ sang ‘Đáp ứng trọn vẹn tiêu chí’.</p>
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Phân nhóm 1</span>
</div>
<h3 className="text-2xl font-bold text-[#172033] mt-1">Lựa chọn mới xuất hiện (+7 chương trình)</h3>
<p className="text-sm text-[#667085]">Có 7 chương trình mới xuất hiện vì đáp ứng thêm các điều kiện bạn nới lỏng hoặc nâng giả định.</p>
</div>
<div className="flex items-center gap-2">
<button className="px-3.5 py-1.5 rounded-lg bg-white text-xs font-semibold text-[#172033] shadow-sm hover:bg-slate-50">
            Chọn tất cả để lưu
          </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
<div className="space-y-3.5">
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0">
                  UIT
                </div>
<div>
<span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">ĐHQG-HCM • Công lập</span>
<h4 className="text-base font-bold text-[#172033] leading-snug">Kỹ thuật Phần mềm (Chương trình Chuẩn)</h4>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 mt-1 cursor-pointer" type="checkbox" />
</div>

<div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-[#F8FAFC] rounded-xl">
<div>
<span className="text-[#667085] block text-[11px]">Mức tham khảo 2024 (THPT)</span>
<span className="font-extrabold text-[#172033]">26.50 điểm (A00/A01)</span>
</div>
<div>
<span className="text-[#667085] block text-[11px]">Mức tham khảo 2024 (ĐGNL)</span>
<span className="font-extrabold text-[#172033]">855 / 1200 điểm</span>
</div>
</div>

<div className="space-y-1.5">
<span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider flex items-center gap-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Vì sao xuất hiện trong Scenario B?
              </span>
<div className="flex flex-wrap gap-1.5">
<span className="text-xs px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-medium">+ Giả định ĐGNL 900 (vượt mốc 855)</span>
<span className="text-xs px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-medium">+ Giả định THPT 27.00 (vượt mốc 26.50)</span>
</div>
<p className="text-xs text-[#667085] leading-relaxed pt-1">
                Ở Scenario A (800 ĐGNL / 25.00 THPT) chưa tiệm cận mốc tham khảo 2024. Với mục tiêu B, chương trình này được đưa vào danh sách đối chiếu.
              </p>
</div>
</div>
<div className="pt-3 flex items-center justify-between gap-3">
<span className="text-xs text-[#667085]">Học phí: ~32-35 triệu/năm</span>
<button className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
<span>+ Thêm Decision Board</span>
</button>
</div>
</div>

<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
<div className="space-y-3.5">
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#B45309] font-black text-sm flex items-center justify-center shrink-0">
                  VGU
                </div>
<div>
<span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">Việt - Đức • Công lập Quốc tế</span>
<h4 className="text-base font-bold text-[#172033] leading-snug">Khoa học Máy tính (Computer Science)</h4>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 mt-1 cursor-pointer" type="checkbox" />
</div>

<div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-[#F8FAFC] rounded-xl">
<div>
<span className="text-[#667085] block text-[11px]">Khu vực đào tạo</span>
<span className="font-extrabold text-[#172033]">Bình Dương (Campus chính)</span>
</div>
<div>
<span className="text-[#667085] block text-[11px]">Học phí trung bình</span>
<span className="font-extrabold text-[#172033]">~42 - 45 triệu / năm</span>
</div>
</div>

<div className="space-y-1.5">
<span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider flex items-center gap-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Vì sao xuất hiện trong Scenario B?
              </span>
<div className="flex flex-wrap gap-1.5">
<span className="text-xs px-2.5 py-1 rounded-md bg-[#FFFBEB] text-[#B45309] font-medium">+ Nới rộng khu vực sang Bình Dương</span>
<span className="text-xs px-2.5 py-1 rounded-md bg-[#FFF1F2] text-[#FB7185] font-medium">+ Trần ngân sách nâng 50M (học phí 42M phù hợp)</span>
</div>
<p className="text-xs text-[#667085] leading-relaxed pt-1">
                Trước đây bị loại trừ bởi ràng buộc ‘Chỉ học tại TP.HCM’ và trần tài chính 35 triệu/năm. Đã được mở khóa trong kịch bản B.
              </p>
</div>
</div>
<div className="pt-3 flex items-center justify-between gap-3">
<span className="text-xs text-[#667085]">Giảng dạy hoàn toàn bằng Tiếng Anh</span>
<button className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
<span>+ Thêm Decision Board</span>
</button>
</div>
</div>

<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
<div className="space-y-3.5">
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#FB7185] font-black text-sm flex items-center justify-center shrink-0">
                  FPT
                </div>
<div>
<span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">Đại học FPT • Tư thục chất lượng</span>
<h4 className="text-base font-bold text-[#172033] leading-snug">Kỹ thuật Phần mềm (Software Engineering)</h4>
</div>
</div>
<input className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 mt-1 cursor-pointer" type="checkbox" />
</div>

<div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-[#F8FAFC] rounded-xl">
<div>
<span className="text-[#667085] block text-[11px]">Địa điểm</span>
<span className="font-extrabold text-[#172033]">Khu Công Nghệ Cao, TP.HCM</span>
</div>
<div>
<span className="text-[#667085] block text-[11px]">Học phí phân bổ</span>
<span className="font-extrabold text-[#172033]">~28.7M / kỳ chuyên ngành</span>
</div>
</div>

<div className="space-y-1.5">
<span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider flex items-center gap-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Vì sao xuất hiện trong Scenario B?
              </span>
<div className="flex flex-wrap gap-1.5">
<span className="text-xs px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-medium">+ Nới điều kiện: Cho phép Tư thục chọn lọc</span>
<span className="text-xs px-2.5 py-1 rounded-md bg-[#FFF1F2] text-[#FB7185] font-medium">+ Trần ngân sách nâng lên 50M</span>
</div>
<p className="text-xs text-[#667085] leading-relaxed pt-1">
                Được đưa vào tập hợp đối chiếu nhờ việc cởi bỏ rào cản loại hình trường thuần công lập và dung sai tài chính linh hoạt hơn.
              </p>
</div>
</div>
<div className="pt-3 flex items-center justify-between gap-3">
<span className="text-xs text-[#667085]">Tuyển sinh theo quy chế riêng (SchoolRank)</span>
<button className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
<span>+ Thêm Decision Board</span>
</button>
</div>
</div>

<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
<div className="space-y-3.5">
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0">
                  IU
                </div>
<div>
<span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">ĐH Quốc Tế • ĐHQG-HCM</span>
<h4 className="text-base font-bold text-[#172033] leading-snug">Công nghệ Thông tin (Do IU cấp bằng)</h4>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 mt-1 cursor-pointer" type="checkbox" />
</div>

<div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-[#F8FAFC] rounded-xl">
<div>
<span className="text-[#667085] block text-[11px]">Mức tham khảo ĐGNL 2024</span>
<span className="font-extrabold text-[#172033]">815 / 1200 điểm</span>
</div>
<div>
<span className="text-[#667085] block text-[11px]">Học phí định mức</span>
<span className="font-extrabold text-[#172033]">~45 - 50 triệu / năm</span>
</div>
</div>

<div className="space-y-1.5">
<span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider flex items-center gap-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Vì sao xuất hiện trong Scenario B?
              </span>
<div className="flex flex-wrap gap-1.5">
<span className="text-xs px-2.5 py-1 rounded-md bg-[#FFF1F2] text-[#FB7185] font-medium">+ Trần học phí 50M bao quát được mức 45-50M</span>
<span className="text-xs px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-medium">+ Điểm ĐGNL mục tiêu 900 (vượt mốc 815)</span>
</div>
<p className="text-xs text-[#667085] leading-relaxed pt-1">
                Thuộc hệ công lập tự chủ tài chính toàn phần, đáp ứng hoàn toàn điều kiện khi ngân sách nâng từ 35M lên 50M.
              </p>
</div>
</div>
<div className="pt-3 flex items-center justify-between gap-3">
<span className="text-xs text-[#667085]">Giảng dạy 100% bằng Tiếng Anh</span>
<button className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
<span>+ Thêm Decision Board</span>
</button>
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]"></span>
<span className="text-xs font-bold uppercase tracking-wider text-[#FB7185]">Phân nhóm 2</span>
</div>
<h3 className="text-2xl font-bold text-[#172033] mt-1">Rào cản nào đã được nới lỏng? (Cause &amp; Effect)</h3>
<p className="text-sm text-[#667085]">Phân tích cụ thể biến số nào đóng góp vào việc mở rộng danh mục lựa chọn của bạn.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
<div className="flex items-center gap-2.5 text-[#FB7185]">
<div className="p-2 rounded-xl bg-[#FFF1F2]">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h4 className="font-bold text-[#172033]">Yếu tố Ngân sách (Budget)</h4>
</div>
<div className="space-y-2 py-2">
<div className="flex items-center justify-between text-xs">
<span className="text-[#667085]">Scenario A: ≤ 35 triệu/năm</span>
<span className="font-extrabold text-[#FB7185]">Scenario B: ≤ 50 triệu/năm</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-[#FB7185] rounded-full" style={{ "width": "70%" }}></div>
</div>
</div>
<div className="p-3.5 rounded-xl bg-[#FFF1F2]/60 text-xs text-[#172033] space-y-1">
<span className="font-bold block text-[#FB7185]">Tác động trực tiếp:</span>
<p className="leading-relaxed">
<strong>4 chương trình</strong> đào tạo tự chủ tài chính, liên kết quốc tế và chất lượng cao đã lập tức nằm trọn trong hạn mức ngân sách gia đình.
            </p>
</div>
</div>

<div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
<div className="flex items-center gap-2.5 text-[#FBBF24]">
<div className="p-2 rounded-xl bg-[#FFFBEB]">
<svg className="w-5 h-5 text-[#B45309]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h4 className="font-bold text-[#172033]">Khu vực địa lý (Location)</h4>
</div>
<div className="space-y-2 py-2">
<div className="flex items-center justify-between text-xs">
<span className="text-[#667085]">Scenario A: TP.HCM</span>
<span className="font-extrabold text-[#B45309]">Scenario B: TP.HCM + Bình Dương</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-[#FBBF24] rounded-full" style={{ "width": "85%" }}></div>
</div>
</div>
<div className="p-3.5 rounded-xl bg-[#FFFBEB]/70 text-xs text-[#172033] space-y-1">
<span className="font-bold block text-[#B45309]">Tác động trực tiếp:</span>
<p className="leading-relaxed">
<strong>2 trường đại học lớn</strong> (VGU, EIU) với cơ sở hạ tầng hiện đại tại Bình Dương được đưa vào tầm ngắm, thời gian di chuyển xe buýt/metro ước tính ~35-45 phút.
            </p>
</div>
</div>

<div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
<div className="flex items-center gap-2.5 text-[#1D4ED8]">
<div className="p-2 rounded-xl bg-[#EFF6FF]">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h4 className="font-bold text-[#172033]">Mục tiêu điểm số (Academic)</h4>
</div>
<div className="space-y-2 py-2">
<div className="flex items-center justify-between text-xs">
<span className="text-[#667085]">A: ĐGNL 800 / THPT 25.0</span>
<span className="font-extrabold text-[#1D4ED8]">B: ĐGNL 900 / THPT 27.0</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-[#1D4ED8] rounded-full" style={{ "width": "90%" }}></div>
</div>
</div>
<div className="p-3.5 rounded-xl bg-[#EFF6FF]/70 text-xs text-[#172033] space-y-1">
<span className="font-bold block text-[#1D4ED8]">Tác động trực tiếp:</span>
<p className="leading-relaxed">
<strong>4 ngành công nghệ top đầu</strong> thuộc hệ thống ĐHQG-HCM chính thức tiệm cận phổ điểm trúng tuyển tham khảo các năm liền kề.
            </p>
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
<h4 className="font-bold text-base text-[#172033]">3 Lựa chọn thay đổi trạng thái</h4>
</div>
<span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-bold">Thuận lợi hơn</span>
</div>
<p className="text-xs text-[#667085]">
            Những ngành đã có mặt trong danh sách Scenario A nhưng chuyển sang trạng thái an tâm hơn về ngân sách hoặc điểm số ở Scenario B.
          </p>
<div className="space-y-3 pt-2">

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-2">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">HCMUTE • ĐH Sư Phạm Kỹ Thuật</span>
<div className="text-xs font-bold text-[#172033]">Công nghệ Thông tin (Chất lượng cao tiếng Việt)</div>
</div>
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#059669]">Đạt ngân sách</span>
</div>
<div className="text-xs text-[#667085] flex items-center justify-between">
<span>Học phí: ~38 triệu/năm</span>
<span className="text-[#10B981] font-medium">Scenario A: Vượt trần 3M ──► Scenario B: Dư 12M</span>
</div>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-2">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">SGU • ĐH Sài Gòn</span>
<div className="text-xs font-bold text-[#172033]">Kỹ thuật Phần mềm (Chương trình chất lượng cao)</div>
</div>
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#059669]">Tiệm cận cao</span>
</div>
<div className="text-xs text-[#667085] flex items-center justify-between">
<span>Điểm tham khảo: 25.80 (THPT)</span>
<span className="text-[#10B981] font-medium">Scenario A: 25.0 (-0.8) ──► Scenario B: 27.0 (+1.2)</span>
</div>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-2">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">OU • ĐH Mở TP.HCM</span>
<div className="text-xs font-bold text-[#172033]">Khoa học Máy tính (Đại trà)</div>
</div>
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#059669]">Vượt ngưỡng tham chiếu</span>
</div>
<div className="text-xs text-[#667085] flex items-center justify-between">
<span>ĐGNL tham khảo: 760</span>
<span className="text-[#10B981] font-medium">Scenario A: 800 (+40) ──► Scenario B: 900 (+140)</span>
</div>
</div>
</div>
</div>

<div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
<h4 className="font-bold text-base text-[#172033]">Các lựa chọn không bị ảnh hưởng</h4>
</div>
<span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#667085] font-bold">Cố định nền tảng</span>
</div>
<p className="text-xs text-[#667085]">
            Những chương trình vốn đã thỏa mãn đầy đủ cả 5 tiêu chí từ Scenario A, giữ nguyên trạng thái làm điểm tựa đối chiếu.
          </p>
<div className="space-y-3 pt-2">

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-1.5">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">HCMUS • ĐH Khoa học Tự nhiên</span>
<div className="text-xs font-bold text-[#172033]">Toán Tin ứng dụng / Khoa học Dữ liệu (Hệ chuẩn)</div>
</div>
<span className="text-[11px] font-medium text-[#667085]">Học phí: ~27M / năm</span>
</div>
<p className="text-[11px] text-[#667085]">
                Đã nằm hoàn toàn trong ngân sách &lt; 35M và điểm số ban đầu đã đạt tiêu chuẩn đối chiếu, không thay đổi mức độ ưu tiên.
              </p>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-1.5">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">HUTECH • ĐH Công nghệ TP.HCM</span>
<div className="text-xs font-bold text-[#172033]">Kỹ thuật Robot &amp; Trí tuệ Nhân tạo</div>
</div>
<span className="text-[11px] font-medium text-[#667085]">Học phí: ~32M / năm</span>
</div>
<p className="text-[11px] text-[#667085]">
                Đã phù hợp với cả 2 Scenario, phương thức xét tuyển học bạ và điểm thi đều tương thích.
              </p>
</div>

<div className="p-3.5 rounded-xl bg-[#F8FAFC] space-y-1.5">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-[#667085] uppercase">SPKT Vĩnh Long (Phân hiệu)</span>
<div className="text-xs font-bold text-[#172033]">Công nghệ Thông tin</div>
</div>
<span className="text-[11px] font-medium text-[#667085]">Ngoại trừ theo vị trí</span>
</div>
<p className="text-[11px] text-[#667085]">
                Kể cả khi mở rộng sang Bình Dương, vị trí này vẫn nằm ngoài bán kính địa lý mong muốn của học sinh.
              </p>
</div>
</div>
</div>
</div>
</section>

<section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Thao tác lưu trữ &amp; hành động</span>
<h3 className="text-2xl font-bold text-[#172033] mt-1">Đưa kết quả so sánh vào lộ trình hành động</h3>
<p className="text-sm text-[#667085]">Lưu lại để theo dõi trong suốt kỳ ôn thi hoặc chuyển tiếp sang bảng ra quyết định (Decision Board).</p>
</div>
<div className="flex items-center gap-2">
<span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#EFF6FF] text-[#1D4ED8]">
            Đã tích chọn 3 chương trình mới
          </span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

<div className="p-5 rounded-2xl bg-[#F8FAFC] space-y-3.5 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center gap-2 text-xs font-bold uppercase text-[#172033]">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              1. Đặt tên &amp; Lưu kịch bản
            </div>
<p className="text-xs text-[#667085]">Lưu thông số Scenario B để quay lại xem bất cứ lúc nào trong tài khoản.</p>
<input className="w-full px-3 py-2 text-xs font-semibold text-[#172033] bg-white rounded-xl shadow-sm focus:outline-none" type="text" defaultValue="Kịch bản mục tiêu hè 2027 (ĐGNL 900)" />
</div>
<button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-[#172033] shadow-sm transition-all flex items-center justify-center gap-1.5">
<span>Lưu kịch bản vào hồ sơ</span>
</button>
</div>

<div className="p-5 rounded-2xl bg-[#EFF6FF] space-y-3.5 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center gap-2 text-xs font-bold uppercase text-[#1D4ED8]">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              2. Đưa vào Decision Board
            </div>
<p className="text-xs text-[#1e40af]">Chuyển 3 phương án vừa tích chọn (UIT, VGU, IU) vào bàn cân quyết định chuyên sâu cùng gia đình.</p>
</div>
<button className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2">
<span>Chuyển 3 lựa chọn vào Board →</span>
</button>
</div>

<div className="p-5 rounded-2xl bg-[#FFF1F2] space-y-3.5 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center gap-2 text-xs font-bold uppercase text-[#FB7185]">
<svg className="w-4 h-4 text-[#FB7185]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              3. So sánh trực diện 3 trường
            </div>
<p className="text-xs text-[#9f1239]">Đối chiếu học phí thực tế 4 năm, chương trình đào tạo, cơ hội việc làm và chuẩn đầu ra tiếng Anh.</p>
</div>
<button className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FFF1F2] text-xs font-bold text-[#FB7185] shadow-sm transition-all flex items-center justify-center gap-1.5">
<span>Mở bảng so sánh 3 trường</span>
</button>
</div>
</div>
</section>

<section className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] space-y-6">
<div className="text-center max-w-2xl mx-auto space-y-2">
<span className="text-xs font-bold uppercase tracking-wider text-[#667085]">Nguyên tắc thiết kế hệ thống</span>
<h3 className="text-xl sm:text-2xl font-bold text-[#172033]">
          Scenario nên được hiểu và sử dụng như thế nào?
        </h3>
<p className="text-xs sm:text-sm text-[#667085]">
          UniView xây dựng công cụ này nhằm thúc đẩy tư duy chủ động chuẩn bị kịch bản thay vì phụ thuộc vào cảm tính.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

<div className="p-5 rounded-2xl bg-white shadow-sm space-y-3">
<div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] font-bold text-xs flex items-center justify-center">
            01
          </div>
<h4 className="font-bold text-sm text-[#172033]">Thay đổi giả định chủ động</h4>
<p className="text-xs text-[#667085] leading-relaxed">
            Bạn chủ động giả lập việc tăng điểm thi, mở rộng địa bàn hoặc điều chỉnh ngân sách để hình dung bức tranh cơ hội nếu bản thân nỗ lực thêm hoặc gia đình linh hoạt hơn.
          </p>
</div>

<div className="p-5 rounded-2xl bg-white shadow-sm space-y-3">
<div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#B45309] font-bold text-xs flex items-center justify-center">
            02
          </div>
<h4 className="font-bold text-sm text-[#172033]">So sánh lựa chọn khách quan</h4>
<p className="text-xs text-[#667085] leading-relaxed">
            Hệ thống chỉ làm nhiệm vụ lọc và hiển thị tất cả các ngành trường tương thích với giả định. UniView hoàn toàn độc lập, không ưu tiên quảng cáo bất kỳ cơ sở giáo dục nào.
          </p>
</div>

<div className="p-5 rounded-2xl bg-white shadow-sm space-y-3">
<div className="w-8 h-8 rounded-lg bg-[#FFF1F2] text-[#FB7185] font-bold text-xs flex items-center justify-center">
            03
          </div>
<h4 className="font-bold text-sm text-[#172033]">Không phải là dự báo tương lai</h4>
<p className="text-xs text-[#667085] leading-relaxed">
            Điểm chuẩn mỗi năm phụ thuộc vào đề thi và số lượng thí sinh đăng ký nguyện vọng. Kịch bản giúp bạn quản trị rủi ro và có kế hoạch học tập rõ ràng, không thay thế cho quyết định nộp hồ sơ chính thức.
          </p>
</div>
</div>
</section>
</div>
</div></main>
      {locked && (
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
          <PremiumLockCard />
        </div>
      )}
</>
  )
}

export default ScenarioComparisonPage
