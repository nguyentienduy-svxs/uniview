function PricingPage() {
  return (
<main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">

<div className="relative w-full max-w-[1240px] mx-auto px-gutter py-space-xl overflow-hidden">
<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-secondary-container/35 blur-3xl pointer-events-none rounded-full"></div>
<div className="absolute top-96 right-[-100px] w-[420px] h-[320px] bg-tertiary-fixed/30 blur-3xl pointer-events-none rounded-full"></div>

<div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-space-md pb-space-lg">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span className="">Minh bạch tuyệt đối · Không tự động trừ phí định kỳ</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
        Chọn mức hỗ trợ phù hợp với hành trình của bạn
      </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
        Bắt đầu miễn phí. Chỉ nâng cấp khi bạn cần phân tích sâu hơn hoặc muốn theo dõi lựa chọn trong năm tuyển sinh mục tiêu.
      </p>

<div className="w-full pt-space-sm">
<div className="p-space-sm rounded-full bg-surface-container inline-flex flex-col sm:flex-row items-center gap-2 max-w-full shadow-sm">
<div className="flex items-center gap-2 px-4 py-1.5 text-on-surface font-label-md text-label-md shrink-0">
<span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
<span className="">Bạn dự kiến nhập học năm nào?</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-full w-full sm:w-auto justify-center" id="year-toggle-group"><button id="btn-year-2027" className="year-btn px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 bg-primary-container text-on-primary shadow-sm flex items-center gap-1.5" data-year="2027" type="button"><span className="material-symbols-outlined text-[14px]">check</span><span className="">2027 (Khóa 2027)</span></button><button id="btn-year-2028" className="year-btn px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-1.5" data-year="2028" type="button"><span className="">2028 (Khóa 2028)</span></button><button id="btn-year-unspecified" className="year-btn px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-1.5" data-year="undecided" type="button"><span className="">Chưa xác định</span></button></div>
</div>
<div className="flex items-center justify-center gap-1.5 mt-2.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px] text-secondary">info</span>
<span className="">Uniview dùng năm này để hiển thị đúng dữ liệu tuyển sinh và thời hạn gói tương ứng.</span>
</div>
</div>
</div>

<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch pt-space-md pb-space-2xl">

<div className="lg:col-span-4 flex flex-col justify-between bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              Khám phá ban đầu
            </span>
<span className="material-symbols-outlined text-secondary text-[24px]">explore</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">Khám phá miễn phí</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đầy đủ công cụ tra cứu cơ bản và trắc nghiệm tự khám phá ban đầu.</p>
</div>
<div className="pt-space-xs pb-space-sm">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface font-bold">0đ</span>
<span className="font-label-md text-label-md text-secondary">/ Dùng không giới hạn</span>
</div>
<p className="font-label-sm text-label-sm text-sage-text mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">lock_open</span>
<span className="">Không cần cung cấp thông tin thanh toán</span>
</p>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-1">
<span className="font-label-sm text-label-sm text-on-secondary-container font-semibold uppercase tracking-wider">Quyền lợi miễn phí trọn đời</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chỉnh sửa hồ sơ (Điểm THPT, ĐGNL, học bạ, ngân sách...) hoàn toàn 100% không thu phí.</p>
</div>
<div className="space-y-space-sm pt-2">
<span className="font-label-md text-label-md text-on-surface font-semibold block">Tính năng bao gồm:</span>
<ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Khám phá <strong>400+ ngành</strong> &amp; <strong>250+ trường</strong></span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Basic Assessment (Trắc nghiệm sở thích cơ bản)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Basic RIASEC Result (Xác định 3 nhóm tính cách chính)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Admission Checker (Thử điểm vào các trường công khai)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Wishlist (Lưu danh sách ngành &amp; trường quan tâm)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Quick Compare (So sánh nhanh 2 trường độc lập)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Basic Decision Board (Sắp xếp nguyện vọng cơ bản)</span>
</li>
</ul>
</div>
</div>
<div className="pt-space-lg">
<button className="w-full py-3.5 px-6 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2" type="button">
<span className="">Bắt đầu miễn phí</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>

<div className="lg:col-span-4 flex flex-col justify-between bg-lavender-subtle rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 relative">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<span className="px-3 py-1 rounded-full bg-surface-container-lowest text-lavender-text font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Báo cáo định hướng
            </span>
<div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-lavender-text shadow-xs">
<span className="material-symbols-outlined text-[20px]">psychology</span>
</div>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">Personal Direction Report</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Dành cho bạn khi muốn hiểu sâu hơn vì sao một số ngành xuất hiện trong shortlist.</p>
</div>
<div className="pt-space-xs pb-space-sm">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-primary font-bold">59.000đ</span>
<span className="font-label-md text-label-md text-on-surface-variant">/ Một lần duy nhất</span>
</div>
<p className="font-label-sm text-label-sm text-tertiary font-medium mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">all_inclusive</span>
<span className="">Sở hữu vĩnh viễn · Không bao giờ hết hạn</span>
</p>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-lowest/80 space-y-1">
<span className="font-label-sm text-label-sm text-lavender-text font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">auto_stories</span>
              Bao gồm toàn bộ Khám phá miễn phí +
            </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Phân tích chuyên sâu 32 chỉ số năng lực kèm giải thích khoa học cho từng nhóm ngành gợi ý.</p>
</div>
<div className="space-y-space-sm pt-2">
<span className="font-label-md text-label-md text-on-surface font-semibold block">Đặc quyền phân tích chuyên sâu:</span>
<ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className=""><strong>Full Assessment Analysis</strong> (Báo cáo 6 nhóm RIASEC &amp; 32 chỉ số)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className=""><strong>Personal Profile Summary</strong> (Bản đồ thế mạnh năng lực cá nhân)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className=""><strong>Personalized Major Shortlist</strong> (Top 7 ngành tương thích cao nhất)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Giải thích khoa học vì sao từng ngành phù hợp với tính cách</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Cảnh báo rào cản &amp; thách thức thực tế của ngành nghề</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className=""><strong>Initial University Shortlist</strong> (12 trường đối chiếu ngân sách)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span className="">Xuất bản <strong>báo cáo PDF tinh gọn</strong> gửi phụ huynh thảo luận</span>
</li>
</ul>
</div>
</div>
<div className="pt-space-lg space-y-2">
<button className="w-full py-3.5 px-6 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:shadow-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-2" type="button">
<span className="">Mở khóa báo cáo (59.000đ)</span>
<span className="material-symbols-outlined text-[18px]">workspace_premium</span>
</button>
<p className="font-label-sm text-label-sm text-center text-on-surface-variant">Báo cáo lưu trữ trọn đời trong tài khoản</p>
</div>
</div>

<div className="lg:col-span-4 flex flex-col justify-between bg-surface-container-lowest rounded-xl p-space-lg shadow-lg relative transform lg:-translate-y-2" id="admission-pass-card">
<div id="pass-badge-pill" className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full font-label-sm text-label-sm shadow-md flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200">
  <span className="material-symbols-outlined text-[14px]" id="pass-badge-icon">star</span>
  <span id="pass-pill-text" className="">Phù hợp khi đang chuẩn bị tuyển sinh 2027</span>
</div>


<div id="view-pass-2027" className="flex flex-col justify-between h-full">
  <div className="space-y-space-md pt-2">
    <div className="flex items-center justify-between">
      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
        Chiến lược toàn diện
      </span>
      <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
        <span className="material-symbols-outlined text-[20px]">military_tech</span>
      </div>
    </div>
    <div>
      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Admission Pass 2027</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cho hành trình tuyển sinh đại học 2027.</p>
    </div>
    <div className="pt-space-xs pb-space-sm">
      <div className="flex items-baseline gap-2">
        <span className="font-display-lg text-display-lg text-primary font-bold">89.000đ</span>
        <span className="font-label-md text-label-md text-on-surface-variant">/ Trọn gói mùa tuyển sinh</span>
      </div>
      <div className="grid grid-cols-1 gap-1.5 mt-3 pt-2">
        <div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-primary text-[16px]">bolt</span>
          <span className="font-semibold">Dùng ngay sau khi thanh toán</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-primary text-[16px]">event_available</span>
          <span className="">Hiệu lực đến 30/09/2027</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[16px]">do_not_disturb_on</span>
          <span className="font-semibold">Thanh toán 1 lần · Không tự động gia hạn</span>
        </div>
      </div>
    </div>
    <div className="p-space-sm rounded-xl bg-sky-subtle space-y-1">
      <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">done_all</span>
        Mở khóa toàn bộ Personal Direction Report (59k)
      </span>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Kèm toàn quyền truy cập bộ công cụ định tuyến đa phương thức và thuật toán cập nhật 24/7.</p>
    </div>
    <div className="space-y-space-sm pt-2">
      <span className="font-label-md text-label-md text-on-surface font-semibold block">Đặc quyền phân luồng &amp; mô phỏng:</span>
      <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className=""><strong>Admission Route Mapping:</strong> Bản đồ phân luồng 4+ phương thức (THPT, ĐGNL, ĐGTD, Học bạ)</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className=""><strong>Scenario Comparison:</strong> Mô phỏng kịch bản điểm số &amp; biến động điểm sàn thực tế</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className=""><strong>Personalized Compare:</strong> So sánh 5 trường theo hồ sơ riêng &amp; học phí 4 năm</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className=""><strong>Advanced Decision Board:</strong> Ma trận sắp xếp thứ tự nguyện vọng triệt tiêu rủi ro trượt oan</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className=""><strong>Regenerate Shortlist:</strong> Tự động tính lại danh sách trúng tuyển khi có điểm mới</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Tự động cập nhật chỉ tiêu &amp; đề án mới nhất của <strong>142 trường đại học</strong></span>
        </li>
      </ul>
    </div>
  </div>
  <div className="pt-space-lg space-y-2">
    <button className="w-full py-3.5 px-6 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2 group" type="button">
      <span className="">Mở khóa Admission Pass 2027 (89.000đ)</span>
      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </button>
    <p className="font-label-sm text-label-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-tertiary">security</span>
      <span className="">Cam kết hoàn trả 100% nếu đề án tuyển sinh sai lệch</span>
    </p>
  </div>
</div>


<div id="view-pass-2028" className="hidden flex flex-col justify-between h-full">
  <div className="space-y-space-md pt-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold uppercase tracking-wider">
          Chưa mở
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
          Khóa 2028
        </span>
      </div>
      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shadow-xs">
        <span className="material-symbols-outlined text-[20px]">schedule</span>
      </div>
    </div>
    <div>
      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Admission Pass 2028</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cho hành trình tuyển sinh đại học 2028</p>
    </div>
    
    <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-highest space-y-1.5">
      <div className="flex items-center gap-2 text-on-surface font-label-lg text-label-lg font-bold">
        <span className="material-symbols-outlined text-secondary text-[20px]">event_upcoming</span>
        <span className="">Mở từ 01/09/2027</span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Admission Pass được mở khi bạn bước vào năm chuẩn bị tuyển sinh chính thức.
      </p>
    </div>
    <div className="space-y-space-sm pt-1">
      <span className="font-label-md text-label-md text-on-surface font-semibold block">Tính năng hiện có thể sử dụng ngay:</span>
      <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Khám phá <strong>400+ ngành</strong> &amp; <strong>250+ trường</strong></span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Basic Assessment &amp; Kết quả RIASEC</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Admission Checker</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Wishlist &amp; Quick Compare</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span className="">Basic Decision Board</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">stars</span>
          <span className="">Personal Direction Report (định hướng sớm ngay từ Lớp 10 - 11)</span>
        </li>
      </ul>
    </div>
  </div>
  <div className="pt-space-lg space-y-2.5">
    <button className="w-full py-3.5 px-6 rounded-full bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg cursor-not-allowed flex items-center justify-center gap-2 opacity-80" disabled type="button">
      <span className="material-symbols-outlined text-[18px]">lock</span>
      <span className="">Admission Pass 2028 chưa mở</span>
    </button>
    <button id="btn-notify-2028" className="w-full py-2.5 px-4 rounded-full border border-secondary text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-2" type="button">
      <span className="material-symbols-outlined text-[16px]">notifications</span>
      <span className="">Nhắc tôi khi gói mở</span>
    </button>
    <p className="font-label-sm text-label-sm text-center text-on-surface-variant leading-tight">
      Trong thời gian chờ, bạn vẫn có thể sử dụng các công cụ miễn phí và Personal Direction Report.
    </p>
  </div>
</div></div>
</div>

<div className="relative z-10 w-full mb-space-2xl" id="proration-banner">
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden relative">
<div className="absolute -right-10 -bottom-10 w-60 h-60 bg-secondary-fixed/50 rounded-full blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-lg">

<div className="space-y-space-sm max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">price_change</span>
<span className="">Chính sách khấu trừ công bằng</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Bạn đã có Personal Direction Report?
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Số tiền <span className="font-semibold text-on-surface">59.000đ</span> bạn đã thanh toán cho Báo cáo định hướng được khấu trừ <strong>100%</strong> vào giá Admission Pass. Bạn chỉ trả phần chênh lệch còn lại.
            </p>
<div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1 text-sage-text">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                Bảo lưu toàn bộ dữ liệu &amp; ghi chú
              </span>
<span className="flex items-center gap-1 text-sage-text">
<span className="material-symbols-outlined text-[16px]">event</span>
                Hiệu lực đến 30/09/2027
              </span>
<span className="flex items-center gap-1 text-sage-text">
<span className="material-symbols-outlined text-[16px]">cancel</span>
                Không tự động gia hạn
              </span>
</div>
</div>

<div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-center gap-space-md p-space-md rounded-xl bg-surface-container-low min-w-[320px]">
<div className="w-full space-y-1.5 font-label-sm text-label-sm">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="">Giá gốc Admission Pass 2027:</span>
<span className="font-semibold text-on-surface">89.000đ</span>
</div>
<div className="flex items-center justify-between text-tertiary">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">remove</span>
                  Đã thanh toán cho Báo cáo:
                </span>
<span className="font-semibold">-59.000đ</span>
</div>
<div className="pt-2 flex items-center justify-between font-label-lg text-label-lg text-on-surface">
<span className="font-bold">Nâng cấp chỉ cần thêm:</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">30.000đ</span>
</div>
</div>
<button className="w-full py-3 px-6 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2" type="button">
<span className="">Nâng cấp Admission Pass — 30.000đ</span>
<span className="material-symbols-outlined text-[18px]">north_east</span>
</button>
</div>
</div>
</div>
</div>

<div className="relative z-10 pb-space-2xl">
<div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Minh chứng phân tích thực tế</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">Báo cáo &amp; công cụ được xây dựng như thế nào?</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Giao diện phân tích không chỉ đưa ra con số vô hồn, mà minh bạch mọi biến số giúp học sinh và cha mẹ an tâm ra quyết định.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">Bản đồ Holland 6 trục</span>
<span className="material-symbols-outlined text-primary text-[20px]">radar</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Phân tích 32 chỉ số năng lực</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Không đóng khung vào một nhóm duy nhất, Uniview phân tách trọng số thế mạnh theo thực tế tư duy của bạn.</p>
</div>

<div className="p-space-sm bg-surface-container-low rounded-xl space-y-2">
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-1">
<span className="text-on-surface">Investigative (Nghiên cứu)</span>
<span className="font-bold text-primary">88%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-2 rounded-full bg-primary-container" style={{ "width": "88%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-1">
<span className="text-on-surface">Artistic (Sáng tạo)</span>
<span className="font-bold text-secondary">74%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-2 rounded-full bg-secondary" style={{ "width": "74%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-1">
<span className="text-on-surface">Conventional (Chi tiết)</span>
<span className="font-bold text-tertiary">65%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-2 rounded-full bg-tertiary-container" style={{ "width": "65%" }}></div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">Độc quyền Admission Pass</span>
<span className="material-symbols-outlined text-primary text-[20px]">alt_route</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Phân luồng 4 phương thức</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tính toán xác suất đỗ đồng thời cho điểm THPT, ĐGNL ĐHQG TP.HCM/Hà Nội, ĐGTD và học bạ THPT.</p>
</div>
<div className="p-space-sm bg-surface-container-low rounded-xl space-y-2">
<div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm p-1.5 bg-surface-container-lowest rounded-lg">
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="">ĐGNL ĐHQG (Mục tiêu 850+)</span>
</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">An toàn</span>
</div>
<div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm p-1.5 bg-surface-container-lowest rounded-lg">
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="">Tốt nghiệp THPT (Khối A01)</span>
</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-surface font-bold">Vừa sức</span>
</div>
<div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm p-1.5 bg-surface-container-lowest rounded-lg">
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="">Học bạ + IELTS 6.5</span>
</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">Ưu tiên 1</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">Đồng hành cùng cha mẹ</span>
<span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Minh bạch ngân sách 4 năm</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Không chỉ có điểm số: mỗi đề xuất trường đều kèm mức học phí tăng theo lộ trình và phí sinh hoạt ước tính.</p>
</div>
<div className="p-space-sm bg-surface-container-low rounded-xl space-y-1.5">
<div className="flex justify-between items-center text-on-surface font-label-sm text-label-sm">
<span className="text-on-surface-variant">Khả năng chi trả gia đình:</span>
<span className="font-bold text-on-surface">35 - 50 triệu/năm</span>
</div>
<div className="flex items-center gap-2 p-2 bg-sage-subtle rounded-lg text-sage-text font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span className="">100% trường trong Shortlist nằm trọn trong ngân sách gia đình đã cấu hình</span>
</div>
</div>
</div>
</div>
</div>

<div className="relative z-10 pb-space-2xl">
<div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl">
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">So sánh chi tiết quyền lợi các gói</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Đối chiếu trực quan từng khả năng để bạn chọn đúng thứ mình cần hôm nay.</p>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low">
<th className="py-4 px-6 font-label-lg text-label-lg text-on-surface w-2/5">Tính năng &amp; Công cụ</th>
<th className="py-4 px-4 font-label-lg text-label-lg text-center text-on-surface w-1/5">
<div className="">Khám phá miễn phí</div>
<div className="font-normal text-secondary font-label-sm text-label-sm">0đ</div>
</th>
<th className="py-4 px-4 font-label-lg text-label-lg text-center text-on-surface w-1/5 bg-lavender-subtle/50">
<div className="text-lavender-text font-bold">Direction Report</div>
<div className="font-normal text-secondary font-label-sm text-label-sm">59.000đ</div>
</th>
<th className="py-4 px-4 font-label-lg text-label-lg text-center text-on-surface w-1/5 bg-primary/5">
<div className="text-primary font-bold">Admission Pass 2027</div>
<div className="font-normal text-secondary font-label-sm text-label-sm">89.000đ</div>
</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high/40 font-body-sm text-body-sm">

<tr className="bg-surface-container-high/30">
<td className="py-2.5 px-6 font-label-md text-label-md uppercase tracking-wider text-secondary font-bold" colSpan="4">
                  1. Khám phá &amp; Quản lý hồ sơ
                </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Tra cứu kho dữ liệu 400+ ngành &amp; 250+ trường đại học</td>
<td className="py-3 px-4 text-center text-tertiary"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-tertiary bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Cập nhật hồ sơ năng lực (THPT, ĐGNL, ngân sách...) không giới hạn</td>
<td className="py-3 px-4 text-center text-tertiary"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-tertiary bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Lưu Wishlist ngành &amp; trường quan tâm</td>
<td className="py-3 px-4 text-center text-tertiary"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-tertiary bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">So sánh trường đại học</td>
<td className="py-3 px-4 text-center text-on-surface-variant font-label-sm text-label-sm">Cơ bản (2 trường)</td>
<td className="py-3 px-4 text-center text-on-surface-variant font-label-sm text-label-sm bg-lavender-subtle/30">Cơ bản (2 trường)</td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-label-sm text-label-sm font-semibold">Chuyên sâu (5 trường &amp; tài chính)</td>
</tr>

<tr className="bg-surface-container-high/30">
<td className="py-2.5 px-6 font-label-md text-label-md uppercase tracking-wider text-secondary font-bold" colSpan="4">
                  2. Trắc nghiệm &amp; Phân tích định hướng
                </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Trắc nghiệm tính cách RIASEC</td>
<td className="py-3 px-4 text-center text-on-surface-variant font-label-sm text-label-sm">Top 3 nhóm cơ bản</td>
<td className="py-3 px-4 text-center text-lavender-text bg-lavender-subtle/30 font-semibold font-label-sm text-label-sm">Full 6 nhóm &amp; 32 chỉ số</td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold font-label-sm text-label-sm">Full 6 nhóm &amp; 32 chỉ số</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Personalized Major Shortlist (Danh sách ngành đề xuất riêng)</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-lavender-text bg-lavender-subtle/30 font-semibold font-label-sm text-label-sm">Top 7 ngành cao nhất</td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold font-label-sm text-label-sm">Top 7 ngành + Phân luồng sâu</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Giải trình khoa học lý do tương thích &amp; cảnh báo rào cản</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-tertiary bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Xuất báo cáo PDF gửi gia đình thảo luận</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-tertiary bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">check</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>

<tr className="bg-surface-container-high/30">
<td className="py-2.5 px-6 font-label-md text-label-md uppercase tracking-wider text-secondary font-bold" colSpan="4">
                  3. Chiến lược xét tuyển &amp; Ra quyết định
                </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Admission Route Mapping (Phân luồng THPT, ĐGNL, ĐGTD, Học bạ)</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-outline-variant bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Scenario Comparison (Mô phỏng kịch bản điểm biến động)</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-outline-variant bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Advanced Decision Board (Sắp xếp nguyện vọng triệt rủi ro)</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-outline-variant bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Tự động cập nhật đề án tuyển sinh &amp; chỉ tiêu của 142 trường</td>
<td className="py-3 px-4 text-center text-outline-variant"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-outline-variant bg-lavender-subtle/30"><span className="material-symbols-outlined text-[18px]">remove</span></td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-bold"><span className="material-symbols-outlined text-[18px]">check</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-6 text-on-surface">Thời hạn sử dụng</td>
<td className="py-3 px-4 text-center text-on-surface-variant font-label-sm text-label-sm">Vĩnh viễn</td>
<td className="py-3 px-4 text-center text-on-surface-variant font-label-sm text-label-sm bg-lavender-subtle/30">Vĩnh viễn</td>
<td className="py-3 px-4 text-center text-primary bg-primary/5 font-semibold font-label-sm text-label-sm">Đến 30/09/2027</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="relative z-10 pb-space-2xl">
<div className="bg-surface-container-low rounded-xl p-space-xl">
<div className="max-w-2xl mb-space-lg">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-sm text-label-sm mb-2">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span className="">Bộ cam kết Uniview Trust Standard</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">Cam kết minh bạch tuyệt đối, không có bẫy phí</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Đại học là bước ngoặt quan trọng của gia đình. Chúng tôi xem trọng đạo đức dữ liệu hơn doanh thu ngắn hạn.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2 shadow-xs">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[20px]">credit_card_off</span>
</div>
<h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Không tự động gia hạn</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Thanh toán đúng một lần duy nhất qua mã QR ngân hàng hoặc MoMo. Uniview tuyệt đối không lưu thẻ tín dụng để tự trừ tiền.</p>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2 shadow-xs">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[20px]">cloud_done</span>
</div>
<h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Bảo tồn dữ liệu vĩnh viễn</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Kể cả khi Admission Pass hết hạn sau mùa tuyển sinh, toàn bộ danh sách trường và lịch sử so sánh của bạn vẫn được lưu giữ trọn đời.</p>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2 shadow-xs">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">published_with_changes</span>
</div>
<h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Bảo chứng dữ liệu đề án</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dữ liệu được đối soát trực tiếp từ Cổng thông tin Tuyển sinh Bộ GD&amp;ĐT. Hoàn tiền 100% nếu có sai lệch thông số chính quy.</p>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2 shadow-xs">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[20px]">receipt_long</span>
</div>
<h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Hỗ trợ phụ huynh đối soát</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cung cấp hóa đơn điện tử VAT hợp pháp và xuất file dữ liệu rõ ràng để cha mẹ và học sinh cùng kiểm chứng độc lập tại nhà.</p>
</div>
</div>
</div>
</div>

<div className="relative z-10 pb-space-xl">
<div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-lg">
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">Câu hỏi thường gặp</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Mọi giải đáp thẳng thắn về chi phí và cách thức nâng cấp.</p>
</div>
<div className="max-w-3xl mx-auto space-y-space-sm" id="pricing-faq">
<details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-xs [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer" open>
<summary className="flex items-center justify-between text-on-surface font-label-lg text-label-lg font-semibold list-none">
<span className="">Nếu tôi mua Personal Direction Report trước, sau này nâng cấp có bị mất tiền không?</span>
<span className="material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
            Tuyệt đối không! Uniview áp dụng cơ chế khấu trừ 100% giá trị gói cũ. 59.000đ bạn đã trả cho Báo cáo định hướng sẽ được trừ thẳng vào Admission Pass. Khi bạn quyết định nâng cấp lên Admission Pass (89.000đ), bạn chỉ cần thanh toán phần chênh lệch là 30.000đ.
          </p>
</details>
<details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-xs [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer">
<summary className="flex items-center justify-between text-on-surface font-label-lg text-label-lg font-semibold list-none">
<span className="">Tại sao thời hạn Admission Pass 2027 lại là 30/09/2027?</span>
<span className="material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
            Hàng năm, đợt xác nhận nhập học và xét tuyển bổ sung chính thức của Bộ GD&amp;ĐT Việt Nam kết thúc vào cuối tháng 9. Mốc 30/09/2027 đảm bảo bạn có đầy đủ công cụ theo dõi suốt từ lúc ôn thi, nhận kết quả thi tốt nghiệp THPT, lọc ảo nguyện vọng cho đến khi nhập học thành công.
          </p>
</details>
<details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-xs [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer">
<summary className="flex items-center justify-between text-on-surface font-label-lg text-label-lg font-semibold list-none">
<span className="">Tôi có thể cập nhật điểm thi thử hoặc học bạ nhiều lần sau khi mua gói không?</span>
<span className="material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
            Có! Cập nhật điểm và hồ sơ luôn miễn phí không giới hạn trên toàn hệ thống Uniview. Với Admission Pass, mỗi khi bạn nhập điểm thi thử mới hay điểm thi ĐGNL mới, hệ thống thuật toán sẽ tự động tái phân tích và sắp xếp lại danh sách trường phù hợp mà không tính thêm bất kỳ khoản phí nào.
          </p>
</details>
<details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-xs [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer">
<summary className="flex items-center justify-between text-on-surface font-label-lg text-label-lg font-semibold list-none">
<span className="">Gia đình thanh toán bằng hình thức nào và kích hoạt mất bao lâu?</span>
<span className="material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
            Bạn có thể thanh toán tức thời qua mã VietQR của mọi ứng dụng ngân hàng tại Việt Nam hoặc ví điện tử MoMo/ZaloPay. Hệ thống xử lý tự động 24/7, gói dịch vụ và báo cáo sẽ được kích hoạt ngay lập tức trong tài khoản sau 5 đến 15 giây.
          </p>
</details>
</div>
</div>
</div>


</div></main>
  )
}

export default PricingPage
