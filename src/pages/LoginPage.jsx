function LoginPage() {
  return (
    <main className="w-full pt-6 bg-[#FFFDFB] min-h-[calc(100vh-80px)] pb-24"><div className="flex flex-col w-full">

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="w-full max-w-[1140px] mx-auto bg-surface-container-lowest rounded-[28px] md:rounded-[32px] shadow-[0_12px_40px_-15px_rgba(23,32,51,0.08)] p-3 sm:p-5 md:p-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            <div className="lg:col-span-6 xl:col-span-6 rounded-[24px] bg-gradient-to-br from-tile-blue via-surface to-tile-rose/40 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-10 left-6 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-primary font-label-md text-label-md uppercase mb-4 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                  </svg>
                  <span>Chào mừng trở lại</span>
                </div>
                <h1 className="font-headline-md text-headline-md sm:text-headline-lg text-on-surface tracking-tight mb-3">
                  Tiếp tục hành trình khám phá của bạn
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6">
                  Quay lại những ngành, trường và lựa chọn bạn đang cân nhắc trên UniView với dữ liệu tuyển sinh đối chiếu minh bạch.
                </p>

                <div className="flex flex-col gap-3 mb-6">

                  <div className="rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 flex items-start gap-3.5 shadow-sm hover:shadow-md transition-all">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-primary-container">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon fill="currentColor" fillOpacity="0.2" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-label-lg text-label-lg text-on-surface">Khám phá ngành &amp; trường</h2>
                      <p className="font-body-sm text-label-sm text-on-surface-variant mt-0.5">Tiếp tục tìm hiểu thông tin học phí, chuẩn đầu ra và đề án tuyển sinh mới nhất.</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 flex items-start gap-3.5 shadow-sm hover:shadow-md transition-all">
                    <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 text-secondary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-label-lg text-label-lg text-on-surface">Xem lại Wishlist</h2>
                      <p className="font-body-sm text-label-sm text-on-surface-variant mt-0.5">Dễ dàng truy cập danh sách trường và tổ hợp môn bạn đã đánh dấu ưu tiên.</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 flex items-start gap-3.5 shadow-sm hover:shadow-md transition-all">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 text-tertiary-container">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect height="9" rx="1" width="7" x="3" y="3"></rect>
                        <rect height="5" rx="1" width="7" x="14" y="3"></rect>
                        <rect height="9" rx="1" width="7" x="14" y="12"></rect>
                        <rect height="5" rx="1" width="7" x="3" y="16"></rect>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-label-lg text-label-lg text-on-surface">Không gian Decision Board</h2>
                      <p className="font-body-sm text-label-sm text-on-surface-variant mt-0.5">Đối chiếu đa chiều, ghi chú chuyên sâu và chuẩn bị kế hoạch hồ sơ tự tin.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-auto">
                <div className="relative rounded-2xl bg-white/70 backdrop-blur-md p-5 flex flex-col items-center justify-center overflow-hidden shadow-sm">

                  <div className="absolute top-3 left-3 bg-blue-100/90 text-primary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transform -rotate-2">
                    <svg className="w-3.5 h-3.5 text-primary-container" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>UIT • Kỹ thuật phần mềm</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-tile-amber text-tertiary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transform rotate-2">
                    <span>ĐGNL 875 • THPT 26.5</span>
                  </div>

                  <div className="w-32 h-32 my-3 relative flex items-center justify-center">
                    <svg className="w-28 h-28 drop-shadow-md" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

                      <polygon fill="#172033" points="58,95 44,52 82,72"></polygon>
                      <polygon fill="#FFDAD6" points="56,88 50,60 74,74"></polygon>
                      <polygon fill="#172033" points="142,95 156,52 118,72"></polygon>
                      <polygon fill="#FFDAD6" points="144,88 150,60 126,74"></polygon>

                      <polygon fill="#172033" points="100,28 152,48 100,68 48,48"></polygon>
                      <polygon fill="#1D4ED8" points="100,64 135,52 135,62 100,74 65,62 65,52"></polygon>

                      <path d="M135,52 Q150,62 152,78" fill="none" stroke="#FBBF24" strokeLinecap="round" strokeWidth="2.5"></path>
                      <circle cx="152" cy="80" fill="#FBBF24" r="4"></circle>

                      <ellipse cx="100" cy="98" fill="#FFFFFF" rx="44" ry="36" stroke="#172033" strokeWidth="4"></ellipse>

                      <ellipse cx="85" cy="98" fill="#172033" rx="5.5" ry="7"></ellipse>
                      <ellipse cx="115" cy="98" fill="#172033" rx="5.5" ry="7"></ellipse>
                      <circle cx="83.5" cy="95.5" fill="#FFFFFF" r="2"></circle>
                      <circle cx="113.5" cy="95.5" fill="#FFFFFF" r="2"></circle>
                      <ellipse cx="100" cy="106" fill="#FB7185" rx="3.5" ry="2.5"></ellipse>

                      <path d="M68,102 L52,100 M68,106 L50,108 M132,102 L148,100 M132,106 L150,108" stroke="#CBD5E1" strokeLinecap="round" strokeWidth="2"></path>

                      <path d="M50,115 C50,172 150,172 150,115 L150,126 C150,185 50,185 50,126 Z" fill="#1D4ED8"></path>
                      <path d="M54,118 Q100,106 100,165 Q100,106 146,118 L146,160 Q100,148 100,175 Q100,148 54,160 Z" fill="#EFF6FF" stroke="#172033" strokeWidth="3"></path>
                      <line stroke="#CBD5E1" strokeWidth="2" x1="100" x2="100" y1="120" y2="175"></line>

                      <ellipse cx="82" cy="122" fill="#FFFFFF" rx="9" ry="7" stroke="#172033" strokeWidth="3"></ellipse>
                      <ellipse cx="118" cy="122" fill="#FFFFFF" rx="9" ry="7" stroke="#172033" strokeWidth="3"></ellipse>
                    </svg>
                  </div>

                  <div className="bg-emerald-50 text-emerald-800 font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Học phí minh bạch 35M / năm</span>
                  </div>
                </div>
                <p className="font-body-sm text-label-sm text-on-surface-variant italic text-center mt-3">
                  “Hiểu lựa chọn của bạn. Tự tin bước vào tương lai.”
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-6 px-3 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col justify-center">

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase bg-blue-50 px-2.5 py-0.5 rounded-md font-semibold">
                    Uniview Authentication
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md sm:text-headline-lg text-on-surface font-extrabold mb-1.5">
                  Đăng nhập
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tiếp tục với hồ sơ và những lựa chọn bạn đã lưu trong hệ sinh thái UniView.
                </p>
              </div>

              <button className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-all font-label-lg text-label-lg text-on-surface flex items-center justify-center gap-3 shadow-sm hover:shadow-md group mb-6 cursor-pointer" type="button">

                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.31 7.31 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z" fill="#EA4335"></path>
                </svg>
                <span>Tiếp tục với Google</span>
              </button>

              <div className="flex items-center gap-4 my-1 mb-6">
                <div className="flex-1 h-[1px] bg-slate-200"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase tracking-wider">hoặc qua email</span>
                <div className="flex-1 h-[1px] bg-slate-200"></div>
              </div>

              <form className="space-y-4" id="loginForm">

                <div>
                  <label className="block font-label-lg text-label-lg text-on-surface mb-1.5" htmlFor="emailInput">
                    Email học sinh hoặc phụ huynh
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect height="16" rx="3" width="20" x="2" y="4"></rect>
                        <path d="M22 7L13.03 12.7a2 2 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <input className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-slate-400 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all" id="emailInput" placeholder="name@example.com" required type="email" defaultValue="minhanh.nguyen@gmail.com" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-label-lg text-label-lg text-on-surface" htmlFor="passwordInput">
                      Mật khẩu
                    </label>
                    <a className="font-label-sm text-label-sm text-primary hover:text-primary-dark transition-colors font-semibold hover:underline" href="#">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect height="11" rx="2" ry="2" width="18" x="3" y="11"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <input className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-slate-400 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all" id="passwordInput" placeholder="Nhập mật khẩu của bạn" required type="password" defaultValue="DemoSecurePass2025!" />

                    <button aria-label="Ẩn hiện mật khẩu" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-on-surface transition-colors cursor-pointer" id="togglePasswordBtn" type="button">
                      <svg className="w-5 h-5" fill="none" id="eyeIcon" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <svg className="w-5 h-5 hidden" fill="none" id="eyeOffIcon" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" x2="23" y1="1" y2="23"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container bg-surface-container-lowest transition" type="checkbox" />
                    <span className="font-body-sm text-label-md text-on-surface-variant">Ghi nhớ đăng nhập</span>
                  </label>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-label-sm">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
                    </svg>
                    <span>Mã hoá 256-bit</span>
                  </div>
                </div>

                <button className="w-full py-3.5 px-6 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-md hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer" id="submitBtn" type="submit">
                  <span id="btnText">Đăng nhập</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" id="btnArrow" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>

                  <svg className="w-5 h-5 animate-spin hidden" fill="none" id="btnSpinner" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"></path>
                  </svg>
                </button>
              </form>

              <div className="hidden mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 font-label-md text-label-md flex items-center gap-2" id="loginFeedback">
                <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                </svg>
                <span>Đăng nhập thành công! Đang chuyển hướng về Decision Board...</span>
              </div>

              <div className="rounded-xl bg-surface-container-low p-3 mt-4 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-primary-container shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fillRule="evenodd"></path>
                </svg>
                <p className="font-body-sm text-label-sm text-on-surface-variant leading-relaxed">
                  Dữ liệu Wishlist và tính toán cơ hội Admission Checker của bạn sẽ được tự động đồng bộ ngay sau khi đăng nhập.
                </p>
              </div>

              <div className="text-center mt-6">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Chưa có tài khoản UniView?
                  <a className="font-label-lg text-primary font-bold hover:underline ml-1 inline-flex items-center gap-1 group" href="#">
                    <span>Đăng ký miễn phí</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </p>
                <p className="font-body-sm text-label-sm text-on-surface-variant/80 mt-4 leading-relaxed max-w-sm mx-auto">
                  Bằng cách tiếp tục, bạn đồng ý với <a className="text-primary hover:underline" href="#">Điều khoản dịch vụ</a> và <a className="text-primary hover:underline" href="#">Chính sách bảo mật</a> của UniView Vietnam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}

export default LoginPage
