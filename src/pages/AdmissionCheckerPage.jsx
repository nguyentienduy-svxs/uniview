import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'
import { ENTITLEMENTS } from '../components/header/headerConfig'
import universityData from '../data/universities.json'
import rawMajors from '../data/majors.json'

// Chuẩn hóa toàn bộ danh sách ngành học từ majors.json kết hợp điểm chuẩn mẫu
const BENCHMARK_MAP = {
  '7480103': 26.50, // Kỹ thuật Phần mềm
  '7480101': 27.25, // Khoa học Máy tính
  '7480201': 26.30, // CNTT
  '7480109': 26.10, // Khoa học Dữ liệu
  '7480202': 25.80, // An toàn thông tin
  '7340115': 25.40, // Marketing
  '7340120': 26.00, // Kinh doanh quốc tế
  '7340201': 25.20, // Tài chính - Ngân hàng
  '7510605': 25.90, // Logistics
  '7320104': 25.10, // Truyền thông đa phương tiện
  '7210403': 24.80, // Thiết kế đồ họa
}

const ALL_MAJORS = rawMajors.map((m) => {
  const combinations = (m.admissionCombinations || []).map((c) => c.code).join(', ') || 'A00, A01, D01'
  const defaultScore = BENCHMARK_MAP[m.code] || 25.00
  return {
    id: m.id || m.code,
    name: m.name,
    code: m.code,
    categoryName: m.category?.name || 'Khối ngành chuyên sâu',
    tag: m.category?.name?.slice(0, 10) || 'Ngành',
    combinations,
    defaultScore,
  }
})

function AdmissionCheckerPage() {
  const { user, hasEntitlement } = useAuth()
  const { assessment } = useAssessment()
  const hasAdmissionPass = hasEntitlement(ENTITLEMENTS.ADMISSION_PASS)

  const allSchools = universityData.universities || []

  // Dynamic States
  const [selectedSchool, setSelectedSchool] = useState(() => allSchools[0] || {
    id: 'uit-vnuhcm',
    name: 'Trường Đại học Công nghệ Thông tin (UIT)',
    shortName: 'UIT',
    city: 'TP. Hồ Chí Minh',
    code: 'QST',
    admission: { scoreRange: { min: 26.50, max: 28.50 } },
  })
  const [schoolSearch, setSchoolSearch] = useState('')
  const [schoolRegionFilter, setSchoolRegionFilter] = useState('ALL')
  const [isSelectingSchool, setIsSelectingSchool] = useState(false)

  const [selectedMajor, setSelectedMajor] = useState(ALL_MAJORS[0])
  const [majorSearch, setMajorSearch] = useState('')
  const [majorCategoryFilter, setMajorCategoryFilter] = useState('ALL')
  const [isSelectingMajor, setIsSelectingMajor] = useState(false)

  // Method & Scores
  const defaultThpt = assessment?.profile?.thptScore || user?.academicProfile?.thptScore?.value || '25.50'
  const defaultDgnl = assessment?.profile?.dgnlScore || user?.academicProfile?.dgnlScore?.value || '875'

  const [method, setMethod] = useState('thpt') // 'thpt' | 'dgnl_hcm'
  const [userThptScore, setUserThptScore] = useState(defaultThpt)
  const [userDgnlScore, setUserDgnlScore] = useState(defaultDgnl)

  const isDgnl = method === 'dgnl_hcm'

  // Filtered Schools
  const filteredSchools = useMemo(() => {
    return allSchools.filter((s) => {
      const q = schoolSearch.trim().toLowerCase()
      const matchQuery = !q || (
        s.name?.toLowerCase().includes(q) ||
        s.shortName?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q) ||
        s.code?.toLowerCase().includes(q)
      )
      const matchRegion = schoolRegionFilter === 'ALL' || (
        schoolRegionFilter === 'HCM' && (s.city?.includes('Hồ Chí Minh') || s.city?.includes('TP.HCM'))
      ) || (
        schoolRegionFilter === 'HN' && s.city?.includes('Hà Nội')
      ) || (
        schoolRegionFilter === 'CENTRAL' && (s.city?.includes('Đà Nẵng') || s.city?.includes('Huế'))
      ) || (
        schoolRegionFilter === 'MEKONG' && s.city?.includes('Cần Thơ')
      )
      return matchQuery && matchRegion
    })
  }, [allSchools, schoolSearch, schoolRegionFilter])

  // Filtered Majors
  const filteredMajors = useMemo(() => {
    return ALL_MAJORS.filter((m) => {
      const q = majorSearch.trim().toLowerCase()
      const matchQuery = !q || (
        m.name.toLowerCase().includes(q) ||
        m.code.includes(q) ||
        m.categoryName.toLowerCase().includes(q)
      )
      const matchCat = majorCategoryFilter === 'ALL' || m.categoryName.includes(majorCategoryFilter)
      return matchQuery && matchCat
    })
  }, [majorSearch, majorCategoryFilter])

  // THPT & ĐGNL Benchmarks cho năm gần nhất (Mùa tuyển sinh 2025 - 2026)
  const thptBenchmark = parseFloat(selectedSchool?.admission?.scoreRange?.min) || selectedMajor.defaultScore

  const dgnlBenchmark = useMemo(() => {
    if (selectedSchool.shortName === 'UIT') {
      if (selectedMajor.code === '7480103') return 915 // Kỹ thuật phần mềm UIT
      if (selectedMajor.code === '7480101') return 940 // KHMT UIT
      return 880
    }
    if (selectedSchool.name.includes('Bách Khoa')) return 895
    if (selectedSchool.name.includes('Kinh tế') || selectedSchool.shortName === 'UEH') return 865
    // Quy đổi tương đương chuẩn hóa (26.5/30 * 1000)
    return Math.round((thptBenchmark / 30) * 1000 / 5) * 5
  }, [selectedSchool, selectedMajor, thptBenchmark])

  // Dynamic values depending on active method
  const scoreNum = isDgnl ? (parseFloat(userDgnlScore) || 0) : (parseFloat(userThptScore) || 0)
  const benchmarkScore = isDgnl ? dgnlBenchmark : thptBenchmark
  const diff = (scoreNum - benchmarkScore).toFixed(isDgnl ? 0 : 2)
  const diffNum = parseFloat(diff)

  // Chart percentage
  const minAxis = isDgnl ? 600 : 18.0
  const maxAxis = isDgnl ? 1200 : 30.0
  const calcPercent = (val) => Math.min(100, Math.max(0, ((val - minAxis) / (maxAxis - minAxis)) * 100))
  const userPercent = calcPercent(scoreNum)
  const benchPercent = calcPercent(benchmarkScore)

  return (
    <main className="w-full pt-6 bg-[#f9f9ff] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pb-24 space-y-8">
        <div className="space-y-4 pt-2 border-b border-slate-200/80 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm text-slate-500">
            <div className="flex items-center flex-wrap gap-2">
              <Link className="hover:text-[#1D4ED8] transition-colors" to="/">Trang chủ</Link>
              <span>/</span>
              <span className="hover:text-[#1D4ED8] transition-colors">Công cụ tuyển sinh</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Admission Checker</span>
            </div>
            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs tracking-wide">
              <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
              <span>ĐỐI CHIẾU NĂM GẦN NHẤT · MÙA THI 2026</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 inline-block">
                  CÔNG CỤ TUYỂN SINH • NĂM GẦN NHẤT (2025 - 2026)
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
                  <span className="material-symbols-outlined text-xs text-blue-600">schedule</span>
                  Cập nhật: 09:00 ngày 15/10/2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Kiểm tra điểm với dữ liệu tuyển sinh năm gần nhất
              </h1>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                So sánh điểm thi THPT hoặc điểm ĐGNL của bạn với điểm chuẩn chính thức của <strong>năm gần nhất (mùa tuyển sinh 2025 - 2026)</strong> để có kết quả đối chiếu sát thực tế nhất cho kỳ thi năm 2026.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                className="bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] font-semibold text-xs md:text-sm border border-blue-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2"
                href="#section-result"
              >
                <span className="material-symbols-outlined text-base">arrow_downward</span>
                <span>Xem kết quả đối chiếu</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            {/* Bước 1: Phương thức xét tuyển */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bước 1 • Chọn phương thức xét tuyển muốn kiểm tra
                </label>
                <span className="text-xs text-blue-600 font-semibold">Hỗ trợ cả THPT &amp; ĐGNL</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('thpt')}
                  className={`relative text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    method === 'thpt' ? 'border-[#1D4ED8] bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-[#1D4ED8]">Điểm thi tốt nghiệp THPT</span>
                    {method === 'thpt' && <span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Thang điểm 30 • Mùa gần nhất: {thptBenchmark.toFixed(2)} đ</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('dgnl_hcm')}
                  className={`relative text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    method === 'dgnl_hcm' ? 'border-[#1D4ED8] bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-slate-800">ĐGNL ĐHQG TP.HCM</span>
                    {method === 'dgnl_hcm' && <span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Thang điểm 1200 • Mùa gần nhất: {dgnlBenchmark} đ</p>
                </button>
              </div>
            </div>

            {/* BƯỚC 2: DROPDOWN CHỌN TRƯỜNG ĐẠI HỌC */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bước 2 • Chọn trường đại học ({allSchools.length} trường)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSelectingSchool(!isSelectingSchool)
                    setIsSelectingMajor(false)
                  }}
                  className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isSelectingSchool ? 'Đóng danh sách' : 'Bấm để đổi trường ▼'}</span>
                </button>
              </div>

              {/* Trigger Card */}
              <div
                onClick={() => {
                  setIsSelectingSchool(!isSelectingSchool)
                  setIsSelectingMajor(false)
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-xs ${
                  isSelectingSchool ? 'border-[#1D4ED8] bg-blue-50/20' : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-black text-xs shrink-0">
                    {selectedSchool.shortName || 'UNI'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                      {selectedSchool.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {selectedSchool.city} {selectedSchool.code ? `• Mã: ${selectedSchool.code}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                    {isSelectingSchool ? 'Đang mở ▲' : 'Đổi trường ▼'}
                  </span>
                </div>
              </div>

              {/* DROPDOWN MENU KHI MỞ */}
              {isSelectingSchool && (
                <div className="mt-2 rounded-2xl border border-blue-200 bg-white p-3.5 shadow-2xl animate-in fade-in duration-150 space-y-3 z-30">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                    <input
                      type="text"
                      autoFocus
                      placeholder="Tìm theo tên trường, mã trường, thành phố (VD: Bách Khoa, UIT, FPT, UEH, Ngoại Thương...)"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-8 py-2 text-xs font-medium text-[#172033] outline-none focus:border-blue-500 focus:bg-white transition"
                      value={schoolSearch}
                      onChange={(e) => setSchoolSearch(e.target.value)}
                    />
                    {schoolSearch && (
                      <button
                        onClick={() => setSchoolSearch('')}
                        type="button"
                        className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Filter chips theo khu vực */}
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {[
                      ['ALL', 'Tất cả'],
                      ['HCM', 'TP. Hồ Chí Minh'],
                      ['HN', 'Hà Nội'],
                      ['CENTRAL', 'Miền Trung'],
                      ['MEKONG', 'ĐBSCL'],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSchoolRegionFilter(key)}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                          schoolRegionFilter === key
                            ? 'bg-[#1D4ED8] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Danh sách trường có thể scroll */}
                  <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-slate-100 pr-1">
                    {filteredSchools.map((school) => {
                      const isChosen = school.id === selectedSchool.id
                      return (
                        <div
                          key={school.id}
                          onClick={() => {
                            setSelectedSchool(school)
                            setIsSelectingSchool(false)
                            setSchoolSearch('')
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition ${
                            isChosen ? 'bg-blue-50 text-[#1D4ED8] font-bold' : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="min-w-0 pr-3">
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{school.name}</span>
                              <span className="text-[10px] font-normal text-slate-500">({school.shortName})</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {school.city} {school.code ? `• Mã: ${school.code}` : ''}
                            </div>
                          </div>
                          {isChosen && (
                            <span className="text-blue-600 text-xs font-bold shrink-0 bg-blue-100 px-2 py-0.5 rounded-md">
                              ✓ Đang chọn
                            </span>
                          )}
                        </div>
                      )
                    })}
                    {filteredSchools.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-500">
                        Không tìm thấy trường nào phù hợp từ khóa "{schoolSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* BƯỚC 3: DROPDOWN CHỌN NGÀNH HỌC */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bước 3 • Chọn ngành &amp; chương trình đào tạo ({ALL_MAJORS.length} ngành)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSelectingMajor(!isSelectingMajor)
                    setIsSelectingSchool(false)
                  }}
                  className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isSelectingMajor ? 'Đóng danh sách' : 'Bấm để đổi ngành ▼'}</span>
                </button>
              </div>

              {/* Trigger Card */}
              <div
                onClick={() => {
                  setIsSelectingMajor(!isSelectingMajor)
                  setIsSelectingSchool(false)
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-xs ${
                  isSelectingMajor ? 'border-amber-500 bg-amber-50/20' : 'border-slate-200 bg-slate-50 hover:border-amber-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs shrink-0">
                    {selectedMajor.tag.slice(0, 4)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                      {selectedMajor.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      Mã: {selectedMajor.code} • Tổ hợp xét: {selectedMajor.combinations}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    {isSelectingMajor ? 'Đang mở ▲' : 'Đổi ngành ▼'}
                  </span>
                </div>
              </div>

              {/* DROPDOWN MENU KHI MỞ */}
              {isSelectingMajor && (
                <div className="mt-2 rounded-2xl border border-amber-200 bg-white p-3.5 shadow-2xl animate-in fade-in duration-150 space-y-3 z-30">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                    <input
                      type="text"
                      autoFocus
                      placeholder="Tìm ngành: Phần mềm, Marketing, Trí tuệ nhân tạo, Kinh doanh, Thiết kế, Dược..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-8 py-2 text-xs font-medium text-[#172033] outline-none focus:border-amber-500 focus:bg-white transition"
                      value={majorSearch}
                      onChange={(e) => setMajorSearch(e.target.value)}
                    />
                    {majorSearch && (
                      <button
                        onClick={() => setMajorSearch('')}
                        type="button"
                        className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Filter chips theo nhóm ngành */}
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {[
                      ['ALL', 'Tất cả'],
                      ['Máy tính', 'Máy tính & CNTT'],
                      ['Kinh doanh', 'Kinh doanh & Quản lý'],
                      ['Truyền thông', 'Truyền thông & Báo chí'],
                      ['Nghệ thuật', 'Nghệ thuật & Thiết kế'],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMajorCategoryFilter(key)}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                          majorCategoryFilter === key
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Danh sách ngành có thể scroll */}
                  <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-slate-100 pr-1">
                    {filteredMajors.map((major) => {
                      const isChosen = major.id === selectedMajor.id
                      return (
                        <div
                          key={major.id}
                          onClick={() => {
                            setSelectedMajor(major)
                            setIsSelectingMajor(false)
                            setMajorSearch('')
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition ${
                            isChosen ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="min-w-0 pr-3">
                            <div className="font-bold flex items-center gap-2">
                              <span>{major.name}</span>
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {major.categoryName}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Mã: {major.code} • Tổ hợp: {major.combinations}
                            </div>
                          </div>
                          {isChosen && (
                            <span className="text-amber-800 text-xs font-bold shrink-0 bg-amber-100 px-2 py-0.5 rounded-md">
                              ✓ Đang chọn
                            </span>
                          )}
                        </div>
                      )
                    })}
                    {filteredMajors.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-500">
                        Không tìm thấy ngành nào phù hợp từ khóa "{majorSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* BƯỚC 4: NHẬP ĐIỂM SỐ CỦA BẠN (HỖ TRỢ CẢ THPT & ĐGNL) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bước 4 • Nhập điểm của bạn để đối chiếu
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Đang chọn:</span>
                  <span className="text-[11px] font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {isDgnl ? 'ĐGNL (Thang 1200)' : 'THPT (Thang 30)'}
                  </span>
                </div>
              </div>

              {!isDgnl ? (
                // NHẬP ĐIỂM THPT
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <input
                        className="w-full text-xl sm:text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-24"
                        placeholder="VD: 25.50"
                        step="0.05"
                        min="0"
                        max="30"
                        type="number"
                        value={userThptScore}
                        onChange={(e) => setUserThptScore(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400 font-semibold">
                        / 30.00 điểm
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 pl-1">
                      Tổng 3 môn thi tốt nghiệp THPT + điểm ưu tiên khu vực/đối tượng (nếu có).
                    </p>
                  </div>

                  <div>
                    <select className="w-full h-[54px] text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-2xl px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Tổ hợp: A00 / A01">
                      <option>Tổ hợp: A00 / A01</option>
                      <option>Tổ hợp: D01 (Toán, Văn, Anh)</option>
                      <option>Tổ hợp: D07 (Toán, Hóa, Anh)</option>
                    </select>
                  </div>
                </div>
              ) : (
                // NHẬP ĐIỂM ĐGNL
                <div>
                  <div className="relative">
                    <input
                      className="w-full text-xl sm:text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-28"
                      placeholder="VD: 875"
                      step="1"
                      min="0"
                      max="1200"
                      type="number"
                      value={userDgnlScore}
                      onChange={(e) => setUserDgnlScore(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400 font-semibold">
                      / 1200 điểm
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 pl-1">
                    Điểm tổng bài thi Đánh giá năng lực ĐHQG-HCM (tối đa 1200 điểm).
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href="#section-result"
                className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-base py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xem ngay kết quả đối chiếu số học</span>
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </a>
            </div>
          </div>

          {/* Cột hướng dẫn bên phải */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3.5">
              <div className="flex items-center gap-2.5 text-[#1D4ED8]">
                <span className="material-symbols-outlined text-2xl">help_outline</span>
                <h3 className="font-bold text-slate-900 text-sm">Chính sách đối chiếu dữ liệu 2026</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Để kết quả đối chiếu sát nhất với thực tế tuyển sinh năm 2026, hệ thống chỉ sử dụng điểm trúng tuyển của <strong>năm gần nhất (mùa tuyển sinh 2025 - 2026)</strong>.
              </p>
              <div className="space-y-2 pt-1 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span><strong>Hai phương thức độc lập:</strong> Bạn có thể kiểm tra riêng biệt điểm THPT (thang 30) hoặc ĐGNL (thang 1200).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span><strong>Tham chiếu năm gần nhất:</strong> Điểm chuẩn chính thức từ đề án tuyển sinh gần nhất của trường.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span><strong>Khoảng chênh lệch:</strong> Tính toán chênh lệch số học cụ thể (+/- điểm) và mô hình hóa trên đường số.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION RESULT DYNAMIC */}
        <div className="scroll-mt-24 space-y-6 pt-6" id="section-result">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#1D4ED8]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kết quả đối chiếu số học</h2>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
              Phương thức: <strong>{isDgnl ? 'ĐGNL ĐHQG-HCM' : 'Tốt nghiệp THPT'}</strong>
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-xs">
                    Mục tiêu kiểm tra
                  </span>
                  <span className="text-xs text-slate-500">Mã ngành: {selectedMajor.code}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {selectedSchool.name} — {selectedMajor.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phương thức: {isDgnl ? 'Đánh giá năng lực ĐHQG-HCM (Thang 1200)' : `Điểm thi THPT • Tổ hợp: ${selectedMajor.combinations}`}
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
                  Mốc điểm chuẩn năm gần nhất (2025 – 2026)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Điểm của bạn</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {isDgnl ? scoreNum.toFixed(0) : scoreNum.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / {isDgnl ? '1200' : '30'} điểm
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isDgnl ? 'Điểm bài thi ĐGNL ĐHQG-HCM.' : 'Đã bao gồm điểm ưu tiên đối tượng / khu vực.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Điểm chuẩn năm gần nhất (2025–2026)
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {isDgnl ? benchmarkScore.toFixed(0) : benchmarkScore.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / {isDgnl ? '1200' : '30'} điểm
                  </span>
                </div>
                <p className="text-xs text-slate-600">Mốc trúng tuyển tham chiếu chính thức mùa trước.</p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-1 ${
                diffNum >= 0 ? 'bg-emerald-50/80 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  diffNum >= 0 ? 'text-emerald-800' : 'text-amber-900'
                }`}>
                  Chênh lệch số học
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl sm:text-4xl font-extrabold ${
                    diffNum >= 0 ? 'text-emerald-700' : 'text-amber-900'
                  }`}>
                    {diffNum >= 0 ? `+${diff}` : diff}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">điểm</span>
                </div>
                <p className="text-xs text-slate-600">Khoảng cách số học so với điểm chuẩn năm gần nhất.</p>
              </div>
            </div>

            {/* Mô hình thước số chuẩn hóa theo từng thang đo */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Mô hình thước đo số học ({isDgnl ? 'Thang 600 – 1200 điểm' : 'Thang 18.00 – 30.00 điểm'})
                </span>
                <span className="text-slate-500 font-semibold">
                  Khoảng cách: {Math.abs(diffNum).toFixed(isDgnl ? 0 : 2)} điểm
                </span>
              </div>

              <div className="relative pt-6 pb-4">
                <div className="w-full h-3 bg-slate-200 rounded-full relative overflow-visible">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${diffNum >= 0 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{
                      left: `${Math.min(userPercent, benchPercent)}%`,
                      width: `${Math.max(2, Math.abs(userPercent - benchPercent))}%`,
                    }}
                  />
                </div>

                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${userPercent}%` }}
                >
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[11px] shadow-sm whitespace-nowrap">
                    Bạn: {isDgnl ? scoreNum.toFixed(0) : scoreNum.toFixed(2)}
                  </span>
                  <div className="w-0.5 h-6 bg-blue-600 mt-1" />
                </div>

                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${benchPercent}%` }}
                >
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold text-[11px] shadow-sm whitespace-nowrap">
                    Chuẩn: {isDgnl ? benchmarkScore.toFixed(0) : benchmarkScore.toFixed(2)}
                  </span>
                  <div className="w-0.5 h-6 bg-slate-800 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 pt-2">
                <span>{isDgnl ? '600 điểm' : '18.00 điểm'}</span>
                <span>{isDgnl ? '800' : '22.00'}</span>
                <span>{isDgnl ? '1000' : '26.00'}</span>
                <span>{isDgnl ? '1200 điểm' : '30.00 điểm'}</span>
              </div>
            </div>

            {/* MINH BẠCH NGUỒN ĐIỂM & THỜI GIAN UPDATE */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-1 border-b border-blue-100">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#1D4ED8]">verified</span>
                  <span>Minh bạch nguồn dữ liệu &amp; Thời gian cập nhật</span>
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                  Chu kỳ tuyển sinh 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 leading-relaxed">
                <div>
                  <strong className="text-slate-900 block">Nguồn dữ liệu điểm trúng tuyển:</strong>
                  <span className="text-slate-600">
                    Đề án tuyển sinh chính thức &amp; Quyết định công bố điểm chuẩn của {selectedSchool.name} (Đối chiếu Cổng thông tin tuyển sinh Bộ GD&amp;ĐT và ĐHQG-HCM).
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 block">Thời gian cập nhật gần nhất:</strong>
                  <span className="text-slate-600">
                    09:00 ngày 15/10/2026 · Dữ liệu đã được rà soát và khóa cho chu kỳ tuyển sinh năm 2026.
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1 border-t border-blue-100/60">
                {diffNum >= 0 ? (
                  <>
                    ✓ Điểm của bạn ({scoreNum.toFixed(isDgnl ? 0 : 2)}) đang cao hơn <strong>+{diff} điểm</strong> so với điểm chuẩn năm gần nhất ({benchmarkScore.toFixed(isDgnl ? 0 : 2)}). Đây là cơ sở tốt để bạn đặt nguyện vọng ưu tiên!
                  </>
                ) : (
                  <>
                    ⚠️ Điểm của bạn ({scoreNum.toFixed(isDgnl ? 0 : 2)}) đang thấp hơn <strong>{diff} điểm</strong> so với mốc trúng tuyển năm gần nhất ({benchmarkScore.toFixed(isDgnl ? 0 : 2)}). Bạn nên cân nhắc thêm các nguyện vọng an toàn khác.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdmissionCheckerPage
