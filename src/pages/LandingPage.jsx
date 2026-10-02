function LandingPage() {
  return (
<main className="w-full pt-6 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full overflow-hidden bg-surface text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">

<section className="relative w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-2xl">

<div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
<div className="absolute top-28 right-10 w-[540px] h-[540px] bg-primary-fixed/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-10">

<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-fixed text-on-secondary-container shadow-sm mb-space-lg">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-md text-label-md tracking-wider uppercase font-semibold">TƯƠNG LAI KHÔNG CHỈ CÓ MỘT LỰA CHỌN</span>
</div>

<h1 className="font-display text-[42px] sm:text-display leading-[1.08] tracking-tight mb-space-md font-extrabold">
<span className="block text-inverse-surface">Hiểu mình hơn.</span>
<span className="block text-secondary">Khám phá nhiều hơn.</span>
<span className="block text-primary-container">Chọn có cơ sở hơn.</span>
</h1>

<p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-space-xl">
          Từ ngành học đến trường đại học, Uniview giúp bạn nhìn rõ các lựa chọn trước khi tự đưa ra quyết định của chính mình.
        </p>

<div className="flex flex-wrap items-center gap-space-md mb-space-md w-full sm:w-auto">
<a className="inline-flex items-center justify-center px-space-xl py-space-md rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-lg hover:shadow-xl hover:bg-primary transition-all duration-200 group" href="#">
            Bắt đầu khám phá
            <span className="material-symbols-outlined ml-space-xs text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
<a className="inline-flex items-center justify-center px-space-lg py-space-md rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:shadow-md transition-all duration-200" href="#kham-pha-truong">
            Xem các trường
          </a>
</div>

<div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="text-tertiary-fixed-dim text-base">✨</span>
<span className="font-medium text-tertiary">Miễn phí để bắt đầu</span>
<span className="mx-space-xs opacity-40">•</span>
<span className="">Không cần tạo tài khoản ngay</span>
</div>
</div>

<div className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center min-h-[520px] lg:min-h-[580px]">

<div className="absolute inset-4 sm:inset-8 bg-secondary-fixed/50 rounded-[48px] rotate-[-2deg] transition-transform duration-700 hover:rotate-0"></div>
<div className="absolute inset-8 sm:inset-12 bg-surface-container-low rounded-[40px] rotate-[3deg]"></div>

<div className="relative z-10 flex flex-col items-center">
<svg className="w-72 sm:w-88 h-auto drop-shadow-md" fill="none" viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
<ellipse className="text-surface-container-highest/60" cx="170" cy="350" fill="currentColor" rx="140" ry="20"></ellipse>

<path d="M120 180 C110 240, 95 320, 85 360 L255 360 C245 320, 230 240, 220 180 Z" fill="#172033"></path>

<path d="M98 220 C105 170, 130 145, 170 145 C210 145, 235 170, 242 220 C245 250, 235 290, 230 330 L110 330 C105 290, 95 250, 98 220 Z" fill="#1D4ED8"></path>
<path d="M135 145 C150 170, 190 170, 205 145 Z" fill="#EFF6FF"></path>

<circle cx="170" cy="105" fill="#FBD4B4" r="42"></circle>

<path d="M128 100 C125 60, 160 50, 185 52 C210 54, 218 75, 215 95 C208 85, 190 80, 170 85 C145 90, 138 98, 128 100 Z" fill="#121B2E"></path>

<circle cx="156" cy="108" fill="none" r="10" stroke="#121B2E" strokeWidth="2.5"></circle>
<circle cx="184" cy="108" fill="none" r="10" stroke="#121B2E" strokeWidth="2.5"></circle>
<line stroke="#121B2E" strokeWidth="2.5" x1="166" x2="174" y1="108" y2="108"></line>

<path d="M162 126 Q170 134 178 126" fill="none" stroke="#A93349" strokeLinecap="round" strokeWidth="2.5"></path>

<rect fill="#FFFDFB" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" height="55" rx="6" transform="rotate(-6 130 240)" width="80" x="130" y="240"></rect>
<rect fill="#FB7185" height="6" rx="3" transform="rotate(-6 138 248)" width="64" x="138" y="248"></rect>
<rect fill="#CAD3FF" height="4" rx="2" transform="rotate(-6 140 260)" width="46" x="140" y="260"></rect>

<path d="M70 130 L74 140 L84 144 L74 148 L70 158 L66 148 L56 144 L66 140 Z" fill="#FBBF24"></path>
<path d="M270 90 L273 98 L281 101 L273 104 L270 112 L267 104 L259 101 L267 98 Z" fill="#FB7185"></path>
</svg>
</div>


<div className="absolute top-8 left-4 sm:left-10 z-20 bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-lg flex items-center gap-space-xs animate-bounce" style={{ "animationDuration": "3s" }}>
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span className="font-label-lg text-label-lg text-primary-container font-bold">CNTT hay AI?</span>
<span className="text-xs px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-bold">Hot</span>
</div>

<div className="absolute bottom-16 left-2 sm:left-8 z-20 bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-md flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">palette</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">Thiết kế Đồ họa</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Sáng tạo &amp; Truyền thông</span>
</div>
</div>

<div className="absolute top-12 right-2 sm:right-6 z-20 bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-lg flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">payments</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">TP.HCM • ≤ 35M/năm</span>
</div>

<div className="absolute -bottom-4 right-6 sm:right-12 z-20 w-44 sm:w-52 p-space-xs bg-surface-container-lowest rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform">
<div className="relative w-full h-24 rounded-xl overflow-hidden mb-space-xs">
<img className="w-full h-full object-cover" data-alt="Vibrant modern university campus courtyard in Vietnam with lush tropical greenery, students walking together, modern concrete and glass architecture inspired by Fulbright University library commons, natural cinematic daylight." src="/stitch-assets/modern-university-campus.jpg" />
<span className="absolute top-2 right-2 p-1 rounded-full bg-surface-container-lowest/90 text-secondary">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</span>
</div>
<div className="px-space-xs pb-space-xs">
<p className="font-label-md text-label-md text-on-surface font-bold truncate">Đại học Fulbright VN</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Khu công nghệ cao TP.HCM</p>
</div>
</div>

<svg className="absolute inset-0 w-full h-full pointer-events-none z-15" fill="none" viewBox="0 0 500 500">
<path d="M 80 80 Q 150 120 180 180" stroke="#CAD3FF" strokeDasharray="4 4" strokeWidth="2"></path>
<path d="M 400 90 Q 340 180 250 200" stroke="#FE7488" strokeDasharray="4 4" strokeWidth="2"></path>
</svg>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-2xl">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
<div>
<span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold mb-space-xs block">Điểm xuất phát</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface tracking-tight">Nghe giống bạn không?</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-sm md:mt-0">
        Không cần biết mình phải bắt đầu từ đâu. Chọn câu hỏi gần nhất với suy nghĩ của bạn lúc này.
      </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-7 bg-[#FFF1F2] rounded-3xl p-space-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute -right-10 -bottom-10 w-44 h-44 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary font-extrabold uppercase tracking-wider px-space-sm py-space-xs rounded bg-surface-container-lowest/80 inline-block mb-space-md">Trường hợp 01</span>
<h3 className="font-headline-md text-headline-md text-inverse-surface font-bold mb-space-sm leading-snug">
            “Tôi còn chẳng biết mình muốn học gì.”
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
            Sở thích thì nhiều, nhưng biến nó thành ngành nghề thật sự thì mù mịt. Bắt đầu từ bài trắc nghiệm xu hướng nghề nghiệp tự nhiên.
          </p>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-md border-t border-secondary-container/20 relative z-10">

<div className="flex items-center gap-space-xs">
<span className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">psychology</span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">5 phút giải mã sở thích</span>
</div>
<a className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg group-hover:bg-on-secondary-container transition-colors" href="#">
            Khám phá bản thân
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="md:col-span-5 bg-[#EFF6FF] rounded-3xl p-space-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
<div>
<span className="font-label-sm text-label-sm text-primary-container font-extrabold uppercase tracking-wider px-space-sm py-space-xs rounded bg-surface-container-lowest/80 inline-block mb-space-md">Trường hợp 02</span>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-space-sm">
            “Tôi biết ngành rồi, nhưng học ở đâu?”
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
            Cùng là Logistics hay Khoa học Máy tính, nhưng mỗi trường lại có thế mạnh đào tạo, mức học phí và môi trường hoàn toàn khác nhau.
          </p>
</div>
<div className="flex items-center justify-between pt-space-md">
<div className="flex items-center gap-space-xs">
<span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">pin_drop</span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">250+ trường đại học</span>
</div>
<a className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary-container hover:text-primary font-bold" href="#">
            Tìm trường <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="md:col-span-5 bg-[#FFFBEB] rounded-3xl p-space-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
<div>
<span className="font-label-sm text-label-sm text-tertiary font-extrabold uppercase tracking-wider px-space-sm py-space-xs rounded bg-surface-container-lowest/80 inline-block mb-space-md">Trường hợp 03</span>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-space-sm">
            “Tôi có điểm rồi. Giờ xem được những gì?”
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
            Nhập điểm thi THPT, ĐGNL hoặc học bạ để lọc nhanh các cánh cửa trường học đang mở rộng chào đón bạn mà không lo trượt oan.
          </p>
</div>
<div className="flex items-center justify-between pt-space-md">
<div className="flex items-center gap-space-xs">
<span className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[18px]">fact_check</span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Tra cứu theo tổ hợp</span>
</div>
<a className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-tertiary-container hover:text-tertiary font-bold" href="#">
            Kiểm tra lựa chọn <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="md:col-span-7 bg-surface-container-lowest rounded-3xl p-space-xl flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm text-secondary font-extrabold uppercase tracking-wider px-space-sm py-space-xs rounded bg-secondary-fixed/40 inline-block mb-space-md">Trường hợp 04</span>
<h3 className="font-headline-md text-headline-md text-inverse-surface font-bold mb-space-sm">
              “Trường nào cũng có cái hay…”
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-space-md">
              Một bên cơ sở vật chất đẹp, một bên học phí rẻ hơn, một bên gần nhà. Đặt lên bàn so sánh song song để thấy rõ cái giá của từng quyết định.
            </p>
</div>

<div className="hidden sm:flex flex-col gap-1.5 p-2 rounded-xl bg-surface-container-low shadow-inner">
<div className="w-16 h-3 rounded bg-primary-fixed"></div>
<div className="w-12 h-3 rounded bg-secondary-fixed"></div>
<div className="w-14 h-3 rounded bg-tertiary-fixed"></div>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-md">
<div className="flex items-center gap-space-xs">
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[18px]">compare_arrows</span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">So sánh cùng lúc 4 tiêu chí</span>
</div>
<a className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-inverse-surface text-inverse-on-surface font-label-lg text-label-lg hover:bg-on-surface transition-colors" href="#">
            So sánh ngay
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-2xl my-space-md">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="text-center max-w-2xl mx-auto mb-space-2xl">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block mb-space-xs">Lộ trình sáng tỏ</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface font-bold tracking-tight">
          Từ “không biết” đến “à, mình hiểu rồi.”
        </h2>
</div>

<div className="relative w-full py-space-lg">

<div className="hidden md:block absolute top-1/2 left-4 right-4 -translate-y-7 h-2 pointer-events-none z-0">
<svg className="w-full h-6" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 24">
<path d="M0 12 Q250 2 500 12 T1000 12" stroke="#CAD3FF" strokeLinecap="round" strokeWidth="3"></path>
<path d="M0 12 Q250 2 500 12 T600 12" stroke="#1D4ED8" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="3"></path>
</svg>
</div>

<div className="grid grid-cols-1 md:grid-cols-5 gap-gutter relative z-10">

<div className="flex flex-col items-center text-center p-space-md bg-surface-container-lowest md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
<div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary flex items-center justify-center shadow-md mb-space-md transition-transform hover:scale-110">
<span className="material-symbols-outlined text-[26px]">fingerprint</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase mb-1">Bước 01</span>
<h4 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Mình</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sở thích, giá trị sống &amp; năng lực thật</p>
</div>

<div className="flex flex-col items-center text-center p-space-md bg-surface-container-lowest md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
<div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md mb-space-md transition-transform hover:scale-110">
<span className="material-symbols-outlined text-[26px]">category</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase mb-1">Bước 02</span>
<h4 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Ngành</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Bức tranh môn học &amp; triển vọng nghề</p>
</div>

<div className="flex flex-col items-center text-center p-space-md bg-surface-container-lowest md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
<div className="w-14 h-14 rounded-2xl bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center shadow-md mb-space-md transition-transform hover:scale-110">
<span className="material-symbols-outlined text-[26px]">apartment</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold uppercase mb-1">Bước 03</span>
<h4 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Trường</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Môi trường sống, văn hóa &amp; học phí</p>
</div>

<div className="flex flex-col items-center text-center p-space-md bg-surface-container-lowest md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
<div className="w-14 h-14 rounded-2xl bg-surface-variant text-primary flex items-center justify-center shadow-md mb-space-md transition-transform hover:scale-110">
<span className="material-symbols-outlined text-[26px]">balance</span>
</div>
<span className="font-label-sm text-label-sm text-outline font-bold uppercase mb-1">Bước 04</span>
<h4 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">So sánh</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đặt lên bàn cân các được &amp; mất</p>
</div>

<div className="flex flex-col items-center text-center p-space-md bg-surface-container-lowest md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
<div className="w-14 h-14 rounded-2xl bg-on-tertiary-container text-on-surface flex items-center justify-center shadow-lg mb-space-md transition-transform hover:scale-110 ring-4 ring-tertiary-fixed/30">
<span className="material-symbols-outlined text-[26px]">rocket_launch</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold uppercase mb-1">Đích đến</span>
<h4 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Lựa chọn</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tự tin bấm nguyện vọng 1</p>
</div>
</div>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-2xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-5 flex flex-col items-start">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold mb-space-xs">Khám phá ngành nghề</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface font-bold tracking-tight mb-space-md">
          Ngành học không chỉ là một cái tên.
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg">
          Khám phá bạn sẽ học môn gì, thực tế hàng ngày làm gì và những hướng phát triển nào đáng đầu tư thời gian.
        </p>
<a className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary-container hover:text-primary font-bold group" href="#">
          Khám phá 120+ ngành chi tiết
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
</div>

<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gutter">

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform sm:-rotate-1 hover:rotate-0 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-sm py-space-xs rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">Công nghệ thông tin</span>
<span className="material-symbols-outlined text-outline-variant">laptop_mac</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Kỹ thuật Phần mềm</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Xây dựng ứng dụng, hệ thống đám mây và kiến trúc số.</p>
</div>
<div className="pt-space-sm border-t border-outline-variant/30 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Lương khởi điểm tb:</span>
<span className="font-label-md text-label-md text-primary font-bold">14 - 22M/tháng</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform sm:rotate-2 hover:rotate-0 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-semibold">Toán &amp; Thống kê</span>
<span className="material-symbols-outlined text-secondary">query_stats</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Khoa học Dữ liệu</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Tìm quy luật ẩn, mô hình AI và dự đoán tương lai số.</p>
</div>
<div className="pt-space-sm border-t border-outline-variant/30 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Nhu cầu tuyển dụng:</span>
<span className="font-label-md text-label-md text-secondary font-bold">+28% năm 2025</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform sm:rotate-1 hover:rotate-0 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-sm py-space-xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Kinh doanh</span>
<span className="material-symbols-outlined text-tertiary">campaign</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Digital Marketing</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Hiểu hành vi người dùng trực tuyến và lan tỏa thông điệp.</p>
</div>
<div className="pt-space-sm border-t border-outline-variant/30 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Thế mạnh cần:</span>
<span className="font-label-md text-label-md text-tertiary font-bold">Giao tiếp &amp; Phân tích</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform sm:-rotate-2 hover:rotate-0 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-sm py-space-xs rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold">Nghệ thuật &amp; Thiết kế</span>
<span className="material-symbols-outlined text-secondary">brush</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-1">Thiết kế Đồ họa</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Kể câu chuyện qua màu sắc, kiểu chữ và trải nghiệm thị giác.</p>
</div>
<div className="pt-space-sm border-t border-outline-variant/30 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Môi trường làm việc:</span>
<span className="font-label-md text-label-md text-secondary font-bold">Linh hoạt &amp; Tự do</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-2xl" id="kham-pha-truong">
<div className="text-left mb-space-xl">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold mb-space-xs block">Khám phá trường học</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface font-bold tracking-tight">
        Tìm trường mà không bị ngợp trong hàng tá thông tin.
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
        Hệ thống dữ liệu tuyển sinh quy chuẩn minh bạch: học phí thực tế, chỉ tiêu, và môi trường học tập.
      </p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-6 relative">
<div className="relative w-full h-[440px] rounded-3xl overflow-hidden shadow-xl">
<img className="w-full h-full object-cover" data-alt="Modern Vietnamese university campus courtyard full of greenery, tropical palm trees, contemporary concrete and glass library buildings, energetic students gathered, soft cinematic natural lighting." src="/stitch-assets/modern-university-campus.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent"></div>
<div className="absolute bottom-6 left-6 right-6 text-on-primary">
<div className="flex items-center gap-2 mb-1">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Góc nhìn trải nghiệm</span>
</div>
<p className="font-headline-sm text-headline-sm font-bold">Không gian học ảnh hưởng trực tiếp đến 4 năm thanh xuân của bạn.</p>
</div>
</div>

<div className="absolute -top-4 -right-4 bg-surface-container-lowest p-space-md rounded-2xl shadow-xl hidden sm:flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">school</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant">Tổng hợp</p>
<p className="font-headline-sm text-headline-sm text-inverse-surface font-bold leading-tight">250+ Trường ĐH</p>
</div>
</div>
</div>

<div className="lg:col-span-6 bg-surface-container-low p-space-xl rounded-3xl shadow-sm">

<div className="relative mb-space-md">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full bg-surface-container-lowest pl-12 pr-4 py-space-sm rounded-xl font-body-sm text-body-sm text-on-surface shadow-sm outline-none cursor-default" placeholder="Tìm trường hoặc ngành..." readOnly type="text" defaultValue="Khoa học Máy tính" />
</div>

<div className="flex flex-wrap gap-space-xs mb-space-lg">
<span className="px-space-md py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1">
            TP.HCM <span className="material-symbols-outlined text-[14px]">check</span>
</span>
<span className="px-space-md py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium">
            Công lập tự chủ
          </span>
<span className="px-space-md py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium">
            ≤ 40M/năm
          </span>
</div>

<div className="space-y-space-sm">

<div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center font-bold text-primary text-base">
                UIT
              </div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface">ĐH Công nghệ Thông tin - ĐHQG HCM</h4>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span className="text-primary font-semibold">32M – 48M / năm</span>
<span className="">•</span>
<span className="">Thủ Đức, TP.HCM</span>
</div>
</div>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</div>

<div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center font-bold text-secondary text-base">
                UEH
              </div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface">Đại học Kinh tế TP.HCM</h4>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span className="text-primary font-semibold">28M – 42M / năm</span>
<span className="">•</span>
<span className="">Quận 3, TP.HCM</span>
</div>
</div>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</div>

<div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center font-bold text-tertiary text-base">
                HCMUT
              </div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface">ĐH Bách Khoa - ĐHQG HCM</h4>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span className="text-primary font-semibold">30M – 50M / năm</span>
<span className="">•</span>
<span className="">Quận 10, TP.HCM</span>
</div>
</div>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="bg-[#FFF1F2] rounded-3xl p-space-lg sm:p-space-2xl shadow-sm">
<div className="text-center max-w-xl mx-auto mb-space-xl">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold block mb-1">Đối chiếu đa chiều</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface font-bold tracking-tight">
          Cùng đặt lên bàn rồi nhìn cho rõ.
        </h2>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-xl">

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase">Lựa chọn A</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">Công lập trọng điểm</span>
</div>
<h4 className="font-headline-sm text-headline-sm font-bold text-inverse-surface mb-space-md">ĐH Khoa học Tự nhiên</h4>
<div className="space-y-space-sm text-left">
<div>
<span className="font-label-sm text-label-sm text-outline">Học phí trung bình:</span>
<p className="font-label-lg text-label-lg font-bold text-primary">~27 Triệu / năm</p>
<div className="w-full bg-surface-container h-2 rounded-full mt-1 overflow-hidden">
<div className="bg-primary h-full w-[45%] rounded-full"></div>
</div>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Vị trí cơ sở:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">Quận 5 &amp; Thủ Đức (TP.HCM)</p>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Thế mạnh chính:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">Nghiên cứu nền tảng &amp; Đội ngũ giảng viên</p>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm border-t border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Phương thức: THPT (26.5đ) + ĐGNL</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md flex flex-col justify-between ring-2 ring-secondary/30 relative">
<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-secondary text-on-secondary rounded-full font-label-sm text-label-sm font-bold shadow-sm">
            Bạn đang cân nhắc
          </div>
<div>
<div className="flex items-center justify-between mb-space-sm mt-1">
<span className="font-label-sm text-label-sm font-bold text-secondary uppercase">Lựa chọn B</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold">Tự chủ quốc tế</span>
</div>
<h4 className="font-headline-sm text-headline-sm font-bold text-inverse-surface mb-space-md">ĐH Quốc Tế - ĐHQG</h4>
<div className="space-y-space-sm text-left">
<div>
<span className="font-label-sm text-label-sm text-outline">Học phí trung bình:</span>
<p className="font-label-lg text-label-lg font-bold text-secondary">~50 Triệu / năm</p>
<div className="w-full bg-surface-container h-2 rounded-full mt-1 overflow-hidden">
<div className="bg-secondary h-full w-[70%] rounded-full"></div>
</div>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Vị trí cơ sở:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">Khu ĐHQG Thủ Đức</p>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Thế mạnh chính:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">100% Tiếng Anh &amp; Trao đổi sinh viên</p>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm border-t border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Phương thức: IELTS + Điểm THPT</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase">Lựa chọn C</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-semibold">Ứng dụng doanh nghiệp</span>
</div>
<h4 className="font-headline-sm text-headline-sm font-bold text-inverse-surface mb-space-md">Đại học FPT TP.HCM</h4>
<div className="space-y-space-sm text-left">
<div>
<span className="font-label-sm text-label-sm text-outline">Học phí trung bình:</span>
<p className="font-label-lg text-label-lg font-bold text-tertiary">~65 Triệu / năm</p>
<div className="w-full bg-surface-container h-2 rounded-full mt-1 overflow-hidden">
<div className="bg-tertiary-fixed-dim h-full w-[85%] rounded-full"></div>
</div>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Vị trí cơ sở:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">Khu Công Nghệ Cao (Quận 9)</p>
</div>
<div className="pt-space-xs">
<span className="font-label-sm text-label-sm text-outline">Thế mạnh chính:</span>
<p className="font-body-sm text-body-sm text-inverse-surface font-medium">Thực tập tại DN (On the Job Training)</p>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm border-t border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Phương thức: SchoolRank top 40%</span>
</div>
</div>
</div>

<div className="text-center p-space-md bg-surface-container-lowest/80 rounded-2xl max-w-2xl mx-auto shadow-sm">
<p className="font-body-lg text-body-lg text-inverse-surface font-semibold">
          “Không phải tìm trường thắng cuộc. Mà là hiểu mỗi lựa chọn đổi lại điều gì.”
        </p>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-2xl">
<div className="text-center max-w-2xl mx-auto mb-space-2xl">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block mb-1">Góc nhìn cá nhân</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-surface font-bold tracking-tight mb-space-xs">
        Không phải ai cũng có cùng một câu trả lời.
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
        Điểm số, ngân sách, vị trí địa lý và định hướng phát triển tạo nên hoàn cảnh riêng của mỗi người.
      </p>
</div>

<div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-gutter p-space-xl bg-surface-container-lowest rounded-3xl shadow-lg">

<div className="w-full md:w-64 p-space-md rounded-2xl bg-primary-fixed/25 flex flex-col text-left">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary-container text-[20px]">recommend</span>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Đáng khám phá</span>
</div>
<p className="font-headline-sm text-headline-sm font-bold text-inverse-surface">ĐH Bách Khoa</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Phù hợp hoàn toàn ngân sách &amp; đúng định hướng chuyên ngành IT mong muốn.</p>
</div>

<div className="flex flex-col items-center justify-center p-space-lg bg-surface-container-low rounded-full w-60 h-60 shrink-0 shadow-inner relative text-center">
<div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md mb-2">
<span className="material-symbols-outlined text-[32px]">face</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase mb-1">Hồ sơ của bạn</span>
<div className="flex flex-wrap items-center justify-center gap-1 max-w-[180px]">
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">CNTT</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-bold">TP.HCM</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-bold">≤ 35M/năm</span>
</div>
</div>

<div className="w-full md:w-64 p-space-md rounded-2xl bg-secondary-fixed/30 flex flex-col text-left">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-secondary text-[20px]">help_center</span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Cần cân nhắc</span>
</div>
<p className="font-headline-sm text-headline-sm font-bold text-inverse-surface">Đại học RMIT</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Chương trình đào tạo xuất sắc nhưng học phí vượt trên mức ưu tiên hiện tại.</p>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-lg">
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter p-space-lg bg-surface-container-low rounded-3xl">

<div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[22px]">verified_user</span>
</div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface mb-1">Có nguồn kiểm chứng</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dữ liệu tuyển sinh được ghi rõ nguồn từ đề án chính thức của Bộ GD&amp;ĐT và các trường.</p>
</div>
</div>

<div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">lightbulb</span>
</div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface mb-1">Có giải thích rõ ràng</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Không đưa ra gợi ý ngẫu nhiên, giúp bạn hiểu vì sao một trường phù hợp với điều kiện của mình.</p>
</div>
</div>

<div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[22px]">pan_tool_alt</span>
</div>
<div>
<h4 className="font-label-lg text-label-lg font-bold text-inverse-surface mb-1">Không ép buộc lựa chọn</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Không nhận tiền để thiên vị trường học nào. Quyết định cuối cùng và tương lai luôn là của bạn.</p>
</div>
</div>
</div>
</section>

<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-2xl">
<div className="relative w-full rounded-3xl bg-primary-container text-on-primary p-space-xl md:p-space-2xl overflow-hidden shadow-2xl">

<div className="absolute -right-20 -bottom-24 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -left-16 top-10 w-72 h-72 bg-tertiary-fixed-dim/20 rounded-full blur-2xl pointer-events-none"></div>

<div className="absolute top-10 right-20 text-tertiary-fixed-dim hidden sm:block">
<svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
<path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"></path>
</svg>
</div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">

<div className="lg:col-span-7 flex flex-col items-start">
<div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-on-primary-container/30 text-on-primary font-label-sm text-label-sm font-semibold mb-space-md">
<span className="">✨</span> Khởi đầu hành trình mới
          </div>
<h2 className="font-display text-[34px] sm:text-display leading-tight tracking-tight mb-space-sm">
            Không cần biết ngay mình sẽ đi đâu.
          </h2>
<p className="font-body-lg text-body-lg text-on-primary-container mb-space-xl max-w-lg">
            Bắt đầu khám phá là được. Hãy để Uniview đồng hành cùng bạn và gia đình trên từng bước đi.
          </p>
<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md rounded-full bg-surface-container-lowest text-primary-container font-headline-sm text-label-lg font-bold shadow-xl hover:bg-surface-bright transition-all group" href="#">
            Bắt đầu với Uniview
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
</a>
</div>

<div className="lg:col-span-5 flex justify-center lg:justify-end mt-space-lg lg:mt-0">
<div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
<svg className="w-full h-full" fill="none" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">

<path d="M120 180 L40 40" opacity="0.6" stroke="#CAD3FF" strokeDasharray="4 4" strokeWidth="2"></path>
<path d="M120 180 L120 20" opacity="0.8" stroke="#FE7488" strokeDasharray="4 4" strokeWidth="2"></path>
<path d="M120 180 L200 40" opacity="0.6" stroke="#FFDF9F" strokeDasharray="4 4" strokeWidth="2"></path>

<circle cx="40" cy="40" fill="#FFFFFF" fillOpacity="0.2" r="14"></circle>
<circle cx="40" cy="40" fill="#FFFFFF" r="6"></circle>
<circle cx="120" cy="20" fill="#FE7488" fillOpacity="0.3" r="18"></circle>
<circle cx="120" cy="20" fill="#FFFFFF" r="8"></circle>
<circle cx="200" cy="40" fill="#FFDF9F" fillOpacity="0.3" r="14"></circle>
<circle cx="200" cy="40" fill="#FFFFFF" r="6"></circle>

<ellipse cx="120" cy="210" fill="#001551" opacity="0.4" rx="35" ry="12"></ellipse>
<path d="M96 220 C96 185, 105 170, 120 170 C135 170, 144 185, 144 220 Z" fill="#FFFFFF"></path>
<circle cx="120" cy="150" fill="#FBD4B4" r="18"></circle>
<path d="M102 148 C102 132, 115 130, 120 130 C125 130, 138 132, 138 148 C130 142, 110 142, 102 148 Z" fill="#172033"></path>
</svg>
</div>
</div>
</div>
</div>
</section>
</div></main>
  )
}

export default LandingPage
