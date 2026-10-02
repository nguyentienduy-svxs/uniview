function UniversityComparisonPage() {
  return (
<main className="w-full pt-6 bg-[#f9f9ff] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]"><div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-28 space-y-8 font-['Be_Vietnam_Pro'] text-[#172033]">

<div className="space-y-4 pt-2 border-b border-slate-200/80 pb-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm text-slate-500">
<div className="flex items-center flex-wrap gap-2">
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Trang chủ</a>
<span>/</span>
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Công cụ tuyển sinh</a>
<span>/</span>
<span className="text-slate-900 font-semibold">So sánh đa chiều</span>
</div>
<div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 font-bold text-xs tracking-wide">
<svg className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"></path></svg>
<span>DỰA TRÊN HỒ SƠ CỦA BẠN</span>
</div>
</div>
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
<div className="space-y-2.5 max-w-3xl">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 inline-block">PERSONALIZED COMPARE</span>
<span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
<svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            3 trường đang đối chiếu
          </span>
</div>
<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">So sánh các lựa chọn của bạn</h1>
<p className="text-slate-600 text-sm md:text-base leading-relaxed">Đặt các trường cạnh nhau để nhìn rõ khác biệt về học phí, vị trí, ngành học, tuyển sinh và những trade-off liên quan đến hồ sơ hiện tại.</p>
<p className="text-xs md:text-sm text-slate-500 italic bg-amber-50/70 border border-amber-200/60 rounded-xl px-3.5 py-2 inline-block text-amber-950 font-medium">
          💡 UniView không chọn “trường thắng”. Bạn là người hiểu rõ mục tiêu và đưa ra quyết định cuối cùng.
        </p>
</div>
<div className="flex flex-wrap items-center gap-3 shrink-0">
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm">
<svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Chỉnh sửa hồ sơ tiêu chí</span>
</button>
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm">
<svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
<span>Lưu bảng so sánh</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">

<div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-5 shadow-sm space-y-4 flex flex-col justify-between relative ring-2 ring-blue-100">
<div className="space-y-3">
<div className="flex items-start justify-between gap-2">
<span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[11px]">Lựa chọn 1</span>
<button className="text-xs text-slate-400 hover:text-[#1D4ED8] inline-flex items-center gap-1 font-medium">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Thay trường</span>
</button>
</div>
<div>
<h3 className="text-base font-bold text-slate-900 leading-snug text-[#1D4ED8]">ĐH Công nghệ Thông tin (UIT)</h3>
<p className="text-xs text-slate-500 font-medium">Đại học Quốc gia TP.HCM</p>
<p className="text-sm font-semibold text-slate-800 mt-1">Kỹ thuật phần mềm (Chính quy chuẩn)</p>
</div>
<div className="text-xs text-slate-600 space-y-1">
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>ĐH Công lập tự chủ</p>
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>TP. Thủ Đức, TP.HCM</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#1D4ED8] text-xs font-semibold border border-blue-200 w-full justify-center">
<span>✨ Khớp ngành &amp; ngân sách</span>
</span>
</div>
</div>

<div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
<div className="space-y-3">
<div className="flex items-start justify-between gap-2">
<span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">Lựa chọn 2</span>
<button className="text-xs text-slate-400 hover:text-[#1D4ED8] inline-flex items-center gap-1 font-medium">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Thay trường</span>
</button>
</div>
<div>
<h3 className="text-base font-bold text-slate-900 leading-snug">Trường ĐH Bách Khoa (HCMUT)</h3>
<p className="text-xs text-slate-500 font-medium">Đại học Quốc gia TP.HCM</p>
<p className="text-sm font-semibold text-slate-800 mt-1">Khoa học Máy tính (Đại trà)</p>
</div>
<div className="text-xs text-slate-600 space-y-1">
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>ĐH Công lập tự chủ</p>
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Q.10 &amp; TP.Thủ Đức, TP.HCM</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 w-full justify-center">
<span>🏛 Khối ĐHQG mũi nhọn</span>
</span>
</div>
</div>

<div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
<div className="space-y-3">
<div className="flex items-start justify-between gap-2">
<span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">Lựa chọn 3</span>
<button className="text-xs text-slate-400 hover:text-[#1D4ED8] inline-flex items-center gap-1 font-medium">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Thay trường</span>
</button>
</div>
<div>
<h3 className="text-base font-bold text-slate-900 leading-snug">Đại học FPT TP.HCM</h3>
<p className="text-xs text-slate-500 font-medium">Tập đoàn FPT</p>
<p className="text-sm font-semibold text-slate-800 mt-1">Kỹ thuật phần mềm</p>
</div>
<div className="text-xs text-slate-600 space-y-1">
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Doanh nghiệp tư thục</p>
<p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Khu CNC Q.9, TP.HCM</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200 w-full justify-center">
<span>⚠️ Có trade-off học phí</span>
</span>
</div>
</div>

<div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]">
<div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-3 group-hover:text-[#1D4ED8]">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<p className="text-sm font-bold text-slate-800">+ Thêm trường thứ 4</p>
<p className="text-xs text-slate-500 mt-1 max-w-[180px]">Tối đa 4 trường để đảm bảo góc nhìn so sánh tập trung nhất</p>
</div>
</div>

<div className="sticky top-[74px] z-30 bg-[#FFFDFB]/[0.94] backdrop-blur-md border-y border-slate-200/90 py-2.5 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
<div className="max-w-[1400px] mx-auto flex items-center gap-2 overflow-x-auto text-xs font-medium pb-1 md:pb-0">
<a className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] text-white font-semibold shrink-0 shadow-sm" href="#section-overview">Tổng quan</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-budget">Học phí &amp; Ngân sách</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-location">Vị trí &amp; Cơ sở</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-major">Ngành &amp; Đào tạo</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-admission">Tuyển sinh &amp; Điểm chuẩn</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-scholarships">Học bổng</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-personal-context">Đặt trong hoàn cảnh của bạn</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-tradeoffs">Trade-offs cốt lõi</a>
<a className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1D4ED8] shrink-0 transition-colors" href="#section-missing-info">Thông tin còn thiếu</a>
</div>
</div>

<div className="space-y-8">

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-overview">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">1. Tổng quan nhanh</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Đối chiếu thông tin cơ sở</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left text-xs md:text-sm border-collapse">
<thead>
<tr className="border-b border-slate-200 text-slate-500 text-xs">
<th className="py-2.5 pr-4 w-1/4 font-semibold">Tiêu chí</th>
<th className="py-2.5 px-4 w-1/4 font-bold text-[#1D4ED8]">UIT (ĐHQG-HCM)</th>
<th className="py-2.5 px-4 w-1/4 font-bold text-slate-800">HCMUT (Bách Khoa)</th>
<th className="py-2.5 pl-4 w-1/4 font-bold text-slate-800">Đại học FPT TP.HCM</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3 pr-4 font-semibold text-slate-700">Loại hình trường</td>
<td className="py-3 px-4 text-slate-800 font-medium">Công lập tự chủ</td>
<td className="py-3 px-4 text-slate-800 font-medium">Công lập tự chủ</td>
<td className="py-3 pl-4 text-amber-900 font-semibold bg-amber-50/50 rounded-lg">Doanh nghiệp tư thục (Khác biệt)</td>
</tr>
<tr className="hover:bg-slate-50/60 transition-colors text-slate-500">
<td className="py-3 pr-4 font-semibold text-slate-600">Khu vực hoạt động</td>
<td className="py-3 px-4">TP.HCM (KĐT ĐHQG)</td>
<td className="py-3 px-4">TP.HCM (Q.10 &amp; KĐT ĐHQG)</td>
<td className="py-3 pl-4">TP.HCM (Khu CNC Q.9)</td>
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3 pr-4 font-semibold text-slate-700">Ngành so sánh</td>
<td className="py-3 px-4 text-slate-800">Kỹ thuật phần mềm</td>
<td className="py-3 px-4 text-slate-800">Khoa học Máy tính</td>
<td className="py-3 pl-4 text-slate-800">Kỹ thuật phần mềm</td>
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3 pr-4 font-semibold text-slate-700">Mức học phí chuẩn 2025</td>
<td className="py-3 px-4 font-bold text-[#1D4ED8]">~32 – 35 tr/năm</td>
<td className="py-3 px-4 font-bold text-slate-800">~30 – 35 tr/năm</td>
<td className="py-3 pl-4 font-bold text-amber-900 bg-amber-50/60 rounded-lg">~65 – 75 tr/năm (Cao hơn rõ rệt)</td>
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3 pr-4 font-semibold text-slate-700">Điểm chuẩn THPT 2024</td>
<td className="py-3 px-4 text-slate-800">26.50 (A00, A01)</td>
<td className="py-3 px-4 text-slate-800">Xét kết hợp (Toán trọng số)</td>
<td className="py-3 pl-4 text-slate-800">Xét SchoolRank Top 40%</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-budget">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-emerald-600"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">2. Học phí và Ngân sách</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Ngân sách hồ sơ của bạn: ≤ 35 triệu / năm</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">UIT</h3>
<span className="text-xs font-extrabold text-[#1D4ED8]">~32 – 35 tr/năm</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">Chính quy chuẩn. Mức tăng học phí cam kết không quá 10%/năm theo quy định ĐHQG.</p>
<div className="pt-2 border-t border-blue-100">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-100/80 text-[#1D4ED8] text-xs font-semibold w-full">
<svg className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span>Nằm trọn vẹn trong khoảng ngân sách</span>
</span>
</div>
</div>

<div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">HCMUT</h3>
<span className="text-xs font-extrabold text-[#1D4ED8]">~30 – 35 tr/năm</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">Chương trình tiêu chuẩn (đại trà). Mức học phí duy trì ổn định đối với nhóm ngành Khoa học Máy tính.</p>
<div className="pt-2 border-t border-blue-100">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-100/80 text-[#1D4ED8] text-xs font-semibold w-full">
<svg className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span>Nằm trọn vẹn trong khoảng ngân sách</span>
</span>
</div>
</div>

<div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">FPT</h3>
<span className="text-xs font-extrabold text-amber-900">~65 – 75 tr/năm</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">Bao gồm kỳ học định hướng và chương trình tiếng Anh chuyên sâu. Chia thu theo kỳ (3 kỳ/năm).</p>
<div className="pt-2 border-t border-amber-200/60">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold w-full">
<svg className="w-3.5 h-3.5 text-amber-700 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd"></path></svg>
<span>Cao hơn ngân sách (Vượt ~30 – 40tr/năm)</span>
</span>
</div>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-location">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">3. Vị trí và Cơ sở vật chất</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Khu vực mong muốn: TP.HCM</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
<div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
<p className="font-bold text-slate-900">UIT (TP.Thủ Đức)</p>
<p className="text-slate-600 leading-relaxed">Tọa lạc trọn vẹn trong KĐT ĐHQG-HCM. Tập trung 1 campus duy nhất, ký túc xá rộng rãi khu A &amp; khu B, môi trường sinh viên thuần công nghệ.</p>
<span className="inline-block text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded px-2 py-0.5 mt-2">
            ✓ Nằm trong khu vực ưu tiên • Cần tính toán thời gian đi lại nếu ở nội thành
          </span>
</div>
<div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
<p className="font-bold text-slate-900">HCMUT (Q.10 &amp; TP.Thủ Đức)</p>
<p className="text-slate-600 leading-relaxed">Cơ sở 1 tại Q.10 (trung tâm) và Cơ sở 2 tại Dĩ An / Thủ Đức. Sinh viên thường học xen kẽ theo các năm học (năm 1-2 tại Thủ Đức, năm sau tại Q.10).</p>
<span className="inline-block text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded px-2 py-0.5 mt-2">
            ✓ Nằm trong khu vực ưu tiên • Thuận lợi cơ sở Q.10 cho các năm chuyên ngành
          </span>
</div>
<div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
<p className="font-bold text-slate-900">Đại học FPT (Khu CNC Q.9)</p>
<p className="text-slate-600 leading-relaxed">Tọa lạc ngay trung tâm Khu Công nghệ cao TP.HCM. Campus khép kín, tiện nghi, lân cận nhiều tập đoàn đa quốc gia như Intel, Nidec, FPT Software.</p>
<span className="inline-block text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded px-2 py-0.5 mt-2">
            ✓ Nằm trong khu vực ưu tiên • Khu CNC thuận tiện kết nối thực tập
          </span>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-major">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">4. Ngành học và Định hướng đào tạo</h2>
</div>
<span className="text-xs text-slate-500 font-medium">So sánh triết lý môn học</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs md:text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span>
<h3 className="font-bold text-slate-900">UIT — Kỹ thuật phần mềm</h3>
</div>
<p className="text-slate-600 leading-relaxed text-xs">Tập trung sâu vào quy trình xây dựng và vận hành sản phẩm: Thiết kế kiến trúc phần mềm, kiểm thử (QA/QC), quản lý dự án Agile/Scrum, DevOps và bảo trì hệ thống quy mô lớn.</p>
<p className="text-[11px] text-blue-700 font-semibold bg-blue-50 p-2 rounded-lg border border-blue-100">Đặc trưng: Đi thẳng vào tay nghề kỹ sư phần mềm chuyên nghiệp từ năm 2.</p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs md:text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span>
<h3 className="font-bold text-slate-900">HCMUT — Khoa học Máy tính</h3>
</div>
<p className="text-slate-600 leading-relaxed text-xs">Nền tảng toán học và khoa học tính toán vững chắc. Đào tạo sâu về cấu trúc dữ liệu giải thuật nâng cao, lý thuyết ngôn ngữ máy, hệ thống tính toán phân tán, trí tuệ nhân tạo (AI/ML).</p>
<p className="text-[11px] text-slate-700 font-semibold bg-slate-100 p-2 rounded-lg border border-slate-200">Đặc trưng: Tư duy học thuật sâu, khả năng nghiên cứu &amp; giải quyết bài toán phức tạp.</p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs md:text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-amber-600"></span>
<h3 className="font-bold text-slate-900">FPT — Kỹ thuật phần mềm</h3>
</div>
<p className="text-slate-600 leading-relaxed text-xs">Triết lý đào tạo thực chiến định hướng thị trường. 100% giáo trình chuẩn quốc tế bằng tiếng Anh. Điểm nhấn là kỳ On-the-job Training (OJT) làm việc trực tiếp tại doanh nghiệp có nhận lương.</p>
<p className="text-[11px] text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200/70">Đặc trưng: Thích nghi doanh nghiệp sớm, hoàn thiện kỹ năng ngoại ngữ và làm việc nhóm.</p>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-admission">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">5. Tuyển sinh &amp; Điểm chuẩn tham khảo</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Hồ sơ: THPT 25.5 | ĐGNL 875</span>
</div>
<p className="text-xs text-slate-500 italic">* Dữ liệu tuyển sinh tham khảo 2024–2025. Điểm các năm trước chỉ dùng để tham khảo và không bảo đảm kết quả trúng tuyển năm hiện tại.</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
<div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2.5">
<h3 className="font-bold text-slate-900 text-sm">UIT</h3>
<div className="space-y-1 text-xs text-slate-600">
<p><span className="font-semibold">ĐGNL ĐHQG:</span> Chỉ tiêu ~40-60%. Điểm chuẩn 2024: 855.</p>
<p><span className="font-semibold">Điểm thi THPT:</span> Điểm chuẩn 2024: 26.50 (A00, A01).</p>
</div>
<div className="p-2.5 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
<span className="font-bold text-[#1D4ED8] block">✨ Dựa trên hồ sơ của bạn:</span>
<p className="text-[11px] leading-relaxed">ĐGNL 875 điểm thuộc nhóm an toàn cao (vượt ngưỡng 855). Điểm THPT 25.5 cần cân nhắc nếu xét phương thức tốt nghiệp.</p>
</div>
</div>
<div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2.5">
<h3 className="font-bold text-slate-900 text-sm">HCMUT (Bách Khoa)</h3>
<div className="space-y-1 text-xs text-slate-600">
<p><span className="font-semibold">Phương thức tổng hợp:</span> Điểm ĐGNL chiếm ~70-75% trọng số, kết hợp điểm THPT, học bạ và hoạt động xã hội.</p>
</div>
<div className="p-2.5 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
<span className="font-bold text-[#1D4ED8] block">✨ Dựa trên hồ sơ của bạn:</span>
<p className="text-[11px] leading-relaxed">Điểm ĐGNL 875 tạo lợi thế rất lớn trong công thức tính trọng số. Cần đảm bảo điểm học bạ 3 năm để tối ưu hóa điểm xét tuyển.</p>
</div>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
<h3 className="font-bold text-slate-900 text-sm">Đại học FPT</h3>
<div className="space-y-1 text-xs text-slate-600">
<p><span className="font-semibold">SchoolRank:</span> Top 40% học sinh THPT toàn quốc.</p>
<p><span className="font-semibold">Xét điểm:</span> ĐGNL ĐHQG đạt từ 90/150 (HN) hoặc 750/1200 (HCM).</p>
</div>
<div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
<span className="font-bold text-slate-800 block">✨ Dựa trên hồ sơ của bạn:</span>
<p className="text-[11px] leading-relaxed">Hồ sơ của bạn hoàn toàn thỏa mãn điều kiện sơ tuyển trúng tuyển qua cả SchoolRank lẫn kết quả ĐGNL.</p>
</div>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-scholarships">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-amber-500"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">6. Học bổng và Hỗ trợ tài chính</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Cơ hội giảm nhẹ học phí</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
<h3 className="font-bold text-slate-900">UIT</h3>
<p className="text-slate-600 leading-relaxed text-xs">Học bổng khuyến khích học tập theo từng kỳ (xuất sắc, giỏi). Quỹ học bổng doanh nghiệp tài trợ trực tiếp từ VNPT, Viettel, FPT Software cho sinh viên ngành Kỹ thuật phần mềm.</p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
<h3 className="font-bold text-slate-900">HCMUT</h3>
<p className="text-slate-600 leading-relaxed text-xs">Hệ thống học bổng cựu sinh viên Bách Khoa (Phú Thọ - Bách Khoa) có quy mô rất lớn. Quỹ hỗ trợ sinh viên vượt khó và học bổng ĐHQG-HCM dành cho sinh viên xuất sắc.</p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
<h3 className="font-bold text-slate-900">Đại học FPT</h3>
<p className="text-slate-600 leading-relaxed text-xs">Chương trình học bổng tài năng (30% - 50% - 70% - 100% học phí toàn khóa) thông qua kỳ thi học bổng riêng (Toán logic và Nghị luận xã hội) hoặc giải thưởng quốc gia.</p>
</div>
</div>
</section>

<section className="bg-blue-50/50 rounded-3xl border border-blue-200/80 p-5 md:p-6 space-y-5" id="section-personal-context">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">🎯</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">7. Đặt trong hoàn cảnh của bạn</h2>
</div>
<div className="flex flex-wrap items-center gap-2 text-xs">
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Ngành: KTPM / CNTT</span>
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Ngân sách: ≤ 35tr/năm</span>
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Khu vực: TP.HCM</span>
<span className="px-2 py-0.5 rounded-full bg-white text-blue-700 border border-blue-200 font-bold">ĐGNL: 875 | THPT: 25.5</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm space-y-2.5">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">UIT</h3>
<span className="text-[11px] font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded">Rất khớp tiêu chí</span>
</div>
<ul className="text-xs text-slate-600 space-y-1.5">
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Học phí 32-35tr nằm trong ngân sách</span></li>
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Đúng chuyên sâu ngành Kỹ thuật phần mềm</span></li>
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Điểm ĐGNL 875 có cơ hội trúng tuyển cao</span></li>
</ul>
</div>
<div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm space-y-2.5">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">HCMUT</h3>
<span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">Khớp ngân sách &amp; uy tín</span>
</div>
<ul className="text-xs text-slate-600 space-y-1.5">
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Học phí công lập chuẩn ~30-35tr</span></li>
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Thương hiệu Bách Khoa dẫn đầu kỹ thuật</span></li>
<li className="flex items-center gap-1.5"><span className="text-amber-600">⚠️</span><span>Ngành Khoa học Máy tính học thuật nặng hơn</span></li>
</ul>
</div>
<div className="bg-white rounded-2xl p-4 border border-amber-200/70 shadow-sm space-y-2.5">
<div className="flex items-center justify-between">
<h3 className="font-bold text-slate-900 text-sm">FPT</h3>
<span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">Cần giải pháp tài chính</span>
</div>
<ul className="text-xs text-slate-600 space-y-1.5">
<li className="flex items-center gap-1.5"><span className="text-rose-600">✕</span><span>Học phí vượt mức trần 35tr/năm</span></li>
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Cơ hội việc làm sớm và tiếng Anh tốt</span></li>
<li className="flex items-center gap-1.5"><span className="text-[#1D4ED8]">✓</span><span>Đủ điều kiện xét tuyển ngay</span></li>
</ul>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-tradeoffs">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">⚖️</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">8. Trade-offs cốt lõi bạn cần cân nhắc</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Không có lựa chọn hoàn hảo, chỉ có lựa chọn phù hợp nhất</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
<h3 className="font-bold text-slate-900">UIT (Công nghệ Thông tin)</h3>
<p className="text-slate-600 leading-relaxed text-xs">Học phí và vị trí hoàn toàn nằm trong mục tiêu của gia đình, thế mạnh mũi nhọn về phần mềm ứng dụng.</p>
<p className="text-slate-800 font-semibold bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-amber-950">
<span className="font-bold text-amber-900">Trade-off:</span> Điểm chuẩn THPT cạnh tranh rất cao (26.5), phương án an toàn nhất dựa vào kết quả thi ĐGNL 875.
          </p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
<h3 className="font-bold text-slate-900">HCMUT (Bách Khoa)</h3>
<p className="text-slate-600 leading-relaxed text-xs">Thương hiệu kỹ thuật danh tiếng bậc nhất và học phí công lập trong tầm tay gia đình.</p>
<p className="text-slate-800 font-semibold bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-amber-950">
<span className="font-bold text-amber-900">Trade-off:</span> Khối lượng kiến thức hàn lâm nặng, phải học xen kẽ 2 cơ sở (Q.10 và Thủ Đức), phương thức xét tuyển tổng hợp đòi hỏi hồ sơ toàn diện.
          </p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
<h3 className="font-bold text-slate-900">Đại học FPT</h3>
<p className="text-slate-600 leading-relaxed text-xs">Chương trình thực tập OJT thực chiến từ năm 3, môi trường tiếng Anh và đảm bảo cơ hội việc làm tốt.</p>
<p className="text-slate-800 font-semibold bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-amber-950">
<span className="font-bold text-rose-800">Trade-off:</span> Mức học phí vượt ngân sách dự kiến của gia đình (cần tính toán phương án học bổng tài năng hoặc vay học tập).
          </p>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4" id="section-missing-info">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-slate-400"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">9. Điều gì bạn vẫn cần tìm hiểu thêm?</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Checklist xác minh trước ngày đăng ký</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
<p className="font-bold text-slate-900 text-xs">UIT Checklist</p>
<div className="space-y-1.5">
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Mức học phí năm 2025</span></p>
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Chỉ tiêu xét tuyển ĐGNL</span></p>
<p className="text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50 p-1.5 rounded"><span>?</span><span>Cơ hội học chuyển tiếp hoặc liên kết quốc tế</span></p>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
<p className="font-bold text-slate-900 text-xs">HCMUT Checklist</p>
<div className="space-y-1.5">
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Học phí chương trình đại trà</span></p>
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Công thức tính điểm phương thức tổng hợp</span></p>
<p className="text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50 p-1.5 rounded"><span>?</span><span>Địa điểm học tập cụ thể theo từng học kỳ</span></p>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
<p className="font-bold text-slate-900 text-xs">FPT Checklist</p>
<div className="space-y-1.5">
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Học phí chuẩn chuyên ngành</span></p>
<p className="text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50 p-1.5 rounded"><span>?</span><span>Chi tiết đề thi và điều kiện thi học bổng tài năng</span></p>
<p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Quy trình thực tập doanh nghiệp OJT</span></p>
</div>
</div>
</div>
</section>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-5" id="section-notes">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">📝</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">10. Ghi chú cá nhân cho từng trường</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Tự động đồng bộ với Decision Board</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
<p className="font-bold text-slate-900">UIT Note</p>
<p className="text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
            “Đã hỏi anh Nam K18, lab AI và cơ sở vật chất ở Thủ Đức rất tốt. Đi lại bằng xe buýt hoặc tuyến metro sắp tới cũng thuận tiện.”
          </p>
</div>
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
<p className="font-bold text-slate-900">HCMUT Note</p>
<p className="text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
            “Cần nhờ cô chủ nhiệm xác nhận học bạ 3 năm để nộp phương thức tổng hợp trước hạn ngày 15/5.”
          </p>
</div>
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
<p className="font-bold text-slate-900">FPT Note</p>
<p className="text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
            “Đăng ký thi thử học bổng ngày 15/4 xem có giảm được 50% học phí không, nếu có học bổng mới khả thi.”
          </p>
</div>
</div>

<div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
<div className="text-xs text-slate-500">
          Bảng so sánh này được cập nhật theo dữ liệu mới nhất tuyển sinh 2025.
        </div>
<div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
<button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs md:text-sm transition-colors shadow-sm">
            Lưu kết quả so sánh (PDF)
          </button>
<a className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-xs md:text-sm transition-all shadow-md inline-flex items-center gap-2" href="#">
<span>Đưa 3 lựa chọn này vào Decision Board</span>
<span>→</span>
</a>
</div>
</div>
</section>
</div>
</div></main>
  )
}

export default UniversityComparisonPage
