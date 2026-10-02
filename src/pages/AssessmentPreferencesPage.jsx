function AssessmentPreferencesPage() {
  return (
<main className="w-full pt-16 flex-1 bg-surface-container-lowest"><div className="flex flex-col w-full font-['Be_Vietnam_Pro',sans-serif] text-on-surface antialiased pb-28">

<div className="w-full max-w-[840px] mx-auto px-margin sm:px-gutter-lg pt-6">

<nav aria-label="Tiến trình làm bài" className="w-full mb-8">
<div className="grid grid-cols-3 gap-2 sm:gap-3 items-center">

<div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low transition-colors">
<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
<svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-surface-variant font-medium truncate hidden sm:block">Bước 1</p>
<p className="font-label-md text-label-md text-on-surface font-semibold truncate">Sở thích nghề nghiệp</p>
</div>
</div>

<div className="flex items-center gap-2 p-2 rounded-xl bg-primary-container text-on-primary shadow-sm shadow-primary/20 transition-all">
<div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
<span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-primary-container font-medium truncate hidden sm:block">Bước 2</p>
<p className="font-label-md text-label-md font-bold text-white truncate">Điều bạn ưu tiên</p>
</div>
</div>

<div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low opacity-60">
<div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center shrink-0">
<span className="w-2 h-2 rounded-full bg-outline"></span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-surface-variant font-medium truncate hidden sm:block">Bước 3</p>
<p className="font-label-md text-label-md text-on-surface-variant font-medium truncate">Hoàn cảnh hiện tại</p>
</div>
</div>
</div>

<div className="mt-5 pt-4 bg-surface-container-lowest rounded-xl">
<div className="flex items-center justify-between gap-4 mb-2">
<span className="font-label-md text-label-md font-semibold text-primary">
            Tiến độ phần 2: Môi trường &amp; Cách làm việc
          </span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Câu 3 / 9 · Ước tính 3 phút còn lại
          </span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full w-1/3 transition-all duration-500 ease-out"></div>
</div>
</div>
</nav>

<header className="mb-6">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider mb-3">
<svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<path d="M12 16v-4"></path>
<path d="M12 8h.01"></path>
</svg>
<span>Phong cách &amp; Điều bạn ưu tiên · Tự do khám phá không tính điểm</span>
</div>
<h1 className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight text-balance leading-snug">
        Trong một dự án, phần nào thường khiến bạn thấy hứng thú hơn?
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
        Chọn điều gần với cách bạn thích tham gia nhất. <span className="font-semibold text-on-surface">(Bạn có thể chọn 1 đến 2 lựa chọn)</span>:
      </p>
</header>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

<div aria-checked="false" className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-surface-container-low" role="checkbox" tabIndex="0">
<div>
<div className="flex items-start justify-between gap-3 mb-4">
<div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="11" cy="11" r="8"></circle>
<line x1="21" x2="16.65" y1="21" y2="16.65"></line>
<line x1="11" x2="11" y1="8" y2="14"></line>
<line x1="8" x2="14" y1="11" y2="11"></line>
</svg>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              Nghiên cứu &amp; Logic
            </span>
</div>
<h2 className="font-headline-sm text-headline-sm text-base font-bold text-on-surface mb-1">
            Phân tích vấn đề
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Tìm nguyên nhân và cách giải quyết hợp lý thông qua dữ liệu.
          </p>
</div>
<div className="mt-6 flex items-center gap-2 text-on-surface-variant">
<div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
<div className="w-2 h-2 rounded-full bg-transparent"></div>
</div>
<span className="font-label-sm text-label-sm font-medium">Nhấn để chọn</span>
</div>
</div>

<div aria-checked="true" className="relative flex flex-col justify-between p-5 rounded-2xl bg-surface-container-high shadow-md transition-all duration-200 cursor-pointer" role="checkbox" tabIndex="0">
<div>
<div className="flex items-start justify-between gap-3 mb-4">
<div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 2v2"></path>
<path d="M12 20v2"></path>
<path d="m4.93 4.93 1.41 1.41"></path>
<path d="m17.66 17.66 1.41 1.41"></path>
<path d="M2 12h2"></path>
<path d="M20 12h2"></path>
<path d="m6.34 17.66-1.41 1.41"></path>
<path d="m19.07 4.93-1.41 1.41"></path>
<circle cx="12" cy="12" r="4"></circle>
</svg>
</div>
<div className="flex items-center gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-primary text-white font-label-sm text-label-sm font-semibold">
                Sáng tạo &amp; Đổi mới
              </span>
<div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
</div>
</div>
<h2 className="font-headline-sm text-headline-sm text-base font-bold text-primary mb-1">
            Tạo ý tưởng mới
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Nghĩ ra cách làm, nội dung hoặc hướng tiếp cận mới mẻ và khác biệt.
          </p>
</div>
<div className="mt-6 flex items-center gap-2 text-primary font-semibold">
<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
<span className="font-label-sm text-label-sm">Đã chọn lựa chọn này</span>
</div>
</div>

<div aria-checked="false" className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-surface-container-low" role="checkbox" tabIndex="0">
<div>
<div className="flex items-start justify-between gap-3 mb-4">
<div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
<circle cx="9" cy="7" r="4"></circle>
<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              Giao tiếp &amp; Kết nối
            </span>
</div>
<h2 className="font-headline-sm text-headline-sm text-base font-bold text-on-surface mb-1">
            Trao đổi với mọi người
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Kết nối, thuyết trình, thảo luận và điều phối hoạt động cùng đồng đội.
          </p>
</div>
<div className="mt-6 flex items-center gap-2 text-on-surface-variant">
<div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
<div className="w-2 h-2 rounded-full bg-transparent"></div>
</div>
<span className="font-label-sm text-label-sm font-medium">Nhấn để chọn</span>
</div>
</div>

<div aria-checked="false" className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-surface-container-low" role="checkbox" tabIndex="0">
<div>
<div className="flex items-start justify-between gap-3 mb-4">
<div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
</svg>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              Thực thi &amp; Sản phẩm
            </span>
</div>
<h2 className="font-headline-sm text-headline-sm text-base font-bold text-on-surface mb-1">
            Xây dựng hoặc thực hành
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Biến ý tưởng thành sản phẩm mẫu, hiện vật hoặc chạy thử nghiệm trực tiếp.
          </p>
</div>
<div className="mt-6 flex items-center gap-2 text-on-surface-variant">
<div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
<div className="w-2 h-2 rounded-full bg-transparent"></div>
</div>
<span className="font-label-sm text-label-sm font-medium">Nhấn để chọn</span>
</div>
</div>
</div>

<section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm space-y-8 mb-6">
<div className="flex items-center gap-2.5 pb-2">
<div className="w-2 h-5 bg-secondary-container rounded-full"></div>
<h2 className="font-headline-sm text-headline-sm text-base font-bold text-on-surface">
          Mức độ ưu tiên về môi trường làm việc:
        </h2>
</div>

<div className="space-y-4">
<div className="flex items-center justify-between">
<label className="font-label-lg text-label-lg font-semibold text-on-surface">
            Bạn thích môi trường làm việc nào hơn?
          </label>
<span className="font-label-sm text-label-sm font-bold text-primary px-2.5 py-0.5 rounded-full bg-surface-container-high">
            Cân bằng cả hai (Đang chọn)
          </span>
</div>

<div className="relative pt-2 pb-1">

<div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-surface-container-highest rounded-full"></div>
<div className="absolute top-1/2 left-4 w-1/2 -translate-y-1/2 h-1 bg-primary-container rounded-full"></div>

<div className="relative flex items-center justify-between z-10">

<button aria-label="Độc lập tuyệt đối" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Thiên về độc lập" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Cân bằng cả hai" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-md scale-110 ring-4 ring-primary-fixed" type="button">
<span className="w-3.5 h-3.5 rounded-full bg-surface-container-lowest"></span>
</button>

<button aria-label="Thiên về làm nhóm" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Làm nhóm tuyệt đối" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>
</div>
</div>

<div className="grid grid-cols-2 text-on-surface-variant pt-1 font-body-sm text-body-sm">
<div className="text-left">
<span className="font-semibold text-on-surface block">Làm việc độc lập</span>
<span className="text-xs text-outline leading-tight block mt-0.5">Tập trung solo, tự chủ nhịp độ</span>
</div>
<div className="text-right">
<span className="font-semibold text-on-surface block">Làm việc cùng nhóm</span>
<span className="text-xs text-outline leading-tight block mt-0.5">Trao đổi liên tục, năng động</span>
</div>
</div>
</div>

<div className="space-y-4 pt-4">
<div className="flex items-center justify-between">
<label className="font-label-lg text-label-lg font-semibold text-on-surface">
            Bạn thích công việc như thế nào hơn?
          </label>
<span className="font-label-sm text-label-sm font-bold text-primary px-2.5 py-0.5 rounded-full bg-surface-container-high">
            Thiên về linh hoạt, đổi mới
          </span>
</div>

<div className="relative pt-2 pb-1">

<div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-surface-container-highest rounded-full"></div>
<div className="absolute top-1/2 left-4 w-3/4 -translate-y-1/2 h-1 bg-primary-container rounded-full"></div>

<div className="relative flex items-center justify-between z-10">

<button aria-label="Ổn định tối đa" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Thiên về ổn định" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Cân bằng" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>

<button aria-label="Thiên về linh hoạt" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-md scale-110 ring-4 ring-primary-fixed" type="button">
<span className="w-3.5 h-3.5 rounded-full bg-surface-container-lowest"></span>
</button>

<button aria-label="Rất linh hoạt, chấp nhận biến động" className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow hover:scale-110 transition-transform" type="button">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
</button>
</div>
</div>

<div className="grid grid-cols-2 text-on-surface-variant pt-1 font-body-sm text-body-sm">
<div className="text-left">
<span className="font-semibold text-on-surface block">Ổn định &amp; rõ ràng</span>
<span className="text-xs text-outline leading-tight block mt-0.5">Quy trình cụ thể, an tâm</span>
</div>
<div className="text-right">
<span className="font-semibold text-on-surface block">Linh hoạt &amp; thay đổi</span>
<span className="text-xs text-outline leading-tight block mt-0.5">Thích ứng nhanh, nhiều thử thách</span>
</div>
</div>
</div>
</section>

<div className="rounded-2xl p-4 bg-tertiary-fixed/30 flex gap-3.5 items-start mb-8">
<div className="w-8 h-8 rounded-xl bg-tertiary-fixed-dim/40 flex items-center justify-center shrink-0 mt-0.5 text-tertiary">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
<path d="M8 10h.01"></path>
<path d="M12 10h.01"></path>
<path d="M16 10h.01"></path>
</svg>
</div>
<div>
<p className="font-label-md text-label-md font-bold text-tertiary mb-0.5">
          Góc nhìn từ Cố vấn UniView
        </p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Phần “Ưu tiên” giúp bạn nhận diện phong cách làm việc và môi trường học tập lý tưởng nhất ở bậc đại học, không có câu trả lời đúng sai hay phán xét điểm số. Hãy lắng nghe trực giác tự nhiên của bản thân!
        </p>
</div>
</div>
</div>

<aside aria-label="Thao tác bài khảo sát" className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(18,27,46,0.06)] py-3 px-margin sm:px-gutter-lg">
<div className="max-w-[840px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

<a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold transition-colors duration-200" data-path="step-1-interests" href="#">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
<line x1="19" x2="5" y1="12" y2="12"></line>
<polyline points="12 19 5 12 12 5"></polyline>
</svg>
<span>Quay lại</span>
</a>

<div className="hidden md:flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
<polyline points="17 21 17 13 7 13 7 21"></polyline>
<polyline points="7 3 7 8 15 8"></polyline>
</svg>
<span>Tiến độ được tự động lưu. Bạn luôn có thể quay lại để tinh chỉnh.</span>
</div>

<a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md shadow-primary/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" data-path="step-2-question-4" href="#">
<span>Tiếp tục câu tiếp theo</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
<line x1="5" x2="19" y1="12" y2="12"></line>
<polyline points="12 5 19 12 12 19"></polyline>
</svg>
</a>
</div>
</aside>
</div>
</main>
  )
}

export default AssessmentPreferencesPage
