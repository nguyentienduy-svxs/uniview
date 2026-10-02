function ShortlistPage() {
  return (
<main className="w-full pt-6 bg-[#f9f9ff] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]">
<div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pb-16 space-y-8">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm pb-5 border-b border-slate-200/80">
<div className="flex items-center flex-wrap gap-2 text-slate-500 text-xs md:text-sm">
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Trang chủ</a>
<span>/</span>
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Định hướng cá nhân</a>
<span>/</span>
<span className="text-slate-900 font-semibold">Shortlist trường cá nhân hóa</span>
</div>
<div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 font-bold text-xs tracking-wide">
<svg className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"></path></svg>
<span>✨ DỰA TRÊN HỒ SƠ CỦA BẠN</span>
</div>
</div>

<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-2">
<div className="space-y-3 max-w-3xl">
<span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 inline-block">SHORTLIST CÁ NHÂN HÓA</span>
<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">Những trường đáng để bạn khám phá tiếp</h1>
<p className="text-slate-600 text-base md:text-lg leading-relaxed">Dựa trên ngành bạn đang quan tâm và các điều kiện hiện tại, UniView đã nhóm các lựa chọn để bạn dễ xem xét hơn.</p>
</div>
<div className="flex flex-wrap items-center gap-3 shrink-0">
<button className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Chỉnh tiêu chí</span>
</button>
<button className="bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-slate-200 rounded-xl px-4 py-3 transition-colors inline-flex items-center gap-2 shadow-sm">
<svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Xem hồ sơ của tôi</span>
</button>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Bối cảnh hiện tại UniView đang dựa trên</h2>
</div>
<button className="text-xs font-semibold text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1 self-start sm:self-auto">
<span>Chỉnh sửa tiêu chí ⚙️</span>
</button>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Ngành quan tâm</span>
<p className="text-xs font-bold text-slate-900 leading-tight">Kỹ thuật phần mềm</p>
<span className="text-[10px] text-blue-700 font-medium">(Software Eng.)</span>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Khu vực ưu tiên</span>
<p className="text-xs font-bold text-slate-900">TP. Hồ Chí Minh</p>
<span className="text-[10px] text-slate-400">Bán kính học tập</span>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Ngân sách học phí</span>
<p className="text-xs font-bold text-[#1D4ED8]">≤ 35 triệu / năm</p>
<span className="text-[10px] text-slate-400">Chính quy chuẩn</span>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Loại hình trường</span>
<p className="text-xs font-bold text-slate-900">ĐH Công lập / Tự chủ</p>
<span className="text-[10px] text-slate-400">Hệ thống công</span>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Điểm THPT dự kiến</span>
<p className="text-xs font-bold text-emerald-700">25.50 điểm</p>
<span className="text-[10px] text-slate-400">Tổ hợp A00, A01</span>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1">
<span className="text-[11px] font-medium text-slate-500 block">Điểm ĐGNL ĐHQG</span>
<p className="text-xs font-bold text-[#1D4ED8]">875 điểm</p>
<span className="text-[10px] text-emerald-600 font-medium">Top 5% thí sinh</span>
</div>
</div>
<div className="bg-blue-50/70 border border-blue-200/60 rounded-xl px-4 py-2.5 flex items-start gap-2.5 text-xs text-slate-600">
<svg className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Shortlist không phải bảng xếp hạng hay khẳng định đậu/rớt. Các trường được phân nhóm khách quan theo những tiêu chí thực tế bạn đã cung cấp.</span>
</div>
</div>

<div className="overflow-x-auto pb-1">
<div className="flex items-center gap-2 md:gap-3 min-w-max text-xs md:text-sm font-semibold">
<button className="px-4 py-2.5 rounded-xl bg-[#1D4ED8] text-white shadow-sm transition-all">Tất cả nhóm (12)</button>
<button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-[#1D4ED8] transition-all">Đáp ứng nhiều tiêu chí (3)</button>
<button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-[#1D4ED8] transition-all">Đáng khám phá (2)</button>
<button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-[#1D4ED8] transition-all">Có trade-off (2)</button>
<button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-[#1D4ED8] transition-all">Ngoài điều kiện (2)</button>
</div>
</div>

<section className="space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-l-4 border-[#1D4ED8] pl-3 py-0.5">
<div>
<div className="flex items-center gap-2">
<h2 className="text-lg sm:text-xl font-extrabold text-slate-900">NHÓM 1: Đáp ứng nhiều tiêu chí hiện tại</h2>
<span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold">3 trường tối ưu</span>
</div>
<p className="text-xs sm:text-sm text-slate-600 mt-0.5">Các trường trong nhóm này hiện đáp ứng nhiều điều kiện bạn đã cung cấp về ngành, khu vực và ngân sách học phí.</p>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="bg-white rounded-3xl border-2 border-blue-200 shadow-md p-6 flex flex-col justify-between space-y-5 hover:shadow-lg transition-all relative">
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
<svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
              Sát hồ sơ 94%
            </span>
</div>
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">Công lập</span>
<span>•</span>
<span className="flex items-center gap-1 text-slate-600">
<svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  TP. Thủ Đức
                </span>
<span>•</span>
<span className="text-[#1D4ED8] font-bold">Đúng ngành KTPM</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Đại học Công nghệ Thông tin — ĐHQG-HCM (UIT)</h3>
</div>

<div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-500 flex items-center gap-1">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Học phí tham chiếu:
                </span>
<span className="font-bold text-[#1D4ED8]">35 – 45 tr/năm (chuẩn ~35tr)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm chuẩn THPT:</span>
<span className="font-bold text-slate-800">26.50 – 28.10</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm ĐGNL ĐHQG:</span>
<span className="font-bold text-emerald-700">830 – 950 (Bạn: 875 ✓)</span>
</div>
</div>

<div className="space-y-1.5 text-xs text-slate-700">
<p className="font-bold text-slate-900 flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Vì sao xuất hiện:
              </p>
<ul className="space-y-1 pl-2 text-[12px] text-slate-600">
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Có ngành Kỹ thuật phần mềm là thế mạnh mũi nhọn</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Đào tạo tại TP.HCM (Khu đô thị ĐHQG)</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Phương thức xét điểm ĐGNL (Điểm của bạn 875 nằm trong dải an toàn)</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Học phí chương trình chuẩn nằm trong khung ngân sách ≤ 35tr/năm</span></li>
</ul>
</div>

<div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
<span className="font-bold flex items-center gap-1 text-amber-800">⚠️ Điều đáng cân nhắc:</span>
<p className="text-[11.5px] mt-0.5">Điểm chuẩn xét theo điểm thi THPT cạnh tranh rất gắt gao (thường trên 27 điểm).</p>
</div>
</div>

<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-blue-700 font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
<svg className="w-3.5 h-3.5 text-[#1D4ED8]" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span>So sánh [✓]</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-400 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 fill-rose-500 text-rose-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
<span className="text-rose-600 font-semibold">Đã lưu</span>
</button>
<a className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường</span>
<span>→</span>
</a>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-lg transition-all relative">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">Công lập</span>
<span>•</span>
<span className="flex items-center gap-1 text-slate-600">
<svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Q.10 &amp; TP.Thủ Đức
                </span>
<span>•</span>
<span className="text-[#1D4ED8] font-bold">Kỹ thuật Máy tính / KTPM</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Trường ĐH Bách Khoa — ĐHQG-HCM (HCMUT)</h3>
</div>

<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-500 flex items-center gap-1">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Học phí tham chiếu:
                </span>
<span className="font-bold text-[#1D4ED8]">30 – 35 tr/năm (tiêu chuẩn)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Mô hình xét tuyển:</span>
<span className="font-bold text-slate-800">Tổng hợp kết hợp ĐGNL</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Quy mô đào tạo:</span>
<span className="font-bold text-slate-700">Kỹ thuật đầu ngành</span>
</div>
</div>

<div className="space-y-1.5 text-xs text-slate-700">
<p className="font-bold text-slate-900 flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Vì sao xuất hiện:
              </p>
<ul className="space-y-1 pl-2 text-[12px] text-slate-600">
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Đúng khu vực TP.HCM &amp; khối ĐHQG danh tiếng</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Học phí hoàn toàn trong khoảng ngân sách ≤ 35tr/năm</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Phương thức xét tuyển kết hợp đánh giá cao điểm ĐGNL (875 là điểm cộng lớn)</span></li>
</ul>
</div>

<div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
<span className="font-bold flex items-center gap-1 text-amber-800">⚠️ Điều đáng cân nhắc:</span>
<p className="text-[11.5px] mt-0.5">Mô hình xét tuyển kết hợp đòi hỏi điểm học bạ và các hoạt động học thuật bổ trợ toàn diện.</p>
</div>
</div>

<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-blue-700 font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
<svg className="w-3.5 h-3.5 text-[#1D4ED8]" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span>So sánh [✓]</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường</span>
<span>→</span>
</a>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-lg transition-all relative">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">Công lập</span>
<span>•</span>
<span className="flex items-center gap-1 text-slate-600">
<svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Quận 5 &amp; TP.Thủ Đức
                </span>
<span>•</span>
<span className="text-[#1D4ED8] font-bold">Kỹ thuật Phần mềm</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Trường ĐH Khoa học Tự nhiên — ĐHQG-HCM (HCMUS)</h3>
</div>

<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-500 flex items-center gap-1">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  Học phí tham chiếu:
                </span>
<span className="font-bold text-[#1D4ED8]">27 – 35 tr/năm</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm chuẩn THPT:</span>
<span className="font-bold text-slate-800">25.50 – 27.80 (Bạn: 25.5 ✓)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm ĐGNL ĐHQG:</span>
<span className="font-bold text-emerald-700">820 – 900</span>
</div>
</div>

<div className="space-y-1.5 text-xs text-slate-700">
<p className="font-bold text-slate-900 flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Vì sao xuất hiện:
              </p>
<ul className="space-y-1 pl-2 text-[12px] text-slate-600">
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Mức điểm dự kiến 25.5 rất tiệm cận phổ điểm chuẩn ngành KTPM chuẩn</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Học phí công lập rất dễ tiếp cận và ổn định theo thời gian</span></li>
<li className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span><span>Môi trường nghiên cứu nền tảng thuật toán sâu sắc</span></li>
</ul>
</div>

<div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
<span className="font-bold flex items-center gap-1 text-amber-800">⚠️ Điều đáng cân nhắc:</span>
<p className="text-[11.5px] mt-0.5">Cơ sở học tập chia tách giữa Quận 5 và Thủ Đức tùy theo từng năm học.</p>
</div>
</div>

<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-blue-700 font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
<svg className="w-3.5 h-3.5 text-[#1D4ED8]" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span>So sánh [✓]</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường</span>
<span>→</span>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="space-y-4 pt-4">
<div className="border-l-4 border-slate-400 pl-3 py-0.5">
<div className="flex items-center gap-2">
<h2 className="text-lg sm:text-xl font-extrabold text-slate-900">NHÓM 2: Đáng để khám phá</h2>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">2 trường tiềm năng</span>
</div>
<p className="text-xs sm:text-sm text-slate-600 mt-0.5">Những lựa chọn có uy tín đào tạo công nghệ cao, nhiều điểm tương đồng với hồ sơ và mở rộng thêm cơ hội dự phòng an toàn.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">Công lập</span>
<span>•</span>
<span className="text-slate-600">TP. Thủ Đức</span>
<span>•</span>
<span className="text-[#1D4ED8]">Kỹ thuật Phần mềm</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)</h3>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-500">Học phí tham chiếu:</span>
<span className="font-bold text-[#1D4ED8]">~30 – 38 tr/năm</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm chuẩn THPT:</span>
<span className="font-bold text-slate-800">25.20 – 26.80</span>
</div>
</div>
<div className="space-y-1.5 text-xs text-slate-700">
<p className="font-bold text-slate-900 flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Vì sao xuất hiện:
              </p>
<p className="text-slate-600 leading-relaxed text-[12px]">Cơ sở thực hành công nghệ hiện đại, liên kết chặt chẽ với các doanh nghiệp công nghệ cao tại TP.Thủ Đức.</p>
</div>
<div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
<span className="font-bold text-amber-800">⚠️ Điều đáng cân nhắc:</span>
<p className="text-[11.5px] mt-0.5">Chỉ tiêu ngành KTPM hẹp, điểm chuẩn có xu hướng dao động nhẹ theo từng năm.</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>So sánh</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-white hover:bg-slate-50 text-[#1D4ED8] border border-blue-200 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường →</span>
</a>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">Công lập</span>
<span>•</span>
<span className="text-slate-600">Quận 5</span>
<span>•</span>
<span className="text-[#1D4ED8]">Kỹ thuật Phần mềm</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Đại học Sài Gòn (SGU)</h3>
</div>
<div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-500">Học phí tham chiếu:</span>
<span className="font-bold text-emerald-700">~20 – 26 tr/năm (Tiết kiệm)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-500">Điểm chuẩn THPT:</span>
<span className="font-bold text-slate-800">~25.00 – 26.20</span>
</div>
</div>
<div className="space-y-1.5 text-xs text-slate-700">
<p className="font-bold text-slate-900 flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Vì sao xuất hiện:
              </p>
<p className="text-slate-600 leading-relaxed text-[12px]">Vị trí trung tâm Quận 5 thuận tiện, mức học phí thấp nhất trong nhóm công lập đào tạo CNTT, điểm trúng tuyển rất vừa sức.</p>
</div>
<div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
<span className="font-bold text-amber-800">⚠️ Điều đáng cân nhắc:</span>
<p className="text-[11.5px] mt-0.5">Cơ sở vật chất thực hành và liên kết quốc tế vừa phải so với khối ĐHQG.</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>So sánh</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-white hover:bg-slate-50 text-[#1D4ED8] border border-blue-200 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường →</span>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="space-y-4 pt-4">
<div className="border-l-4 border-amber-500 pl-3 py-0.5">
<div className="flex items-center gap-2">
<h2 className="text-lg sm:text-xl font-extrabold text-slate-900">NHÓM 3: Có trade-off quan trọng</h2>
<span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">2 trường cần cân nhắc</span>
</div>
<p className="text-xs sm:text-sm text-slate-600 mt-0.5">Những trường này đào tạo rất tốt ngành Kỹ thuật Phần mềm nhưng có một số yếu tố bạn cần cân nhắc kỹ (học phí cao hơn hoặc loại hình tư thục).</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded">Doanh nghiệp / Tư thục</span>
<span>•</span>
<span className="text-slate-600">Khu Công nghệ Cao Q.9</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Đại học FPT TP.HCM</h3>
</div>
<div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-600">Học phí tham chiếu:</span>
<span className="font-bold text-amber-900">~65 – 75 tr/năm (Vượt ngân sách)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-600">Tuyển sinh:</span>
<span className="font-bold text-slate-800">SchoolRank Top 40%</span>
</div>
</div>
<div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
<span className="font-bold text-amber-900 flex items-center gap-1.5">
<svg className="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd"></path></svg>
                Trade-off thực tế:
              </span>
<p className="leading-relaxed text-[12px]">Học phí cao gấp đôi mức ngân sách dự kiến (35tr), nhưng đổi lại sinh viên được thực tập doanh nghiệp (OJT) có lương từ năm 3 và cơ hội việc làm toàn cầu.</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>So sánh</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường →</span>
</a>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
<span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">Công lập tự chủ</span>
<span>•</span>
<span className="text-slate-600">TP. Thủ Đức</span>
<span>•</span>
<span className="text-slate-700 font-medium">Ngành KTPM tiếng Anh</span>
</div>
<h3 className="text-base font-extrabold text-slate-900 leading-snug">Trường ĐH Quốc tế — ĐHQG-HCM (IU)</h3>
</div>
<div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 space-y-2 text-xs">
<div className="flex items-center justify-between">
<span className="text-slate-600">Học phí tham chiếu:</span>
<span className="font-bold text-amber-900">~45 – 55 tr/năm (Cao hơn ngân sách)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-slate-600">Điểm THPT:</span>
<span className="font-bold text-slate-800">24.50 – 26.00</span>
</div>
</div>
<div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
<span className="font-bold text-amber-900 flex items-center gap-1.5">
<svg className="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd"></path></svg>
                Trade-off thực tế:
              </span>
<p className="leading-relaxed text-[12px]">Chương trình 100% tiếng Anh và mức học phí vượt ngưỡng 35tr, nhưng cấp bằng ĐHQG chuẩn quốc tế và môi trường giao tiếp song ngữ.</p>
</div>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
<button className="flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>So sánh</span>
</button>
<div className="flex items-center gap-2">
<button className="text-slate-500 hover:text-rose-500 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1 text-xs">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
<span>Lưu</span>
</button>
<a className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all" href="#">
<span>Xem trường →</span>
</a>
</div>
</div>
</div>
</div>
</section>

<details className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
<summary className="p-5 md:p-6 cursor-pointer list-none flex items-center justify-between hover:bg-slate-50/70 transition-colors">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="text-xs font-bold uppercase tracking-wider text-slate-500">NHÓM 4</span>
<h2 className="text-base sm:text-lg font-bold text-slate-900">Ngoài một số điều kiện hiện tại (2 trường tham chiếu)</h2>
</div>
<p className="text-xs text-slate-500">Các trường ngoài khu vực TP.HCM hoặc chênh lệch lớn về ngân sách nhưng có chất lượng đào tạo hàng đầu để bạn đối chiếu.</p>
</div>
<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-open:rotate-180 transition-transform">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</summary>
<div className="p-6 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
<div className="flex items-center justify-between">
<h3 className="font-bold text-sm text-slate-900">Trường ĐH Bách Khoa Hà Nội (HUST)</h3>
<span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Ngoài khu vực TP.HCM</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">Đơn vị đào tạo CNTT &amp; KTPM hàng đầu cả nước. Điểm chuẩn cao nhất hệ thống, phù hợp nếu bạn sẵn sàng chuyển ra Hà Nội học tập.</p>
</div>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
<div className="flex items-center justify-between">
<h3 className="font-bold text-sm text-slate-900">Đại học RMIT Việt Nam</h3>
<span className="text-[11px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold">Vượt ngân sách</span>
</div>
<p className="text-xs text-slate-600 leading-relaxed">Cơ sở hiện đại tại Quận 7, môi trường quốc tế chuẩn Úc. Học phí khoảng 300 triệu/năm, vượt mức trần 35 triệu/năm bạn đã thiết lập.</p>
</div>
</div>
</details>

<div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white rounded-3xl border border-blue-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
<div className="space-y-2 max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold">
<span>💡 KỊCH BẢN MÔ PHỎNG (WHAT IF?)</span>
</div>
<h3 className="text-lg md:text-xl font-bold text-slate-900">Nếu tiêu chí của bạn thay đổi thì sao?</h3>
<p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Nếu bạn mở rộng ngân sách lên <strong className="text-slate-900">≤ 50 triệu/năm</strong>, sẽ có thêm <strong className="text-[#1D4ED8]">4 chương trình Tiên tiến &amp; Liên kết quốc tế</strong> tại UIT và HCMUT đáp ứng đầy đủ điều kiện đầu vào của bạn.
        </p>
</div>
<button className="shrink-0 bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-xs md:text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2">
<span>Thử mô phỏng kịch bản (Scenario)</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>

<section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6 text-center max-w-4xl mx-auto">
<div className="space-y-2">
<h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Bạn đã có vài lựa chọn để cân nhắc</h2>
<p className="text-slate-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Lưu các trường bạn quan tâm hoặc đưa chúng vào Decision Board để đối chiếu đa chiều điểm chuẩn, học phí và lộ trình nộp hồ sơ.
        </p>
</div>
<div className="flex flex-wrap items-center justify-center gap-3">
<button className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2">
<span>Mở Decision Board</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 px-5 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2">
<svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Xuất shortlist PDF</span>
</button>
</div>
<p className="text-[11px] text-slate-400 italic">
        * Lưu ý: Điểm chuẩn và học phí các năm trước chỉ mang tính chất tham khảo tại thời điểm tra cứu. Luôn đối chiếu với đề án tuyển sinh chính thức của trường.
      </p>
</section>
</div>
</main>
  )
}

export default ShortlistPage
