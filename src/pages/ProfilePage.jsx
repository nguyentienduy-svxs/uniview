import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user, reportHistory, resetDemoAccount } = useAuth();
  return (
<main className="w-full pt-6 bg-[#FFFDFB] min-h-[calc(100vh-80px)] pb-24"><div className="flex flex-col w-full">
<div className="w-full max-w-[1260px] mx-auto px-4 md:px-6 lg:px-8 py-4 font-['Be_Vietnam_Pro'] antialiased">

<section className="rounded-[28px] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF1F2] border border-[#DBEAFE] p-6 sm:p-8 md:p-10 mb-8 shadow-sm relative overflow-hidden">

<div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-300/20 blur-[90px] pointer-events-none"></div>
<div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-rose-200/30 blur-[80px] pointer-events-none"></div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

<div className="lg:col-span-7 space-y-5">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 text-[#1D4ED8] text-xs font-bold tracking-wider uppercase shadow-xs">
<svg className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
</svg>
<span>Hồ sơ của bạn</span>
</div>
<h1 className="text-2xl sm:text-3xl md:text-[34px] leading-tight font-extrabold text-[#172033] tracking-tight">
            Thông tin giúp UniView hiểu hoàn cảnh của bạn hơn
          </h1>
<p className="text-[#667085] text-sm sm:text-[15px] leading-relaxed max-w-xl">
            Cập nhật học tập, sở thích và điều kiện hiện tại để các công cụ của UniView có thêm bối cảnh khi hỗ trợ bạn khám phá lựa chọn, đối chiếu tuyển sinh và so sánh đa chiều.
          </p>

<div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-100/90 p-5 shadow-sm space-y-4 max-w-xl">
<div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-pulse"></span>
<span className="text-sm font-bold text-[#172033]">Tiến độ hoàn thiện hồ sơ</span>
</div>
<span className="text-sm font-extrabold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-0.5 rounded-lg border border-blue-200">72% đã hoàn thành</span>
</div>

<div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
<div className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] h-full rounded-full transition-all duration-700" style={{ "width": "72%" }}></div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
<div className="bg-[#EFF6FF] border border-blue-100 text-[#1D4ED8] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-center">
<span>✓</span> Thông tin cá nhân
              </div>
<div className="bg-[#FFFBEB] border border-amber-200 text-[#B45309] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-center">
<span>⚠️</span> Có thể bổ sung
              </div>
<div className="bg-[#EFF6FF] border border-blue-100 text-[#1D4ED8] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-center">
<span>✓</span> Sở thích &amp; Tiêu chí
              </div>
<div className="bg-[#EFF6FF] border border-blue-100 text-[#1D4ED8] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-center">
<span>✓</span> Assessment v1
              </div>
</div>
<p className="text-[11px] leading-relaxed text-[#667085] flex items-start gap-1.5 pt-1">
<svg className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<line x1="12" x2="12" y1="16" y2="12"></line>
<line x1="12" x2="12.01" y1="8" y2="8"></line>
</svg>
<span>Tiến độ hồ sơ chỉ thể hiện mức độ đầy đủ dữ liệu, không đại diện cho điểm số tuyển sinh hay tỷ lệ đỗ/trượt.</span>
</p>
</div>
</div>

<div className="lg:col-span-5 flex justify-center">
<div className="relative w-full max-w-[360px] bg-white rounded-3xl p-6 border border-blue-100 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300">

<div className="flex items-center justify-between pb-4 border-b border-slate-100">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-bold">
                  {user?.initials ?? 'CD'}
                </span>
<div>
<h3 className="text-sm font-bold text-[#172033]">{user?.fullName ?? 'Chí Duy'}</h3>
<p className="text-[11px] text-[#667085]">{user?.grade ?? 'Lớp 12'} · {user?.school ?? 'Chưa cập nhật trường'}</p>
</div>
</div>
<span className="text-[11px] font-semibold bg-[#FFF1F2] text-[#FB7185] px-2 py-0.5 rounded-full border border-rose-200">K2026</span>
</div>

<div className="py-5 flex flex-col items-center justify-center relative">
<div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#EFF6FF] via-white to-[#FFF1F2] border-2 border-[#1D4ED8]/20 flex items-center justify-center relative shadow-inner">
<img alt="UniView Mascot" className="w-16 h-16 object-contain drop-shadow" src="/stitch-assets/uniview-logo.png" />

<span className="absolute -bottom-1 -right-2 bg-[#1D4ED8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">I-C-A</span>
</div>

<div className="mt-4 flex flex-wrap gap-1.5 justify-center">
<span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">THPT Dự kiến 25.50</span>
<span className="text-[11px] font-semibold bg-blue-50 text-[#1D4ED8] px-2.5 py-1 rounded-lg border border-blue-100">ĐGNL 875</span>
<span className="text-[11px] font-semibold bg-rose-50 text-[#FB7185] px-2.5 py-1 rounded-lg border border-rose-100">IELTS 6.5</span>
</div>
</div>

<div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-100 text-xs space-y-2">
<div className="flex items-center justify-between text-slate-500 text-[11px]">
<span>Mục tiêu chính:</span>
<span className="font-bold text-[#172033]">Kỹ thuật Phần mềm / AI</span>
</div>
<div className="flex items-center justify-between text-slate-500 text-[11px]">
<span>Khu vực ưu tiên:</span>
<span className="font-semibold text-slate-800">TP. Hồ Chí Minh</span>
</div>
<div className="flex items-center justify-between text-slate-500 text-[11px]">
<span>Quyền riêng tư:</span>
<span className="font-medium text-emerald-600 flex items-center gap-1">
<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Chỉ mình bạn
                </span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="mb-8 rounded-[24px] border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
<div>
<span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1D4ED8]">Lịch sử báo cáo</span>
<h2 className="mt-1 text-xl font-extrabold text-[#172033]">Báo cáo định hướng đã mở khóa</h2>
<p className="mt-1 text-sm text-[#667085]">Báo cáo đã mua được lưu trong tài khoản để Chí Duy và phụ huynh xem lại.</p>
</div>
<div className="flex flex-wrap items-center gap-2">
<span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{reportHistory.length} báo cáo</span>
<button className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100" onClick={resetDemoAccount} type="button">Reset demo về gói Free</button>
</div>
</div>

{reportHistory.length ? (
<div className="mt-5 space-y-3">
{reportHistory.map((entry) => (
<article className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center" key={entry.id}>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined rounded-xl bg-blue-100 p-2 text-[#1D4ED8]">description</span>
<div>
<h3 className="font-bold text-[#172033]">{entry.title}</h3>
<p className="mt-1 text-xs text-[#667085]">Mở khóa lúc {new Date(entry.unlockedAt).toLocaleString('vi-VN')} · Truy cập vĩnh viễn</p>
</div>
</div>
<div className="flex flex-wrap gap-2">
<Link className="rounded-full bg-[#1D4ED8] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700" to={`/assessment/result?report=${entry.id}`}>Xem báo cáo</Link>
<button className="cursor-not-allowed rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-400" disabled title="Đang chờ sườn PDF từ đội sản phẩm" type="button">PDF cho phụ huynh · Chờ mẫu</button>
</div>
</article>
))}
</div>
) : (
<div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
Chưa có báo cáo đã mở khóa. Sau khi xác nhận thanh toán demo 59.000đ, báo cáo sẽ tự xuất hiện tại đây.
</div>
)}
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

<div className="rounded-[24px] bg-white border border-slate-200/90 p-5 shadow-sm space-y-5">
<div>
<span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">Danh mục hồ sơ</span>
<nav className="space-y-1.5" id="profile-nav">

<a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-bold text-sm border-l-4 border-[#1D4ED8] transition-all group" href="#section-personal">
<div className="flex items-center gap-2.5">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>1. Thông tin cá nhân</span>
</div>
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs flex items-center justify-center font-bold">✓</span>
</a>

<a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all group" href="#section-academic">
<div className="flex items-center gap-2.5">
<svg className="w-4 h-4 text-slate-500 group-hover:text-[#1D4ED8] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
</svg>
<span>2. Hồ sơ học tập</span>
</div>
<span className="text-[11px] font-semibold text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded-md border border-amber-200">+ Bổ sung</span>
</a>

<a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all group" href="#section-preferences">
<div className="flex items-center gap-2.5">
<svg className="w-4 h-4 text-slate-500 group-hover:text-[#1D4ED8] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>3. Sở thích &amp; Điều kiện</span>
</div>
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs flex items-center justify-center font-bold">✓</span>
</a>

<a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all group" href="#section-assessment">
<div className="flex items-center gap-2.5">
<svg className="w-4 h-4 text-slate-500 group-hover:text-[#1D4ED8] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>4. Assessment Profile</span>
</div>
<span className="text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-blue-200">v1</span>
</a>
</nav>
</div>
<div className="h-px bg-slate-100"></div>

<div>
<span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Hồ sơ được dùng ở đâu?</span>
<ul className="space-y-2 text-xs font-medium text-slate-600">
<li>
<a className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] text-slate-700 hover:text-[#1D4ED8] transition-colors" href="#">
<span className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                    Shortlist cá nhân hóa
                  </span>
<span className="text-slate-400">↗</span>
</a>
</li>
<li>
<a className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] text-slate-700 hover:text-[#1D4ED8] transition-colors" href="#">
<span className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                    Admission Checker
                  </span>
<span className="text-slate-400">↗</span>
</a>
</li>
<li>
<a className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] text-slate-700 hover:text-[#1D4ED8] transition-colors" href="#">
<span className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                    Route Mapping (Bản đồ con đường)
                  </span>
<span className="text-slate-400">↗</span>
</a>
</li>
<li>
<a className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] text-slate-700 hover:text-[#1D4ED8] transition-colors" href="#">
<span className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                    Scenario Comparison
                  </span>
<span className="text-slate-400">↗</span>
</a>
</li>
<li>
<a className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] text-slate-700 hover:text-[#1D4ED8] transition-colors" href="#">
<span className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                    Decision Board
                  </span>
<span className="text-slate-400">↗</span>
</a>
</li>
</ul>
</div>

<div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-3.5 text-xs text-[#667085] flex items-start gap-2.5">
<svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<rect height="11" rx="2" ry="2" width="18" x="3" y="11"></rect>
<path d="M7 11V7a5 5 0 0110 0v4"></path>
</svg>
<span className="leading-relaxed">
              Dữ liệu được bảo mật riêng tư và bạn có <span className="font-semibold text-slate-800">toàn quyền chỉnh sửa miễn phí</span> bất kỳ lúc nào.
            </span>
</div>
</div>

<div className="rounded-[20px] bg-gradient-to-br from-[#FFFBEB] to-[#FFF1F2] border border-amber-200/70 p-4 text-xs text-[#172033] space-y-2">
<div className="flex items-center gap-1.5 font-bold text-amber-800">
<svg className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
<path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fillRule="evenodd"></path>
</svg>
<span>Quyền sửa đổi tự do</span>
</div>
<p className="text-slate-600 text-[11px] leading-relaxed">
            Không có dữ liệu nào bị khóa hay giới hạn lượt cập nhật. Điểm số và dự định của bạn thay đổi theo thời gian? Hãy cập nhật để nhận đề xuất chính xác nhất.
          </p>
</div>
</aside>

<main className="lg:col-span-8 bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 md:p-10 shadow-sm space-y-12">

<section className="space-y-5 scroll-mt-28" id="section-personal">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">1. Thông tin cá nhân</h2>
</div>
<p className="text-xs sm:text-sm text-[#667085] mt-1">Những thông tin cơ bản để cá nhân hóa trải nghiệm của bạn.</p>
</div>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-white hover:bg-[#EFF6FF] text-[#1D4ED8] text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>Chỉnh sửa thông tin</span>
</button>
</div>

<div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">

<div>
<span className="text-xs text-[#667085] font-medium block">Họ và tên</span>
<span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">{user?.fullName ?? 'Chí Duy'}</span>
</div>

<div>
<span className="text-xs text-[#667085] font-medium block">Năm sinh &amp; Trạng thái</span>
<span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">2008 (Học sinh lớp 12)</span>
</div>

<div>
<span className="text-xs text-[#667085] font-medium block">Tỉnh / Thành phố cư trú</span>
<span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">TP. Hồ Chí Minh</span>
</div>

<div>
<span className="text-xs text-[#667085] font-medium block">Trường THPT hiện tại</span>
<span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">{user?.school ?? 'Chưa cập nhật trường'}</span>
</div>
</div>

<div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
<span className="flex items-center gap-1.5 text-emerald-700 font-medium">
<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Dữ liệu cá nhân đã lưu hợp lệ.
              </span>
<span className="text-[11px] text-slate-400">Cập nhật lần cuối: 2 ngày trước</span>
</div>
</div>
</section>

<section className="space-y-6 scroll-mt-28" id="section-academic">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">2. Hồ sơ học tập</h2>
</div>
<p className="text-xs sm:text-sm text-[#667085] mt-1">Các dữ liệu này giúp Admission Checker, Route Mapping và các công cụ có thêm bối cảnh.</p>
</div>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-white hover:bg-[#EFF6FF] text-[#1D4ED8] text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
</svg>
<span>Chỉnh sửa dữ liệu học tập</span>
</button>
</div>

<div className="space-y-5">

<div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-4">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khối lớp &amp; Môn học thế mạnh</span>
<span className="text-xs font-semibold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded-md">Lớp 12 (Niên khóa 2023 - 2026)</span>
</div>
<div>
<span className="text-xs text-[#667085] block mb-2 font-medium">Môn học tự tin / Điểm số nổi trội:</span>
<div className="flex flex-wrap gap-2">

<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 shadow-2xs">
<span>✓</span> Toán học
                  </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 shadow-2xs">
<span>✓</span> Vật lý
                  </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 shadow-2xs">
<span>✓</span> Tiếng Anh
                  </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 shadow-2xs">
<span>✓</span> Tin học
                  </span>

<span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-400 border border-slate-200">
                    Hóa học
                  </span>
<span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-400 border border-slate-200">
                    Ngữ văn
                  </span>
<span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-400 border border-slate-200">
                    Sinh học
                  </span>
<span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-400 border border-slate-200">
                    Lịch sử
                  </span>
</div>
</div>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-4">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Điểm thi tốt nghiệp THPT (Thang điểm 30)</span>
<span className="text-[11px] font-medium text-slate-400">Tách biệt dự kiến &amp; chính thức</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-[#EFF6FF] border border-blue-200 rounded-xl p-4 space-y-2">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wide">Điểm tự dự kiến</span>
<span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Tổ hợp A00, A01</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-2xl sm:text-3xl font-extrabold text-[#1D4ED8]">25.50</span>
<span className="text-xs text-blue-600 font-semibold">/ 30.00 điểm</span>
</div>
<p className="text-xs text-blue-900 leading-snug">
                    Toán: 8.8 · Vật lý: 8.2 · Hóa học: 8.5 (A00) / Tiếng Anh: 8.5 (A01)
                  </p>
</div>

<div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Điểm thực tế chính thức</span>
<span className="text-[11px] font-semibold text-amber-700 bg-[#FFFBEB] px-2 py-0.5 rounded border border-amber-200">Chờ kỳ thi 2026</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-2xl sm:text-3xl font-extrabold text-slate-400">—.—</span>
<span className="text-xs text-slate-400 font-medium">Chưa công bố</span>
</div>
<p className="text-xs text-slate-500 leading-snug">
                    Sẽ mở nhập ngay khi Bộ GD&amp;ĐT công bố điểm thi đợt tháng 07/2026.
                  </p>
</div>
</div>

<p className="text-[11px] text-slate-500 italic">
                * Lưu ý: UniView giữ tách biệt điểm dự kiến và điểm chính thức thực tế. Điểm số chưa cập nhật không ảnh hưởng đến việc đối chiếu dữ liệu tham khảo của năm trước.
              </p>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kỳ thi Đánh Giá Năng Lực &amp; Khảo sát riêng</span>
<span className="text-[11px] text-[#FB7185] font-semibold">Thang điểm độc lập — Không quy đổi tùy tiện</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

<div className="rounded-xl border border-blue-200 bg-[#EFF6FF]/60 p-3.5 space-y-1.5">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-[#172033]">ĐGNL ĐHQG-HCM</span>
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="text-xl font-extrabold text-[#1D4ED8]">875</span>
<span className="text-[11px] text-slate-500 font-medium">/ 1200 điểm</span>
</div>
<p className="text-[11px] text-[#667085]">Đợt 1 / 2025 · Phân vị ~82%</p>
</div>

<div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5 opacity-80">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-600">ĐGNL ĐHQG Hà Nội (HSA)</span>
<span className="w-2 h-2 rounded-full bg-slate-300"></span>
</div>
<div className="text-sm font-semibold text-slate-500 pt-0.5">Chưa tham gia</div>
<p className="text-[11px] text-slate-400">Thang điểm 150</p>
</div>

<div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5 opacity-80">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-600">Kỳ thi V-SAT</span>
<span className="w-2 h-2 rounded-full bg-slate-300"></span>
</div>
<div className="text-sm font-semibold text-slate-500 pt-0.5">Chưa nhập</div>
<p className="text-[11px] text-slate-400">Tổ hợp môn ngân hàng câu hỏi</p>
</div>
</div>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-4">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Học bạ THPT &amp; Chứng chỉ Quốc tế</span>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-[#172033] flex items-center gap-1.5">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
</svg>
                      Học bạ 5 học kỳ THPT
                    </span>
<span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Đã cập nhật</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
                    Điểm trung bình chung 5 HK: <span className="font-bold text-slate-900">8.70</span> (HK1, HK2 Lớp 10; HK1, HK2 Lớp 11; HK1 Lớp 12).
                  </p>
<div className="text-[11px] text-[#1D4ED8] font-semibold cursor-pointer hover:underline">
                    Xem chi tiết từng môn trong học bạ →
                  </div>
</div>

<div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-[#172033] flex items-center gap-1.5">
<svg className="w-4 h-4 text-[#FB7185]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
</svg>
                      IELTS Academic
                    </span>
<span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Còn hạn 2026</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
                    Overall Band: <span className="font-bold text-slate-900">6.5</span> (L: 7.0, R: 7.0, W: 6.0, S: 6.0)
                  </p>
<button className="text-[11px] text-[#1D4ED8] font-semibold hover:underline flex items-center gap-1">
<span>+ Thêm chứng chỉ khác (SAT, ACT, JLPT, HSK)</span>
</button>
</div>
</div>
</div>
</div>

<div className="rounded-2xl bg-[#EFF6FF] border border-blue-200 p-4 flex items-start gap-3 text-xs text-blue-900">
<svg className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<line x1="12" x2="12" y1="16" y2="12"></line>
<line x1="12" x2="12.01" y1="8" y2="8"></line>
</svg>
<div className="leading-relaxed">
<span className="font-bold">Minh bạch thuật toán:</span> Điểm và chứng chỉ trong hồ sơ chỉ được dùng làm dữ liệu đầu vào cho các công cụ hỗ trợ đối chiếu thông tin tuyển sinh. UniView không dùng chúng để cam kết hoặc đưa ra dự đoán kết quả trúng tuyển có giá trị pháp lý.
            </div>
</div>
</section>

<section className="space-y-6 scroll-mt-28" id="section-preferences">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">3. Sở thích &amp; điều kiện hiện tại</h2>
</div>
<p className="text-xs sm:text-sm text-[#667085] mt-1">Cho UniView biết những yếu tố bạn đang quan tâm khi khám phá trường và ngành.</p>
</div>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-white hover:bg-[#EFF6FF] text-[#1D4ED8] text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
</svg>
<span>Chỉnh sửa tiêu chí</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

<div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Khu vực ưu tiên học tập</span>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-2xs">TP. Hồ Chí Minh ✓</span>
<span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-2xs">Bình Dương ✓</span>
<span className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">Đồng Nai</span>
<span className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">Cần Thơ</span>
<span className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">Hà Nội</span>
</div>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ngân sách học phí dự kiến</span>
<span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Đang áp dụng</span>
</div>
<div className="p-3 rounded-xl bg-white border-2 border-[#1D4ED8] text-xs">
<div className="font-extrabold text-[#1D4ED8] text-sm">20 – 35 triệu VNĐ / năm</div>
<div className="text-[11px] text-slate-500 mt-0.5">Phù hợp hệ chuẩn đại học công lập tự chủ chi thường xuyên</div>
</div>
<div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500">
<span className="px-2 py-0.5 rounded bg-slate-100">≤ 20 tr/năm</span>
<span className="px-2 py-0.5 rounded bg-slate-100">35 – 60 tr/năm</span>
<span className="px-2 py-0.5 rounded bg-slate-100">&gt; 60 tr/năm</span>
</div>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Loại hình cơ sở đào tạo</span>
<div className="space-y-2 text-xs">
<label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 cursor-default" disabled type="checkbox" />
<span>Đại học công lập (Ưu tiên hàng đầu)</span>
</label>
<label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-0 cursor-default" disabled type="checkbox" />
<span>Đại học tư thục chọn lọc (Chất lượng cao / Đạt kiểm định)</span>
</label>
<label className="flex items-center gap-2 text-slate-500 cursor-pointer">
<input className="w-4 h-4 rounded text-slate-300 focus:ring-0 cursor-default" disabled type="checkbox" />
<span>Chương trình quốc tế liên kết</span>
</label>
</div>
</div>

<div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nhóm ngành quan tâm</span>
<span className="text-xs text-[#1D4ED8] font-bold hover:underline cursor-pointer">+ Thêm ngành</span>
</div>
<div className="flex flex-wrap gap-2">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-800 shadow-2xs">
                  Kỹ thuật phần mềm (SE)
                  <button className="text-slate-400 hover:text-rose-500">×</button>
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-800 shadow-2xs">
                  Khoa học Dữ liệu (Data Science)
                  <button className="text-slate-400 hover:text-rose-500">×</button>
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-800 shadow-2xs">
                  Trí tuệ nhân tạo (AI)
                  <button className="text-slate-400 hover:text-rose-500">×</button>
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-800 shadow-2xs">
                  Công nghệ Thông tin
                  <button className="text-slate-400 hover:text-rose-500">×</button>
</span>
</div>
</div>

<div className="md:col-span-2 rounded-2xl border border-slate-200 p-5 bg-white space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trường đại học đang theo dõi (3 trường)</span>
<button className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1">
<span>+ Thêm trường theo dõi</span>
</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

<div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-blue-200 transition-colors">
<div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-extrabold text-xs shrink-0">
                    UIT
                  </div>
<div className="min-w-0">
<h4 className="text-xs font-bold text-[#172033] truncate">ĐH Công nghệ Thông tin</h4>
<p className="text-[11px] text-slate-500 truncate">ĐHQG-HCM · Thủ Đức</p>
</div>
</div>

<div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-blue-200 transition-colors">
<div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-extrabold text-xs shrink-0">
                    HCMUT
                  </div>
<div className="min-w-0">
<h4 className="text-xs font-bold text-[#172033] truncate">ĐH Bách Khoa</h4>
<p className="text-[11px] text-slate-500 truncate">ĐHQG-HCM · Q.10</p>
</div>
</div>

<div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-blue-200 transition-colors">
<div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold text-xs shrink-0">
                    FPT
                  </div>
<div className="min-w-0">
<h4 className="text-xs font-bold text-[#172033] truncate">Đại học FPT TP.HCM</h4>
<p className="text-[11px] text-slate-500 truncate">Khu Công Nghệ Cao · Q.9</p>
</div>
</div>
</div>
</div>

<div className="md:col-span-2 rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Môi trường &amp; Trải nghiệm sinh viên mong muốn</span>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-blue-200 text-[#1D4ED8] shadow-2xs flex items-center gap-1.5">
<span>✓</span> Thực hành dự án &amp; Lab công nghệ
                </span>
<span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-blue-200 text-[#1D4ED8] shadow-2xs flex items-center gap-1.5">
<span>✓</span> Mạng lưới OJT / Doanh nghiệp liên kết mạnh
                </span>
<span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-blue-200 text-[#1D4ED8] shadow-2xs flex items-center gap-1.5">
<span>✓</span> Môi trường sử dụng tiếng Anh / Quốc tế
                </span>
<span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-500 flex items-center gap-1.5">
                  Hoạt động Đoàn hội &amp; CLB sôi nổi
                </span>
</div>
</div>
</div>
</section>

<section className="space-y-6 scroll-mt-28" id="section-assessment">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">4. Assessment Profile</h2>
</div>
<p className="text-xs sm:text-sm text-[#667085] mt-1">Tóm tắt kết quả khám phá sở thích và cách bạn thích học &amp; làm việc.</p>
</div>
<div className="flex items-center gap-2 shrink-0">
<span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">Phiên bản v1</span>
<span className="text-xs text-slate-500 font-medium">Làm ngày: 01/10/2026</span>
</div>
</div>

<div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF]/60 via-white to-[#FFF1F2]/60 p-6 sm:p-7 space-y-6">

<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mã tính cách nghề nghiệp RIASEC (Holland Code)</span>
<span className="text-xs font-extrabold text-[#1D4ED8]">Hợp khối ngành STEM &amp; Phân tích</span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

<div className="bg-white rounded-xl p-4 border border-blue-200 shadow-2xs space-y-1.5">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-[#1D4ED8]">I</span>
<span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Điểm trội 88%</span>
</div>
<h4 className="text-xs font-bold text-[#172033]">Investigative (Nghiên cứu)</h4>
<p className="text-[11px] text-[#667085] leading-relaxed">
                    Thích tìm hiểu quy luật, giải thuật, tò mò khám phá và giải mã dữ liệu phức tạp.
                  </p>
</div>

<div className="bg-white rounded-xl p-4 border border-blue-200 shadow-2xs space-y-1.5">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-[#1D4ED8]">C</span>
<span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Điểm trội 76%</span>
</div>
<h4 className="text-xs font-bold text-[#172033]">Conventional (Quy chuẩn)</h4>
<p className="text-[11px] text-[#667085] leading-relaxed">
                    Thích quy trình mạch lạc, cấu trúc dữ liệu chuẩn hóa, tính cẩn trọng và độ tin cậy.
                  </p>
</div>

<div className="bg-white rounded-xl p-4 border border-rose-200 shadow-2xs space-y-1.5">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-[#FB7185]">A</span>
<span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Điểm phụ 65%</span>
</div>
<h4 className="text-xs font-bold text-[#172033]">Artistic (Sáng tạo)</h4>
<p className="text-[11px] text-[#667085] leading-relaxed">
                    Thích tự do tạo giải pháp mới, thiết kế trải nghiệm người dùng, tư duy mở.
                  </p>
</div>
</div>
</div>

<div className="space-y-2 pt-2 border-t border-slate-200/70">
<span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phương thức tiếp cận &amp; Môi trường làm việc ưa thích</span>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  Giải quyết vấn đề logic
                </span>
<span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  Làm việc độc lập + Nhóm chuyên môn nhỏ
                </span>
<span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  Môi trường có tiêu chuẩn chất lượng cao
                </span>
<span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  Ứng dụng công nghệ &amp; AI
                </span>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
<a className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm" href="#">
<span>Xem Báo cáo Định hướng Chuyên sâu (Personal Direction Report)</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</a>
<button className="text-xs font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors py-2 text-center">
                Làm lại bài Assessment (Dữ liệu cũ vẫn được lưu lịch sử)
              </button>
</div>
</div>
</section>
</main></div></div></div></main>
  )
}

export default ProfilePage

