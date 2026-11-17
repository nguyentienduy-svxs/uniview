function UniversityCompareModalPage() {
  return (
<main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">

<section className="w-full bg-gradient-to-b from-surface-container-high/40 via-surface to-surface pt-8 pb-10">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6">

<div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-lowest shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-secondary tracking-wide uppercase">Khám phá &amp; Chọn lọc có cơ sở</span>
</div>
<h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Khám phá trường đại học<span className="text-secondary-container">.</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Tìm kiếm, đối chiếu và khám phá các trường đại học hàng đầu Việt Nam phù hợp với năng lực học tập, ngân sách học phí và định hướng nghề nghiệp tương lai.
        </p>
</div>

<div className="w-full max-w-4xl mx-auto mt-2">
<div className="relative flex items-center bg-surface-container-lowest rounded-full shadow-[0_8px_30px_rgba(29,78,216,0.06)] p-2 transition-all duration-200 focus-within:shadow-[0_12px_40px_rgba(29,78,216,0.12)]">
<div className="pl-4 pr-3 flex items-center pointer-events-none text-primary">
<span className="material-symbols-outlined text-2xl">search</span>
</div>
<input className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none py-2.5" placeholder="Tìm tên trường (vd: Bách Khoa, UEH), mã trường (QSC, KTS) hoặc tỉnh thành..." type="text" defaultValue="Đại học Quốc gia TP.HCM" />
<div className="flex items-center gap-2 shrink-0 pr-2">
<button className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span className="text-xs">⌘</span><span className="">K</span>
</button>
<button className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-label-lg text-label-lg text-on-primary bg-primary-container hover:bg-primary transition-all shadow-md">
<span className="">Tìm kiếm</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
</div>
</div>

<div className="max-w-5xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 pt-2">
<div className="flex flex-wrap items-center gap-2">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider mr-1">Bộ lọc nhanh:</span>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Tất cả
          </button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm flex items-center gap-1">
<span className="">TP.HCM</span>
<span className="material-symbols-outlined text-xs">check</span>
</button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Hà Nội
          </button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-primary-fixed text-on-primary-fixed flex items-center gap-1">
<span className="">Công lập</span>
<span className="material-symbols-outlined text-xs">check</span>
</button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Tư thục &amp; Quốc tế
          </button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors">
            ≤ 40 triệu/năm
          </button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-secondary text-on-secondary shadow-sm flex items-center gap-1">
<span className="">CNTT &amp; Phần mềm</span>
<span className="material-symbols-outlined text-xs">check</span>
</button>
<button className="px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-sm">tune</span>
<span className="">+ 4 bộ lọc nâng cao</span>
</button>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-outline-variant">Đang áp dụng: <strong className="text-on-surface font-semibold">3 tiêu chí</strong></span>
<span className="text-outline-variant">•</span>
<button className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">refresh</span>
<span className="">Xóa lọc</span>
</button>
</div>
</div>
</div>
</section>

<section className="w-full pb-32">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 flex flex-col gap-5">
<div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_24px_rgba(23,32,51,0.03)] flex flex-col gap-6">

<div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">filter_alt</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-lg leading-tight">Bộ lọc tinh gọn</h3>
</div>
<button className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors">
                Đặt lại
              </button>
</div>

<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Khu vực địa lý</span>
<span className="material-symbols-outlined text-outline text-lg">expand_less</span>
</div>
<div className="flex flex-col gap-2.5 pt-1">
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-2.5">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">TP. Hồ Chí Minh</span>
</div>
<span className="font-label-sm text-label-sm text-outline px-2 py-0.5 rounded-full bg-surface-container">24</span>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-2.5">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Hà Nội</span>
</div>
<span className="font-label-sm text-label-sm text-outline px-2 py-0.5 rounded-full bg-surface-container">18</span>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-2.5">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Đà Nẵng &amp; Miền Trung</span>
</div>
<span className="font-label-sm text-label-sm text-outline px-2 py-0.5 rounded-full bg-surface-container">7</span>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-2.5">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Cần Thơ &amp; ĐBSCL</span>
</div>
<span className="font-label-sm text-label-sm text-outline px-2 py-0.5 rounded-full bg-surface-container">5</span>
</label>
</div>
</div>

<div className="flex flex-col gap-3 pt-2">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Mô hình đào tạo</span>
<div className="grid grid-cols-2 gap-2">
<button className="px-3 py-2 rounded-xl font-label-sm text-label-sm bg-primary text-on-primary font-semibold flex items-center justify-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-sm">account_balance</span>
<span className="">Công lập</span>
</button>
<button className="px-3 py-2 rounded-xl font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-sm">business</span>
<span className="">Tư thục</span>
</button>
</div>
<label className="flex items-center gap-2.5 pt-1 cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface-variant">Có hệ thống liên kết Quốc tế / 100% English</span>
</label>
</div>

<div className="flex flex-col gap-3 pt-2">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Học phí / năm</span>
<span className="font-label-sm text-label-sm text-primary font-bold">≤ 50 triệu/năm</span>
</div>
<div className="flex flex-col gap-2">
<div className="relative w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 bg-primary w-2/3 rounded-full"></div>
</div>
<div className="flex justify-between items-center text-outline font-label-sm text-label-sm">
<span className="">15 triệu</span>
<span className="">50 triệu</span>
<span className="">&gt; 120 triệu</span>
</div>
</div>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="px-2.5 py-1 rounded-lg bg-surface-container-high font-label-sm text-label-sm text-on-surface cursor-pointer hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Dưới 30M</span>
<span className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer shadow-xs">30M - 50M</span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container-high font-label-sm text-label-sm text-on-surface cursor-pointer hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">50M - 80M</span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container-high font-label-sm text-label-sm text-on-surface cursor-pointer hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">&gt; 100M</span>
</div>
</div>

<div className="flex flex-col gap-3 pt-2">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Phương thức xét tuyển</span>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2.5 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">Đánh giá năng lực (ĐGNL HCM/HN)</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">Điểm thi tốt nghiệp THPT 2026</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">Chứng chỉ ngoại ngữ (IELTS ≥ 6.0)</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-primary-container" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">Xét học bạ kết hợp phỏng vấn</span>
</label>
</div>
</div>

<div className="flex flex-col gap-2.5 pt-2">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Điểm sàn tham chiếu (2025)</span>
<div className="grid grid-cols-3 gap-2">
<button className="py-1.5 px-2 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">20 - 24đ</button>
<button className="py-1.5 px-2 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-xs">24 - 27.5đ</button>
<button className="py-1.5 px-2 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">&gt; 27.5đ</button>
</div>
</div>
</div>

<div className="rounded-2xl p-5 bg-gradient-to-br from-tertiary-fixed/40 via-surface-container-low to-surface-container-lowest shadow-sm flex flex-col gap-3">
<div className="w-9 h-9 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-xl">psychology</span>
</div>
<div className="flex flex-col gap-1">
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">Chưa rõ nên lọc thế nào?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Làm bài test định vị thế mạnh và ngân sách gia đình chỉ trong 4 phút.</p>
</div>
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold hover:gap-2.5 transition-all" href="#">
<span className="">Bắt đầu khảo sát nhanh</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</aside>

<main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
<div className="flex items-center gap-3">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">Danh sách trường đại học</h2>
<span className="px-3 py-1 rounded-full bg-primary-fixed font-label-sm text-label-sm text-on-primary-fixed font-bold">
                42 trường phù hợp
              </span>
</div>
<div className="flex items-center gap-3 shrink-0">
<div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-xs">
<span className="font-label-sm text-label-sm text-outline">Sắp xếp:</span>
<select className="bg-transparent font-label-md text-label-md text-on-surface font-semibold focus:outline-none cursor-pointer">
<option>Độ tương thích cao nhất</option>
<option>Điểm chuẩn: Cao đến Thấp</option>
<option>Điểm chuẩn: Thấp đến Cao</option>
<option>Học phí: Tiết kiệm nhất</option>
<option>Quy mô giảng dạy &amp; Kiểm định quốc tế</option>
</select>
</div>
</div>
</div>

<div className="flex flex-wrap items-center gap-2">
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
<span className="">Khu vực: TP.HCM</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-secondary">close</span>
</div>
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
<span className="">Hệ: Công lập</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-secondary">close</span>
</div>
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
<span className="">Chuyên ngành: Công nghệ thông tin</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-secondary">close</span>
</div>
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
<span className="">Học phí: 30M - 50M / năm</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-secondary">close</span>
</div>
<button className="font-label-sm text-label-sm text-outline hover:text-secondary ml-1 transition-colors">
              Xóa tất cả bộ lọc
            </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">

<div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern university campus building with sleek glass facade and courtyard garden in bright natural sunlight, Vietnamese college students walking with backpacks in vibrant academic setting" src="/stitch-assets/uit-campus-card.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute top-3 left-3 flex items-center gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-primary font-bold shadow-xs">
                    Công lập tự chủ
                  </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant font-medium">
                    ĐHQG-HCM
                  </span>
</div>
<div className="absolute top-3 right-3">
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container-lowest transition-colors shadow-sm">
<span className="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-surface-container-lowest">
<div>
<span className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-wider block">Mã trường: QSC</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-white leading-tight">ĐH Công nghệ Thông tin</h3>
</div>
<div className="w-9 h-9 rounded-xl bg-surface-container-lowest p-1 shrink-0 shadow-md flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-xl">terminal</span>
</div>
</div>
</div>

<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">

<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">Khu Đô thị ĐHQG, TP. Thủ Đức</span>
</span>
</div>

<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí trung bình</span>
<span className="font-label-lg text-label-lg text-primary font-bold">32M - 48M <span className="font-normal text-xs text-on-surface-variant">/năm</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điểm chuẩn THPT 2025</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">25.4 - 28.1 <span className="font-normal text-xs text-on-surface-variant">điểm</span></span>
</div>
</div>

<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Khoa học máy tính</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Kỹ thuật phần mềm</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">An toàn thông tin</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-primary font-medium">+14 ngành</span>
</div>
</div>

<div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-base text-outline">verified</span>
<span className="line-clamp-1">Xét tuyển: ĐGNL ĐHQG (60%) • THPT (35%) • Tuyển thẳng</span>
</div>
</div>

<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold hover:bg-secondary hover:text-on-secondary transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Đã thêm so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">

<div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Spacious modern university campus with landscaped green courtyards, trees, architectural colonnades, and engineering students discussing with laptops outdoors under soft daylight" src="/stitch-assets/hcmut-student-campus.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute top-3 left-3 flex items-center gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-secondary font-bold shadow-xs">
                    Công lập trọng điểm
                  </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant font-medium">
                    ĐHQG-HCM
                  </span>
</div>
<div className="absolute top-3 right-3">
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-secondary hover:bg-surface-container-lowest transition-colors shadow-sm">
<span className="material-symbols-outlined text-lg" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>
</div>
<div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-surface-container-lowest">
<div>
<span className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-wider block">Mã trường: QSB</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-white leading-tight">Đại học Bách Khoa TP.HCM</h3>
</div>
<div className="w-9 h-9 rounded-xl bg-surface-container-lowest p-1 shrink-0 shadow-md flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-xl">precision_manufacturing</span>
</div>
</div>
</div>

<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">Quận 10 &amp; TP. Thủ Đức, TP.HCM</span>
</span>
</div>

<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí chuẩn</span>
<span className="font-label-lg text-label-lg text-primary font-bold">30M - 50M <span className="font-normal text-xs text-on-surface-variant">/năm</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điểm chuẩn kết hợp 2025</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">75.0 - 88.5 <span className="font-normal text-xs text-on-surface-variant">/100đ</span></span>
</div>
</div>

<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Khoa học máy tính</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Cơ điện tử &amp; Robot</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Logistics &amp; SCM</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-primary font-medium">+35 ngành</span>
</div>
</div>

<div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-base text-outline">verified</span>
<span className="line-clamp-1">Mô hình tuyển sinh kết hợp toàn diện ĐHQG-HCM</span>
</div>
</div>

<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold hover:bg-secondary hover:text-on-secondary transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Đã thêm so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">

<div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Science university laboratory and open botanical campus courtyard with modern glass pavilions, Vietnamese students collaborating around academic research desks" src="/stitch-assets/hcmus-research-lab.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute top-3 left-3 flex items-center gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-primary font-bold shadow-xs">
                    Công lập cơ bản
                  </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Nghiên cứu sâu
                  </span>
</div>
<div className="absolute top-3 right-3">
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container-lowest transition-colors shadow-sm">
<span className="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-surface-container-lowest">
<div>
<span className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-wider block">Mã trường: QST</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-white leading-tight">ĐH Khoa học Tự nhiên</h3>
</div>
<div className="w-9 h-9 rounded-xl bg-surface-container-lowest p-1 shrink-0 shadow-md flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-xl">biotech</span>
</div>
</div>
</div>

<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">Quận 5 &amp; TP. Thủ Đức, TP.HCM</span>
</span>
</div>
<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí trung bình</span>
<span className="font-label-lg text-label-lg text-primary font-bold">27M - 38M <span className="font-normal text-xs text-on-surface-variant">/năm</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điểm chuẩn THPT 2025</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">22.0 - 27.2 <span className="font-normal text-xs text-on-surface-variant">điểm</span></span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Khoa học dữ liệu</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Trí tuệ nhân tạo (AI)</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Công nghệ Sinh học</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-primary font-medium">+26 ngành</span>
</div>
</div>
<div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-base text-outline">verified</span>
<span className="line-clamp-1">Xét tuyển: ĐGNL ĐHQG • Điểm thi THPT • Học bạ trường chuyên</span>
</div>
</div>
<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Thêm vào so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">

<div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Impressive contemporary university business school building with landscaped tropical trees, glass terraces, and Vietnamese university students walking together across the plaza" src="/stitch-assets/modern-university-campus.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute top-3 left-3 flex items-center gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-primary font-bold shadow-xs">
                    Công lập tự chủ
                  </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Top Đại học Đa ngành
                  </span>
</div>
<div className="absolute top-3 right-3">
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container-lowest transition-colors shadow-sm">
<span className="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-surface-container-lowest">
<div>
<span className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-wider block">Mã trường: KSA</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-white leading-tight">Đại học Kinh tế TP.HCM (UEH)</h3>
</div>
<div className="w-9 h-9 rounded-xl bg-surface-container-lowest p-1 shrink-0 shadow-md flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-xl">query_stats</span>
</div>
</div>
</div>

<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">Quận 3 &amp; Nam TP.HCM, TP.HCM</span>
</span>
</div>
<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí chuẩn</span>
<span className="font-label-lg text-label-lg text-primary font-bold">28M - 42M <span className="font-normal text-xs text-on-surface-variant">/năm</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điểm chuẩn THPT 2025</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">24.5 - 27.8 <span className="font-normal text-xs text-on-surface-variant">điểm</span></span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Công nghệ Tài chính (Fintech)</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Kinh doanh quốc tế</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Logistics</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-primary font-medium">+48 ngành</span>
</div>
</div>
<div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-base text-outline">verified</span>
<span className="line-clamp-1">Xét tuyển: Đề án UEH (Học sinh giỏi + IELTS) • ĐGNL • THPT</span>
</div>
</div>
<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Thêm vào so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>
</div>

<div className="my-3 rounded-2xl bg-gradient-to-r from-primary-container via-primary to-inverse-surface p-8 text-on-primary shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
<div className="absolute -right-8 -bottom-12 w-64 h-64 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
<div className="flex flex-col gap-2 max-w-xl z-10">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Định hướng thông minh</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-white leading-snug">
                Chưa biết chọn trường nào trước? Hãy bắt đầu từ ngành học bạn thực sự muốn theo đuổi.
              </h3>
<p className="font-body-sm text-body-sm text-on-primary-container">
                So sánh bản đồ chuẩn đầu ra, mức lương khởi điểm và tỷ lệ việc làm giữa các trường cùng đào tạo ngành bạn yêu thích.
              </p>
</div>
<div className="shrink-0 z-10">
<a className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-high transition-all shadow-md" href="#">
<span className="">Khám phá theo ngành học</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</a>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">
<div className="flex items-start justify-between gap-3">
<div className="flex flex-col">
<div className="flex items-center gap-2 mb-1">
<span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">100% Tiếng Anh</span>
<span className="font-label-sm text-label-sm text-outline">ĐHQG-HCM</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Đại học Quốc tế (IU)</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">TP. Thủ Đức, TP.HCM</span>
</span>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-secondary transition-colors">
<span className="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí</span>
<span className="font-label-lg text-label-lg text-primary font-bold">~50M <span className="font-normal text-xs text-on-surface-variant">/năm</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điểm chuẩn THPT</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">21.0 - 25.5 <span className="font-normal text-xs text-on-surface-variant">điểm</span></span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Khoa học máy tính (ABET)</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Logistics &amp; SCM</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Kỹ thuật y sinh</span>
</div>
</div>
</div>
<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Thêm vào so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)] transition-all duration-300 flex flex-col group">
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div className="flex flex-col gap-3">
<div className="flex items-start justify-between gap-3">
<div className="flex flex-col">
<div className="flex items-center gap-2 mb-1">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Ứng dụng doanh nghiệp</span>
<span className="font-label-sm text-label-sm text-outline">Tư thục cao cấp</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Đại học FPT TP.HCM</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-base text-outline">location_on</span>
<span className="">Khu Công nghệ cao, TP. Thủ Đức</span>
</span>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-secondary transition-colors">
<span className="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Học phí chuyên ngành</span>
<span className="font-label-lg text-label-lg text-primary font-bold">~28.7M <span className="font-normal text-xs text-on-surface-variant">/kỳ (9 kỳ)</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Điều kiện xét tuyển</span>
<span className="font-label-lg text-label-lg text-secondary font-bold">Top 40 <span className="font-normal text-xs text-on-surface-variant">SchoolRank</span></span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ngành đào tạo thế mạnh:</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Kỹ thuật phần mềm</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">Thiết kế Mỹ thuật số</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">AI &amp; An toàn thông tin</span>
</div>
</div>
</div>
<div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
<span className="material-symbols-outlined text-sm">compare_arrows</span>
<span className="">Thêm vào so sánh</span>
</button>
<a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold hover:bg-primary hover:text-on-primary transition-all" href="#">
<span className="">Xem chi tiết</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</article>
</div>

<div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-2">
<span className="font-body-sm text-body-sm text-on-surface-variant">Hiển thị <strong className="text-on-surface">6</strong> trên tổng số <strong className="text-on-surface">42 trường</strong></span>
<div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden ml-2">
<div className="w-1/7 h-full bg-primary rounded-full"></div>
</div>
</div>
<div className="flex items-center gap-2">
<button className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container shadow-xs flex items-center gap-1.5 transition-all">
<span className="">Xem thêm 6 trường kế tiếp</span>
<span className="material-symbols-outlined text-base">expand_more</span>
</button>
</div>
</div>
</main></div></div></section></div></main>
  )
}

export default UniversityCompareModalPage
