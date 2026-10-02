function RiasecAssessmentPage() {
  return (
<main className="w-full pt-16 flex-1 flex flex-col"><div className="flex flex-col w-full">
<div className="relative w-full overflow-hidden">
<div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none"></div>
<div className="absolute top-48 right-12 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none"></div>
<div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin py-space-xl relative z-10 flex flex-col gap-space-xl">

<section className="flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm tracking-wide uppercase">
              Bước 1 / 3 — Sở thích nghề nghiệp
            </span>
<span className="text-outline-variant text-label-sm">/</span>
<span className="px-3 py-1 rounded-full bg-sage-subtle text-sage-text font-label-sm flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              Nhóm RIASEC: Nghiên cứu (Investigative)
            </span>
</div>
<div className="flex items-center gap-space-sm font-label-md text-secondary">
<span>Tiến độ câu hỏi</span>
<span className="font-headline-sm text-primary leading-none" id="current-q-num">04</span>
<span className="text-outline-variant">/ 12</span>
</div>
</div>

<div className="relative w-full h-2.5 bg-surface-container rounded-full overflow-hidden shadow-inner">
<div className="absolute left-0 top-0 bottom-0 bg-primary-container rounded-full transition-all duration-700 ease-out" id="progress-fill" style={{ "width": "33.33%" }}></div>
<div className="absolute top-0 bottom-0 left-[33.33%] w-1 bg-surface-container-lowest"></div>
</div>
<div className="flex justify-between items-center text-label-sm text-on-surface-variant">
<span className="flex items-center gap-1 font-label-md text-on-surface">
<span className="material-symbols-outlined text-[16px] text-tertiary">psychology</span>
            Mô hình đánh giá Holland RIASEC tiêu chuẩn học thuật
          </span>
<span className="hidden sm:inline">Ước tính thời gian còn lại: ~4 phút</span>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-7 flex flex-col gap-space-lg">
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-lg transition-opacity duration-300" id="question-card">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs text-label-sm text-secondary font-label-md">
<span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary" id="question-badge-num">4</span>
<span className="tracking-wider uppercase">Khảo sát xu hướng tư duy</span>
</div>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm">
<span className="material-symbols-outlined text-[14px]">query_stats</span> Dữ liệu &amp; Khoa học
              </span>
</div>

<div className="flex flex-col gap-space-xs">
<h1 className="font-headline-lg text-on-surface leading-tight" id="question-headline">
                Phân tích dữ liệu hoặc số liệu để tìm ra nguyên nhân cốt lõi của một vấn đề phức tạp.
              </h1>
<p className="font-body-md text-on-surface-variant">
                Hãy đánh giá mức độ bạn cảm thấy bị lôi cuốn, tập trung và hứng khởi khi đứng trước những tập số liệu hay bài toán tìm nguyên nhân logic.
              </p>
</div>

<div className="bg-sky-subtle rounded-xl p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">lightbulb</span>
<div className="flex flex-col gap-1">
<span className="font-label-md text-primary font-semibold">Tình huống tham chiếu thực tế:</span>
<p className="font-body-sm text-on-surface-variant leading-relaxed">
                  Đọc biểu đồ xu hướng thị trường, bóc tách kết quả thí nghiệm khoa học, lọc dữ liệu khảo sát trong dự án học tập hoặc điều tra nguyên nhân sâu xa của một hiện tượng kinh tế – xã hội.
                </p>
</div>
</div>

<div className="flex flex-col gap-space-sm pt-space-xs">
<div className="flex justify-between items-center">
<span className="font-label-md text-on-surface uppercase tracking-wider font-semibold">Mức độ hứng thú của bạn</span>
<span className="font-label-sm text-secondary" id="rating-status-hint">Chọn mức điểm từ 1 đến 5</span>
</div>

<div aria-label="Likert Scale" className="grid grid-cols-1 sm:grid-cols-5 gap-space-xs" id="rating-group" role="radiogroup">

<button className="rating-btn group relative flex flex-col items-center justify-between p-space-sm py-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 text-center gap-2 cursor-pointer shadow-sm" data-val="1" type="button">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary group-hover:scale-105 transition-transform">
                    1
                  </div>
<span className="font-label-sm text-on-surface leading-tight">Không<br />hứng thú</span>
<div className="indicator w-2 h-2 rounded-full bg-transparent transition-colors"></div>
</button>

<button className="rating-btn group relative flex flex-col items-center justify-between p-space-sm py-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 text-center gap-2 cursor-pointer shadow-sm" data-val="2" type="button">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary group-hover:scale-105 transition-transform">
                    2
                  </div>
<span className="font-label-sm text-on-surface leading-tight">Hơi ít<br />hứng thú</span>
<div className="indicator w-2 h-2 rounded-full bg-transparent transition-colors"></div>
</button>

<button className="rating-btn group relative flex flex-col items-center justify-between p-space-sm py-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 text-center gap-2 cursor-pointer shadow-sm" data-val="3" type="button">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary group-hover:scale-105 transition-transform">
                    3
                  </div>
<span className="font-label-sm text-on-surface leading-tight">Bình<br />thường</span>
<div className="indicator w-2 h-2 rounded-full bg-transparent transition-colors"></div>
</button>

<button className="rating-btn group relative flex flex-col items-center justify-between p-space-sm py-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 text-center gap-2 cursor-pointer shadow-sm" data-val="4" type="button">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary group-hover:scale-105 transition-transform">
                    4
                  </div>
<span className="font-label-sm text-on-surface leading-tight">Khá<br />hứng thú</span>
<div className="indicator w-2 h-2 rounded-full bg-transparent transition-colors"></div>
</button>

<button className="rating-btn group relative flex flex-col items-center justify-between p-space-sm py-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 text-center gap-2 cursor-pointer shadow-sm" data-val="5" type="button">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary group-hover:scale-105 transition-transform">
                    5
                  </div>
<span className="font-label-sm text-on-surface leading-tight">Rất<br />hứng thú</span>
<div className="indicator w-2 h-2 rounded-full bg-transparent transition-colors"></div>
</button>
</div>
</div>

<div className="flex items-center gap-space-xs text-label-sm text-secondary pt-space-xs">
<span className="material-symbols-outlined text-[16px] text-outline">verified</span>
<span>Không có câu trả lời đúng hay sai. Mọi phản hồi đều giúp tinh chỉnh độ chính xác của bản đồ nguyện vọng.</span>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
<button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest font-label-lg text-on-surface transition-all flex items-center justify-center gap-space-xs shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span>Câu trước</span>
</button>
<div className="flex items-center gap-space-sm w-full sm:w-auto">
<button className="hidden md:flex px-5 py-3 rounded-full bg-transparent hover:bg-surface-container font-label-md text-secondary transition-colors items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">bookmark_border</span>
<span>Lưu nháp</span>
</button>
<button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs shadow-sm group" id="next-btn" type="button">
<span>Tiếp tục câu 5</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">

<div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-sky-subtle blur-2xl transition-all duration-500 pointer-events-none" id="mascot-ambient-glow"></div>

<div className="flex flex-col gap-space-xs relative z-10">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-label-md uppercase tracking-wider text-on-surface font-semibold">Cố vấn học thuật AI</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm transition-all duration-300 font-semibold" id="mascot-mood-pill">
                  Chờ phản hồi
                </span>
</div>

<div className="flex items-center justify-between pt-1">
<span className="font-label-sm text-secondary">Xem nhanh biểu cảm:</span>
<div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full">
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="0" type="button">0 - Chờ</button>
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="1" type="button">1</button>
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="2" type="button">2</button>
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="3" type="button">3</button>
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="4" type="button">4</button>
<button className="quick-pill px-2 py-0.5 rounded-full text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" data-pill="5" type="button">5 - Thích</button>
</div>
</div>
</div>

<div className="relative w-full py-6 bg-surface-container-low rounded-xl flex flex-col items-center justify-center overflow-hidden">

<div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 flex items-center justify-center" id="sparkle-layer">
<span className="absolute top-4 left-16 text-primary text-lg animate-pulse font-bold">✦</span>
<span className="absolute bottom-6 right-16 text-tertiary text-base animate-bounce">✨</span>
<span className="absolute top-8 right-20 text-primary-container text-sm font-bold">✦</span>
</div>

<div className="relative flex items-center justify-center" style={{ "width": "150px", "height": "150px" }}>

<div className="absolute inset-2 rounded-full bg-surface-container-lowest shadow-sm"></div>

<div className="relative z-10 w-[140px] h-[140px] overflow-hidden rounded-full flex items-center justify-center transition-all duration-300 ease-out origin-bottom" id="mascot-avatar">
<div className="w-full h-full bg-no-repeat transition-all duration-300 pointer-events-none select-none" id="mascot-sprite" style={{ "backgroundImage": "url('/stitch-assets/uniview-mascot-rating-guide.jpg')", "backgroundSize": "420% auto", "backgroundPosition": "3% 5%" }}></div>
</div>

<div className="absolute -top-1 -right-1 z-20 w-8 h-8 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center transition-all duration-300" id="mascot-mini-badge">
<span className="material-symbols-outlined text-[18px] text-secondary" id="mascot-mini-icon">chat_bubble</span>
</div>
</div>

<div className="mt-4 px-space-md w-full max-w-[340px] text-center z-10">
<div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm transition-all duration-300">
<p className="font-body-sm text-on-surface font-medium leading-snug" id="mascot-dialogue">
                    "Chào bạn! Hãy chọn mức độ hứng thú thật nhất của bản thân để mình ghi nhận nhé."
                  </p>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs pt-space-xs">
<span className="font-label-sm uppercase tracking-wider text-secondary">Đặc trưng nhóm Nghiên cứu (I):</span>
<div className="grid grid-cols-2 gap-space-xs">
<div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">analytics</span>
<span className="font-label-sm text-on-surface">Tư duy trừu tượng</span>
</div>
<div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">science</span>
<span className="font-label-sm text-on-surface">Khám phá giả thuyết</span>
</div>
<div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">hub</span>
<span className="font-label-sm text-on-surface">Bóc tách hệ thống</span>
</div>
<div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">biotech</span>
<span className="font-label-sm text-on-surface">Tính logic độc lập</span>
</div>
</div>
</div>

<div className="bg-sand-subtle rounded-xl p-space-md flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-secondary uppercase tracking-wider">Ngành học liên quan tiêu biểu</span>
<span className="font-label-sm text-primary font-semibold">Top fit</span>
</div>
<p className="font-body-sm text-on-surface font-semibold">
                Khoa học dữ liệu, Trí tuệ nhân tạo, Kinh tế lượng, Công nghệ sinh học &amp; Nghiên cứu thị trường
              </p>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">help_outline</span>
<span className="font-label-md text-on-surface">Bạn phân vân về khái niệm "dữ liệu phức tạp"?</span>
</div>
<button className="font-label-sm text-primary hover:underline font-semibold flex items-center gap-1" type="button">
              Xem giải nghĩa <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none" id="toast-feedback">
<div className="bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-full shadow-lg font-label-md flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
<span id="toast-text">Đã ghi nhận lựa chọn</span>
</div>
</div>
</div>
</main>
  )
}

export default RiasecAssessmentPage
