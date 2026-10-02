function UitUniversityPage() {
  return (
<main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">

<section className="w-full bg-surface-container-low px-6 lg:px-12 py-3.5 border-none">
<div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-on-surface-variant font-label-md text-label-md">

<nav className="flex items-center gap-2 flex-wrap">
<a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
<span className="text-outline-variant font-normal">/</span>
<a className="hover:text-primary transition-colors" href="#">Khám phá trường</a>
<span className="text-outline-variant font-normal">/</span>
<a className="hover:text-primary transition-colors" href="#">TP. Hồ Chí Minh</a>
<span className="text-outline-variant font-normal">/</span>
<span className="text-on-surface font-semibold">ĐH Công nghệ Thông tin (UIT)</span>
</nav>

<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm w-fit">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style={{ "fontVariationSettings": "\"FILL\" 1" }}>bolt</span>
<span className="text-on-surface">Dữ liệu tuyển sinh 2026 chính thức</span>
<span className="text-outline-variant">·</span>
<span className="text-on-surface-variant">Cập nhật 18/09/2026 bởi Ban Tuyển sinh ĐHQG-HCM</span>
<span className="inline-flex items-center gap-1 text-primary font-bold ml-1">
<span className="material-symbols-outlined text-[14px]">verified</span>
          Đã kiểm chứng
        </span>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 pt-space-lg pb-space-xl bg-surface">
<div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">

<div className="flex flex-wrap items-center gap-2.5 mb-space-sm">
<span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
            MÃ TRƯỜNG: QSC
          </span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
            Thành viên ĐHQG-HCM
          </span>
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
            Công lập tự chủ
          </span>
</div>

<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs font-bold leading-tight">
          Đại học Công nghệ Thông tin
        </h1>
<p className="font-headline-sm text-headline-sm text-on-surface-variant mb-space-md font-medium">
          University of Information Technology — VNU-HCM (UIT)
        </p>

<div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-on-surface-variant font-body-sm text-body-sm mb-space-lg">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
<span className="">Khu Đô thị ĐHQG, P. Linh Trung, TP. Thủ Đức, TP.HCM</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-primary">language</span>
<a className="text-primary hover:underline font-medium" href="https://uit.edu.vn" target="_blank">uit.edu.vn</a>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
<span className="">Thành lập 2006</span>
</div>
</div>

<div className="flex flex-wrap items-center gap-3.5 pt-space-xs">
<a className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-on-primary-fixed-variant transition-all hover:scale-[1.02]" href="#nganh-dao-tao">
<span className="">Xem ngành đào tạo</span>
<span className="material-symbols-outlined text-[18px]">south</span>
</a>
<button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:shadow-md hover:bg-surface-container transition-all" id="hero-compare-btn">
<span className="material-symbols-outlined text-[18px] text-primary">swap_horiz</span>
<span className="">Thêm vào so sánh</span>
</button>
<button className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary transition-all" id="save-uni-btn">
<span className="material-symbols-outlined text-[20px]" id="heart-icon">favorite_border</span>
<span id="save-uni-text" className="">Lưu trường</span>
</button>
</div>
</div>

<div className="lg:col-span-5 relative group">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Modern architectural glass facade of the University of Information Technology in Vietnam with students strolling on modern paved walkways amidst tropical greenery and blue sky under bright natural daytime lighting." src="/stitch-assets/uit-main-campus.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md text-on-surface">
<div className="flex items-center gap-2.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Khuôn viên đào tạo CNTT chuẩn quốc tế</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold">ĐHQG-HCM</span>
</div>
</div>

<div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest shadow-xl text-on-surface z-10">
<div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[18px]">workspace_premium</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-bold">Top 1 Khối Công nghệ</span>
<span className="font-label-sm text-label-sm text-outline">Khu vực Phía Nam 2025</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-sm bg-surface">
<div className="max-w-[1240px] mx-auto p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Loại hình trường</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">Công lập tự chủ</span>
<span className="font-label-sm text-label-sm text-outline mt-0.5">Thành viên ĐHQG-HCM</span>
</div>

<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Học phí tham chiếu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">32 – 48 Tr/năm</span>
<span className="font-label-sm text-label-sm text-outline mt-0.5">Khóa tuyển sinh 2026</span>
</div>

<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Quy mô tuyển sinh</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">1.800 chỉ tiêu</span>
<span className="font-label-sm text-label-sm text-outline mt-0.5">14 ngành chuyên sâu</span>
</div>

<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Phương thức</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">4 Phương thức</span>
<span className="font-label-sm text-label-sm text-outline mt-0.5">ĐGNL, THPT, UTXT, Quốc tế</span>
</div>

<div className="flex flex-col col-span-2 md:col-span-1">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Điểm chuẩn (THPT 2025)</span>
<span className="font-headline-sm text-headline-sm text-secondary font-bold">25.40 – 28.10</span>
<span className="font-label-sm text-label-sm text-outline mt-0.5">ĐGNL: 850 – 935 điểm</span>
</div>
</div>
</div>
</section>

<section className="sticky top-20 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
<div className="max-w-[1240px] mx-auto px-6 lg:px-12 overflow-x-auto scrollbar-none flex items-center gap-8 py-3.5 text-on-surface-variant font-label-lg text-label-lg">
<a className="text-primary font-bold border-b-2 border-primary pb-1 whitespace-nowrap" href="#tong-quan">1. Tổng quan</a>
<a className="hover:text-primary transition-colors whitespace-nowrap" href="#nganh-dao-tao">2. Ngành đào tạo (14)</a>
<a className="hover:text-primary transition-colors whitespace-nowrap" href="#phuong-thuc">3. Phương thức tuyển sinh</a>
<a className="hover:text-primary transition-colors whitespace-nowrap" href="#diem-chuan">4. Điểm chuẩn các năm</a>
<a className="hover:text-primary transition-colors whitespace-nowrap" href="#hoc-phi-hoc-bong">5. Học phí &amp; Học bổng</a>
<a className="hover:text-primary transition-colors whitespace-nowrap" href="#sinh-vien">6. Sinh viên &amp; Đời sống</a>
</div>
</section>

<section className="w-full px-6 lg:px-12 pt-space-lg bg-surface">
<div className="max-w-[1240px] mx-auto p-6 lg:p-7 rounded-2xl bg-surface-container-high relative overflow-hidden shadow-sm">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
<span className="material-symbols-outlined text-[26px]">auto_awesome</span>
</div>
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">Phù hợp với Hồ sơ Mục tiêu của bạn</span>
<span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">Độ tương thích 92%</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Dựa trên hồ sơ của bạn: Mức học phí UIT (32M – 48M) hoàn toàn nằm trong mức ngân sách dự kiến của gia đình (≤ 50M/năm). Bạn đang quan tâm chuyên ngành <strong className="text-on-surface">Trí tuệ Nhân tạo &amp; Kỹ thuật Phần mềm</strong> — đây là 2 ngành đào tạo mũi nhọn được kiểm định ABET và có mạng lưới việc làm dẫn đầu tại UIT.
          </p>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface" id="tong-quan">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">

<div className="flex flex-col max-w-3xl">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 01</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-space-xs">
          Tổng quan &amp; Vị thế đào tạo
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Trường Đại học Công nghệ Thông tin (UIT) là trung tâm đào tạo công nghệ chất lượng cao, tiên phong trong hệ thống Đại học Quốc gia TP.HCM. Nhà trường chú trọng năng lực thực chiến, các chứng chỉ thực tập doanh nghiệp và tư duy nghiên cứu phát triển chuẩn mực toàn cầu.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-4">
<span className="material-symbols-outlined text-[22px]">apartment</span>
</div>
<h3 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">Campus &amp; Ký túc xá</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tọa lạc tại Khu đô thị ĐHQG rộng 643ha, cách KTX ĐHQG Khu B chỉ 500m. Trang bị phòng lab AI, hệ thống điện toán đám mây và an ninh mạng hiện đại bậc nhất.
            </p>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold mt-4">Khuôn viên công nghệ →</span>
</div>

<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div>
<div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[22px]">work_history</span>
</div>
<h3 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">Thực tập &amp; OJT từ năm 3</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              100% sinh viên thực tập từ năm thứ 3. Mạng lưới liên kết hơn 150 tập đoàn công nghệ lớn: FPT Software, VNG, Viettel, TMA Solutions, KMS và Shopee.
            </p>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold mt-4">98% có việc làm →</span>
</div>

<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div>
<div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-4">
<span className="material-symbols-outlined text-[22px]">translate</span>
</div>
<h3 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">Chuẩn đầu ra Ngoại ngữ</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Chuẩn đầu ra tiếng Anh tương đương IELTS 5.5+ hoặc TOEIC 600+. Học liệu công nghệ cập nhật 100% từ giáo trình Anh ngữ của các trường đại học đối tác Hoa Kỳ.
            </p>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold mt-4">Hội nhập quốc tế →</span>
</div>

<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div>
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
<span className="material-symbols-outlined text-[22px]">terminal</span>
</div>
<h3 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">Văn hóa Thi đấu CTF &amp; Hackathon</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Cái nôi của các đội tuyển CTF (An toàn thông tin) vô địch ASEAN, câu lạc bộ AI, Game Dev và cộng đồng lập trình mã nguồn mở hoạt động sôi nổi ngày đêm.
            </p>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold mt-4">Cộng đồng IT trẻ →</span>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface-container-low" id="nganh-dao-tao">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 02</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Ngành đào tạo &amp; Điểm tham chiếu
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Tổng 14 ngành chuyên ngành mũi nhọn theo chuẩn kiểm định ABET và AUN-QA
          </p>
</div>

<div className="relative w-full md:w-80">
<input className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" id="major-search-input" placeholder="Tìm kiếm ngành học..." type="text" />
<span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">search</span>
</div>
</div>

<div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1" id="filter-chips-container">
<button className="major-filter-btn px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold whitespace-nowrap shadow-sm">
          Tất cả ngành (14)
        </button>
<button className="major-filter-btn px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm">
          Khoa học máy tính &amp; AI (4)
        </button>
<button className="major-filter-btn px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm">
          CN Phần mềm &amp; Hệ thống (5)
        </button>
<button className="major-filter-btn px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm">
          An toàn thông tin &amp; Mạng (3)
        </button>
<button className="major-filter-btn px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm">
          Kinh tế số &amp; TMĐT (2)
        </button>
</div>

<div className="flex flex-col gap-3.5" id="majors-list">

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="ai" data-name="khoa học máy tính trí tuệ nhân tạo data science">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7480101</span>
<span className="font-label-sm text-label-sm text-on-tertiary-fixed font-bold bg-tertiary-fixed px-2.5 py-0.5 rounded-full">Chuẩn ABET · Điểm cao nhất</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Khoa học Máy tính (Trí tuệ Nhân tạo &amp; Data Science)</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Chương trình đào tạo tinh hoa tài năng ĐHQG-HCM</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">200</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">27.80</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 930/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">35 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="software" data-name="kỹ thuật phần mềm software engineering">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7480103</span>
<span className="font-label-sm text-label-sm text-on-secondary-fixed-variant font-bold bg-secondary-fixed px-2.5 py-0.5 rounded-full">Hot · 98% việc làm trước tốt nghiệp</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Kỹ thuật Phần mềm (Software Engineering)</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Thực tập doanh nghiệp quốc tế &amp; Silicon Valley</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">250</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">27.50</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 915/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">33 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="sec" data-name="an toàn thông tin information security ctf an ninh mạng">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7480202</span>
<span className="font-label-sm text-label-sm text-on-primary font-bold bg-primary px-2.5 py-0.5 rounded-full">Đội ngũ CTF Vô địch Đông Nam Á</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">An toàn Thông tin (Information Security)</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Lab thử nghiệm tấn công - phòng thủ mạng Cyber Range</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">180</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">26.90</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 890/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">33 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="sec" data-name="mạng máy tính truyền thông dữ liệu">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7480102</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium bg-surface-container px-2.5 py-0.5 rounded-full">Hạ tầng Cloud &amp; IoT</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Mạng máy tính &amp; Truyền thông dữ liệu</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Hợp tác chứng chỉ quốc tế Cisco &amp; AWS Academy</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">140</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">25.80</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 850/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">32 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="software" data-name="công nghệ thông tin chương trình tiên tiến tiếng anh liên kết quốc tế">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7480201</span>
<span className="font-label-sm text-label-sm text-on-primary-fixed-variant font-bold bg-primary-fixed px-2.5 py-0.5 rounded-full">100% Tiếng Anh · Chuẩn ABET</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Công nghệ Thông tin (Chương trình Tiên tiến)</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Giảng viên quốc tế &amp; văn bằng chứng nhận toàn cầu</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">160</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">26.20</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 870/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-secondary font-bold">48 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="major-card bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-group="biz" data-name="thương mại điện tử e-commerce fintech kinh tế số">
<div className="flex flex-col lg:w-2/5">
<div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
<span className="font-label-sm text-label-sm font-bold text-primary bg-surface-container-high px-2.5 py-0.5 rounded-full">Mã: 7340122</span>
<span className="font-label-sm text-label-sm text-on-tertiary-fixed font-semibold bg-tertiary-fixed px-2.5 py-0.5 rounded-full">Kinh tế số &amp; FinTech</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Thương mại Điện tử (E-Commerce)</h3>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Tích hợp phân tích dữ liệu kinh doanh &amp; hệ thống số</span>
</div>
<div className="grid grid-cols-3 gap-4 lg:w-2/5 text-left">
<div>
<span className="font-label-sm text-label-sm text-outline block">Chỉ tiêu</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">120</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">4 phương thức</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Điểm THPT 2025</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">26.40</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">ĐGNL: 865/1200</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">32 Tr</span>
<span className="font-label-sm text-label-sm text-outline block">/ năm</span>
</div>
</div>
<div className="lg:w-1/5 flex items-center justify-end">
<a className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Lộ trình ngành</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface" id="phuong-thuc">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col max-w-3xl">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 03</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-space-xs">
          Phương thức Tuyển sinh 2026
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
          Chỉ tiêu được phân bổ linh hoạt giữa 4 phương thức chính nhằm tối ưu hóa cơ hội cho học sinh xuất sắc và đam mê khối ngành Công nghệ thông tin.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full">
                Phương thức 1 · 10% – 15% Chỉ tiêu
              </span>
<span className="material-symbols-outlined text-[24px] text-primary">military_tech</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
              Tuyển thẳng theo Quy chế Bộ GD&amp;ĐT &amp; Ưu tiên xét tuyển ĐHQG-HCM (UTXT)
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
              Dành riêng cho thí sinh thuộc 149 trường THPT chuyên, năng khiếu và trường trọng điểm quốc gia có thành tích học tập xuất sắc; thí sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia môn Tin học, Toán học, Vật lý.
            </p>
</div>
<div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<strong className="text-on-surface">Tiêu chí:</strong> Học lực 3 năm THPT loại Giỏi + Điểm trung bình môn Tin/Toán ≥ 8.5.
          </div>
</div>

<div className="p-6 md:p-8 rounded-2xl bg-surface-container-high shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm text-on-primary font-bold uppercase tracking-wider bg-primary px-3 py-1 rounded-full">
                Phương thức 2 · 55% – 60% Chỉ tiêu (Chủ lực)
              </span>
<span className="material-symbols-outlined text-[24px] text-primary">psychology</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
              Xét kết quả kỳ thi Đánh giá Năng lực (ĐGNL) ĐHQG-HCM 2026
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
              Phương thức tuyển sinh có tỷ trọng lớn nhất tại UIT. Đánh giá toàn diện tư duy logic, xử lý số liệu, năng lực ngôn ngữ và khoa học tự nhiên. Ngưỡng nhận hồ sơ tối thiểu từ 750/1200 điểm.
            </p>
</div>
<div className="p-3.5 rounded-xl bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md">
<strong className="text-primary">Tham chiếu 2025:</strong> Ngành Khoa học máy tính chạm mức 930 điểm, ngành Hệ thống thông tin 850 điểm.
          </div>
</div>

<div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-fixed px-3 py-1 rounded-full">
                Phương thức 3 · 30% – 35% Chỉ tiêu
              </span>
<span className="material-symbols-outlined text-[24px] text-secondary">school</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
              Xét tuyển dựa trên Điểm thi Tốt nghiệp THPT 2026
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
              Áp dụng cho các tổ hợp truyền thống và hiện đại theo chương trình GDPT mới: <strong>A00</strong> (Toán, Lý, Hóa), <strong>A01</strong> (Toán, Lý, Tiếng Anh), <strong>D01</strong> (Toán, Văn, Tiếng Anh) và <strong>D07</strong> (Toán, Hóa, Tiếng Anh). Môn Toán nhân hệ số 1.
            </p>
</div>
<div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<strong className="text-on-surface">Quy tắc quy đổi:</strong> Không có chênh lệch điểm trúng tuyển giữa các tổ hợp trong cùng một ngành.
          </div>
</div>

<div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider bg-tertiary-fixed px-3 py-1 rounded-full">
                Phương thức 4 · 5% – 10% Chỉ tiêu
              </span>
<span className="material-symbols-outlined text-[24px] text-tertiary-container">public</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
              Xét tuyển Chứng chỉ Quốc tế kết hợp Học bạ THPT
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
              Dành cho thí sinh tốt nghiệp chương trình THPT nước ngoài hoặc có chứng chỉ chuẩn hóa quốc tế: <strong>SAT ≥ 1200/1600</strong>, <strong>ACT ≥ 26/36</strong>, hoặc <strong>IELTS ≥ 6.0</strong> kết hợp điểm trung bình môn Toán cả 3 năm ≥ 8.0.
            </p>
</div>
<div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<strong className="text-on-surface">Đặc quyền:</strong> Miễn học phần tiếng Anh cơ bản năm 1 và ưu tiên xét học bổng quốc tế.
          </div>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface-container-low" id="diem-chuan">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 04</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Tra cứu Điểm chuẩn đối chiếu
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Dữ liệu đối sánh 3 năm gần nhất theo thang điểm chuẩn hóa độc lập
          </p>
</div>

<div className="flex flex-wrap items-center gap-3">

<div className="flex items-center p-1 rounded-full bg-surface-container-lowest shadow-sm">
<button className="year-btn px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
              2025 (Chính thức)
            </button>
<button className="year-btn px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">
              2024
            </button>
<button className="year-btn px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">
              2023
            </button>
</div>

<div className="flex items-center p-1 rounded-full bg-surface-container-lowest shadow-sm">
<button className="scale-btn px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">
              Điểm thi THPT (Thang 30)
            </button>
<button className="scale-btn px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">
              Kỳ thi ĐGNL (Thang 1200)
            </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead className="bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider">
<tr>
<th className="py-4 px-6">Tên ngành / Chuyên ngành</th>
<th className="py-4 px-4 text-center">Mã ngành</th>
<th className="py-4 px-4 text-center">2023</th>
<th className="py-4 px-4 text-center">2024</th>
<th className="py-4 px-4 text-center bg-surface-container-high text-primary font-bold">2025 (Chính thức)</th>
<th className="py-4 px-4 text-center">Biến động (Δ)</th>
<th className="py-4 px-6">Tiêu chí phụ</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface" id="cutoff-table-body">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6 font-semibold">Khoa học Máy tính</td>
<td className="py-4 px-4 text-center text-outline">7480101</td>
<td className="py-4 px-4 text-center">26.90</td>
<td className="py-4 px-4 text-center">27.40</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">27.80</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-secondary font-bold font-label-sm text-label-sm">+0.40 ↑</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Toán ≥ 9.0; Thứ tự NV ≤ 2</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
<td className="py-4 px-6 font-semibold">Kỹ thuật Phần mềm</td>
<td className="py-4 px-4 text-center text-outline">7480103</td>
<td className="py-4 px-4 text-center">26.80</td>
<td className="py-4 px-4 text-center">27.25</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">27.50</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-secondary font-bold font-label-sm text-label-sm">+0.25 ↑</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Toán ≥ 8.8; Thứ tự NV ≤ 3</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6 font-semibold">An toàn Thông tin</td>
<td className="py-4 px-4 text-center text-outline">7480202</td>
<td className="py-4 px-4 text-center">26.20</td>
<td className="py-4 px-4 text-center">26.70</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">26.90</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-secondary font-bold font-label-sm text-label-sm">+0.20 ↑</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Toán ≥ 8.6; Tiếng Anh ≥ 7.0</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
<td className="py-4 px-6 font-semibold">Mạng máy tính &amp; TT Dữ liệu</td>
<td className="py-4 px-4 text-center text-outline">7480102</td>
<td className="py-4 px-4 text-center">25.30</td>
<td className="py-4 px-4 text-center">25.70</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">25.80</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-secondary font-bold font-label-sm text-label-sm">+0.10 ↑</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Toán ≥ 8.2</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6 font-semibold">Công nghệ Thông tin (Chương trình CLC)</td>
<td className="py-4 px-4 text-center text-outline">7480201</td>
<td className="py-4 px-4 text-center">26.00</td>
<td className="py-4 px-4 text-center">26.30</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">26.20</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-primary font-bold font-label-sm text-label-sm">-0.10 ↓</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">IELTS ≥ 5.5 hoặc thi Anh ≥ 7.5</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
<td className="py-4 px-6 font-semibold">Thương mại Điện tử</td>
<td className="py-4 px-4 text-center text-outline">7340122</td>
<td className="py-4 px-4 text-center">25.80</td>
<td className="py-4 px-4 text-center">26.20</td>
<td className="py-4 px-4 text-center bg-surface-container-high/40 font-bold text-primary">26.40</td>
<td className="py-4 px-4 text-center">
<span className="inline-flex items-center text-secondary font-bold font-label-sm text-label-sm">+0.20 ↑</span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Toán ≥ 8.4; NV ≤ 4</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 bg-surface-container-high/30 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px] text-tertiary">info</span>
<span className=""><strong>Lưu ý quan trọng:</strong> Điểm các năm trước chỉ mang tính tham khảo đối chiếu và không đảm bảo điểm chuẩn của kỳ thi tuyển sinh năm 2026. Thang điểm ĐGNL và THPT là hai hệ thống khảo thí riêng biệt.</span>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface" id="hoc-phi-hoc-bong">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col max-w-3xl">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 05</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-space-xs">
          Học phí &amp; Quỹ Học bổng 2026
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
          Chính sách tài chính minh bạch theo cơ chế tự chủ ĐHQG-HCM cùng các gói bảo trợ học tập toàn diện từ cựu sinh viên và doanh nghiệp công nghệ đối tác.
        </p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">

<div className="lg:col-span-6 p-7 md:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">payments</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Chính sách Học phí 2026 – 2027</h3>
</div>
<div className="flex flex-col gap-4">

<div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
<div>
<span className="font-label-lg text-label-lg text-on-surface font-bold block">Chương trình Chuẩn (Đại trà)</span>
<span className="font-body-sm text-body-sm text-outline">Áp dụng cho 10 ngành giảng dạy tiếng Việt</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-primary font-bold block">32 – 36 Tr</span>
<span className="font-label-sm text-label-sm text-outline">/ năm học</span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
<div>
<span className="font-label-lg text-label-lg text-on-surface font-bold block">Chương trình Tiên tiến &amp; Tài năng</span>
<span className="font-body-sm text-body-sm text-outline">Giảng dạy bằng tiếng Anh, lớp học quy mô nhỏ</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-secondary font-bold block">45 – 50 Tr</span>
<span className="font-label-sm text-label-sm text-outline">/ năm học</span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
<div>
<span className="font-label-lg text-label-lg text-on-surface font-bold block">Chương trình Liên kết Quốc tế</span>
<span className="font-body-sm text-body-sm text-outline">Cấp song bằng cùng ĐH Birmingham City (UK)</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-tertiary-container font-bold block">80 – 95 Tr</span>
<span className="font-label-sm text-label-sm text-outline">/ năm học</span>
</div>
</div>
</div>
</div>
<div className="mt-6 pt-4 border-none text-on-surface-variant font-label-md text-label-md flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
<span className="">Cam kết lộ trình tăng không quá 10%/năm theo Nghị định 81/NĐ-CP của Chính phủ.</span>
</div>
</div>

<div className="lg:col-span-6 p-7 md:p-8 rounded-2xl bg-surface-container-high shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[24px]">redeem</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Quỹ Học bổng &amp; Hỗ trợ Sinh viên</h3>
</div>
<div className="flex flex-col gap-4">

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs">
<div className="flex items-center justify-between mb-1">
<span className="font-label-lg text-label-lg text-primary font-bold">Học bổng Khuyến khích Tài năng UIT</span>
<span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">100% Học phí</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dành cho Thủ khoa, Á khoa tuyển sinh và sinh viên đạt giải Nhất, Nhì kỳ thi HSG Quốc gia; kèm gói sinh hoạt phí 2.000.000đ/tháng trong suốt năm đầu tiên.
                </p>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs">
<div className="flex items-center justify-between mb-1">
<span className="font-label-lg text-label-lg text-secondary font-bold">Học bổng Doanh nghiệp &amp; Cựu SV</span>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-bold">Hơn 5 Tỷ/năm</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tài trợ trực tiếp từ các tập đoàn: Intel, FPT Software, TMA Solutions, KMS, Viettel và Quỹ khuyến học cựu sinh viên UIT.
                </p>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs">
<div className="flex items-center justify-between mb-1">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Chính sách Tín dụng Ưu đãi 0%</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">ĐHQG-HCM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Chương trình phối hợp Ngân hàng Chính sách Xã hội bảo trợ sinh viên vượt khó, hạn mức vay tối đa 100% học phí với thời gian ân hạn sau khi tốt nghiệp.
                </p>
</div>
</div>
</div>
<div className="mt-6 pt-4 text-primary font-label-md text-label-md flex items-center justify-between">
<span className="font-semibold">Có hơn 650 suất học bổng được trao mỗi năm</span>
<a className="hover:underline font-bold" href="#">Xem quy chế học bổng →</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface-container-low" id="sinh-vien">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col max-w-3xl">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">CHƯƠNG 06</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-space-xs">
          Đời sống Sinh viên &amp; Không gian Học thuật
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
          Môi trường sinh viên cởi mở, kết hợp giữa tinh thần nghiên cứu chuyên sâu và văn hóa thể thao, nghệ thuật sôi động của Làng Đại học Quốc gia.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<div className="md:col-span-8 relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] group bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Expansive panoramic view of University of Information Technology modern campus boulevard with young students sitting on wooden benches near green lawns and modern glass research facility under sunny daytime." src="/stitch-assets/uit-campus-boulevard.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-6 left-6 right-6 text-on-primary">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim font-bold block mb-1">Cơ sở vật chất</span>
<h4 className="font-headline-sm text-headline-sm font-bold mb-1">Tòa nhà E hiện đại &amp; Khu thí nghiệm mở 24/7</h4>
<p className="font-body-sm text-body-sm text-surface-dim">Không gian mở trang bị máy tính trạm chuyên dụng cho mô phỏng mạng và huấn luyện mô hình học sâu.</p>
</div>
</div>
<div className="md:col-span-4 flex flex-col gap-gutter">
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between flex-1">
<div className="flex items-center gap-3 mb-3">
<span className="material-symbols-outlined text-[28px] text-primary">groups</span>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold">Hơn 30 Câu lạc bộ học thuật</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
              Từ CLB An ninh mạng Wanna.One, GDSC (Google Developer Student Club) đến CLB Thể thao Điện tử và Guitar acoustic.
            </p>
<span className="font-label-sm text-label-sm text-primary font-bold">Khám phá câu lạc bộ →</span>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between flex-1">
<div className="flex items-center gap-3 mb-3">
<span className="material-symbols-outlined text-[28px] text-secondary">hotel</span>
</div>
<div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mb-1">Ký túc xá ĐHQG Khu B</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Hệ thống KTX sinh viên lớn nhất Đông Nam Á, đầy đủ tiện ích: phòng gym, rạp phim, tuyến xe buýt nhanh kết nối trung tâm quận 1 chỉ 25 phút.
              </p>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold mt-3">Chi phí chỉ ~180.000đ/tháng</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-md bg-surface">
<div className="max-w-[1240px] mx-auto p-8 rounded-2xl bg-inverse-surface text-inverse-on-surface flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
<div className="flex flex-col max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/20 text-tertiary-fixed font-label-sm text-label-sm w-fit mb-3">
<span className="material-symbols-outlined text-[16px]">balance</span>
<span className="">Công cụ đối sánh đa tiêu chí UniView</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold mb-2">Đang cân nhắc Đại học Công nghệ Thông tin?</h3>
<p className="font-body-md text-body-md text-surface-dim">
          Đặt UIT cạnh Trường ĐH Bách Khoa (HCMUT) và Trường ĐH Khoa học Tự nhiên (HCMUS) để nhìn rõ sự khác biệt về học phí, chỉ tiêu tuyển sinh và định hướng đào tạo thực chiến.
        </p>
</div>
<button className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary shadow-lg transition-all hover:scale-105">
<span className="material-symbols-outlined text-[20px]">swap_horiz</span>
<span className="">Thêm UIT vào khay so sánh</span>
</button>
</div>
</section>

<section className="w-full px-6 lg:px-12 py-space-xl bg-surface">
<div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-1">GỢI Ý LIÊN QUAN</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Các trường đại học cùng khối ngành có thể bạn quan tâm
        </h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
<div className="aspect-[16/10] w-full overflow-hidden relative bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Wide aerial perspective of Ho Chi Minh City University of Technology HCMUT red brick academic structures surrounded by trees and sunny courtyard." src="/stitch-assets/hcmut-campus.jpg" />
<span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-xs">
              MÃ: QSB
            </span>
</div>
<div className="p-6 flex flex-col justify-between flex-1">
<div>
<span className="font-label-sm text-label-sm text-outline font-semibold">ĐHQG-HCM · Công lập</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 mb-2">Đại học Bách Khoa TP.HCM (HCMUT)</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Đào tạo Khoa học Máy tính &amp; Kỹ thuật Máy tính truyền thống với khối lượng đồ án kỹ thuật cao.
              </p>
</div>
<div className="pt-4 border-none flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-label-lg text-label-lg text-on-surface font-bold">~30 – 80 Tr/năm</span>
</div>
<a className="text-primary font-label-md text-label-md font-bold hover:underline flex items-center gap-1" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>

<div className="rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
<div className="aspect-[16/10] w-full overflow-hidden relative bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="University of Science VNU-HCM campus entrance with science and technology students walking near lush green trees under bright daylight." src="/stitch-assets/hcmus-campus.jpg" />
<span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-xs">
              MÃ: QST
            </span>
</div>
<div className="p-6 flex flex-col justify-between flex-1">
<div>
<span className="font-label-sm text-label-sm text-outline font-semibold">ĐHQG-HCM · Công lập</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 mb-2">Đại học Khoa học Tự nhiên (HCMUS)</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Thế mạnh nền tảng Toán - Tin, Khoa học Dữ liệu, Trí tuệ Nhân tạo và các giải thuật toán quốc tế ACM-ICPC.
              </p>
</div>
<div className="pt-4 border-none flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-label-lg text-label-lg text-on-surface font-bold">~28 – 52 Tr/năm</span>
</div>
<a className="text-primary font-label-md text-label-md font-bold hover:underline flex items-center gap-1" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>

<div className="rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
<div className="aspect-[16/10] w-full overflow-hidden relative bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="FPT University modern campus architecture with unique geometric curves and student recreation center in sunny modern environment." src="/stitch-assets/fpt-university-campus.jpg" />
<span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm font-bold shadow-xs">
              MÃ: FPT
            </span>
</div>
<div className="p-6 flex flex-col justify-between flex-1">
<div>
<span className="font-label-sm text-label-sm text-outline font-semibold">Tư thục Quốc tế · Khu CNC Q.9</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 mb-2">Đại học FPT TP.HCM</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Chương trình On-the-Job Training (OJT) doanh nghiệp ngay từ năm thứ 3, 100% học phần CNTT bằng tiếng Anh.
              </p>
</div>
<div className="pt-4 border-none flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm text-outline block">Học phí</span>
<span className="font-label-lg text-label-lg text-on-surface font-bold">~98 – 110 Tr/năm</span>
</div>
<a className="text-primary font-label-md text-label-md font-bold hover:underline flex items-center gap-1" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>

<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[94vw] lg:max-w-[1000px] transition-all duration-300" id="sticky-compare-tray">

</div>
</div>

</main>
  )
}

export default UitUniversityPage
