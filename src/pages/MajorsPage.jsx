import majors from "../data/majors.json";
import majorsFilter from "../data/majorsfilter.json";

function MajorsPage() {
  const filterData = majorsFilter;
  return (
    <main className="w-full pt-6 bg-surface min-h-[calc(100vh-80px)]">
      <div className="flex flex-col w-full">
        <div className="w-full max-w-[1240px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pb-space-lg">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg md:p-space-xl transition-all shadow-sm">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed opacity-40 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
              <div className="max-w-2xl space-y-space-sm">
                <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-fixed text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    explore
                  </span>
                  <span>ĐỊNH HƯỚNG &amp; KHÁM PHÁ LĨNH VỰC</span>
                </div>

                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Khám phá ngành học
                  <span className="text-secondary-container">.</span>
                </h1>

                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  Tìm hiểu các ngành qua hoạt động thực tế, năng lực tương thích
                  và lộ trình nghề nghiệp chuẩn — kết nối trực tiếp đến dữ liệu
                  tuyển sinh thực tế tại Việt Nam.
                </p>
              </div>

              <div className="w-full lg:max-w-sm rounded-lg bg-surface-container-lowest p-space-md shadow-sm space-y-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    psychology
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface text-[17px]">
                    Chưa biết bắt đầu từ đâu?
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Làm bài trắc nghiệm sở thích RIASEC 4 phút để mở khóa danh
                  sách nhóm ngành tương thích với tính cách của bạn.
                </p>
                <div className="pt-space-xs">
                  <a
                    className="inline-flex items-center gap-space-xs text-primary font-label-lg text-label-lg hover:text-primary-container transition-all group"
                    href="#"
                  >
                    <span>Khám phá bản thân ngay</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-lg space-y-space-md">
            <div className="relative w-full rounded-xl bg-surface-container-lowest p-space-xs shadow-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[24px] ml-space-sm">
                search
              </span>
              <input
                className="w-full bg-transparent text-on-surface font-body-md text-body-md outline-none placeholder:text-outline py-space-sm pr-space-md"
                placeholder="Tìm tên ngành, mã ngành (7480...), nghề nghiệp hoặc từ khóa..."
                type="text"
              />
              <div className="hidden md:flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container text-outline font-label-sm text-label-sm shrink-0">
                <span className="text-[12px]">⌘</span>
                <span>K</span>
              </div>
              <button className="bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-lg transition-colors shrink-0 shadow-sm">
                Tìm kiếm
              </button>
            </div>

            <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none">
              <button className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-md text-label-md shrink-0 shadow-sm transition-transform active:scale-95">
                Tất cả ngành
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  memory
                </span>
                <span>Công nghệ &amp; AI</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  query_stats
                </span>
                <span>Kinh doanh &amp; Quản lý</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  palette
                </span>
                <span>Nghệ thuật &amp; Sáng tạo</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-outline">
                  translate
                </span>
                <span>Ngôn ngữ &amp; Văn hóa</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-error">
                  ecg_heart
                </span>
                <span>Sức khỏe &amp; Y sinh</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  precision_manufacturing
                </span>
                <span>Kỹ thuật &amp; Tự động hóa</span>
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high shrink-0 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-outline">
                  group
                </span>
                <span>Khoa học xã hội</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pb-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-10 gap-space-lg">
            <aside className="lg:col-span-4 xl:col-span-3 space-y-space-md">
              <div className="sticky top-24 bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md ">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      tune
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface text-[17px]">
                      Bộ lọc khám phá
                    </h2>
                  </div>
                  <button className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer">
                    Đặt lại
                  </button>
                </div>

                <div className="space-y-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Nhóm ngành lớn
                  </label>
                  <div className="space-y-1">
                    {filterData.categories.map((category, index) => {
                      return (
                        <label
                          key={category.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors"
                        >
                          <span className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                            <input
                              defaultChecked={index === 0}
                              className="w-4 h-4 rounded text-primary accent-primary"
                              type="checkbox"
                            />
                            <span>{category.label}</span>
                          </span>
                          <span className="font-label-sm text-label-sm text-outline"></span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-space-xs pt-space-xs border-t border-surface-container">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Bạn thích làm gì?
                  </label>
                  <p className="font-body-sm text-[12px] text-outline">
                    Chọn các hoạt động bạn cảm thấy hào hứng:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {majorsFilter.interests.map((interest, index) => {
                      return (
                        <button className="px-space-sm py-1 rounded-full cursor-pointer bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center gap-1">
                          <span>{interest.label}</span>
                          {index === 0 && (
                            <span className="material-symbols-outlined text-[13px]">
                              check
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-space-xs pt-space-xs border-t border-surface-container">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-label-lg text-on-surface">
                      Mô hình RIASEC
                    </label>
                    <span
                      className="material-symbols-outlined text-outline text-[16px] cursor-help"
                      title="Mô hình phân loại định hướng nghề nghiệp của John Holland"
                    >
                      info
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {majorsFilter.riasec.map((riasec, index) => {
                      return (
                        <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-left transition-colors">
                          <span className="font-label-sm text-label-sm block text-outline">
                            {riasec.id} - {riasec.label}
                          </span>
                          <span className="font-body-sm text-[13px] text-on-surface font-medium flex items-center gap-1">
                            {riasec.description}
                            {index === 0 && (
                              <span className="material-symbols-outlined text-[13px]">
                                check
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-space-xs pt-space-xs border-t border-surface-container">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Tổ hợp môn thế mạnh
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {majorsFilter.admissionCombinations.map((major, index) => {
                      return (
                        <span
                          className={`px-space-sm py-1 rounded ${index === 0 ? "bg-primary text-on-primary" : "bg-amber-100 text-on-surface"} font-label-md text-label-md cursor-pointer hover:bg-primary hover:text-on-primary transition-colors`}
                        >
                          {major.label} {major.subjects.join(", ")}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-space-md p-space-md rounded-xl bg-secondary-fixed text-on-secondary-fixed space-y-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      support_agent
                    </span>
                    <span className="font-headline-sm text-headline-sm text-[15px]">
                      Cần tư vấn chọn ngành?
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm opacity-90">
                    Trò chuyện trực tiếp cùng cố vấn học thuật UniView để làm rõ
                    hướng đi phù hợp năng lực học tập.
                  </p>
                  <a
                    className="inline-block mt-1 font-label-md text-label-md font-semibold text-secondary hover:underline"
                    href="#"
                  >
                    Đặt lịch cố vấn miễn phí →
                  </a>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8 xl:col-span-7 space-y-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                      Công nghệ &amp; AI
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">
                        close
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                      Hoạt động: Phân tích &amp; Code
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">
                        close
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                      Sở thích: I - Nghiên cứu
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">
                        close
                      </span>
                    </span>
                    <button className="font-label-sm text-label-sm text-outline hover:text-primary underline ml-1">
                      Xóa tất cả bộ lọc
                    </button>
                  </div>
                  <div className="font-body-sm text-body-sm text-outline">
                    Tìm thấy{" "}
                    <strong className="text-on-surface font-semibold">
                      28 ngành
                    </strong>{" "}
                    phù hợp với tiêu chí lọc của bạn
                  </div>
                </div>

                <div className="flex items-center gap-space-xs shrink-0 self-end sm:self-auto">
                  <label className="font-body-sm text-body-sm text-outline">
                    Sắp xếp:
                  </label>
                  <select className="bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg px-space-sm py-1.5 outline-none cursor-pointer shadow-sm">
                    <option>Độ tương thích cao nhất</option>
                    <option>Số trường đào tạo (Nhiều nhất)</option>
                    <option>Tên ngành: A → Z</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {majors.slice(0, 6).map((major) => (
                  <div
                    key={major.id}
                    className="group relative rounded-xl bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                  >
                    {/* Nội dung */}
                    <div className="space-y-space-sm">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_awesome
                        </span>

                        <span>Phù hợp với kỹ năng của bạn</span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between gap-space-sm pt-1">
                        <div className="flex items-center gap-space-sm">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-inner">
                            <span className="material-symbols-outlined text-[28px]">
                              {major.icon}
                            </span>
                          </div>

                          {/* Name + code */}
                          <div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors text-[19px] leading-tight">
                              {major.name}
                            </h3>

                            <p className="font-label-sm text-label-sm text-outline">
                              Mã: {major.code} • Nhóm {major.category.name}
                            </p>
                          </div>
                        </div>

                        {/* Favorite */}
                        <button
                          className="p-1.5 rounded-full hover:bg-secondary-fixed text-outline hover:text-secondary transition-colors"
                          title="Lưu vào danh sách quan tâm"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            favorite
                          </span>
                        </button>
                      </div>

                      {/* Description */}
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                        {major.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1">
                        {major.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-space-xs py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-[11px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Information */}
                      <div className="pt-space-xs space-y-1 text-on-surface-variant font-body-sm text-body-sm">
                        {/* University count */}
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            apartment
                          </span>

                          <span>
                            <strong>{major.universityCount}</strong> trường đại
                            học tại Việt Nam đào tạo
                          </span>
                        </div>

                        {/* Career */}
                        <div className="flex items-start gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
                            work_outline
                          </span>

                          <span className="truncate">
                            {major.careerPaths.join(", ")}
                          </span>
                        </div>

                        {/* Admission combinations */}
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            school
                          </span>

                          <span>
                            Tổ hợp xét tuyển:{" "}
                            <strong className="text-on-surface">
                              {major.admissionCombinations
                                .map((combination) => combination.code)
                                .join(", ")}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between gap-space-xs">
                      {/* Find universities */}
                      <a
                        className="font-label-md text-label-md text-outline hover:text-primary transition-colors flex items-center gap-1"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          domain
                        </span>

                        <span>Tìm trường đào tạo</span>
                      </a>

                      {/* Explore */}
                      <a
                        className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all group-hover:px-space-lg"
                        href="#"
                      >
                        <span>Khám phá ngành</span>

                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center pt-space-lg pb-space-md space-y-space-sm">
                <p className="font-body-sm text-body-sm text-outline">
                  Đang hiển thị{" "}
                  <span className="font-semibold text-on-surface">6</span> trên
                  tổng số{" "}
                  <span className="font-semibold text-on-surface">28</span>{" "}
                  ngành phù hợp
                </p>
                <div className="w-48 h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[21%] h-full bg-primary-container rounded-full"></div>
                </div>
                <button className="mt-2 px-space-xl py-space-sm rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-colors flex items-center gap-space-xs shadow-sm">
                  <span>Xem thêm 6 ngành kế tiếp</span>
                  <span className="material-symbols-outlined text-[18px]">
                    expand_more
                  </span>
                </button>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high p-space-lg shadow-sm">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="max-w-xl space-y-space-xs">
                    <div className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                      <span>ĐỊNH HƯỚNG CÁ NHÂN HÓA</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface text-[22px]">
                      Chưa biết ngành nào thực sự đáng để đầu tư 4 năm tới?
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Làm bài test định vị tính cách nghề nghiệp RIASEC (chuẩn
                      tâm lý học hướng nghiệp) để nhìn rõ năng khiếu bẩm sinh và
                      điểm chạm nghề nghiệp lý tưởng.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs shrink-0">
                    <a
                      className="px-space-lg py-space-sm rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors text-center shadow-sm"
                      href="#"
                    >
                      Làm bài trắc nghiệm RIASEC →
                    </a>
                    <a
                      className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface text-center font-label-md text-label-md transition-colors"
                      href="#"
                    >
                      Xem hướng dẫn chọn ngành
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="w-full bg-surface-container-low py-space-2xl">
          <div className="max-w-[1240px] mx-auto px-margin md:px-margin-md lg:px-margin-lg space-y-space-lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
              <div className="space-y-space-xs">
                <div className="inline-flex items-center gap-1 text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    interests
                  </span>
                  <span>GỢI Ý THEO XU HƯỚNG</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  Những nhóm ngành được học sinh quan tâm nhiều nhất
                </h2>
              </div>
              <a
                className="font-label-lg text-label-lg text-primary hover:underline flex items-center gap-1"
                href="#"
              >
                <span>Xem tất cả danh mục ngành</span>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <a
                className="p-space-md rounded-xl bg-surface-container-lowest hover:shadow-md hover:-translate-y-1 transition-all group space-y-space-sm"
                href="#"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    code
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[17px] text-on-surface group-hover:text-primary transition-colors">
                    Máy tính &amp; AI
                  </h4>
                  <p className="font-body-sm text-[13px] text-outline mt-1">
                    Khoa học máy tính, Kỹ thuật phần mềm, Trí tuệ nhân tạo, An
                    toàn thông tin
                  </p>
                </div>
                <div className="font-label-sm text-label-sm text-primary flex items-center gap-1 pt-1">
                  <span>14 ngành học</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </a>

              <a
                className="p-space-md rounded-xl bg-surface-container-lowest hover:shadow-md hover:-translate-y-1 transition-all group space-y-space-sm"
                href="#"
              >
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    trending_up
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[17px] text-on-surface group-hover:text-primary transition-colors">
                    Kinh doanh &amp; Tài chính
                  </h4>
                  <p className="font-body-sm text-[13px] text-outline mt-1">
                    Kinh doanh quốc tế, Marketing số, Thương mại điện tử, Tài
                    chính ngân hàng
                  </p>
                </div>
                <div className="font-label-sm text-label-sm text-primary flex items-center gap-1 pt-1">
                  <span>18 ngành học</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </a>

              <a
                className="p-space-md rounded-xl bg-surface-container-lowest hover:shadow-md hover:-translate-y-1 transition-all group space-y-space-sm"
                href="#"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    palette
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[17px] text-on-surface group-hover:text-primary transition-colors">
                    Truyền thông &amp; Nghệ thuật
                  </h4>
                  <p className="font-body-sm text-[13px] text-outline mt-1">
                    Truyền thông đa phương tiện, Thiết kế đồ họa, Quan hệ công
                    chúng, Báo chí
                  </p>
                </div>
                <div className="font-label-sm text-label-sm text-primary flex items-center gap-1 pt-1">
                  <span>9 ngành học</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </a>

              <a
                className="p-space-md rounded-xl bg-surface-container-lowest hover:shadow-md hover:-translate-y-1 transition-all group space-y-space-sm"
                href="#"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    precision_manufacturing
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[17px] text-on-surface group-hover:text-primary transition-colors">
                    Kỹ thuật &amp; Robotics
                  </h4>
                  <p className="font-body-sm text-[13px] text-outline mt-1">
                    Cơ điện tử, Tự động hóa, Vi mạch bán dẫn, Kỹ thuật ô tô điện
                  </p>
                </div>
                <div className="font-label-sm text-label-sm text-primary flex items-center gap-1 pt-1">
                  <span>12 ngành học</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MajorsPage;
