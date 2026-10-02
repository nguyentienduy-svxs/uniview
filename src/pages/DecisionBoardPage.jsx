function DecisionBoardPage() {
  return (
<main className="w-full pt-6 bg-[#f9f9ff] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]"><div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-28 space-y-6 font-['Be_Vietnam_Pro'] text-[#172033]">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm pb-4 border-b border-slate-200/80">
<div className="flex items-center flex-wrap gap-2 text-slate-500 text-xs md:text-sm">
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Trang chủ</a>
<span>/</span>
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Công cụ tuyển sinh</a>
<span>/</span>
<span className="text-slate-900 font-semibold">Decision Board</span>
</div>
<div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 font-bold text-xs tracking-wide">
<svg className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"></path></svg>
<span>✨ BẢNG LỰA CHỌN CỦA BẠN</span>
</div>
</div>

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
<div className="space-y-2.5 max-w-3xl">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 inline-block">DECISION WORKSPACE</span>
<span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
<svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Đã tự động lưu
        </span>
</div>
<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">My University Decision Board</h1>
<p className="text-slate-600 text-sm md:text-base leading-relaxed">Tổ chức những lựa chọn bạn đang cân nhắc và theo dõi điều gì còn cần tìm hiểu thêm.</p>
</div>
<div className="flex flex-wrap items-center gap-3 shrink-0">
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>So sánh (3 đã chọn)</span>
</button>
<button className="bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl px-5 py-2.5 shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>+ Thêm lựa chọn</span>
</button>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 md:p-4 rounded-2xl border border-slate-200/90 shadow-sm">
<div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
<div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold text-sm shrink-0">8</div>
<div>
<p className="text-xs font-bold text-slate-900 leading-tight">8 lựa chọn</p>
<p className="text-[11px] text-slate-500">Đang theo dõi trong bảng</p>
</div>
</div>
<div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/70">
<div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
<div>
<p className="text-xs font-bold text-[#1D4ED8] leading-tight">3 trường ưu tiên</p>
<p className="text-[11px] text-slate-500">Đang cân nhắc nhiều</p>
</div>
</div>
<div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100/70">
<div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm shrink-0">2</div>
<div>
<p className="text-xs font-bold text-amber-900 leading-tight">2 trường cần hỏi</p>
<p className="text-[11px] text-slate-500">Cần thêm thông tin</p>
</div>
</div>
<div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
<div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
<div>
<p className="text-xs font-bold text-slate-700 leading-tight">1 trường lưu trữ</p>
<p className="text-[11px] text-slate-500">Đã loại khỏi danh sách</p>
</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm">
<div className="relative flex-1 max-w-md">
<svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<input className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-all" placeholder="Tìm trường, ngành hoặc ghi chú..." type="text" defaultValue="" />
</div>
<div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
<button className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] text-white font-semibold shrink-0 shadow-sm">Tất cả (8)</button>
<button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition-colors">Có ghi chú (4)</button>
<button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition-colors">Học phí ≤ 35tr (5)</button>
<button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition-colors">Khu vực TP.HCM (6)</button>
</div>
</div>

<div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-slate-700 shadow-sm">
<div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[#1D4ED8] shrink-0 mt-0.5">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<div className="flex-1">
<p className="font-bold text-slate-900 leading-snug">Chưa biết nên đặt lựa chọn ở đâu?</p>
<p className="text-slate-600 mt-0.5 text-xs md:text-[13px] leading-relaxed"><span className="font-semibold text-[#1D4ED8]">“Đang khám phá”</span> phù hợp với những lựa chọn bạn mới tìm hiểu. <span className="font-semibold text-amber-800">“Cần thêm thông tin”</span> giúp bạn giữ lại những trường chưa đủ dữ liệu để cân nhắc trước khi quyết định.</p>
</div>
<button className="text-slate-400 hover:text-slate-600 p-1 shrink-0" title="Đóng hướng dẫn">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">

<div className="bg-slate-50/80 rounded-3xl p-3.5 border border-slate-200/80 space-y-3">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
<h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Đang khám phá</h2>
<span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">2</span>
</div>
<button className="text-slate-400 hover:text-slate-700">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
<p className="text-[11.5px] text-slate-500 px-2 leading-tight">Lựa chọn mới đưa vào, đang đối chiếu bước đầu.</p>
<div className="space-y-3">

<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all space-y-3 group cursor-pointer">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ĐH Công lập</span>
<span>•</span>
<span>Quận 5</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">Đại học Sài Gòn (SGU)</h3>
<p className="text-xs text-slate-600 font-medium">Công nghệ thông tin</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">SGU</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-emerald-700">~20 – 26 tr/năm</span>
</div>
<div className="flex items-center justify-between text-slate-600">
<span>Điểm chuẩn THPT:</span>
<span className="font-semibold text-slate-800">~25.00</span>
</div>
</div>
<div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100 w-full">
<svg className="w-3 h-3 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
<span className="truncate">✨ Học phí rất phù hợp ngân sách</span>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-slate-600 cursor-pointer text-[11.5px]">
<input className="rounded border-slate-300 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>So sánh</span>
</label>
<div className="flex items-center gap-1.5 text-slate-400">
<button className="hover:text-[#1D4ED8] p-1 rounded hover:bg-slate-100 transition-colors" title="Thêm ghi chú">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
</button>
<button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all space-y-3 group cursor-pointer">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">Công lập tự chủ</span>
<span>•</span>
<span>TP.Thủ Đức</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">Trường ĐH Quốc tế (ĐHQG)</h3>
<p className="text-xs text-slate-600 font-medium">Kỹ thuật phần mềm (English)</p>
</div>
<span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">IU</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-amber-900">~45 – 55 tr/năm</span>
</div>
<div className="flex items-center justify-between text-slate-600">
<span>Điểm THPT:</span>
<span className="font-semibold text-slate-800">24.50 – 26.00</span>
</div>
</div>
<div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-[11px] font-medium border border-amber-200/70 w-full">
<svg className="w-3 h-3 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd"></path></svg>
<span className="truncate">⚠️ Học phí cao hơn ngân sách dự kiến</span>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-slate-600 cursor-pointer text-[11.5px]">
<input className="rounded border-slate-300 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>So sánh</span>
</label>
<div className="flex items-center gap-1.5 text-slate-400">
<button className="hover:text-[#1D4ED8] p-1 rounded hover:bg-slate-100 transition-colors" title="Thêm ghi chú">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
</button>
<button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>
</div>
<button className="w-full py-2 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-500 hover:text-[#1D4ED8] hover:border-blue-300 hover:bg-white transition-all flex items-center justify-center gap-1">
<span>+ Thêm trường vào nhóm này</span>
</button>
</div>

<div className="bg-blue-50/40 rounded-3xl p-3.5 border-2 border-blue-200 space-y-3 relative">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-sm font-extrabold text-[#1D4ED8] uppercase tracking-wide">Đang cân nhắc nhiều</h2>
<span className="px-2 py-0.5 rounded-full bg-[#1D4ED8] text-white text-xs font-bold">3</span>
</div>
<button className="text-slate-400 hover:text-slate-700">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
<p className="text-[11.5px] text-slate-600 px-2 leading-tight">Nhóm phù hợp nhất, chuẩn bị chốt danh sách so sánh.</p>
<div className="space-y-3">

<div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-4 shadow-md space-y-3 cursor-pointer relative ring-2 ring-blue-100">
<div className="absolute -top-2.5 right-4 bg-[#1D4ED8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            ƯU TIÊN HÀNG ĐẦU
          </div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded">ĐHQG mũi nhọn</span>
<span>•</span>
<span>TP.Thủ Đức</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug text-[#1D4ED8]">ĐH Công nghệ Thông tin (UIT)</h3>
<p className="text-xs text-slate-600 font-medium">Kỹ thuật phần mềm (Chuẩn)</p>
</div>
<span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold text-xs shrink-0">UIT</span>
</div>
<div className="space-y-1.5 text-xs bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
<div className="flex items-center justify-between text-slate-700">
<span>Học phí:</span>
<span className="font-bold text-[#1D4ED8]">~32 – 35 tr/năm (Đạt)</span>
</div>
<div className="flex items-center justify-between text-slate-700">
<span>Điểm ĐGNL:</span>
<span className="font-bold text-emerald-700">875 (Vào vùng an toàn)</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] text-[11px] font-medium border border-blue-100">
<span className="text-xs">✨</span>
<span className="truncate">Khớp chuẩn ngành &amp; ngân sách</span>
</div>
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/80 text-amber-900 text-[11px] font-medium border border-amber-200/60">
<span className="text-xs">📝</span>
<span className="truncate">Đã hỏi anh khóa trên về lab AI &amp; tuyển dụng</span>
</div>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-[#1D4ED8] font-bold cursor-pointer text-[11.5px]">
<input defaultChecked className="rounded border-blue-400 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>Đang so sánh [✓]</span>
</label>
<div className="flex items-center gap-1.5 text-slate-500">
<button className="hover:text-[#1D4ED8] p-1 rounded hover:bg-slate-100 transition-colors text-blue-600 font-semibold text-[11px]" title="Xem ghi chú">
                Ghi chú (2)
              </button>
<button className="hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all space-y-3 cursor-pointer group">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ĐH Danh tiếng</span>
<span>•</span>
<span>Q.10 / Thủ Đức</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">ĐH Bách Khoa (HCMUT)</h3>
<p className="text-xs text-slate-600 font-medium">Khoa học Máy tính</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">BK</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-[#1D4ED8]">~30 – 35 tr/năm</span>
</div>
<div className="flex items-center justify-between text-slate-600">
<span>ĐGNL ĐHQG:</span>
<span className="font-semibold text-emerald-700">875 (Đạt điều kiện)</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] text-[11px] font-medium border border-blue-100">
<span className="text-xs">✨</span>
<span className="truncate">Danh tiếng đào tạo kỹ thuật top đầu</span>
</div>
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/80 text-amber-900 text-[11px] font-medium border border-amber-200/60">
<span className="text-xs">📝</span>
<span className="truncate">Cần thi thêm chứng chỉ / phỏng vấn hồ sơ</span>
</div>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-[#1D4ED8] font-bold cursor-pointer text-[11.5px]">
<input defaultChecked className="rounded border-blue-400 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>Đang so sánh [✓]</span>
</label>
<div className="flex items-center gap-1.5 text-slate-500">
<button className="hover:text-[#1D4ED8] p-1 rounded hover:bg-slate-100 transition-colors text-blue-600 font-semibold text-[11px]">
                Ghi chú (1)
              </button>
<button className="hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all space-y-3 cursor-pointer group">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ĐH Truyền thống</span>
<span>•</span>
<span>Quận 5</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">ĐH Khoa học Tự nhiên (HCMUS)</h3>
<p className="text-xs text-slate-600 font-medium">Kỹ thuật phần mềm</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">KHTN</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-[#1D4ED8]">~27 – 35 tr/năm</span>
</div>
<div className="flex items-center justify-between text-slate-600">
<span>Điểm THPT:</span>
<span className="font-semibold text-slate-800">~25.50 – 26.00</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] text-[11px] font-medium border border-blue-100">
<span className="text-xs">✨</span>
<span className="truncate">Nền tảng học thuật vững chắc</span>
</div>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-[#1D4ED8] font-bold cursor-pointer text-[11.5px]">
<input defaultChecked className="rounded border-blue-400 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>Đang so sánh [✓]</span>
</label>
<div className="flex items-center gap-1.5 text-slate-500">
<button className="hover:text-[#1D4ED8] p-1 rounded hover:bg-slate-100 transition-colors text-slate-500 text-[11px]">
                + Thêm ghi chú
              </button>
<button className="hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>
</div>
<button className="w-full py-2 border border-dashed border-blue-300 rounded-xl text-xs font-semibold text-[#1D4ED8] hover:bg-white transition-all flex items-center justify-center gap-1">
<span>+ Thêm trường vào nhóm này</span>
</button>
</div>

<div className="bg-amber-50/40 rounded-3xl p-3.5 border border-amber-200/80 space-y-3">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
<h2 className="text-sm font-extrabold text-amber-900 uppercase tracking-wide">Cần thêm thông tin</h2>
<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">2</span>
</div>
<button className="text-slate-400 hover:text-slate-700">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
<p className="text-[11.5px] text-amber-800 px-2 leading-tight">Còn câu hỏi chưa rõ, cần tìm hiểu thêm trước khi chốt.</p>
<div className="space-y-3">

<div className="bg-white rounded-2xl border border-amber-200/70 p-4 shadow-sm hover:shadow-md transition-all space-y-3 cursor-pointer group">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ĐH Công lập</span>
<span>•</span>
<span>TP.Thủ Đức</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">ĐH Sư phạm Kỹ thuật (HCMUTE)</h3>
<p className="text-xs text-slate-600 font-medium">Kỹ thuật Dữ liệu &amp; CNTT</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">SPKT</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-[#1D4ED8]">~30 – 38 tr/năm</span>
</div>
</div>

<div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 space-y-1.5 text-xs text-amber-950">
<p className="font-bold text-amber-900 flex items-center gap-1">
<span>❓ Câu hỏi cần làm rõ:</span>
</p>
<ul className="space-y-1 text-[11px]">
<li className="flex items-center gap-1.5 text-emerald-800 line-through opacity-80">
<span>✓</span><span>Cơ sở vật chất khu High-Tech Park</span>
</li>
<li className="flex items-center gap-1.5 text-amber-900 font-semibold">
<span className="text-amber-600">○</span><span>Học phí chuẩn xác năm 2026 - 2027</span>
</li>
<li className="flex items-center gap-1.5 text-amber-900 font-semibold">
<span className="text-amber-600">○</span><span>Chỉ tiêu xét tuyển theo ĐGNL</span>
</li>
</ul>
</div>
<div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-[11px] font-medium border border-amber-200 w-full">
<span>⚠️ Cần xác minh chỉ tiêu xét tuyển</span>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-slate-600 cursor-pointer text-[11.5px]">
<input className="rounded border-slate-300 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>So sánh</span>
</label>
<div className="flex items-center gap-1.5 text-slate-400">
<button className="hover:text-amber-900 p-1 rounded hover:bg-slate-100 transition-colors text-amber-800 font-semibold text-[11px]">
                1 câu hỏi mở
              </button>
<button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-amber-200/70 p-4 shadow-sm hover:shadow-md transition-all space-y-3 cursor-pointer group">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ĐHQG-HCM</span>
<span>•</span>
<span>TP.Thủ Đức</span>
</div>
<h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors">ĐH Kinh tế - Luật (UEL)</h3>
<p className="text-xs text-slate-600 font-medium">Hệ thống thông tin quản lý (MIS)</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">UEL</span>
</div>
<div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
<div className="flex items-center justify-between text-slate-600">
<span>Học phí:</span>
<span className="font-bold text-[#1D4ED8]">~28 – 34 tr/năm</span>
</div>
</div>

<div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 space-y-1.5 text-xs text-amber-950">
<p className="font-bold text-amber-900 flex items-center gap-1">
<span>❓ Câu hỏi cần làm rõ:</span>
</p>
<ul className="space-y-1 text-[11px]">
<li className="flex items-center gap-1.5 text-emerald-800 line-through opacity-80">
<span>✓</span><span>Tỷ lệ môn công nghệ vs kinh tế</span>
</li>
<li className="flex items-center gap-1.5 text-amber-900 font-semibold">
<span className="text-amber-600">○</span><span>Chương trình thực tập doanh nghiệp năm 3</span>
</li>
</ul>
</div>
<div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] text-[11px] font-medium border border-blue-100 w-full">
<span>✨ Giao thoa Công nghệ &amp; Quản trị</span>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<label className="flex items-center gap-1.5 text-slate-600 cursor-pointer text-[11.5px]">
<input className="rounded border-slate-300 text-[#1D4ED8] focus:ring-0 w-3.5 h-3.5" type="checkbox" />
<span>So sánh</span>
</label>
<div className="flex items-center gap-1.5 text-slate-400">
<button className="hover:text-amber-900 p-1 rounded hover:bg-slate-100 transition-colors text-amber-800 font-semibold text-[11px]">
                1 câu hỏi mở
              </button>
<button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
</div>
</div>
</div>
<button className="w-full py-2 border border-dashed border-amber-300 rounded-xl text-xs font-semibold text-amber-800 hover:bg-white transition-all flex items-center justify-center gap-1">
<span>+ Thêm trường vào nhóm này</span>
</button>
</div>

<div className="bg-slate-100/70 rounded-3xl p-3.5 border border-slate-200 space-y-3">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
<h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-wide">Đã loại</h2>
<span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">1</span>
</div>
<button className="text-slate-400 hover:text-slate-700">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
</button>
</div>
<p className="text-[11.5px] text-slate-500 px-2 leading-tight">Lưu lại lý do để không phải tìm kiếm lại từ đầu.</p>
<div className="space-y-3 opacity-80 hover:opacity-100 transition-opacity">

<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-400 mb-1">
<span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">Doanh nghiệp tư thục</span>
<span>•</span>
<span>Khu CNC Q.9</span>
</div>
<h3 className="text-sm font-bold text-slate-700 leading-snug line-through">Đại học FPT TP.HCM</h3>
<p className="text-xs text-slate-500 font-medium">Kỹ thuật phần mềm</p>
</div>
<span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">FPT</span>
</div>
<div className="space-y-1 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-500">
<div className="flex items-center justify-between">
<span>Học phí:</span>
<span className="font-semibold text-slate-700">~65 – 75 tr/năm</span>
</div>
</div>
<div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-0.5">
<span className="font-bold flex items-center gap-1 text-[11.5px]">
<svg className="w-3.5 h-3.5 text-rose-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path></svg>
              Lý do loại:
            </span>
<p className="text-[11px] leading-relaxed text-rose-700">Học phí vượt quá ngân sách gia đình (mức trần 35tr/năm).</p>
</div>
<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
<button className="text-[#1D4ED8] hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition-colors text-[11.5px]">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Đưa lại vào bảng ↺</span>
</button>
<button className="text-slate-400 hover:text-rose-600 p-1 rounded" title="Xóa vĩnh viễn">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-extrabold text-base shrink-0">
          UIT
        </div>
<div>
<div className="flex items-center gap-2">
<h2 className="text-base md:text-lg font-bold text-slate-900">Chi tiết lựa chọn: ĐH Công nghệ Thông tin (UIT) — Kỹ thuật phần mềm</h2>
<span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-bold text-xs border border-blue-200">Đang cân nhắc nhiều</span>
</div>
<p className="text-xs text-slate-500 mt-0.5">Mã ngành: 7480103 • Chỉ tiêu: 350 • Thuộc khối Đại học Quốc gia TP.HCM</p>
</div>
</div>
<div className="flex items-center gap-2">
<a className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#1D4ED8] hover:bg-blue-100 font-semibold text-xs transition-colors inline-flex items-center gap-1.5" href="#">
<span>Xem trang trường chính thức</span>
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</a>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="lg:col-span-2 space-y-4">
<div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold pb-2">
<button className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] text-white shadow-sm">Ghi chú cá nhân (2)</button>
<button className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">Câu hỏi cần tìm hiểu (1)</button>
<button className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">Lịch sử thay đổi</button>
</div>

<div className="space-y-2.5">
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-bold text-slate-900">Gặp gỡ sinh viên khóa trên</span>
<span className="text-[10px] text-slate-400">18/03/2025</span>
</div>
<p className="text-slate-600 leading-relaxed">Đã hỏi anh Nam (K18). Lab AI ở tầng 4 rất nhiều dự án thực tế với FPT Software và VinAI. Ký túc xá khu B khá tiện đi lại.</p>
</div>
<button className="text-slate-400 hover:text-slate-600 p-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
</button>
</div>
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-bold text-slate-900">Nguyện vọng gia đình</span>
<span className="text-[10px] text-slate-400">14/03/2025</span>
</div>
<p className="text-slate-600 leading-relaxed">Bố mẹ ủng hộ trường này vì gần nhà dì ở Thủ Đức, mức học phí 35 triệu/năm nằm trọn vẹn trong khoản tiết kiệm của gia đình.</p>
</div>
<button className="text-slate-400 hover:text-slate-600 p-1">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
</button>
</div>
</div>

<div className="flex items-center gap-2 pt-1">
<input className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:bg-white" placeholder="Viết thêm ghi chú hoặc câu hỏi mới..." type="text" />
<button className="px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm shrink-0">
            Lưu ghi chú
          </button>
</div>
</div>

<div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 space-y-3 text-xs">
<h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span>
          Thông tin tuyển sinh chính thức
        </h3>
<div className="space-y-2 text-slate-600">
<div className="flex items-center justify-between pb-1.5 border-b border-blue-100/60">
<span>Chỉ tiêu KTPM:</span>
<span className="font-bold text-slate-800">350 sinh viên</span>
</div>
<div className="flex items-center justify-between pb-1.5 border-b border-blue-100/60">
<span>Điểm chuẩn ĐGNL 2024:</span>
<span className="font-bold text-emerald-700">855 / 1200</span>
</div>
<div className="flex items-center justify-between pb-1.5 border-b border-blue-100/60">
<span>Điểm chuẩn THPT 2024:</span>
<span className="font-bold text-slate-800">27.40 (A00, A01)</span>
</div>
<div className="flex items-center justify-between pb-1.5 border-b border-blue-100/60">
<span>Học phí khóa 2025:</span>
<span className="font-bold text-[#1D4ED8]">~35.2 tr/năm</span>
</div>
<div className="flex items-center justify-between">
<span>Thời gian nộp hồ sơ:</span>
<span className="font-medium text-slate-700">15/04 – 15/06</span>
</div>
</div>
</div>
</div>
</div>

<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1180px] z-40">
<div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 px-4 py-3 md:px-6 md:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
<div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
<div className="flex items-center gap-1.5 shrink-0 text-xs font-bold uppercase tracking-wider text-blue-400">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>ĐANG SO SÁNH 3 LỰA CHỌN:</span>
</div>
<div className="flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-white border border-slate-700 font-medium">
            UIT — Kỹ thuật phần mềm
            <button className="text-slate-400 hover:text-white">✕</button>
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-white border border-slate-700 font-medium">
            HCMUT — Khoa học Máy tính
            <button className="text-slate-400 hover:text-white">✕</button>
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-white border border-slate-700 font-medium">
            HCMUS — Kỹ thuật phần mềm
            <button className="text-slate-400 hover:text-white">✕</button>
</span>
<button className="text-xs text-slate-400 hover:text-blue-300 font-medium px-2 py-1 rounded-lg border border-dashed border-slate-600 hover:border-slate-400 transition-colors inline-flex items-center gap-1">
            + Thêm lựa chọn
          </button>
</div>
</div>
<div className="shrink-0 w-full sm:w-auto flex justify-end">
<a className="bg-[#1D4ED8] hover:bg-blue-600 text-white font-semibold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-md inline-flex items-center gap-2" href="#">
<span>Mở bảng so sánh đa chiều (3 trường)</span>
<span>→</span>
</a>
</div>
</div>
</div>
</div></main>
  )
}

export default DecisionBoardPage
