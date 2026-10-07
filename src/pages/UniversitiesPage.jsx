import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import universitiesData from '../data/universities.json'

const PAGE_SIZE = 6
const FALLBACK_IMAGES = [
  '/stitch-assets/modern-university-campus.jpg',
  '/stitch-assets/uit-campus-boulevard.jpg',
  '/stitch-assets/hcmut-student-campus.jpg',
  '/stitch-assets/hcmus-research-lab.jpg',
]

const normalizeText = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .toLowerCase()

const toggleItem = (items, item) =>
  items.includes(item) ? items.filter((value) => value !== item) : [...items, item]

const TUITION_RANGE_VISUALS = {
  'under-30': { start: 2, end: 20 },
  'under-40': { start: 2, end: 32 },
  '30-50': { start: 20, end: 42 },
  '50-80': { start: 42, end: 67 },
  'over-100': { start: 84, end: 98 },
}

function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedOwnerships, setSelectedOwnerships] = useState([])
  const [technologyOnly, setTechnologyOnly] = useState(false)
  const [internationalOnly, setInternationalOnly] = useState(false)
  const [affordableOnly, setAffordableOnly] = useState(false)
  const [selectedTuitionBands, setSelectedTuitionBands] = useState([])
  const [selectedAdmissionMethods, setSelectedAdmissionMethods] = useState([])
  const [selectedScoreBands, setSelectedScoreBands] = useState([])
  const [sortBy, setSortBy] = useState('relevance')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [savedUniversityIds, setSavedUniversityIds] = useState([])
  const [comparisonIds, setComparisonIds] = useState([])
  const searchInputRef = useRef(null)

  const universities = universitiesData.universities

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const filteredUniversities = useMemo(() => {
    const searchTokens = normalizeText(searchTerm).trim().split(/\s+/).filter(Boolean)

    const results = universities.filter((university) => {
      const searchableText = normalizeText([
        university.name,
        university.shortName,
        university.code,
        university.city,
        university.location?.campus,
        university.parentSystem,
        ...university.featuredMajors,
      ].join(' '))
      const matchesSearch = searchTokens.every((token) => searchableText.includes(token))
      const matchesRegion = selectedRegions.length === 0
        || selectedRegions.includes(university.regionId)
      const matchesOwnership = selectedOwnerships.length === 0
        || selectedOwnerships.includes(university.ownership)
      const matchesTechnology = !technologyOnly || university.featuredMajors.some((major) => {
        const normalizedMajor = normalizeText(major)
        return ['cong nghe', 'phan mem', 'may tinh', 'du lieu', 'tri tue nhan tao', 'an toan thong tin']
          .some((keyword) => normalizedMajor.includes(keyword))
      })
      const matchesInternational = !internationalOnly
        || university.ownership === 'international'
        || university.parentSystem?.toLowerCase().includes('international')
      const matchesAffordable = !affordableOnly
        || university.tuition.minMillionVnd <= 40
      const matchesTuition = selectedTuitionBands.length === 0
        || selectedTuitionBands.some((bandId) => {
          const min = university.tuition.minMillionVnd
          const max = university.tuition.maxMillionVnd
          if (min === null || max === null) return false
          if (bandId === 'under-30') return min < 30
          if (bandId === '30-50') return max >= 30 && min <= 50
          if (bandId === '50-80') return max >= 50 && min <= 80
          return bandId === 'over-100' && max > 100
        })
      const matchesAdmissionMethod = selectedAdmissionMethods.length === 0
        || selectedAdmissionMethods.some((methodId) =>
          university.admission.methods.some((method) => method.id === methodId),
        )
      const matchesScore = selectedScoreBands.length === 0
        || selectedScoreBands.some((bandId) => {
          const scoreRange = university.admission.scoreRange
          if (scoreRange?.min === null || scoreRange?.max === null) return false
          if (bandId === '20-24') return scoreRange.max >= 20 && scoreRange.min <= 24
          if (bandId === '24-27.5') return scoreRange.max >= 24 && scoreRange.min <= 27.5
          return bandId === 'over-27.5' && scoreRange.max > 27.5
        })

      return matchesSearch && matchesRegion && matchesOwnership
        && matchesTechnology && matchesInternational && matchesAffordable
        && matchesTuition && matchesAdmissionMethod && matchesScore
    })

    return [...results].sort((first, second) => {
      if (sortBy === 'name') return first.name.localeCompare(second.name, 'vi')

      if (sortBy === 'tuition-low') {
        return (first.tuition.minMillionVnd ?? Number.POSITIVE_INFINITY)
          - (second.tuition.minMillionVnd ?? Number.POSITIVE_INFINITY)
      }

      if (sortBy === 'score-high') {
        return (second.admission.scoreRange?.max ?? Number.NEGATIVE_INFINITY)
          - (first.admission.scoreRange?.max ?? Number.NEGATIVE_INFINITY)
      }

      if (sortBy === 'score-low') {
        return (first.admission.scoreRange?.min ?? Number.POSITIVE_INFINITY)
          - (second.admission.scoreRange?.min ?? Number.POSITIVE_INFINITY)
      }

      return universities.indexOf(first) - universities.indexOf(second)
    })
  }, [affordableOnly, internationalOnly, searchTerm, selectedAdmissionMethods, selectedOwnerships, selectedRegions, selectedScoreBands, selectedTuitionBands, sortBy, technologyOnly, universities])

  const visibleUniversities = filteredUniversities.slice(0, visibleCount)
  const hasMore = visibleCount < filteredUniversities.length
  const activeFilterCount = selectedRegions.length
    + Number(selectedOwnerships.length > 0)
    + selectedTuitionBands.length
    + selectedAdmissionMethods.length
    + selectedScoreBands.length
    + Number(technologyOnly)
    + Number(internationalOnly)
    + Number(affordableOnly)
  const progress = filteredUniversities.length === 0
    ? 0
    : Math.min(100, (visibleUniversities.length / filteredUniversities.length) * 100)
  const activeTuitionFilterId = affordableOnly
    ? 'under-40'
    : selectedTuitionBands[0]
  const tuitionRangeVisual = activeTuitionFilterId
    ? TUITION_RANGE_VISUALS[activeTuitionFilterId]
    : { start: 0, end: 100 }
  const activeTuitionLabel = affordableOnly
    ? '≤ 40 triệu/năm'
    : universitiesData.filters.tuitionBands.find(
      (band) => band.id === selectedTuitionBands[0],
    )?.label ?? 'Tất cả mức phí'

  const resetVisibleCount = () => setVisibleCount(PAGE_SIZE)

  const handleReset = () => {
    setSearchTerm('')
    setSelectedRegions([])
    setSelectedOwnerships([])
    setTechnologyOnly(false)
    setInternationalOnly(false)
    setAffordableOnly(false)
    setSelectedTuitionBands([])
    setSelectedAdmissionMethods([])
    setSelectedScoreBands([])
    setSortBy('relevance')
    resetVisibleCount()
  }

  const toggleRegion = (regionId) => {
    setSelectedRegions((current) => toggleItem(current, regionId))
    resetVisibleCount()
  }

  const toggleOwnership = (ownershipId) => {
    setSelectedOwnerships((current) =>
      current.includes(ownershipId) ? [] : [ownershipId],
    )
    setInternationalOnly(false)
    resetVisibleCount()
  }

  const toggleTuitionBand = (bandId) => {
    setSelectedTuitionBands((current) =>
      current.includes(bandId) ? [] : [bandId],
    )
    setAffordableOnly(false)
    resetVisibleCount()
  }

  const toggleAdmissionMethod = (methodId) => {
    setSelectedAdmissionMethods((current) => toggleItem(current, methodId))
    resetVisibleCount()
  }

  const toggleScoreBand = (bandId) => {
    setSelectedScoreBands((current) =>
      current.includes(bandId) ? [] : [bandId],
    )
    resetVisibleCount()
  }

  const toggleSaved = (event, universityId) => {
    event.stopPropagation()
    setSavedUniversityIds((current) => toggleItem(current, universityId))
  }

  const toggleComparison = (event, universityId) => {
    event.stopPropagation()
    setComparisonIds((current) => toggleItem(current, universityId))
  }

  const getUniversityImage = (university) => {
    if (university.image) return university.image

    const imageIndex = [...university.id]
      .reduce((total, character) => total + character.charCodeAt(0), 0)
      % FALLBACK_IMAGES.length
    return FALLBACK_IMAGES[imageIndex]
  }

  const formatTuition = (university) => {
    const { minMillionVnd, maxMillionVnd } = university.tuition
    if (minMillionVnd === null && maxMillionVnd === null) return 'Đang cập nhật'
    if (minMillionVnd === maxMillionVnd) return `${minMillionVnd}M / năm`
    return `${minMillionVnd ?? 0}M - ${maxMillionVnd ?? '...'}M / năm`
  }

  const formatAdmissionScore = (university) => {
    const scoreRange = university.admission.scoreRange
    if (!scoreRange) return 'Đang cập nhật'
    if (scoreRange.min === null || scoreRange.max === null) {
      return scoreRange.label ?? 'Điều kiện riêng'
    }
    return `${scoreRange.min} - ${scoreRange.max} điểm`
  }

  return (
    <main className="min-h-[calc(100vh-20rem)] w-full bg-surface pt-20">
      <div className="flex w-full flex-col">
        <section className="w-full bg-gradient-to-b from-surface-container-high/40 via-surface to-surface pb-10 pt-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-3.5 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
                <span className="font-label-sm text-label-sm uppercase tracking-wide text-secondary">Khám phá &amp; Chọn lọc có cơ sở</span>
              </div>
              <h1 className="font-display text-display leading-tight tracking-tight text-on-surface">
                Khám phá trường đại học<span className="text-secondary-container">.</span>
              </h1>
              <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                Tìm kiếm, đối chiếu và khám phá các trường đại học tại Việt Nam phù hợp với khu vực, loại hình đào tạo và định hướng nghề nghiệp tương lai.
              </p>
            </div>

            <form className="mx-auto mt-2 w-full max-w-4xl" onSubmit={(event) => event.preventDefault()}>
              <div className="relative flex items-center rounded-full bg-surface-container-lowest p-2 shadow-[0_8px_30px_rgba(29,78,216,0.06)] transition-all duration-200 focus-within:shadow-[0_12px_40px_rgba(29,78,216,0.12)]">
                <div className="pointer-events-none flex items-center pl-4 pr-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input
                  ref={searchInputRef}
                  className="w-full bg-transparent py-2.5 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="Tìm tên trường, mã trường, tên viết tắt, tỉnh thành hoặc ngành thế mạnh..."
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    resetVisibleCount()
                  }}
                />
                <div className="flex shrink-0 items-center gap-2 pr-2">
                  <span className="hidden items-center gap-1 rounded-md bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant sm:inline-flex">
                    <span className="text-xs">⌘</span><span>K</span>
                  </span>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-primary-container px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-md transition-all hover:bg-primary" type="submit">
                    <span>Tìm kiếm</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-label-md text-label-md uppercase tracking-wider text-outline">Bộ lọc nhanh:</span>
                <button className={`rounded-full px-3.5 py-1.5 font-label-md text-label-md transition-colors ${activeFilterCount === 0 ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`} onClick={handleReset} type="button">Tất cả</button>
                <QuickFilter active={selectedRegions.includes('ho-chi-minh-city')} label="TP.HCM" onClick={() => toggleRegion('ho-chi-minh-city')} />
                <QuickFilter active={selectedRegions.includes('ha-noi')} label="Hà Nội" onClick={() => toggleRegion('ha-noi')} />
                <QuickFilter active={selectedOwnerships.includes('public')} label="Công lập" onClick={() => toggleOwnership('public')} />
                <QuickFilter active={selectedOwnerships.includes('private') || selectedOwnerships.includes('international')} label="Tư thục & Quốc tế" onClick={() => {
                  setSelectedOwnerships((current) => {
                    const active = current.includes('private') || current.includes('international')
                    return active ? [] : ['private', 'international']
                  })
                  setInternationalOnly(false)
                  resetVisibleCount()
                }} />
                <QuickFilter active={affordableOnly} label="≤ 40 triệu/năm" onClick={() => {
                  setAffordableOnly((current) => {
                    const nextValue = !current
                    if (nextValue) setSelectedTuitionBands([])
                    return nextValue
                  })
                  resetVisibleCount()
                }} />
                <QuickFilter active={technologyOnly} label="CNTT & Phần mềm" onClick={() => {
                  setTechnologyOnly((current) => !current)
                  resetVisibleCount()
                }} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-outline-variant">Đang áp dụng: <strong className="font-semibold text-on-surface">{activeFilterCount} tiêu chí</strong></span>
                <span className="text-outline-variant">•</span>
                <button className="flex cursor-pointer items-center gap-0.5 font-label-sm text-label-sm text-secondary hover:underline" onClick={handleReset} type="button">
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>Xóa lọc</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4 xl:col-span-3">
                <div className="flex flex-col gap-6 rounded-2xl bg-surface-container-lowest p-6 shadow-[0_4px_24px_rgba(23,32,51,0.03)]">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl text-primary">filter_alt</span>
                      <h2 className="font-headline-sm text-lg font-bold leading-tight text-on-surface">Bộ lọc tinh gọn</h2>
                    </div>
                    <button className="font-label-sm text-label-sm text-secondary transition-colors hover:text-on-secondary-container" onClick={handleReset} type="button">Đặt lại</button>
                  </div>

                  <FilterGroup title="Khu vực địa lý">
                    {universitiesData.filters.regions.map((region) => (
                      <label className="group flex cursor-pointer items-center justify-between" key={region.id}>
                        <span className="flex items-center gap-2.5">
                          <input className="h-4 w-4 cursor-pointer rounded accent-primary-container" type="checkbox" checked={selectedRegions.includes(region.id)} onChange={() => toggleRegion(region.id)} />
                          <span className="font-body-sm text-body-sm text-on-surface transition-colors group-hover:text-primary">{region.label}</span>
                        </span>
                        <span className="rounded-full bg-surface-container px-2 py-0.5 font-label-sm text-label-sm text-outline">{region.count}</span>
                      </label>
                    ))}
                  </FilterGroup>

                  <FilterGroup title="Mô hình đào tạo">
                    <div className="grid grid-cols-2 gap-2">
                      <OwnershipButton active={selectedOwnerships.includes('public')} icon="account_balance" label="Công lập" onClick={() => toggleOwnership('public')} />
                      <OwnershipButton active={selectedOwnerships.includes('private')} icon="business" label="Tư thục" onClick={() => toggleOwnership('private')} />
                    </div>
                    <label className="flex cursor-pointer items-center gap-2.5 pt-1">
                      <input className="h-4 w-4 rounded accent-primary-container" type="checkbox" checked={internationalOnly} onChange={() => {
                        setInternationalOnly((current) => {
                          const nextValue = !current
                          if (nextValue) setSelectedOwnerships([])
                          return nextValue
                        })
                        resetVisibleCount()
                      }} />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Trường đại học quốc tế</span>
                    </label>
                  </FilterGroup>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">Học phí / năm</span>
                      <span className="text-right font-label-sm text-label-sm font-bold text-primary">
                        {activeTuitionLabel}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="relative h-2 w-full rounded-full bg-surface-container">
                        <div
                          className="absolute inset-y-0 rounded-full bg-primary transition-all duration-300"
                          style={{
                            left: `${tuitionRangeVisual.start}%`,
                            width: `${tuitionRangeVisual.end - tuitionRangeVisual.start}%`,
                          }}
                        />
                        {activeTuitionFilterId && (
                          <>
                            <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-sm transition-all duration-300" style={{ left: `${tuitionRangeVisual.start}%` }} />
                            <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-sm transition-all duration-300" style={{ left: `${tuitionRangeVisual.end}%` }} />
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
                        <span>15 triệu</span><span>50 triệu</span><span>&gt; 120 triệu</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {universitiesData.filters.tuitionBands.map((band) => (
                        <button className={`rounded-lg px-2.5 py-1 font-label-sm text-label-sm transition-colors ${selectedTuitionBands.includes(band.id) ? 'bg-primary font-semibold text-on-primary shadow-xs' : 'bg-surface-container-high text-on-surface hover:bg-primary-fixed hover:text-on-primary-fixed'}`} key={band.id} onClick={() => toggleTuitionBand(band.id)} type="button">{band.label}</button>
                      ))}
                    </div>
                  </div>

                  <FilterGroup title="Phương thức xét tuyển">
                    {universitiesData.filters.admissionMethods
                      .filter((method) => ['competency', 'thpt', 'language', 'transcript-interview'].includes(method.id))
                      .map((method) => (
                        <label className="flex cursor-pointer items-start gap-2.5" key={method.id}>
                          <input className="mt-0.5 h-4 w-4 rounded accent-primary-container" type="checkbox" checked={selectedAdmissionMethods.includes(method.id)} onChange={() => toggleAdmissionMethod(method.id)} />
                          <span className="font-body-sm text-body-sm leading-snug text-on-surface">{method.label}</span>
                        </label>
                      ))}
                  </FilterGroup>

                  <FilterGroup title="Điểm sàn tham chiếu (2025)">
                    <div className="grid grid-cols-3 gap-2">
                      {universitiesData.filters.scoreBands.map((band) => (
                        <button className={`rounded-lg px-2 py-1.5 font-label-sm text-label-sm transition-colors ${selectedScoreBands.includes(band.id) ? 'bg-primary-container font-semibold text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`} key={band.id} onClick={() => toggleScoreBand(band.id)} type="button">{band.label}</button>
                      ))}
                    </div>
                  </FilterGroup>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-tertiary-fixed/40 via-surface-container-low to-surface-container-lowest p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tertiary-container/10 text-tertiary">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-sm text-base font-bold text-on-surface">Chưa rõ nên lọc thế nào?</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Làm bài test định vị thế mạnh và ngân sách gia đình chỉ trong 4 phút.</p>
                  </div>
                  <Link className="inline-flex items-center gap-1.5 font-label-md text-label-md font-bold text-primary transition-all hover:gap-2.5" to="/assessment">
                    <span>Bắt đầu khảo sát nhanh</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </aside>

              <section className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                <div className="flex flex-col justify-between gap-4 pb-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Danh sách trường đại học</h2>
                    <span className="rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm font-bold text-on-primary-fixed">{filteredUniversities.length} trường phù hợp</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 rounded-xl bg-surface-container-lowest px-3.5 py-2 shadow-xs">
                    <label className="font-label-sm text-label-sm text-outline" htmlFor="university-sort">Sắp xếp:</label>
                    <select id="university-sort" className="cursor-pointer bg-transparent font-label-md text-label-md font-semibold text-on-surface focus:outline-none" value={sortBy} onChange={(event) => {
                      setSortBy(event.target.value)
                      resetVisibleCount()
                    }}>
                      <option value="relevance">Thứ tự đề xuất</option>
                      <option value="name">Tên trường: A → Z</option>
                      <option value="score-high">Điểm chuẩn: Cao đến Thấp</option>
                      <option value="score-low">Điểm chuẩn: Thấp đến Cao</option>
                      <option value="tuition-low">Học phí: Tiết kiệm nhất</option>
                    </select>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedRegions.map((regionId) => {
                      const region = universitiesData.filters.regions.find((item) => item.id === regionId)
                      return <ActiveFilter key={regionId} label={`Khu vực: ${region?.label}`} onRemove={() => toggleRegion(regionId)} />
                    })}
                    {selectedOwnerships.length > 0 && (
                      <ActiveFilter
                        label={selectedOwnerships.includes('international')
                          ? 'Hệ: Tư thục & Quốc tế'
                          : `Hệ: ${universitiesData.filters.ownerships.find((item) => item.id === selectedOwnerships[0])?.label}`}
                        onRemove={() => {
                          setSelectedOwnerships([])
                          resetVisibleCount()
                        }}
                      />
                    )}
                    {technologyOnly && <ActiveFilter label="Chuyên ngành: Công nghệ thông tin" onRemove={() => { setTechnologyOnly(false); resetVisibleCount() }} />}
                    {internationalOnly && <ActiveFilter label="Mô hình: Quốc tế" onRemove={() => { setInternationalOnly(false); resetVisibleCount() }} />}
                    {affordableOnly && <ActiveFilter label="Học phí tối thiểu: ≤ 40M/năm" onRemove={() => { setAffordableOnly(false); resetVisibleCount() }} />}
                    {selectedTuitionBands.map((bandId) => {
                      const band = universitiesData.filters.tuitionBands.find((item) => item.id === bandId)
                      return <ActiveFilter key={bandId} label={`Học phí: ${band?.label}`} onRemove={() => toggleTuitionBand(bandId)} />
                    })}
                    {selectedAdmissionMethods.map((methodId) => {
                      const method = universitiesData.filters.admissionMethods.find((item) => item.id === methodId)
                      return <ActiveFilter key={methodId} label={`Xét tuyển: ${method?.label}`} onRemove={() => toggleAdmissionMethod(methodId)} />
                    })}
                    {selectedScoreBands.map((bandId) => {
                      const band = universitiesData.filters.scoreBands.find((item) => item.id === bandId)
                      return <ActiveFilter key={bandId} label={`Điểm: ${band?.label}`} onRemove={() => toggleScoreBand(bandId)} />
                    })}
                    <button className="ml-1 font-label-sm text-label-sm text-outline transition-colors hover:text-secondary" onClick={handleReset} type="button">Xóa tất cả bộ lọc</button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {visibleUniversities.map((university) => (
                    <UniversityCard
                      key={university.id}
                      university={university}
                      image={getUniversityImage(university)}
                      isIllustrativeImage={!university.image}
                      isSaved={savedUniversityIds.includes(university.id)}
                      isCompared={comparisonIds.includes(university.id)}
                      tuitionLabel={formatTuition(university)}
                      admissionScoreLabel={formatAdmissionScore(university)}
                      onToggleSaved={(event) => toggleSaved(event, university.id)}
                      onToggleComparison={(event) => toggleComparison(event, university.id)}
                    />
                  ))}
                </div>

                {filteredUniversities.length === 0 && (
                  <div className="rounded-2xl bg-surface-container-lowest p-10 text-center shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                    <h3 className="mt-2 font-headline-sm text-lg font-bold text-on-surface">Không tìm thấy trường phù hợp</h3>
                    <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Thử thay đổi từ khóa hoặc đặt lại bộ lọc.</p>
                    <button className="mt-4 font-label-md text-label-md font-semibold text-primary hover:underline" onClick={handleReset} type="button">Đặt lại tìm kiếm</button>
                  </div>
                )}

                <div className="relative my-3 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container via-primary to-inverse-surface p-8 text-on-primary shadow-lg md:flex-row">
                  <div className="z-10 flex max-w-xl flex-col gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Định hướng thông minh</span>
                    <h3 className="font-headline-sm text-headline-sm font-bold leading-snug text-white">Chưa biết chọn trường nào trước? Hãy bắt đầu từ ngành học bạn thực sự muốn theo đuổi.</h3>
                    <p className="font-body-sm text-body-sm text-on-primary-container">So sánh bản đồ chuẩn đầu ra và định hướng đào tạo giữa các trường cùng đào tạo ngành bạn yêu thích.</p>
                  </div>
                  <Link className="z-10 inline-flex shrink-0 items-center gap-2 rounded-full bg-surface-container-lowest px-6 py-3.5 font-label-lg text-label-lg font-bold text-primary shadow-md transition-all hover:bg-surface-container-high" to="/majors">
                    <span>Khám phá theo ngành học</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Hiển thị <strong className="text-on-surface">{visibleUniversities.length}</strong> trên tổng số <strong className="text-on-surface">{filteredUniversities.length} trường</strong></span>
                    <div className="ml-2 h-1.5 w-24 overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  {hasMore && (
                    <button className="flex items-center gap-1.5 rounded-xl bg-surface-container-lowest px-5 py-2.5 font-label-md text-label-md font-semibold text-on-surface shadow-xs transition-all hover:bg-surface-container" onClick={() => setVisibleCount((current) => Math.min(current + PAGE_SIZE, filteredUniversities.length))} type="button">
                      <span>Xem thêm {Math.min(PAGE_SIZE, filteredUniversities.length - visibleUniversities.length)} trường kế tiếp</span>
                      <span className="material-symbols-outlined text-base">expand_more</span>
                    </button>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function QuickFilter({ active, label, onClick }) {
  return (
    <button className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 font-label-md text-label-md transition-colors ${active ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`} onClick={onClick} type="button">
      <span>{label}</span>
      {active && <span className="material-symbols-outlined text-xs">check</span>}
    </button>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <span className="font-label-lg text-label-lg font-bold text-on-surface">{title}</span>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function OwnershipButton({ active, icon, label, onClick }) {
  return (
    <button className={`flex items-center justify-center gap-1 rounded-xl px-3 py-2 font-label-sm text-label-sm font-semibold transition-colors ${active ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} onClick={onClick} type="button">
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function ActiveFilter({ label, onRemove }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface" onClick={onRemove} type="button">
      <span>{label}</span>
      <span className="material-symbols-outlined text-sm hover:text-secondary">close</span>
    </button>
  )
}

function UniversityCard({
  university,
  image,
  isIllustrativeImage,
  isSaved,
  isCompared,
  tuitionLabel,
  admissionScoreLabel,
  onToggleSaved,
  onToggleComparison,
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(23,32,51,0.05)] transition-all duration-300 hover:shadow-[0_16px_36px_-4px_rgba(29,78,216,0.12)]">
      <div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={isIllustrativeImage ? `Ảnh minh họa khuôn viên cho ${university.name}` : university.name}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGES[0]
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-surface-container-lowest/95 px-2.5 py-1 font-label-sm text-label-sm font-bold text-primary shadow-xs backdrop-blur-md">{university.ownershipLabel}</span>
          {university.parentSystem && <span className="rounded-full bg-surface-container-lowest/95 px-2.5 py-1 font-label-sm text-label-sm font-medium text-on-surface-variant backdrop-blur-md">{university.parentSystem}</span>}
          {isIllustrativeImage && <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">Ảnh minh họa</span>}
        </div>
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 text-outline shadow-sm backdrop-blur-md transition-colors hover:bg-surface-container-lowest hover:text-secondary" onClick={onToggleSaved} title={isSaved ? 'Bỏ lưu trường' : 'Lưu trường'} type="button">
          <span className="material-symbols-outlined text-lg" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
        </button>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-surface-container-lowest">
          <div className="min-w-0">
            <span className="block font-label-sm text-label-sm uppercase tracking-wider text-inverse-primary">Mã trường: {university.code ?? 'Không áp dụng'}</span>
            <h3 className="line-clamp-2 font-headline-sm text-headline-sm font-bold leading-tight text-white">{university.name}</h3>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest p-1 text-primary shadow-md">
            <span className="material-symbols-outlined text-xl">{university.icon}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined mt-0.5 text-base text-outline">location_on</span>
            <span>{university.location.campus ? `${university.location.campus}, ${university.location.city}` : university.location.city}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-container-low p-3">
            <div className="flex min-w-0 flex-col">
              <span className="font-label-sm text-label-sm text-outline">Học phí tham khảo</span>
              <span className="break-words font-label-lg text-label-lg font-bold text-primary">{tuitionLabel}</span>
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-label-sm text-label-sm text-outline">Điểm tham chiếu 2025</span>
              <span className="break-words font-label-lg text-label-lg font-bold text-secondary">{admissionScoreLabel}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Ngành đào tạo thế mạnh:</span>
            <div className="flex flex-wrap gap-1.5">
              {university.featuredMajors.map((major) => <span className="rounded-md bg-surface-container px-2 py-0.5 font-label-sm text-label-sm text-on-surface" key={major}>{major}</span>)}
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined mt-0.5 text-base text-outline">verified</span>
            <span className="line-clamp-2">{university.admission.methods.length > 0 ? university.admission.methods.map((method) => method.label).join(' • ') : 'Xem đề án tuyển sinh chính thức trên website trường'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-surface-container pt-3">
          <button
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${isCompared ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed'}`}
            onClick={onToggleComparison}
            title={isCompared ? 'Bỏ khỏi danh sách so sánh' : 'Thêm vào danh sách so sánh'}
            aria-label={isCompared ? 'Bỏ khỏi danh sách so sánh' : 'Thêm vào danh sách so sánh'}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
          </button>
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
            <Link className="inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-primary px-2.5 py-2 font-label-sm text-label-sm font-semibold text-on-primary shadow-xs transition-all hover:bg-primary-container" to={`/universities/uit?universityId=${university.id}`}>
              <span>Xem chi tiết</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <a className="inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-surface-container-low px-2.5 py-2 font-label-sm text-label-sm font-semibold text-primary transition-all hover:bg-primary-fixed hover:text-on-primary-fixed" href={university.website} target="_blank" rel="noreferrer">
              <span>Website trường</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UniversitiesPage
