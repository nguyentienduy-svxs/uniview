function WishlistPage() {
  return (
<main className="w-full pt-6 bg-[#FFFDFB] min-h-[calc(100vh-80px)] pb-24">
<div className="max-w-[1260px] mx-auto px-4 md:px-6 lg:px-8 space-y-8">

<section className="rounded-3xl p-6 sm:p-8 border border-blue-100 bg-gradient-to-br from-blue-50/70 via-[#FFFDFB] to-rose-50/40 relative overflow-hidden shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

<div className="lg:col-span-8 space-y-4">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F2] border border-[#FB7185]/30 text-[#FB7185] font-semibold text-xs tracking-wider uppercase">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
<span>LỰA CHỌN ĐÃ LƯU</span>
</div>
<h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
            Wishlist của bạn
          </h1>
<p className="text-[#667085] text-sm sm:text-base max-w-2xl leading-relaxed">
            Lưu lại những ngành, trường và lựa chọn bạn muốn tìm hiểu thêm trước khi đưa chúng vào <span className="font-semibold text-[#1D4ED8]">Decision Board</span> để cân nhắc và thiết lập chiến lược xét tuyển chuyên sâu.
          </p>

<div className="pt-2 grid grid-cols-3 gap-3 max-w-lg">
<div className="bg-white rounded-2xl border border-blue-100/90 shadow-sm p-3.5 sm:px-5 sm:py-3.5 flex flex-col justify-center">
<div className="flex items-baseline gap-1.5">
<span className="text-2xl sm:text-3xl font-black text-[#1D4ED8]">3</span>
<span className="text-xs font-semibold text-[#667085]">trường</span>
</div>
<span className="text-xs text-[#667085] font-medium mt-0.5">Trường đại học</span>
</div>
<div className="bg-white rounded-2xl border border-blue-100/90 shadow-sm p-3.5 sm:px-5 sm:py-3.5 flex flex-col justify-center">
<div className="flex items-baseline gap-1.5">
<span className="text-2xl sm:text-3xl font-black text-[#FBBF24]">4</span>
<span className="text-xs font-semibold text-[#667085]">ngành</span>
</div>
<span className="text-xs text-[#667085] font-medium mt-0.5">Ngành học</span>
</div>
<div className="bg-white rounded-2xl border border-blue-100/90 shadow-sm p-3.5 sm:px-5 sm:py-3.5 flex flex-col justify-center">
<div className="flex items-baseline gap-1.5">
<span className="text-2xl sm:text-3xl font-black text-[#FB7185]">5</span>
<span className="text-xs font-semibold text-[#667085]">lựa chọn</span>
</div>
<span className="text-xs text-[#667085] font-medium mt-0.5">Trường + Ngành</span>
</div>
</div>
</div>

<div className="lg:col-span-4 flex justify-center lg:justify-end">
<div className="relative w-full max-w-sm bg-white/90 backdrop-blur rounded-2xl border border-blue-100 p-5 shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center font-bold">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<span className="text-xs font-bold text-[#172033] uppercase tracking-wide">Trạng thái lưu trữ</span>
</div>
<span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-full">
<span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"></span>
                Tự động đồng bộ
              </span>
</div>
<div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-100 flex items-center justify-between text-xs">
<span className="text-[#667085]">Không gian lưu trữ</span>
<span className="font-semibold text-[#172033]">Cá nhân (12 mục)</span>
</div>
<div className="p-3 bg-[#FFFBEB] rounded-xl border border-amber-100 flex items-start gap-2.5 text-xs text-[#172033]">
<svg className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>Có <strong>5 mục Trường + Ngành</strong> đã đủ dữ kiện điểm và học phí để đưa vào Decision Board.</span>
</div>
<div className="flex items-center justify-between pt-1 text-[11px] text-[#667085]">
<span>☁️ Đã lưu đám mây</span>
<span>Cập nhật 5 phút trước</span>
</div>
</div>
</div>
</div>
</section>

<div className="bg-white border border-slate-200/80 rounded-[28px] p-5 sm:p-8 shadow-sm space-y-8">

<div className="bg-[#F8FAFC] border border-slate-200/70 rounded-2xl p-4 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">

<div className="flex items-center gap-6 overflow-x-auto pb-1 xl:pb-0 scrollbar-none border-b xl:border-b-0 border-slate-200/80">
<button className="text-[14px] text-[#1D4ED8] font-bold border-b-2 border-[#1D4ED8] pb-1.5 whitespace-nowrap">
            Tất cả (12)
          </button>
<button className="text-[14px] text-[#667085] hover:text-[#172033] font-medium pb-1.5 transition-colors whitespace-nowrap">
            Trường đại học (3)
          </button>
<button className="text-[14px] text-[#667085] hover:text-[#172033] font-medium pb-1.5 transition-colors whitespace-nowrap">
            Ngành học (4)
          </button>
<button className="text-[14px] text-[#667085] hover:text-[#172033] font-medium pb-1.5 transition-colors whitespace-nowrap">
            Trường + Ngành (5)
          </button>
</div>

<div className="flex flex-wrap items-center gap-2.5">

<div className="relative flex-1 min-w-[220px]">
<svg className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="11" cy="11" r="8"></circle>
<line x1="21" x2="16.65" y1="21" y2="16.65"></line>
</svg>
<input className="w-full pl-9 pr-3 py-2 bg-white text-xs sm:text-sm text-[#172033] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 placeholder:text-[#667085]" placeholder="Tìm trong Wishlist theo tên trường, ngành..." type="text" />
</div>

<div className="relative">
<select className="appearance-none bg-white hover:bg-slate-50 text-xs sm:text-sm text-[#172033] font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 cursor-pointer">
<option>Khu vực: Tất cả</option>
<option>TP. Hồ Chí Minh</option>
<option>Hà Nội</option>
<option>Đà Nẵng</option>
</select>
<svg className="w-3.5 h-3.5 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M6 9l6 6 6-6"></path>
</svg>
</div>

<div className="relative">
<select className="appearance-none bg-white hover:bg-slate-50 text-xs sm:text-sm text-[#172033] font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 cursor-pointer">
<option>Nhóm ngành: Tất cả</option>
<option>Máy tính &amp; CNTT</option>
<option>Toán &amp; Thống kê</option>
<option>Kinh tế &amp; Quản trị</option>
</select>
<svg className="w-3.5 h-3.5 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M6 9l6 6 6-6"></path>
</svg>
</div>

<div className="relative">
<select className="appearance-none bg-white hover:bg-slate-50 text-xs sm:text-sm text-[#172033] font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 cursor-pointer">
<option>Sắp xếp: Lưu gần đây</option>
<option>Học phí: Thấp đến cao</option>
<option>Điểm chuẩn: Cao xuống thấp</option>
</select>
<svg className="w-3.5 h-3.5 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M6 9l6 6 6-6"></path>
</svg>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-8 xl:col-span-9 space-y-10">

<div>
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-lg font-bold text-[#172033]">Trường + Ngành (5 lựa chọn)</h2>
<span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">Sẵn sàng đưa vào Board</span>
</div>
<span className="text-xs text-[#667085] font-medium">Được quan tâm nhất</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-[20px] p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
<div className="space-y-4">

<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-sm flex items-center justify-center border border-blue-100 shadow-xs">
                        UIT
                      </div>
<div>
<span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">Trường + Ngành</span>
<h3 className="text-base font-bold text-[#172033] mt-0.5">
                          Kỹ thuật Phần mềm (Chương trình Chuẩn)
                        </h3>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] hover:bg-rose-50 hover:text-[#FB7185] flex items-center justify-center transition-colors" title="Đã lưu">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<p className="text-xs text-[#667085] flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-[#667085]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
</svg>
                    ĐH Công nghệ Thông tin — ĐHQG-HCM
                  </p>

<div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 text-center">
<div>
<span className="text-[10px] text-[#667085] block">Học phí</span>
<span className="text-xs font-bold text-[#172033]">~35M / năm</span>
</div>
<div className="border-x border-slate-200 px-1">
<span className="text-[10px] text-[#667085] block">Điểm THPT/ĐGNL</span>
<span className="text-xs font-bold text-[#1D4ED8]">26.50 | 855</span>
</div>
<div>
<span className="text-[10px] text-[#667085] block">Khu vực</span>
<span className="text-xs font-bold text-[#172033]">Thủ Đức, HCM</span>
</div>
</div>

<div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 font-medium flex items-center gap-2">
<span className="text-sm">✨</span>
<span><strong>Dựa trên hồ sơ:</strong> Phù hợp với định hướng CNTT và ngân sách hiện tại.</span>
</div>

<div className="bg-[#FFFBEB] border border-amber-200/70 rounded-xl p-2.5 text-xs text-[#172033] flex items-start gap-2">
<span className="text-sm">📝</span>
<span><strong>Ghi chú:</strong> Ưu tiên số 1 nếu đạt điểm ĐGNL trên 850.</span>
</div>
</div>

<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-[#172033] hover:bg-slate-50 transition-colors">
                      So sánh
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
<button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all">
<span>Vào Board →</span>
</button>
</div>
</div>

<div className="bg-white rounded-[20px] p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
<div className="space-y-4">

<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-sm flex items-center justify-center border border-blue-100 shadow-xs">
                        IU
                      </div>
<div>
<span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">Trường + Ngành</span>
<h3 className="text-base font-bold text-[#172033] mt-0.5">
                          Công nghệ Thông tin
                        </h3>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] hover:bg-rose-50 hover:text-[#FB7185] flex items-center justify-center transition-colors" title="Đã lưu">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<p className="text-xs text-[#667085] flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-[#667085]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
</svg>
                    ĐH Quốc tế — ĐHQG-HCM
                  </p>

<div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 text-center">
<div>
<span className="text-[10px] text-[#667085] block">Học phí</span>
<span className="text-xs font-bold text-[#172033]">~45-50M / năm</span>
</div>
<div className="border-x border-slate-200 px-1">
<span className="text-[10px] text-[#667085] block">Đào tạo</span>
<span className="text-xs font-bold text-[#1D4ED8]">100% T.Anh</span>
</div>
<div>
<span className="text-[10px] text-[#667085] block">ĐGNL 2024</span>
<span className="text-xs font-bold text-[#172033]">815 điểm</span>
</div>
</div>

<div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 font-medium flex items-center gap-2">
<span className="text-sm">✨</span>
<span><strong>Dựa trên hồ sơ:</strong> Đáp ứng tiêu chuẩn ngoại ngữ IELTS 6.5 và chương trình quốc tế.</span>
</div>

<div className="bg-[#FFFBEB] border border-amber-200/70 rounded-xl p-2.5 text-xs text-[#172033] flex items-start gap-2">
<span className="text-sm">📝</span>
<span><strong>Ghi chú:</strong> Cơ hội trao đổi tín chỉ 2+2 với ĐH đối tác tại Úc.</span>
</div>
</div>

<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-[#172033] hover:bg-slate-50 transition-colors">
                      So sánh
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
<button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all">
<span>Vào Board →</span>
</button>
</div>
</div>

<div className="bg-white rounded-[20px] p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
<div className="space-y-4">

<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-sm flex items-center justify-center border border-blue-100 shadow-xs">
                        HCMUS
                      </div>
<div>
<span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">Trường + Ngành</span>
<h3 className="text-base font-bold text-[#172033] mt-0.5">
                          Khoa học Dữ liệu
                        </h3>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] hover:bg-rose-50 hover:text-[#FB7185] flex items-center justify-center transition-colors" title="Đã lưu">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<p className="text-xs text-[#667085] flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-[#667085]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
</svg>
                    ĐH Khoa học Tự nhiên — ĐHQG-HCM
                  </p>

<div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 text-center">
<div>
<span className="text-[10px] text-[#667085] block">Học phí</span>
<span className="text-xs font-bold text-[#172033]">~27M / năm</span>
</div>
<div className="border-x border-slate-200 px-1">
<span className="text-[10px] text-[#667085] block">Điểm THPT</span>
<span className="text-xs font-bold text-[#1D4ED8]">26.10</span>
</div>
<div>
<span className="text-[10px] text-[#667085] block">Khu vực</span>
<span className="text-xs font-bold text-[#172033]">Quận 5, HCM</span>
</div>
</div>

<div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 font-medium flex items-center gap-2">
<span className="text-sm">✨</span>
<span><strong>Dựa trên hồ sơ:</strong> Học phí tối ưu nhất trong nhóm các trường thành viên ĐHQG.</span>
</div>

<div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-[#667085] flex items-center justify-between">
<span className="italic">Chưa có ghi chú riêng.</span>
<button className="text-[#1D4ED8] font-semibold hover:underline">+ Thêm ghi chú</button>
</div>
</div>

<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-[#172033] hover:bg-slate-50 transition-colors">
                      So sánh
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
<button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all">
<span>Vào Board →</span>
</button>
</div>
</div>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]"></span>
<h2 className="text-lg font-bold text-[#172033]">Trường đại học (3 trường)</h2>
<span className="text-xs text-[#667085] px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-slate-200">Cần chọn ngành cụ thể để vào Board</span>
</div>
<span className="text-xs text-[#667085] font-medium">Bản đồ cơ sở &amp; học phí</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div className="space-y-3.5">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-base flex items-center justify-center border border-blue-100">
                        UIT
                      </div>
<div>
<div className="flex items-center gap-2">
<span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFF1F2] text-[#FB7185]">Trường đã lưu</span>
<span className="text-xs text-[#667085]">ĐH Công lập tự chủ</span>
</div>
<h3 className="text-base font-bold text-[#172033] mt-0.5">
                          Đại học Công nghệ Thông tin (ĐHQG-HCM)
                        </h3>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#FB7185] flex items-center justify-center">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#667085]">
<span>📍 Thủ Đức, TP.HCM</span>
<span>•</span>
<span>📚 14 ngành đại học</span>
<span>•</span>
<span className="font-semibold text-[#172033]">Học phí: ~35 - 42M / năm</span>
</div>
<div className="bg-[#FFFBEB] border border-amber-200/70 rounded-xl p-2.5 text-xs text-[#172033] flex items-start gap-2">
<span className="text-sm">📝</span>
<span><strong>Ghi chú:</strong> Tìm hiểu kỹ chính sách học bổng khuyến khích tài năng và mạng lưới OJT doanh nghiệp.</span>
</div>
</div>
<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<a className="text-xs font-bold text-[#1D4ED8] hover:underline" href="#">
                    Xem trường →
                  </a>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] transition-colors">
                      So sánh trường
                    </button>
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all">
                      + Chọn ngành vào Board
                    </button>
</div>
</div>
</div>

<div className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div className="space-y-3.5">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-black text-base flex items-center justify-center border border-blue-100">
                        BK
                      </div>
<div>
<div className="flex items-center gap-2">
<span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFF1F2] text-[#FB7185]">Trường đã lưu</span>
<span className="text-xs text-[#667085]">ĐH Trọng điểm Quốc gia</span>
</div>
<h3 className="text-base font-bold text-[#172033] mt-0.5">
                          Đại học Bách Khoa (ĐHQG-HCM)
                        </h3>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#FB7185] flex items-center justify-center">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#667085]">
<span>📍 Quận 10 &amp; Dĩ An</span>
<span>•</span>
<span>🎯 Xét tuyển tổng hợp nhiều tiêu chí</span>
<span>•</span>
<span className="font-semibold text-[#172033]">Học phí: ~30 - 50M / năm</span>
</div>
<div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-[#667085] flex items-center justify-between">
<span className="italic">Chưa có ghi chú riêng cho trường này.</span>
<button className="text-[#1D4ED8] font-semibold hover:underline">+ Thêm ghi chú</button>
</div>
</div>
<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<a className="text-xs font-bold text-[#1D4ED8] hover:underline" href="#">
                    Xem trường →
                  </a>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] transition-colors">
                      So sánh trường
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
</div>
</div>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></span>
<h2 className="text-lg font-bold text-[#172033]">Ngành học (4 ngành)</h2>
<span className="text-xs text-[#667085] px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-slate-200">Khám phá trường phù hợp với ngành</span>
</div>
<span className="text-xs text-[#667085] font-medium">Đối chiếu theo tố chất &amp; sở thích</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div className="space-y-3.5">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309]">Ngành đã lưu</span>
<span className="text-xs text-[#667085] font-mono">Mã 7480103</span>
</div>
<h3 className="text-base font-bold text-[#172033] mt-1">
                        Kỹ thuật Phần mềm (Software Engineering)
                      </h3>
<p className="text-xs text-[#667085]">Nhóm ngành: Máy tính &amp; CNTT</p>
</div>
<button className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#FB7185] flex items-center justify-center">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<div className="flex flex-wrap items-center gap-2">
<span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-slate-200 text-[#172033]">
                      RIASEC: Investigative, Realistic
                    </span>
<span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">
                      Lương KĐ: 14 - 22M / tháng
                    </span>
</div>
<div className="bg-[#FFFBEB] border border-amber-200/70 rounded-xl p-2.5 text-xs text-[#172033] flex items-start gap-2">
<span className="text-sm">📝</span>
<span><strong>Ghi chú:</strong> Cần tham khảo thêm review các anh chị khóa trước về chuyên sâu Hệ thống lớn hay AI.</span>
</div>
</div>
<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<a className="text-xs font-bold text-[#1D4ED8] hover:underline" href="#">
                    Xem chi tiết ngành →
                  </a>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] transition-colors">
                      Xem 18 trường đào tạo
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
</div>
</div>

<div className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div className="space-y-3.5">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309]">Ngành đã lưu</span>
<span className="text-xs text-[#667085] font-mono">Mã 7480109</span>
</div>
<h3 className="text-base font-bold text-[#172033] mt-1">
                        Khoa học Dữ liệu (Data Science)
                      </h3>
<p className="text-xs text-[#667085]">Nhóm ngành: Toán &amp; CNTT</p>
</div>
<button className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#FB7185] flex items-center justify-center">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
</svg>
</button>
</div>
<div className="flex flex-wrap items-center gap-2">
<span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-slate-200 text-[#172033]">
                      RIASEC: Investigative (Nghiên cứu)
                    </span>
<span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">
                      Nhu cầu: Tăng trưởng 28%
                    </span>
</div>
<div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-[#667085] flex items-center justify-between">
<span className="italic">Chưa có ghi chú riêng.</span>
<button className="text-[#1D4ED8] font-semibold hover:underline">+ Thêm ghi chú</button>
</div>
</div>
<div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
<a className="text-xs font-bold text-[#1D4ED8] hover:underline" href="#">
                    Xem chi tiết ngành →
                  </a>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] transition-colors">
                      Xem 12 trường đào tạo
                    </button>
<button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FB7185] hover:bg-rose-50 transition-colors">
                      Xóa
                    </button>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 xl:col-span-3 sticky top-24 space-y-5">
<div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
<h3 className="text-sm font-bold text-[#172033]">Đang cân nhắc gì tiếp theo?</h3>
</div>
<p className="text-xs text-[#667085] leading-relaxed">
              Các mục lưu trong Wishlist được chuẩn bị để sẵn sàng chuyển qua công cụ phân tích và thiết lập nguyện vọng.
            </p>

<div className="space-y-2.5 pt-1">
<div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-slate-200/70">
<span className="text-[#172033] font-medium flex items-center gap-2">
<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  5 Trường + Ngành
                </span>
<span className="font-bold text-[#1D4ED8]">Đầy đủ</span>
</div>
<div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-slate-200/70">
<span className="text-[#172033] font-medium flex items-center gap-2">
<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  3 mục có ghi chú
                </span>
<span className="font-bold text-amber-600">60%</span>
</div>
<div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-slate-200/70">
<span className="text-[#172033] font-medium flex items-center gap-2">
<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  2 sẵn sàng so sánh
                </span>
<span className="font-bold text-[#1D4ED8]">Khay mở</span>
</div>
</div>
<div className="pt-2">
<a className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all" href="#">
<span>Mở Decision Board →</span>
</a>
</div>
</div>

<div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200/60 text-xs text-[#172033] space-y-1.5">
<span className="font-bold flex items-center gap-1.5 text-amber-800">
              💡 Mẹo tuyển sinh
            </span>
<p className="text-[#667085] leading-relaxed">
              Bạn nên lưu ít nhất 2 phương án An toàn (điểm thấp hơn năng lực 1.5 - 2 điểm) vào Decision Board để hạn chế rủi ro điểm chuẩn tăng.
            </p>
</div>
</div>
</div>

<section className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/40 to-rose-50/50 border border-blue-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
<div className="max-w-2xl space-y-2">
<div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] tracking-wider uppercase">
<span>🎯 BƯỚC TIẾP THEO</span>
</div>
<h2 className="text-xl sm:text-2xl font-bold text-[#172033]">
            Sẵn sàng cân nhắc nghiêm túc hơn?
          </h2>
<p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
            Đưa các lựa chọn Trường + Ngành vào Decision Board để tổ chức, phân loại mức độ ưu tiên, ghi chú chuyên sâu và chuẩn bị kế hoạch hồ sơ xét tuyển tự tin nhất.
          </p>
</div>
<div className="flex flex-wrap items-center gap-3 shrink-0">
<a className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm text-xs sm:text-sm transition-all" href="#">
            Mở Decision Board →
          </a>
<a className="bg-white border border-slate-200 hover:bg-slate-50 text-[#172033] font-medium px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors" href="#">
            Tiếp tục khám phá trường &amp; ngành
          </a>
</div>
</section>
</div>

<section className="pt-4 text-center max-w-3xl mx-auto">
<div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-xs text-[#667085] space-y-1">
<p className="font-semibold text-[#172033]">Minh bạch &amp; Trách nhiệm dữ liệu</p>
<p>Wishlist là không gian lưu trữ và sắp xếp cá nhân của bạn, không đại diện cho dự đoán trúng tuyển hay xác suất đỗ đại học. Mọi số liệu điểm chuẩn, học phí và phương thức xét tuyển đều được UniView trích xuất trực tiếp từ đề án tuyển sinh chính thức của các cơ sở đào tạo.</p>
</div>
</section>
</div>

<div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-slate-300 shadow-xl rounded-full px-5 py-2.5 flex items-center gap-3 sm:gap-4 z-40 max-w-[90vw] overflow-x-auto">
<div className="flex items-center gap-2 shrink-0">
<span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center">3</span>
<span className="text-xs font-semibold text-[#172033] whitespace-nowrap">3 mục đã chọn để thao tác</span>
</div>
<div className="h-4 w-px bg-slate-200 shrink-0"></div>
<button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap shadow-xs transition-colors">
      Thêm vào Decision Board
    </button>
<button className="rounded-full border border-slate-300 hover:bg-slate-100 text-[#172033] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors">
      So sánh
    </button>
<button className="text-xs text-[#667085] hover:text-[#172033] px-2 py-1 font-medium whitespace-nowrap">
      Bỏ chọn
    </button>
</div>

<div className="fixed bottom-24 right-4 sm:right-8 z-30 max-w-xs w-full hidden md:block">
<div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4">
<div className="flex items-center justify-between mb-2.5">
<div className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<rect height="18" rx="1" width="7" x="3" y="3"></rect>
<rect height="18" rx="1" width="7" x="14" y="3"></rect>
</svg>
<span className="text-xs font-bold text-[#172033]">Khay so sánh (2/4)</span>
</div>
<button className="text-xs text-[#667085] hover:text-[#172033]">Thu nhỏ</button>
</div>
<div className="space-y-1.5">
<div className="flex items-center justify-between bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg text-xs">
<span className="font-medium truncate max-w-[190px]">UIT — ĐH Công nghệ Thông tin</span>
<button className="text-[#667085] hover:text-[#FB7185]">×</button>
</div>
<div className="flex items-center justify-between bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg text-xs">
<span className="font-medium truncate max-w-[190px]">HCMUT — ĐH Bách Khoa</span>
<button className="text-[#667085] hover:text-[#FB7185]">×</button>
</div>
</div>
<div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
<span className="text-[11px] text-[#667085]">+ Thêm tối đa 2 mục nữa</span>
<a className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8] hover:underline" href="#">
          So sánh ngay →
        </a>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/60 backdrop-blur-sm hidden" id="decision-modal">
<div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
<div className="flex items-start justify-between">
<div>
<span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">CHUYỂN TIẾP MỤC TIÊU</span>
<h3 className="text-xl font-bold text-[#172033] mt-1">Thêm vào Decision Board</h3>
</div>
<button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#667085] hover:text-[#172033]">
          ×
        </button>
</div>

<div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-blue-100 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-white text-[#1D4ED8] font-bold flex items-center justify-center text-sm shadow-xs border border-blue-100">
          UIT
        </div>
<div>
<p className="text-xs font-semibold text-[#1D4ED8]">Kỹ thuật Phần mềm (Chương trình Chuẩn)</p>
<p className="text-[11px] text-[#667085]">ĐH Công nghệ Thông tin — ĐHQG-HCM</p>
</div>
</div>

<div className="space-y-2">
<label className="block text-xs font-bold text-[#172033]">Chọn cột trên Decision Board của bạn:</label>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
<label className="cursor-pointer border border-slate-200 bg-[#F8FAFC] hover:bg-[#EFF6FF] p-3 rounded-xl flex flex-col items-center text-center transition-colors">
<input defaultChecked className="sr-only" name="board-col" type="radio" />
<span className="text-xs font-bold text-[#172033]">Đang khám phá</span>
<span className="text-[10px] text-[#667085] mt-0.5">Ưu tiên tham khảo</span>
</label>
<label className="cursor-pointer border border-slate-200 bg-[#F8FAFC] hover:bg-[#EFF6FF] p-3 rounded-xl flex flex-col items-center text-center transition-colors">
<input className="sr-only" name="board-col" type="radio" />
<span className="text-xs font-bold text-[#172033]">Cân nhắc cao</span>
<span className="text-[10px] text-[#667085] mt-0.5">Top lựa chọn 1 &amp; 2</span>
</label>
<label className="cursor-pointer border border-slate-200 bg-[#F8FAFC] hover:bg-[#EFF6FF] p-3 rounded-xl flex flex-col items-center text-center transition-colors">
<input className="sr-only" name="board-col" type="radio" />
<span className="text-xs font-bold text-[#172033]">Cần thêm tin</span>
<span className="text-[10px] text-[#667085] mt-0.5">Chờ điểm thi</span>
</label>
</div>
</div>

<div className="space-y-1.5">
<label className="block text-xs font-bold text-[#172033]">Ghi chú mục tiêu hoặc câu hỏi cần giải đáp:</label>
<textarea className="w-full bg-[#F8FAFC] text-[#172033] text-xs rounded-xl p-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 placeholder:text-[#667085]" placeholder="Ví dụ: Cần kiểm tra học bổng IELTS 7.0 hoặc phương thức ĐGNL đợt 1..." rows="3"></textarea>
</div>

<div className="pt-2 flex items-center justify-end gap-3">
<button className="px-4 py-2 rounded-xl text-xs font-medium text-[#667085] hover:bg-slate-100 transition-colors">
          Hủy
        </button>
<button className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-all shadow-sm">
          Thêm vào Board ngay
        </button>
</div>
</div>
</div>
</main>
  )
}

export default WishlistPage
