function AdmissionCheckerPage() {
  return (
<main className="w-full pt-6 bg-[#f9f9ff] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]">
<div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pb-24 space-y-8">

<div className="space-y-4 pt-2 border-b border-slate-200/80 pb-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm text-slate-500">
<div className="flex items-center flex-wrap gap-2">
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Trang chủ</a>
<span className="">/</span>
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Công cụ tuyển sinh</a>
<span className="">/</span>
<span className="text-slate-900 font-semibold">Admission Checker</span>
</div>
<div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs tracking-wide">
<svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path></svg>
<span className="">100% MIỄN PHÍ • KHÔNG PHÍ ẨN</span>
</div>
</div>
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
<div className="space-y-3 max-w-3xl">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 inline-block">CÔNG CỤ TUYỂN SINH • MIỄN PHÍ</span>
<span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
<svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Dữ liệu đối chiếu 2022 – 2024
            </span>
</div>
<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">Kiểm tra điểm với dữ liệu tuyển sinh</h1>
<p className="text-slate-600 text-sm md:text-base leading-relaxed">Đối chiếu điểm hiện tại của bạn với dữ liệu các mùa tuyển sinh trước để có thêm thông tin khi cân nhắc lựa chọn.</p>
<div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5 leading-relaxed">
<svg className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fillRule="evenodd"></path></svg>
<span className=""><strong className="font-bold">Lưu ý khách quan:</strong> Admission Checker chỉ đối chiếu với dữ liệu lịch sử đã công bố chính thức. Kết quả so sánh số học không đảm bảo khả năng trúng tuyển của mùa tuyển sinh hiện tại hoặc tương lai. UniView không sử dụng tỷ lệ dự đoán hay đưa ra cam kết đậu/trượt.</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 shrink-0">
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm">
<svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span className="">Làm mới biểu mẫu</span>
</button>
<a className="bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] font-semibold text-xs md:text-sm border border-blue-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2" href="#section-result">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span className="">Xem kết quả mẫu</span>
</a>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">

<div className="space-y-3">
<div className="flex items-center justify-between">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bước 1 • Chọn phương thức xét tuyển</label>
<span className="text-xs text-blue-600 font-semibold">4 phương thức hỗ trợ</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

<button className="relative text-left p-3.5 rounded-2xl border-2 border-[#1D4ED8] bg-blue-50/40 shadow-sm transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<span className="text-xs font-bold text-[#1D4ED8]">Điểm thi tốt nghiệp THPT</span>
<span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0">
<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</span>
</div>
<p className="text-xs text-slate-500 mt-2">Thang điểm 30 • Xét tổ hợp 3 môn</p>
</button>

<button className="relative text-left p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">ĐGNL ĐHQG TP.HCM</span>
<span className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-blue-400 shrink-0"></span>
</div>
<p className="text-xs text-slate-500 mt-2">Thang điểm 1200 • Kỳ thi ĐHQG</p>
</button>

<button className="relative text-left p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">ĐGNL ĐHQG Hà Nội (HSA)</span>
<span className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-blue-400 shrink-0"></span>
</div>
<p className="text-xs text-slate-500 mt-2">Thang điểm 150 • Trung tâm khảo thí</p>
</button>

<button className="relative text-left p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">Học bạ THPT</span>
<span className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-blue-400 shrink-0"></span>
</div>
<p className="text-xs text-slate-500 mt-2">Tổ hợp 3 học kỳ hoặc cả năm</p>
</button>
</div>
</div>

<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bước 2 • Chọn trường đại học</label>
<div className="relative">
<div className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold text-xs shrink-0">
                  UIT
                </div>
<div>
<h3 className="text-sm font-bold text-slate-900 leading-tight">Trường Đại học Công nghệ Thông tin (UIT)</h3>
<p className="text-xs text-slate-500">Đại học Quốc gia TP.HCM • Mã trường: QST • Khu đô thị ĐHQG</p>
</div>
</div>
<button className="text-xs text-[#1D4ED8] font-semibold hover:underline shrink-0 px-2 py-1">Đổi trường</button>
</div>
</div>
</div>

<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bước 3 • Chọn ngành &amp; chương trình đào tạo</label>
<div className="relative">
<div className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                  IT
                </div>
<div>
<h3 className="text-sm font-bold text-slate-900 leading-tight">Kỹ thuật phần mềm (Chương trình chuẩn)</h3>
<p className="text-xs text-slate-500">Mã ngành: 7480103 • Tổ hợp xét: A00, A01, D01</p>
</div>
</div>
<button className="text-xs text-[#1D4ED8] font-semibold hover:underline shrink-0 px-2 py-1">Đổi ngành</button>
</div>
</div>
</div>

<div className="space-y-3 pt-1">
<div className="flex items-center justify-between">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bước 4 • Nhập điểm số của bạn</label>
<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
<svg className="w-3 h-3 text-[#1D4ED8]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Đã lấy từ hồ sơ mục tiêu của bạn
            </span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div className="sm:col-span-2">
<div className="relative">
<input className="w-full text-xl sm:text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-24" placeholder="VD: 25.50" step="0.05" type="number" defaultValue="25.50" />
<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400 font-semibold">
                  / 30.00 điểm
                </div>
</div>
<p className="text-[11px] text-slate-500 mt-1.5 pl-1">Bao gồm tổng 3 môn xét tuyển + điểm ưu tiên đối tượng/khu vực (nếu có).</p>
</div>
<div>
<select className="w-full h-[54px] text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-2xl px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Tổ hợp: A00 / A01">
<option>Tổ hợp: A00 / A01</option>
<option>Tổ hợp: D01 (Toán, Văn, Anh)</option>
<option>Tổ hợp: D07 (Toán, Hóa, Anh)</option>
</select>
</div>
</div>
</div>

<div className="pt-2">
<button className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-base py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
<span className="">Kiểm tra ngay đối chiếu với dữ liệu lịch sử</span>
<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
<p className="text-center text-xs text-slate-400 mt-2.5">Hoàn toàn bảo mật • Không lưu trữ thông tin khi chưa có sự đồng ý của bạn</p>
</div>
</div>

<div className="lg:col-span-5 space-y-4">

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3.5">
<div className="flex items-center gap-2.5 text-[#1D4ED8]">
<div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h3 className="font-bold text-slate-900 text-sm">Admission Checker giúp bạn làm gì?</h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
            Thay vì xem các bảng điểm chuẩn PDF rời rạc, công cụ đưa dữ liệu về cùng một góc nhìn khách quan theo 4 bước liên hoàn:
          </p>
<div className="space-y-2 pt-1">
<div className="flex items-start gap-2.5 text-xs text-slate-700">
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
<span className=""><strong>Điểm của bạn:</strong> Ghi nhận điểm số theo từng thang đo chính xác.</span>
</div>
<div className="flex items-start gap-2.5 text-xs text-slate-700">
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
<span className=""><strong>Tham chiếu lịch sử:</strong> Đặt cạnh điểm chuẩn chính thức 3 năm liền kề.</span>
</div>
<div className="flex items-start gap-2.5 text-xs text-slate-700">
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
<span className=""><strong>Khoảng chênh lệch:</strong> Tính toán chênh lệch số học cụ thể (+/- điểm).</span>
</div>
<div className="flex items-start gap-2.5 text-xs text-slate-700">
<span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">4</span>
<span className=""><strong>Đa chiều hóa:</strong> Gợi ý các phương thức khác cùng ngành để giảm rủi ro.</span>
</div>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-2.5">
<div className="flex items-center gap-2.5 text-amber-800">
<div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
<svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h3 className="font-bold text-slate-900 text-sm">Nguyên tắc thang điểm độc lập</h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
            Mỗi kỳ thi đo lường năng lực khác nhau. Thang điểm THPT (30) và ĐGNL (1200) <strong className="text-slate-800">hoàn toàn độc lập</strong>, không thể quy đổi cơ học sang nhau nếu trường không ban hành bảng quy đổi chính thức.
          </p>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-2.5">
<div className="flex items-center gap-2.5 text-emerald-800">
<div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h3 className="font-bold text-slate-900 text-sm">Tính minh bạch dữ liệu</h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
            100% dữ liệu được tổng hợp từ Đề án tuyển sinh chính thức và Quyết định công nhận điểm trúng tuyển của Hội đồng tuyển sinh các trường đại học, không sử dụng số liệu phỏng đoán chưa kiểm chứng.
          </p>
</div>
</div>
</div>

<div className="scroll-mt-24 space-y-6" id="section-result">
<div className="flex items-center justify-between border-b border-slate-200 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-lg sm:text-xl font-bold text-slate-900">Kết quả đối chiếu số học</h2>
</div>
<span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">Trạng thái: Hoàn tất đối chiếu</span>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
<div>
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-xs">Mục tiêu kiểm tra</span>
<span className="text-xs text-slate-500">Mã ngành: 7480103</span>
</div>
<h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">ĐH Công nghệ Thông tin (UIT) — Kỹ thuật phần mềm (Chuẩn)</h3>
<p className="text-xs text-slate-500 mt-0.5">Phương thức: Điểm thi tốt nghiệp THPT • Tổ hợp môn: A00, A01</p>
</div>
<div className="shrink-0">
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
<svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Mốc tham chiếu: Mùa tuyển sinh 2024
            </span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
<span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Điểm của bạn</span>
<div className="flex items-baseline gap-1.5">
<span className="text-3xl sm:text-4xl font-extrabold text-slate-900">25.50</span>
<span className="text-xs font-semibold text-slate-500">/ 30 điểm</span>
</div>
<p className="text-xs text-slate-600">Đã bao gồm điểm ưu tiên khu vực / đối tượng theo hồ sơ.</p>
</div>

<div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
<span className="text-xs font-bold uppercase tracking-wider text-slate-600">Điểm chuẩn tham khảo 2024</span>
<div className="flex items-baseline gap-1.5">
<span className="text-3xl sm:text-4xl font-extrabold text-slate-900">26.50</span>
<span className="text-xs font-semibold text-slate-500">/ 30 điểm</span>
</div>
<p className="text-xs text-slate-600">Điểm trúng tuyển chính thức đợt 1 năm 2024 của ngành KTPM.</p>
</div>

<div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-1">
<span className="text-xs font-bold uppercase tracking-wider text-amber-900">Chênh lệch số học</span>
<div className="flex items-baseline gap-1.5">
<span className="text-3xl sm:text-4xl font-extrabold text-amber-900">-1.00</span>
<span className="text-xs font-semibold text-amber-800">điểm so với 2024</span>
</div>
<p className="text-xs text-amber-950 font-medium">Khoảng cách số học thuần túy so với mốc năm liền trước.</p>
</div>
</div>

<div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
<div className="flex items-center justify-between text-xs">
<span className="font-bold text-slate-800">Mô hình đường số so sánh (Thang 20.00 – 30.00)</span>
<span className="text-slate-500">Khoảng cách số học: 1.00 điểm</span>
</div>

<div className="relative pt-6 pb-4">

<div className="w-full h-3 bg-slate-200 rounded-full relative overflow-visible">

<div className="absolute left-[55%] right-[35%] h-full bg-amber-300 rounded-full"></div>
</div>

<div className="absolute top-0 left-[55%] -translate-x-1/2 flex flex-col items-center">
<span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[11px] shadow-sm whitespace-nowrap">Bạn: 25.50</span>
<div className="w-0.5 h-6 bg-blue-600 mt-1"></div>
</div>

<div className="absolute top-0 left-[65%] -translate-x-1/2 flex flex-col items-center">
<span className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold text-[11px] shadow-sm whitespace-nowrap">Chuẩn 2024: 26.50</span>
<div className="w-0.5 h-6 bg-slate-800 mt-1"></div>
</div>
</div>
<div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 pt-2">
<span className="">20.00 điểm</span>
<span className="">24.00</span>
<span className="font-semibold text-slate-600">26.00</span>
<span className="">28.00</span>
<span className="">30.00 điểm</span>
</div>
</div>

<div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 text-xs sm:text-sm text-slate-700 space-y-2">
<div className="flex items-center gap-2">
<svg className="w-4 h-4 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fillRule="evenodd"></path></svg>
<span className="font-bold text-slate-900">Giải nghĩa đối chiếu khách quan:</span>
</div>
<p className="leading-relaxed">
            Điểm bạn nhập (25.50) thấp hơn <strong>1.00 điểm</strong> so với mức trúng tuyển năm 2024 (26.50). Đây là phép so sánh số học đơn thuần với dữ liệu mùa trước. Điểm chuẩn thực tế của mùa tuyển sinh sắp tới phụ thuộc vào độ phân hóa của đề thi, số lượng thí sinh đăng ký nguyện vọng và chỉ tiêu phân bổ cho từng phương thức.
          </p>
<p className="leading-relaxed text-slate-600">
            👉 <em>Khuyến nghị chiến lược:</em> Nếu xét bằng điểm THPT, bạn nên cân nhắc đặt thêm các nguyện vọng dự phòng cùng ngành tại các trường có biên độ phù hợp, hoặc tận dụng kết quả phương thức khác (như ĐGNL) mà bạn có lợi thế lớn hơn.
          </p>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
<div className="flex items-center gap-2">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<h3 className="font-bold text-slate-900 text-base">Diễn biến điểm chuẩn 3 năm gần nhất (UIT — Kỹ thuật phần mềm)</h3>
</div>
<span className="text-xs text-slate-500">Chỉ tiêu toàn ngành ~350 sinh viên/năm</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-blue-100 text-[#1D4ED8] font-bold text-xs">Mùa tuyển sinh 2024</span>
<span className="text-xs font-semibold text-slate-500">Chỉ tiêu: 350</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-bold text-slate-900">26.50</span>
<span className="text-xs text-slate-500">điểm</span>
</div>
<p className="text-xs text-slate-600">Tổ hợp A00, A01. Tiêu chí phụ: Điểm môn Toán ≥ 8.60 đối với thí sinh ở ngưỡng điểm chuẩn.</p>
</div>

<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-xs">Mùa tuyển sinh 2023</span>
<span className="text-xs font-semibold text-slate-500">Chỉ tiêu: 320</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-bold text-slate-900">26.90</span>
<span className="text-xs text-slate-500">điểm</span>
</div>
<p className="text-xs text-slate-600">Tổ hợp A00, A01. Năm 2023 điểm thi môn Toán phân hóa cao, điểm chuẩn duy trì mức cao nhất khối ngành phần mềm.</p>
</div>

<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-xs">Mùa tuyển sinh 2022</span>
<span className="text-xs font-semibold text-slate-500">Chỉ tiêu: 300</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-bold text-slate-900">26.60</span>
<span className="text-xs text-slate-500">điểm</span>
</div>
<p className="text-xs text-slate-600">Tổ hợp A00, A01. Áp dụng quy chế tuyển sinh chung của Bộ Giáo dục &amp; Đào tạo.</p>
</div>
</div>

<div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 my-5 shadow-sm space-y-6">
  
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
    <div>
      <h4 className="font-bold text-slate-800 text-base md:text-lg leading-snug">Diễn biến điểm chuẩn 3 năm gần nhất</h4>
      <p className="text-xs md:text-sm text-slate-500 mt-0.5">Theo dõi xu hướng ổn định của chuẩn trúng tuyển ngành Kỹ thuật Phần mềm (UIT)</p>
    </div>
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">Trường: <strong className="text-slate-900 font-semibold">UIT</strong></span>
      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">Ngành: <strong className="text-slate-900 font-semibold">Kỹ thuật Phần mềm</strong></span>
      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">Tổ hợp: <strong className="text-slate-900 font-semibold">A00 (Toán - Lý - Hóa)</strong></span>
      <span className="bg-blue-50 text-[#1D4ED8] px-2.5 py-1 rounded-lg font-bold border border-blue-100">2022 — 2024</span>
    </div>
  </div>

  
  <div className="relative w-full pt-2">
    <svg viewBox="0 0 800 320" className="w-full h-auto overflow-visible select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.18"></stop>
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.0"></stop>
        </linearGradient>
        <filter id="shadowBadge" x="-20%" y="-20%" width="140%" height="140%">
          <fedropshadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.08"></fedropshadow>
        </filter>
      </defs>

      
      
      <line x1="70" y1="20" x2="760" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3"></line>
      <text x="55" y="24" fill="#64748B" fontSize="11" fontWeight="500" textAnchor="end">27.5</text>

      
      <line x1="70" y1="65" x2="760" y2="65" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3"></line>
      <text x="55" y="69" fill="#64748B" fontSize="11" fontWeight="500" textAnchor="end">27.0</text>

      
      <line x1="70" y1="110" x2="760" y2="110" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3"></line>
      <text x="55" y="114" fill="#64748B" fontSize="11" fontWeight="500" textAnchor="end">26.5</text>

      
      <line x1="70" y1="155" x2="760" y2="155" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3"></line>
      <text x="55" y="159" fill="#64748B" fontSize="11" fontWeight="500" textAnchor="end">26.0</text>

      
      <line x1="70" y1="200" x2="760" y2="200" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 6"></line>
      <text x="55" y="204" fill="#3B82F6" fontSize="11" fontWeight="600" textAnchor="end">25.5</text>

      
      <line x1="70" y1="245" x2="760" y2="245" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3"></line>
      <text x="55" y="249" fill="#64748B" fontSize="11" fontWeight="500" textAnchor="end">25.0</text>

      
      <line x1="70" y1="265" x2="760" y2="265" stroke="#E2E8F0" strokeWidth="1"></line>

      
      <g transform="translate(590, 186)">
        <rect width="170" height="28" rx="14" fill="#1D4ED8"></rect>
        <text x="85" y="18" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">Điểm của bạn: 25.50 (A00)</text>
      </g>

      
      <polygon points="180,101 430,74 680,110 680,265 180,265" fill="url(#lineGradient)"></polygon>

      
      <polyline points="180,101 430,74 680,110" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></polyline>

      
      <g filter="url(#shadowBadge)">
        <rect x="152" y="65" width="56" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1"></rect>
        <text x="180" y="81" fill="#1E293B" fontSize="12" fontWeight="700" textAnchor="middle">26.60</text>
      </g>
      <circle cx="180" cy="101" r="6" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3"></circle>
      <text x="180" y="285" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="middle">Năm 2022</text>

      
      <g filter="url(#shadowBadge)">
        <rect x="402" y="38" width="56" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1"></rect>
        <text x="430" y="54" fill="#1E293B" fontSize="12" fontWeight="700" textAnchor="middle">26.90</text>
      </g>
      <circle cx="430" cy="74" r="6" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3"></circle>
      <text x="430" y="285" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="middle">Năm 2023</text>

      
      <g filter="url(#shadowBadge)">
        <rect x="640" y="72" width="80" height="26" rx="6" fill="#1D4ED8"></rect>
        <text x="680" y="89" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">26.50 (’24)</text>
      </g>
      <circle cx="680" cy="110" r="6.5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3.5"></circle>
      <text x="680" y="285" fill="#1D4ED8" fontSize="12" fontWeight="700" textAnchor="middle">Năm 2024 (Mới nhất)</text>
    </svg>
  </div>

  
  <div className="pt-3 border-t border-slate-100 space-y-3">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
      <span className="font-bold text-slate-800">Phân bổ chỉ tiàu ngành Kỹ thuật Phần mềm (Tổng 350 sinh viån):</span>
      <span className="text-slate-500 font-medium">Đề án UIT 2024</span>
    </div>

    
    <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
      <div className="bg-[#1D4ED8] h-full transition-all" style={{ "width": "40%" }} title="THPT: 40%"></div>
      <div className="bg-[#3B82F6] h-full transition-all" style={{ "width": "35%" }} title="ĐGNL ĐHQG: 35%"></div>
      <div className="bg-[#059669] h-full transition-all" style={{ "width": "15%" }} title="Ưu tiân xét tuyển: 15%"></div>
      <div className="bg-[#475569] h-full transition-all" style={{ "width": "10%" }} title="Khác &amp; Tuyển thẳng: 10%"></div>
    </div>

    
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs pt-0.5">
      <div className="flex items-center gap-2 text-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] shrink-0"></span>
        <span className=""><strong className="font-semibold text-slate-900">THPT:</strong> 40% (140 SV)</span>
      </div>
      <div className="flex items-center gap-2 text-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0"></span>
        <span className=""><strong className="font-semibold text-slate-900">ĐGNL ĐHQG:</strong> 35% (122 SV)</span>
      </div>
      <div className="flex items-center gap-2 text-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#059669] shrink-0"></span>
        <span className=""><strong className="font-semibold text-slate-900">Ưu tiân xét tuyển:</strong> 15% (53 SV)</span>
      </div>
      <div className="flex items-center gap-2 text-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#475569] shrink-0"></span>
        <span className=""><strong className="font-semibold text-slate-900">Khác &amp; Tuyển thẳng:</strong> 10% (35 SV)</span>
      </div>
    </div>
  </div>
</div><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-500">
<div className="flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span className=""><strong>Nguồn:</strong> Đề án tuyển sinh chính thức Trường ĐH Công nghệ Thông tin (UIT) • Cập nhật tuyển sinh 2024</span>
</div>
<a className="text-[#1D4ED8] font-semibold hover:underline inline-flex items-center gap-1" href="#" target="_blank">
<span className="">Xem đề án tuyển sinh gốc</span>
<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</a>
</div>
</div>

<div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
<div>
<h3 className="font-bold text-slate-900 text-base">Các phương thức xét tuyển khác cùng ngành này tại UIT</h3>
<p className="text-xs text-slate-500 mt-0.5">Bạn có thể dùng các kết quả khác để tăng cơ hội vào ngành Kỹ thuật phần mềm</p>
</div>
<span className="text-xs font-semibold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">Đa dạng hóa cơ hội</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-200 p-4 space-y-3 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[11px]">Lợi thế lớn của bạn</span>
<span className="text-xs text-slate-500">Chỉ tiêu ~45%</span>
</div>
<h4 className="font-bold text-slate-900 text-sm">ĐGNL ĐHQG TP.HCM</h4>
<div className="space-y-1 text-xs text-slate-600">
<p className="">• Điểm chuẩn tham khảo 2024: <strong className="text-slate-900">855 / 1200</strong></p>
<p className="">• Điểm trong hồ sơ của bạn: <strong className="text-[#1D4ED8]">875 / 1200</strong></p>
<p className="text-emerald-700 font-semibold bg-emerald-50 p-1.5 rounded border border-emerald-200 mt-1">
                  ✨ Chênh lệch: +20 điểm so với chuẩn 2024
                </p>
</div>
</div>
<button className="w-full py-2 px-3 rounded-xl bg-white hover:bg-blue-50 text-[#1D4ED8] border border-blue-300 font-bold text-xs transition-colors text-center shadow-sm">
              Kiểm tra phương thức này →
            </button>
</div>

<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[11px]">Ưu tiên ĐHQG</span>
<span className="text-xs text-slate-500">Chỉ tiêu ~15%</span>
</div>
<h4 className="font-bold text-slate-900 text-sm">Ưu tiên xét tuyển (UTXT)</h4>
<p className="text-xs text-slate-600 leading-relaxed">
                Áp dụng cho học sinh thuộc top 149 trường THPT chuyên, năng khiếu và trường trọng điểm toàn quốc có học lực Giỏi và hạnh kiểm Tốt 3 năm.
              </p>
</div>
<button className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors text-center">
              Xem điều kiện 149 trường
            </button>
</div>

<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
<div className="space-y-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[11px]">Chứng chỉ quốc tế</span>
<span className="text-xs text-slate-500">Chỉ tiêu ~10%</span>
</div>
<h4 className="font-bold text-slate-900 text-sm">IELTS / SAT kết hợp</h4>
<p className="text-xs text-slate-600 leading-relaxed">
                Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS ≥ 6.0 hoặc TOEFL iBT ≥ 65) kèm kết quả học bạ THPT hoặc điểm thi tốt nghiệp.
              </p>
</div>
<button className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors text-center">
              Xem bảng quy đổi ngoại ngữ
            </button>
</div>
</div>
</div>

<div className="bg-[#172033] rounded-3xl p-6 sm:p-8 text-white space-y-6">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div className="space-y-2.5 max-w-2xl">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
<svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" fillRule="evenodd"></path></svg>
<span className="">ADMISSION ROUTE MAPPING</span>
</div>
<h3 className="text-xl sm:text-2xl font-bold tracking-tight">Bạn có nhiều hơn một con đường tuyển sinh</h3>
<p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Điểm số chỉ là một phần trong bức tranh quyết định. Kết hợp Admission Route Mapping để nhìn thấy toàn bộ lộ trình nộp hồ sơ, hạn nộp lệ phí và chuẩn bị danh sách trường an toàn trên Decision Board.
            </p>
</div>
<div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
<button className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm border border-white/20 transition-all text-center">
              Kiểm tra trường khác
            </button>
<a className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold text-xs md:text-sm transition-all shadow-md text-center inline-flex items-center justify-center gap-1.5" href="#">
<span className="">Thêm vào Decision Board</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</a>
</div>
</div>
<div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-emerald-400"></span>
<span className="">Dữ liệu đã chuẩn hoá theo Đề án tuyển sinh các trường ĐHQG TP.HCM</span>
</div>
<a className="text-blue-300 hover:text-white font-medium transition-colors" href="#">Xem chi tiết hồ sơ trường ĐH Công nghệ Thông tin (UIT) →</a>
</div>
</div>
</div>
</div>
</main>
  )
}

export default AdmissionCheckerPage
