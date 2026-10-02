function AssessmentResultPage() {
  return (
<main className="w-full pt-6 bg-surface min-h-[calc(100vh-80px)]"><link href="https://fonts.googleapis.com" rel="preconnect" />
<link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&amp;display=swap" rel="stylesheet" />
<div className="flex flex-col w-full" style={{ "fontFamily": "'Be Vietnam Pro', sans-serif", "color": "#172033", "backgroundColor": "#FFFDFB" }}>

<div className="w-full bg-[#FFFDFB] shadow-sm">
<div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex flex-wrap items-center gap-2 text-sm text-[#667085]">
<a className="hover:text-[#1D4ED8] transition-colors" data-path="trang-chu" href="#">Trang chủ</a>
<span className="text-xs text-[#667085]/60">/</span>
<a className="hover:text-[#1D4ED8] transition-colors" data-path="dinh-huong-ca-nhan" href="#">Định hướng cá nhân</a>
<span className="text-xs text-[#667085]/60">/</span>
<span className="text-[#172033] font-medium">Kết quả khám phá cơ bản</span>
<span className="inline-flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#765700] text-xs font-semibold">
<svg className="w-3.5 h-3.5 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
</svg>
          Dựa trên câu trả lời của bạn · Hoàn thành vừa xong
        </span>
</div>
<div className="flex items-center gap-3">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#172033] bg-[#EFF6FF] hover:bg-[#1D4ED8] hover:text-white rounded-full transition-all shadow-sm" id="save-btn" type="button">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span className="" id="save-text">Lưu kết quả</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#172033] bg-[#FFF1F2] hover:bg-[#FB7185] hover:text-white rounded-full transition-all shadow-sm" id="share-btn" type="button">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
          Chia sẻ hồ sơ
        </button>
<a className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#667085] hover:text-[#172033] transition-colors" data-path="cong-cu-tuyen-sinh" href="#">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
          Làm lại bài đánh giá
        </a>
</div>
</div>
</div>

<section className="w-full py-12 px-6">
<div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

<div className="lg:col-span-6 flex flex-col items-start space-y-6">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] text-[#765700] text-xs font-bold tracking-wider uppercase">
<span className="w-2 h-2 rounded-full bg-[#FBBF24]"></span>
          Kết quả khám phá của bạn
        </div>
<h1 className="text-4xl lg:text-5xl font-extrabold text-[#172033] tracking-tight leading-[1.15]">
          Hồ sơ sở thích của bạn
        </h1>
<p className="text-base leading-relaxed text-[#667085] font-normal">
          Dựa trên những câu trả lời vừa rồi, đây là một số xu hướng bạn có thể tiếp tục khám phá. Kết quả này không phán xét bạn "giỏi" hay "dở" môn nào, mà phản ánh năng lượng và sự hứng thú tự nhiên của bạn đối với cách học và môi trường làm việc tương lai.
        </p>

<div className="w-full bg-[#EFF6FF] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
<div className="text-xs uppercase tracking-widest font-bold text-[#1D4ED8]">
            MÃ ĐỊNH HƯỚNG NỔI BẬT
          </div>
<div className="flex items-center gap-3">
<span className="text-3xl font-extrabold text-[#1D4ED8] tracking-tight">I — C — A</span>
<div className="flex gap-2">
<span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#1D4ED8] text-white">Investigative</span>
<span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#dce1ff] text-[#001551]">Conventional</span>
<span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FFF1F2] text-[#FB7185]">Artistic</span>
</div>
</div>
</div>

<div className="w-full bg-[#FFFBEB]/70 rounded-2xl p-5 shadow-sm flex items-start gap-4">
<div className="text-[#FBBF24] p-2 bg-white rounded-xl shadow-xs">
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-8.983z"></path>
</svg>
</div>
<p className="text-sm font-medium text-[#594100] italic leading-relaxed">
            "Bạn có xu hướng tò mò về cách vận hành của hệ thống, thích trật tự logic rõ ràng, đồng thời luôn đánh giá cao những góc nhìn mới mẻ, khác biệt."
          </p>
</div>
</div>

<div className="lg:col-span-6 bg-white rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col space-y-6">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<h2 className="text-lg font-bold text-[#172033]">Phổ Thiên Hướng RIASEC</h2>
<span className="text-xs text-[#667085]">Mức độ quan tâm tự nhiên qua 6 nhóm lĩnh vực</span>
</div>
<span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8]">
            Hồ sơ chi tiết
          </span>
</div>

<div className="space-y-4 pt-2">

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-[#172033] flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
                I — Nghiên cứu &amp; Khám phá (Investigative)
              </span>
<span className="font-extrabold text-[#1D4ED8]">88%</span>
</div>
<div className="w-full bg-[#f1f3ff] h-3 rounded-full overflow-hidden">
<div className="bg-[#1D4ED8] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "88%" }}></div>
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-[#172033] flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#2151da]"></span>
                C — Tổ chức &amp; Quy trình (Conventional)
              </span>
<span className="font-extrabold text-[#2151da]">76%</span>
</div>
<div className="w-full bg-[#f1f3ff] h-3 rounded-full overflow-hidden">
<div className="bg-[#2151da] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "76%" }}></div>
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-[#172033] flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]"></span>
                A — Sáng tạo &amp; Nghệ thuật (Artistic)
              </span>
<span className="font-extrabold text-[#FB7185]">68%</span>
</div>
<div className="w-full bg-[#FFF1F2] h-3 rounded-full overflow-hidden">
<div className="bg-[#FB7185] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "68%" }}></div>
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span className="font-medium flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]"></span>
                R — Kỹ thuật &amp; Thực hành (Realistic)
              </span>
<span className="font-semibold text-[#667085]">45%</span>
</div>
<div className="w-full bg-[#f1f3ff] h-2.5 rounded-full overflow-hidden">
<div className="bg-[#c4c5d7] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "45%" }}></div>
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span className="font-medium flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]"></span>
                S — Xã hội &amp; Kết nối (Social)
              </span>
<span className="font-semibold text-[#667085]">42%</span>
</div>
<div className="w-full bg-[#f1f3ff] h-2.5 rounded-full overflow-hidden">
<div className="bg-[#c4c5d7] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "42%" }}></div>
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center text-xs text-[#667085]">
<span className="font-medium flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]"></span>
                E — Quản lý &amp; Khởi xướng (Enterprising)
              </span>
<span className="font-semibold text-[#667085]">38%</span>
</div>
<div className="w-full bg-[#f1f3ff] h-2.5 rounded-full overflow-hidden">
<div className="bg-[#c4c5d7] h-full rounded-full transition-all duration-1000 ease-out" style={{ "width": "38%" }}></div>
</div>
</div>
</div>
<div className="p-3.5 bg-[#f9f9ff] rounded-xl flex items-center gap-2.5">
<svg className="w-4 h-4 text-[#667085] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span className="text-xs text-[#667085] leading-snug">
            Biểu đồ thể hiện mức độ hứng thú tương đối giữa 6 nhóm thiên hướng, không đại diện cho điểm số hay năng lực tuyệt đối.
          </span>
</div>
</div>
</div>
</section>

<section className="w-full py-10 px-6 bg-[#f1f3ff]/40">
<div className="max-w-[1200px] mx-auto space-y-8">
<div className="flex flex-col space-y-2">
<h2 className="text-2xl lg:text-3xl font-bold text-[#172033]">
          Bạn có xu hướng quan tâm nhiều hơn đến:
        </h2>
<p className="text-sm text-[#667085]">
          Ba trụ cột định hình phong cách tiếp cận vấn đề và nguồn cảm hứng học tập của bạn
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"></circle>
<polygon fill="currentColor" fillOpacity="0.2" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
</svg>
</div>
<div>
<span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">Nhóm nổi trội nhất</span>
<h3 className="text-lg font-bold text-[#172033] mt-1">Tìm hiểu &amp; Phân tích (Investigative)</h3>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Bạn thường hứng thú với việc đào sâu tìm hiểu nguyên nhân gốc rễ, phân tích thông tin logic và giải quyết các bài toán hóc búa thay vì chấp nhận các câu trả lời hiển nhiên.
            </p>
</div>
<div className="pt-2 text-xs font-semibold text-[#1D4ED8] flex items-center gap-1">
            Đặc trưng: Tò mò · Tư duy phân tích · Khách quan
          </div>
</div>

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#0037b0]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round"></path>
<path d="M19 15l3 3-3 3m3-3h-7" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div>
<span className="text-xs font-bold text-[#0037b0] uppercase tracking-wider">Nhóm cấu trúc</span>
<h3 className="text-lg font-bold text-[#172033] mt-1">Cấu trúc &amp; Tổ chức (Conventional)</h3>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Bạn thấy thoải mái và tự tin hơn khi dữ liệu, lịch trình hoặc quy trình công việc có cấu trúc mạch lạc, tiêu chí đo lường rõ ràng và không bị xáo trộn tùy tiện.
            </p>
</div>
<div className="pt-2 text-xs font-semibold text-[#0037b0] flex items-center gap-1">
            Đặc trưng: Gọn gàng · Chuẩn xác · Chi tiết
          </div>
</div>

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-[#FFF1F2] flex items-center justify-center text-[#FB7185]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.857L13 21l-2.286-6.857L5 12l5.714-2.857L13 3z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div>
<span className="text-xs font-bold text-[#FB7185] uppercase tracking-wider">Nhóm sáng tạo</span>
<h3 className="text-lg font-bold text-[#172033] mt-1">Sáng tạo &amp; Đổi mới (Artistic)</h3>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Bạn cũng thể hiện sự quan tâm mạnh mẽ tới việc thử nghiệm các ý tưởng mới, biến những góc nhìn trừu tượng thành giải pháp cụ thể và có tính thẩm mỹ riêng.
            </p>
</div>
<div className="pt-2 text-xs font-semibold text-[#FB7185] flex items-center gap-1">
            Đặc trưng: Linh hoạt · Thẩm mỹ · Đột phá
          </div>
</div>
</div>
</div>
</section>

<section className="w-full py-12 px-6">
<div className="max-w-[1200px] mx-auto space-y-8">
<div className="flex flex-col space-y-1">
<div className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">TỔNG QUAN PHẢN HỒI</div>
<h2 className="text-2xl lg:text-3xl font-bold text-[#172033]">
          Điều gì nổi bật trong câu trả lời của bạn?
        </h2>
<p className="text-sm text-[#667085]">
          Tổng hợp từ 24 câu hỏi sở thích, phong cách làm việc và điều kiện thực tế bạn đã chia sẻ
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Phân tích &amp; Dữ liệu</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Thích làm việc với thông tin có logic, số liệu và bằng chứng xác thực hơn là giả định cảm tính.
            </p>
</div>
</div>

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#FFF1F2] flex items-center justify-center text-[#FB7185] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Tạo ý tưởng mới</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Hào hứng khi bắt đầu một hướng tiếp cận độc đáo hoặc giải pháp cải tiến chưa có khuôn mẫu sẵn.
            </p>
</div>
</div>

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#765700] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Làm việc độc lập &amp; Tập trung</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Nạp năng lượng tốt nhất khi có không gian riêng, tự chủ thời gian để nghiền ngẫm và giải quyết vấn đề.
            </p>
</div>
</div>

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#0037b0] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Thích sự rõ ràng</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Ưu tiên các trường có lộ trình đào tạo chuẩn mực, đầu ra minh bạch và chính sách học phí cam kết.
            </p>
</div>
</div>

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Học phí 20 - 35 triệu/năm</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Khung ngân sách phù hợp tiêu chuẩn tại các trường đại học tự chủ công lập và chương trình chuẩn.
            </p>
</div>
</div>

<div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#FFF1F2] flex items-center justify-center text-[#FB7185] shrink-0">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path>
<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div className="space-y-1">
<h3 className="text-base font-bold text-[#172033]">Khu vực ưu tiên: TP.HCM</h3>
<p className="text-xs text-[#667085] leading-relaxed">
              Định vị trọng tâm tại các cụm trường đại học thuộc ĐHQG TP.HCM và vùng đô thị phát triển năng động.
            </p>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-12 px-6 bg-[#f9f9ff]">
<div className="max-w-[1200px] mx-auto space-y-10">
<div className="max-w-2xl space-y-2">
<span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">HƯỚNG ĐI TIỀM NĂNG</span>
<h2 className="text-3xl font-extrabold text-[#172033]">
          Những lĩnh vực đáng để bạn khám phá thêm
        </h2>
<p className="text-sm text-[#667085] leading-relaxed">
          Đây không phải danh sách "ngành tốt nhất bắt buộc phải chọn", mà là những nhóm ngành giao thoa tự nhiên giữa tư duy phân tích (I), tính tổ chức (C) và sự sáng tạo (A) của bạn.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
                Giao thoa I &amp; C
              </span>
</div>
<div className="space-y-2">
<h3 className="text-xl font-bold text-[#172033]">Công nghệ Thông tin &amp; Phần mềm</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Phân tích logic</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Xây dựng hệ thống</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#FFFBEB] text-[#765700]">Cơ hội rộng mở</span>
</div>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Khám phá các hướng đào tạo về kỹ thuật phần mềm, hệ thống thông tin và kiến trúc mạng. Nơi tư duy phân tích sâu được biến thành các giải pháp công nghệ vận hành chuẩn xác.
            </p>
</div>
<div className="pt-2">
<a className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:text-[#0037b0] transition-colors" data-path="kham-pha-nganh" href="#">
              Khám phá nhóm ngành Công nghệ
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</a>
</div>
</div>

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#0037b0]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<span className="text-xs font-bold px-3 py-1 rounded-full bg-[#e9edff] text-[#0037b0]">
                Thế mạnh I
              </span>
</div>
<div className="space-y-2">
<h3 className="text-xl font-bold text-[#172033]">Khoa học Dữ liệu &amp; Trí tuệ Nhân tạo</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Tư duy toán học</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Dữ liệu lớn</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#FFFBEB] text-[#765700]">Xu hướng 2026+</span>
</div>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Khám phá cách ứng dụng số liệu, mô hình hóa thuật toán để dự đoán xu hướng và giải quyết các bài toán tối ưu trong đời sống kinh tế, y tế và tự động hóa.
            </p>
</div>
<div className="pt-2">
<a className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:text-[#0037b0] transition-colors" data-path="kham-pha-nganh" href="#">
              Khám phá nhóm ngành Dữ liệu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</a>
</div>
</div>

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#765700]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFFBEB] text-[#765700]">
                Trụ cột C
              </span>
</div>
<div className="space-y-2">
<h3 className="text-xl font-bold text-[#172033]">Hệ thống Thông tin Quản lý &amp; Kinh doanh Số</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Cầu nối Tech - Biz</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Tổ chức quy trình</span>
</div>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Sự kết hợp hoàn hảo giữa tính cấu trúc quy trình (C) và khả năng ứng dụng công nghệ phân tích dữ liệu trong quản trị tổ chức, vận hành thương mại điện tử hiện đại.
            </p>
</div>
<div className="pt-2">
<a className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:text-[#0037b0] transition-colors" data-path="kham-pha-nganh" href="#">
              Khám phá nhóm ngành Hệ thống Quản lý
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</a>
</div>
</div>

<div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-xl bg-[#FFF1F2] flex items-center justify-center text-[#FB7185]">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF1F2] text-[#FB7185]">
                Giao thoa I &amp; A
              </span>
</div>
<div className="space-y-2">
<h3 className="text-xl font-bold text-[#172033]">Thiết kế Tương tác &amp; Trải nghiệm Người dùng (UI/UX)</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#FFF1F2] text-[#FB7185]">Sáng tạo (A)</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Tâm lý hành vi</span>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f1f3ff] text-[#172033]">Công nghệ</span>
</div>
</div>
<p className="text-sm text-[#667085] leading-relaxed">
              Lĩnh vực giao thoa giữa tư duy nghiên cứu người dùng logic và khả năng sáng tạo hình ảnh, kiến tạo những trải nghiệm ứng dụng số mượt mà, trực quan và cảm xúc.
            </p>
</div>
<div className="pt-2">
<a className="inline-flex items-center gap-2 text-sm font-bold text-[#FB7185] hover:text-[#a93349] transition-colors" data-path="kham-pha-nganh" href="#">
              Khám phá nhóm ngành Thiết kế Số
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-16 px-6">
<div className="max-w-[1200px] mx-auto">
<div className="w-full bg-gradient-to-br from-[#EFF6FF] via-[#f1f3ff] to-[#FFF1F2]/50 rounded-3xl p-8 lg:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
<div className="flex flex-col space-y-3 max-w-xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1D4ED8] text-xs font-bold tracking-wide w-fit shadow-xs">
<svg className="w-3.5 h-3.5 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
            BƯỚC TIẾP THEO
          </div>
<h2 className="text-2xl lg:text-3xl font-extrabold text-[#172033] tracking-tight">
            Muốn khám phá cụ thể hơn lộ trình của riêng bạn?
          </h2>
<p className="text-sm text-[#667085] leading-relaxed">
            Từ hồ sơ tổng quan này, UniView có thể giúp bạn đối chiếu sâu hơn: so sánh độ tương thích với từng chuyên ngành cụ thể, xem danh sách các trường đại học tại TP.HCM phù hợp mức điểm và học phí thực tế của gia đình.
          </p>
<div className="flex items-center gap-2 pt-2 text-xs text-[#667085]">
<svg className="w-4 h-4 text-[#1D4ED8]" fill="currentColor" viewBox="0 0 20 20">
<path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
</svg>
            Tất cả thông tin đánh giá cơ bản đều được lưu vĩnh viễn trong tài khoản UniView của bạn.
          </div>
</div>
<div className="flex flex-col sm:flex-row md:flex-col gap-3.5 w-full md:w-auto shrink-0">
<a className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#0037b0] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all text-center" data-path="kham-pha-nganh" href="#">
            Xem các ngành để khám phá sâu hơn
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</a>
<a className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white hover:bg-[#f9f9ff] text-[#172033] font-semibold text-sm shadow-sm transition-all text-center" data-path="kham-pha-truong" href="#">
            Tự khám phá danh bạ trường &amp; ngành
          </a>
</div>
</div>
</div>
</section>
</div>
</main>
  )
}

export default AssessmentResultPage
