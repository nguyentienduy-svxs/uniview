import majors from "../data/majors.json";
import majorsFilter from "../data/majorsfilter.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 6;
const CAROUSEL_INTERVAL = 5000;
const HERO_SLIDES = [
  {
    src: "/stitch-assets/debe8864-7bc2-4762-ac28-187f65b61c62.png",
    alt: "Linh vật UniView học tập bên máy tính",
  },
  {
    src: "/anhnganh/bannerCarousel.jpg",
    alt: "Linh vật UniView khám phá các nhóm ngành học",
  },
  {
    src: "/anhnganh/ITBanner.png",
    alt: "Linh vật UniView khám phá nhóm ngành Công nghệ thông tin",
  },
  {
    src: "/anhnganh/lawyerBanner.png",
    alt: "Linh vật UniView khám phá nhóm ngành Luật",
  },
  {
    src: "/anhnganh/truyenthongbanner.png",
    alt: "Linh vật UniView khám phá nhóm ngành Truyền thông và Giải trí",
  },
];
const EXTRA_CATEGORY_IDS = ["health", "social-sciences"];
const CATEGORY_IMAGES = {
  "computer-it": {
    src: "/stitch-assets/fpt-software-campus.jpg",
    alt: "Sinh viên tại khu đào tạo công nghệ phần mềm",
  },
  business: {
    src: "/stitch-assets/modern-university-campus.jpg",
    alt: "Sinh viên trao đổi tại khuôn viên trường kinh doanh",
  },
  engineering: {
    src: "/stitch-assets/hcmus-research-lab.jpg",
    alt: "Sinh viên thực hành trong phòng thí nghiệm",
  },
  "art-design": {
    src: "/stitch-assets/uniview-mascot-rating-guide.jpg",
    alt: "Minh họa linh vật UniView với nhiều trạng thái biểu cảm",
  },
  "language-humanities": {
    src: "/stitch-assets/student-admission-planning.jpg",
    alt: "Sinh viên học tập và lập kế hoạch tại thư viện",
  },
};
const MAJOR_IMAGES = {
  "7480103": {
    src: "/anhnganh/KTPM.png",
    alt: "Minh họa ngành Kỹ thuật Phần mềm",
  },
  "7480201": {
    src: "/anhnganh/CNTT.png",
    alt: "Minh họa ngành Công nghệ Thông tin",
  },
  "7480109": {
    src: "/anhnganh/Khoahocdulieu.png",
    alt: "Minh họa ngành Khoa học Dữ liệu",
  },
  "7480101": {
    src: "/anhnganh/Khoahocmaytinh.png",
    alt: "Minh họa ngành Khoa học Máy tính",
  },
  "7480202": {
    src: "/anhnganh/Antoanthongtin.png",
    alt: "Minh họa ngành An toàn Thông tin",
  },
  "7480107": {
    src: "/anhnganh/Ai.png",
    alt: "Minh họa ngành Trí tuệ Nhân tạo",
  },
  "7480203": {
    src: "/anhnganh/KyThuatMayTinh.png",
    alt: "Minh họa ngành Kỹ thuật Máy tính",
  },
  "7480102": {
    src: "/anhnganh/MangMayTinh.png",
    alt: "Minh họa ngành Mạng Máy tính và Truyền thông Dữ liệu",
  },
  "7480104": {
    src: "/anhnganh/HeThongThongTin.png",
    alt: "Minh họa ngành Hệ thống Thông tin",
  },
  "7340101": {
    src: "/anhnganh/QuanTriKinhDoanh.png",
    alt: "Minh họa ngành Quản trị Kinh doanh",
  },
  "7340115": {
    src: "/anhnganh/Marketing.png",
    alt: "Minh họa ngành Marketing",
  },
  "7340120": {
    src: "/anhnganh/KinhDoanhQuocTe.png",
    alt: "Minh họa ngành Kinh doanh Quốc tế",
  },
  "7340121": {
    src: "/anhnganh/KinhDoanhThuongMai.png",
    alt: "Minh họa ngành Kinh doanh Thương mại",
  },
  "7340201": {
    src: "/anhnganh/TaiChinhNganHang.png",
    alt: "Minh họa ngành Tài chính - Ngân hàng",
  },
  "7340301": {
    src: "/anhnganh/KeToan.png",
    alt: "Minh họa ngành Kế toán",
  },
  "7340302": {
    src: "/anhnganh/KiemToan.png",
    alt: "Minh họa ngành Kiểm toán",
  },
  "7340122": {
    src: "/anhnganh/ThuongMaiDienTu.png",
    alt: "Minh họa ngành Thương mại Điện tử",
  },
  "7340405": {
    src: "/anhnganh/HeThongThongTinQuanLy.png",
    alt: "Minh họa ngành Hệ thống Thông tin Quản lý",
  },
  "7520201": {
    src: "/anhnganh/KyThuatDien.png",
    alt: "Minh họa ngành Kỹ thuật Điện",
  },
  "7520207": {
    src: "/anhnganh/KyThuatDienTuVienThong.png",
    alt: "Minh họa ngành Kỹ thuật Điện tử - Viễn thông",
  },
  "7520216": {
    src: "/anhnganh/KyThuatDieuKhienVaTuDongHoa.png",
    alt: "Minh họa ngành Kỹ thuật Điều khiển và Tự động hóa",
  },
  "7520114": {
    src: "/anhnganh/KyThuatCoDienTu.png",
    alt: "Minh họa ngành Kỹ thuật Cơ - Điện tử",
  },
  "7520103": {
    src: "/anhnganh/KyThuatCoKhi.png",
    alt: "Minh họa ngành Kỹ thuật Cơ khí",
  },
  "7580201": {
    src: "/anhnganh/KyThuatXayDung.png",
    alt: "Minh họa ngành Kỹ thuật Xây dựng",
  },
};

const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

function MajorsPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [filterSelected, setFilterSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [firstNewResultIndex, setFirstNewResultIndex] = useState(0);
  const progressBarRef = useRef(null);
  const filterData = majorsFilter;

  useEffect(() => {
    if (isCarouselPaused) return undefined;

    const timeoutId = window.setTimeout(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length);
    }, CAROUSEL_INTERVAL);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlide, isCarouselPaused]);

  const showSlide = (slideIndex) => {
    setActiveSlide((slideIndex + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const categoryIds = useMemo(
    () => new Set([
      ...filterData.categories.map((category) => category.id),
      ...EXTRA_CATEGORY_IDS,
    ]),
    [filterData.categories],
  );

  const interestLabelsById = useMemo(
    () => new Map(
      filterData.interests.map((interest) => [interest.id, interest.label]),
    ),
    [filterData.interests],
  );

  const filteredMajors = useMemo(() => {
    const selectedCategories = filterSelected.filter((id) => categoryIds.has(id));
    const selectedInterests = filterSelected
      .filter((id) => interestLabelsById.has(id))
      .map((id) => interestLabelsById.get(id));
    const selectedRiasec = filterSelected.filter((id) =>
      filterData.riasec.some((item) => item.id === id),
    );
    const selectedCombinations = filterSelected.filter((id) =>
      filterData.admissionCombinations.some((item) => item.id === id),
    );
    const searchTokens = normalizeText(searchTerm).trim().split(/\s+/).filter(Boolean);

    const results = majors.filter((major) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(major.category.id);
      const matchesInterest =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) => major.interests.includes(interest));
      const matchesRiasec =
        selectedRiasec.length === 0 ||
        selectedRiasec.some((type) => major.riasec.includes(type));
      const matchesCombination =
        selectedCombinations.length === 0 ||
        selectedCombinations.some((code) =>
          major.admissionCombinations.some((combination) => combination.code === code),
        );
      const searchableText = normalizeText([
        major.name,
        major.code,
        major.category.name,
        major.description,
        ...major.skills,
        ...major.interests,
        ...major.careerPaths,
        ...major.admissionCombinations.flatMap((combination) => [
          combination.code,
          ...combination.subjects,
        ]),
      ].join(" "));
      const matchesSearch = searchTokens.every((token) => searchableText.includes(token));

      return matchesCategory && matchesInterest && matchesRiasec &&
        matchesCombination && matchesSearch;
    });

    return [...results].sort((first, second) => {
      if (sortBy === "university-count") {
        return second.universityCount - first.universityCount;
      }

      if (sortBy === "name") {
        return first.name.localeCompare(second.name, "vi");
      }

      return majors.indexOf(first) - majors.indexOf(second);
    });
  }, [categoryIds, filterData, filterSelected, interestLabelsById, searchTerm, sortBy]);

  const visibleMajors = filteredMajors.slice(0, visibleCount);
  const progress = filteredMajors.length === 0
    ? 0
    : Math.min(100, (visibleMajors.length / filteredMajors.length) * 100);
  const hasMore = visibleMajors.length < filteredMajors.length;

  const handleFilterClick = (filterId) => {
    setFilterSelected((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((id) => id !== filterId)
        : [...currentFilters, filterId],
    );
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryShortcut = (categoryId) => {
    setFilterSelected((currentFilters) => {
      const filtersWithoutCategories = currentFilters.filter((id) => !categoryIds.has(id));
      return categoryId ? [...filtersWithoutCategories, categoryId] : filtersWithoutCategories;
    });
    setVisibleCount(PAGE_SIZE);
  };

  const handleResetFilters = () => {
    setFilterSelected([]);
    setSearchTerm("");
    setSortBy("relevance");
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setFirstNewResultIndex(visibleCount);
    setVisibleCount((currentCount) =>
      Math.min(currentCount + PAGE_SIZE, filteredMajors.length),
    );

    setTimeout(() => {
      progressBarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <main className="w-full pt-6 bg-surface min-h-[calc(100vh-80px)]">
      <div className="flex flex-col w-full">
        <div className="w-full max-w-[1240px] mx-auto px-3 sm:px-4 lg:px-5 pb-space-lg">
          <section
            className="group relative h-[520px] overflow-hidden rounded-xl bg-surface-container-low p-space-lg pb-14 shadow-sm sm:h-[440px] md:h-[440px] md:p-space-xl md:pb-14 lg:h-[380px]"
            aria-roledescription="carousel"
            aria-label="Banner khám phá ngành học"
            tabIndex={0}
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showSlide(activeSlide - 1);
              if (event.key === "ArrowRight") showSlide(activeSlide + 1);
            }}
          >
            {HERO_SLIDES.map((slide, index) => (
              <img
                key={slide.src}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                }`}
                src={slide.src}
                alt={index === activeSlide ? slide.alt : ""}
                aria-hidden={index !== activeSlide}
              />
            ))}

            {activeSlide === 0 && (
              <div className="relative z-10 flex flex-col items-start justify-between gap-space-lg md:min-h-[282px] md:justify-start lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-[490px] space-y-space-sm">
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

              <div className="w-full space-y-space-xs rounded-lg border border-white/80 bg-surface-container-lowest p-space-md shadow-[0_10px_30px_rgba(15,23,42,0.14)] lg:max-w-sm lg:self-center">
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
                    className="group/link inline-flex items-center gap-space-xs text-primary font-label-lg text-label-lg hover:text-primary-container transition-all"
                    href="#"
                  >
                    <span>Khám phá bản thân ngay</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover/link:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
              </div>
            )}

            <button
              type="button"
              className="absolute left-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-on-surface shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Xem banner trước"
              title="Banner trước"
              onClick={() => showSlide(activeSlide - 1)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-on-surface shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Xem banner tiếp theo"
              title="Banner tiếp theo"
              onClick={() => showSlide(activeSlide + 1)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    index === activeSlide ? "w-7 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
                  }`}
                  aria-label={`Chuyển đến banner ${index + 1}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              Banner {activeSlide + 1} trên {HERO_SLIDES.length}
            </span>
          </section>

          <div className="mt-space-lg space-y-space-md">
            <form
              className="relative w-full rounded-xl bg-surface-container-lowest p-space-xs shadow-sm flex items-center gap-space-sm"
              onSubmit={(event) => event.preventDefault()}
            >
              <span className="material-symbols-outlined text-outline text-[24px] ml-space-sm">
                search
              </span>
              <input
                className="w-full bg-transparent text-on-surface font-body-md text-body-md outline-none placeholder:text-outline py-space-sm pr-space-md"
                placeholder="Tìm tên ngành, mã ngành (7480...), nghề nghiệp hoặc từ khóa..."
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
              />
              <div className="hidden md:flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container text-outline font-label-sm text-label-sm shrink-0">
                <span className="text-[12px]">⌘</span>
                <span>K</span>
              </div>
              <button
                type="submit"
                className="bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-lg transition-colors shrink-0 shadow-sm"
              >
                Tìm kiếm
              </button>
            </form>

            <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none">
              <button
                onClick={() => handleCategoryShortcut(null)}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.some((id) => categoryIds.has(id)) ? "bg-surface-container text-on-surface hover:bg-surface-container-high" : "bg-primary text-on-primary shadow-sm"} font-label-md text-label-md shrink-0 transition-transform active:scale-95`}
              >
                Tất cả ngành
              </button>
              <button
                onClick={() => handleCategoryShortcut("computer-it")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("computer-it") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  memory
                </span>
                <span>Công nghệ &amp; AI</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("business")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("business") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  query_stats
                </span>
                <span>Kinh doanh &amp; Quản lý</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("art-design")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("art-design") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  palette
                </span>
                <span>Nghệ thuật &amp; Sáng tạo</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("language-humanities")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("language-humanities") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-outline">
                  translate
                </span>
                <span>Ngôn ngữ &amp; Văn hóa</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("health")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("health") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-error">
                  ecg_heart
                </span>
                <span>Sức khỏe &amp; Y sinh</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("engineering")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("engineering") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  precision_manufacturing
                </span>
                <span>Kỹ thuật &amp; Tự động hóa</span>
              </button>
              <button
                onClick={() => handleCategoryShortcut("social-sciences")}
                className={`px-space-md py-space-xs rounded-full ${filterSelected.includes("social-sciences") ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"} font-label-md text-label-md shrink-0 transition-colors flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-[16px] text-outline">
                  group
                </span>
                <span>Khoa học xã hội</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-3 sm:px-4 lg:px-5 pb-space-2xl">
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
                  <button onClick={handleResetFilters} className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer">
                    Đặt lại
                  </button>
                </div>

                <div className="space-y-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Nhóm ngành lớn
                  </label>
                  <div className="space-y-1">
                    {filterData.categories.map((category) => {
                      return (
                        <label
                          key={category.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors"
                        >
                          <span className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                            <input
                              className="w-4 h-4 rounded text-primary accent-primary"
                              type="checkbox"
                              onChange={() => handleFilterClick(category.id)}
                              checked={filterSelected.includes(category.id)}
                            />
                            <span>{category.label}</span>
                          </span>
                          <span className="font-label-sm text-label-sm text-outline"></span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-space-xs pt-space-xs h-[210px] border-t border-surface-container">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Bạn thích làm gì?
                  </label>
                  <p className="font-body-sm text-[12px] text-outline">
                    Chọn các hoạt động bạn cảm thấy hào hứng:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1 ">
                    {majorsFilter.interests.map((interest) => {
                      return (
                        <button
                          key={interest.id}
                          className="px-space-sm py-1 h-[24px] rounded-full cursor-pointer bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center gap-1"
                          onClick={() => handleFilterClick(interest.id)}
                        >
                          <span>{interest.label}</span>
                          {filterSelected.includes(interest.id) && (
                            <span className="material-symbols-outlined text-[9px]">
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
                    {majorsFilter.riasec.map((riasec) => {
                      return (
                        <button
                          key={riasec.id}
                          className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-left transition-colors"
                          onClick={() => handleFilterClick(riasec.id)}
                        >
                          <span className="font-label-sm text-label-sm block text-outline">
                            {riasec.id} - {riasec.label}
                          </span>
                          <span className="font-body-sm text-[13px] text-on-surface font-medium flex items-center gap-1">
                            {riasec.description}
                            {filterSelected.includes(riasec.id) && (
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
                    {majorsFilter.admissionCombinations.map((major) => {
                      return (
                        <span
                          onClick={() => handleFilterClick(major.id)}
                          key={major.id}
                          className={`px-space-sm py-1 rounded ${filterSelected.includes(major.id) ? "bg-primary text-on-primary" : "bg-amber-100 text-on-surface"} font-label-md text-label-md cursor-pointer hover:bg-primary hover:text-on-primary transition-colors`}
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
                  <div className="font-body-sm text-body-sm text-outline">
                    Tìm thấy{" "}
                    <strong className="text-on-surface font-semibold">
                      {filteredMajors.length} ngành
                    </strong>{" "}
                    phù hợp với tiêu chí lọc của bạn
                  </div>
                </div>

                <div className="flex items-center gap-space-xs shrink-0 self-end sm:self-auto">
                  <label className="font-body-sm text-body-sm text-outline">
                    Sắp xếp:
                  </label>
                  <select
                    className="bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg px-space-sm py-1.5 outline-none cursor-pointer shadow-sm"
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setVisibleCount(PAGE_SIZE);
                    }}
                  >
                    <option value="relevance">Độ tương thích cao nhất</option>
                    <option value="university-count">Số trường đào tạo (Nhiều nhất)</option>
                    <option value="name">Tên ngành: A → Z</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {visibleMajors.map((major, index) => {
                  const majorImage = MAJOR_IMAGES[major.id];
                  const cardImage = majorImage
                    ?? CATEGORY_IMAGES[major.category.id]
                    ?? CATEGORY_IMAGES["computer-it"];

                  return (
                    <article
                      ref={index === firstNewResultIndex ? progressBarRef : null}
                      key={major.id}
                      className="group scroll-mt-4 flex min-h-0 flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-container-high">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
                          src={cardImage.src}
                          alt={cardImage.alt}
                        />
                        {!majorImage && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            <span className="absolute bottom-space-sm left-space-sm inline-flex items-center gap-1 rounded-full bg-surface-container-lowest/95 px-space-sm py-1 font-label-sm text-label-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                              <span className="material-symbols-outlined text-[15px]">
                                {major.icon}
                              </span>
                              {major.category.name}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-space-md">
                        <p className="font-label-sm text-label-sm font-semibold text-outline">
                          Mã ngành {major.code}
                        </p>
                        <h3 className="mt-1 font-headline-sm text-[20px] leading-tight text-on-surface transition-colors group-hover:text-primary">
                          {major.name}
                        </h3>
                        <p className="mt-space-xs line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                          {major.description}
                        </p>

                        <div className="mt-space-md grid grid-cols-2 gap-space-md border-y border-surface-container py-space-sm">
                          <div className="min-w-0">
                            <span className="block font-label-sm text-label-sm text-outline">
                              Trường đào tạo
                            </span>
                            <span className="mt-0.5 flex items-center gap-1 font-label-md text-label-md font-semibold text-on-surface">
                              <span className="material-symbols-outlined text-[17px] text-primary">
                                apartment
                              </span>
                              {major.universityCount} trường
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="block font-label-sm text-label-sm text-outline">
                              Tổ hợp phổ biến
                            </span>
                            <span className="mt-0.5 block truncate font-label-md text-label-md font-semibold text-on-surface">
                              {major.admissionCombinations
                                .map((combination) => combination.code)
                                .join(", ")}
                            </span>
                          </div>
                        </div>

                        <Link
                          className="mt-space-md inline-flex w-full items-center justify-between rounded-lg bg-primary-container px-space-md py-space-sm font-label-md text-label-md font-semibold text-on-primary transition-colors hover:bg-primary"
                          to={`/majors/software-engineering?majorId=${major.id}`}
                        >
                          <span>Xem chi tiết ngành</span>
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
                {filteredMajors.length === 0 && (
                  <div className="md:col-span-2 rounded-xl bg-surface-container-lowest p-space-lg text-center shadow-sm">
                    <span className="material-symbols-outlined text-[32px] text-outline">
                      search_off
                    </span>
                    <p className="font-body-md text-body-md text-on-surface mt-space-xs">
                      Không tìm thấy ngành phù hợp
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="font-label-md text-label-md text-primary hover:underline mt-space-xs"
                    >
                      Đặt lại tìm kiếm và bộ lọc
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center pt-space-lg pb-space-md space-y-space-sm">
                <p className="font-body-sm text-body-sm text-outline">
                  Đang hiển thị{" "}
                  <span className="font-semibold text-on-surface">{visibleMajors.length}</span> trên
                  tổng số{" "}
                  <span className="font-semibold text-on-surface">{filteredMajors.length}</span>{" "}
                  ngành phù hợp
                </p>
                <div className="w-48 h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <button
                  onClick={handleLoadMore}
                  disabled={!hasMore}
                  className="mt-2 px-space-xl py-space-sm rounded-full bg-surface-container-low cursor-pointer hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-colors flex items-center gap-space-xs shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
          <div className="max-w-[1240px] mx-auto px-3 sm:px-4 lg:px-5 space-y-space-lg">
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
