import {
  CAREER_REPORT_GROUPS,
  getProfileCompleteness,
  getUniversityComparisonCandidates,
  RIASEC_DIMENSIONS,
} from '../data/careerReport'
import { scoreRiasec } from './assessmentScoring'

function shortVietnameseName(fullName) {
  const parts = String(fullName ?? '').trim().split(/\s+/).filter(Boolean)
  return parts.slice(-2).join(' ') || 'bạn'
}

function replaceTextNodes(document, replacements) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  for (const node of nodes) {
    let value = node.nodeValue
    for (const [pattern, replacement] of replacements) value = value.replace(pattern, replacement)
    node.nodeValue = value
  }
}

function findSection(document, text) {
  const heading = [...document.querySelectorAll('h1, h2, h3')]
    .find((element) => element.textContent?.includes(text))
  return heading?.closest('section') ?? null
}

function setText(element, value) {
  if (element && value) element.textContent = value
}

export function normalizeReportNavigation(document, activePath = 'overview') {
  const items = [
    ['overview', '1. Tổng quan báo cáo'],
    ['personality-profile', '2. Chân dung cá nhân'],
    ['academic-performance', '3. Phân tích học tập'],
    ['top-3-categories', '4. Top 3 nhóm ngành'],
    ['advice', '5. Lời khuyên định hướng'],
    ['roadmap', '6. Roadmap kiểm chứng'],
  ]
  const links = [...document.querySelectorAll('aside nav a')]
  links.forEach((link, index) => {
    const item = items[index]
    if (!item) return
    link.setAttribute('data-path', item[0])
    setText(link.querySelector('span:last-child'), item[1])
    link.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm', 'font-semibold')
    if (item[0] === activePath) link.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm', 'font-semibold')
  })
}

export function buildReportSnapshot(user, assessment) {
  const profile = assessment.profile ?? {}
  const answerCount = Object.keys(assessment.riasecAnswers ?? {}).length
  const riasec = assessment.report?.overview?.riasec
    ?? (answerCount === 30 ? scoreRiasec(assessment.riasecAnswers) : null)
  const fullName = user?.fullName ?? 'Học sinh UniView'
  const reportDate = new Date(assessment.report?.generatedAt ?? Date.now()).toLocaleDateString('vi-VN')
  const completeness = getProfileCompleteness(profile, answerCount)

  return {
    admissionYear: String(profile.admissionYear ?? user?.targetAdmissionYear ?? '2027'),
    completeness: completeness.percent,
    confidence: assessment.report?.overview?.confidence?.score ?? completeness.percent,
    dgnlScore: String(profile.dgnlScore || 'chưa cập nhật'),
    avatarUrl: user?.avatarUrl ?? '/stitch-assets/uniview-logo.png',
    fullName,
    gpa: String(profile.gpa || 'chưa cập nhật'),
    grade: user?.grade ?? 'Chưa cập nhật lớp',
    profile,
    reportCode: `UV-${String(user?.id ?? 'GUEST').replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase() || 'REPORT'}`,
    reportDate,
    riasec,
    school: user?.school ?? 'Chưa cập nhật trường',
    shortName: user ? shortVietnameseName(fullName) : 'Bạn',
    thptScore: String(profile.thptScore || 'chưa cập nhật'),
    top3: riasec?.top3 ?? 'Chưa đủ dữ liệu',
  }
}

export function personalizeCommonReportDocument(document, snapshot) {
  replaceTextNodes(document, [
    [/Nguyễn Minh Anh/g, snapshot.fullName],
    [/Minh Anh/g, snapshot.shortName],
    [/THPT Chuyên Lê Hồng Phong \(TP\.HCM\)/g, `${snapshot.school} (${snapshot.profile.regions?.[0] ?? 'chưa cập nhật khu vực'})`],
    [/THPT Chuyên Lê Hồng Phong/g, snapshot.school],
    [/Lớp 12A1/g, snapshot.grade],
    [/UV-2026-12A1-094/g, snapshot.reportCode],
    [/UV-REP-2026-9481/g, snapshot.reportCode],
    [/15\/10\/2026/g, snapshot.reportDate],
    [/18\/03\/2026/g, snapshot.reportDate],
    [/E-I-A/g, snapshot.top3],
    [/E–I–A/g, snapshot.top3],
  ])

  for (const element of document.querySelectorAll('*')) {
    const text = element.textContent?.trim()
    if (text === '94%') element.textContent = `${snapshot.completeness}%`
    if (text === '98%') element.textContent = `${snapshot.confidence}%`
  }

  for (const bar of document.querySelectorAll('[style*="width: 94%"], [class~="w-[94%]"]')) {
    bar.style.width = `${snapshot.completeness}%`
  }

  for (const image of document.querySelectorAll('img[alt="Profile"]')) {
    image.src = snapshot.avatarUrl
    image.style.objectFit = 'contain'
    image.style.background = '#ffffff'
  }
}

export function personalizeAssessmentReport(document, snapshot, groups) {
  personalizeCommonReportDocument(document, snapshot)

  const heroHeading = document.querySelector('main h1')
  if (heroHeading) heroHeading.innerHTML = `${snapshot.shortName}, đây là <span class="text-primary underline decoration-primary-container/30 underline-offset-8">bản đồ định hướng tương lai</span> của bạn`

  const topGroupsSection = findSection(document, 'Top 3 Nhóm Ngành')
  if (topGroupsSection) {
    const groupHeadings = [...topGroupsSection.querySelectorAll('h3')].slice(0, 3)
    groupHeadings.forEach((heading, index) => {
      const group = groups[index]
      if (!group) return
      setText(heading, group.name)
      const card = heading.closest('.relative')
      const score = card?.querySelector('.font-display')
      setText(score, String(group.matchScore))
      const reasonLabel = [...(card?.querySelectorAll('span') ?? [])].find((item) => item.textContent?.includes('Vì sao phù hợp'))
      setText(reasonLabel?.parentElement?.querySelector('p'), group.personalizedReason)
      const evidenceLabel = [...(card?.querySelectorAll('span') ?? [])].find((item) => item.textContent?.includes('Bằng chứng hỗ trợ'))
      setText(evidenceLabel?.parentElement?.querySelector('p'), `Tín hiệu hiện tại: ${group.evidenceParts.join('; ')}.`)
    })
  }

  const tabIds = ['business', 'media', 'art']
  tabIds.forEach((tabId, index) => {
    const group = groups[index]
    if (!group) return
    const button = document.getElementById(`tab-btn-${tabId}`)
    setText(button?.querySelector('span:last-child'), group.name)
  })

  for (const codeElement of document.querySelectorAll('span')) {
    const match = codeElement.textContent?.match(/Mã ngành:\s*(\d+)/)
    if (!match) continue
    const card = codeElement.closest('.rounded-2xl')
    if (!card) continue
    card.dataset.reportMajorCode = match[1]
    card.style.cursor = 'pointer'
  }
}

function createFilterSelect(document, label, options) {
  const wrapper = document.createElement('label')
  wrapper.className = 'flex min-w-[240px] flex-1 flex-col gap-2 font-label-md text-label-md font-bold text-on-surface'
  wrapper.textContent = label
  const select = document.createElement('select')
  select.className = 'w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-sm text-body-sm text-on-surface outline-none focus:border-primary'
  for (const option of options) {
    const element = document.createElement('option')
    element.value = option.value
    element.textContent = option.label
    select.append(element)
  }
  wrapper.append(select)
  return { select, wrapper }
}

export function configureAcademicAnalysis(document, snapshot, defaultGroupId) {
  const switcher = document.getElementById('academic-state-switch')
  const missingPanel = document.getElementById('panel-state-a')
  const scorePanel = document.getElementById('panel-state-b')
  const hasExamScore = Boolean(snapshot.profile.thptScore || snapshot.profile.dgnlScore)
  switcher?.remove()

  if (!hasExamScore) {
    missingPanel?.classList.remove('hidden')
    scorePanel?.classList.add('hidden')
    const title = missingPanel?.querySelector('.font-headline-sm')
    setText(title, 'Bạn chưa cung cấp điểm thi')
    const description = missingPanel?.querySelector('p')
    setText(description, 'Bạn vẫn có thể xem gợi ý nhóm ngành từ RIASEC và hồ sơ cá nhân. Bổ sung điểm THPT hoặc ĐGNL sau để UniView đối chiếu các trường phù hợp.')
    const button = missingPanel?.querySelector('button')
    setText(button, 'Bổ sung điểm thi')
    button?.setAttribute('data-report-action', 'update-scores')
    button?.removeAttribute('onclick')
    return
  }

  missingPanel?.classList.add('hidden')
  scorePanel?.classList.remove('hidden')

  const scoreCards = scorePanel?.querySelectorAll(':scope > .grid > div') ?? []
  const scoreValues = [
    ['Điểm ĐGNL', snapshot.profile.dgnlScore || '—', snapshot.profile.dgnlScore ? '/ 1200 điểm' : 'Chưa cung cấp'],
    ['Điểm thi THPT', snapshot.profile.thptScore || '—', snapshot.profile.thptScore ? '/ 30 điểm' : 'Chưa cung cấp'],
    ['GPA', snapshot.profile.gpa || '—', snapshot.profile.gpa ? '/ 10 điểm' : 'Chưa cung cấp'],
  ]
  scoreCards.forEach((card, index) => {
    const [label, value, suffix] = scoreValues[index]
    setText(card.querySelector('.uppercase'), label)
    setText(card.querySelector('.font-display'), value)
    setText(card.querySelector('.font-body-lg'), suffix)
  })

  const chartHeading = [...scorePanel.querySelectorAll('h3')]
    .find((element) => element.textContent?.includes('Biểu Đồ Đối Chiếu'))
  const chartCard = chartHeading?.closest('.rounded-3xl')
  if (!chartCard) return

  const filterBar = document.createElement('div')
  filterBar.className = 'flex flex-col gap-4 rounded-2xl bg-surface-container-low p-5 md:flex-row'
  const defaultGroup = CAREER_REPORT_GROUPS.find(({ id }) => id === defaultGroupId) ?? CAREER_REPORT_GROUPS[0]
  const groupControl = createFilterSelect(document, 'Nhóm ngành', CAREER_REPORT_GROUPS.map((group) => ({ value: group.id, label: group.name })))
  const majorControl = createFilterSelect(document, 'Ngành muốn đối chiếu', defaultGroup.majors.map((major) => ({ value: major.id, label: major.name })))
  groupControl.select.value = defaultGroup.id
  filterBar.append(groupControl.wrapper, majorControl.wrapper)
  chartCard.insertBefore(filterBar, chartCard.firstElementChild)

  const comparisonRows = [...chartCard.querySelectorAll('.relative.w-full.h-7')]
    .map((bar) => bar.closest('.flex.flex-col.gap-2'))
    .filter((row, index, rows) => row && rows.indexOf(row) === index)

  const renderComparison = () => {
    const group = CAREER_REPORT_GROUPS.find(({ id }) => id === groupControl.select.value) ?? CAREER_REPORT_GROUPS[0]
    const major = group.majors.find(({ id }) => id === majorControl.select.value) ?? group.majors[0]
    const schools = getUniversityComparisonCandidates(major.id, snapshot.profile)
    const thptScore = Number(snapshot.profile.thptScore)
    const dgnlScore = Number(snapshot.profile.dgnlScore)
    const comparisonScore = thptScore > 0 ? thptScore : dgnlScore
    const comparisonScale = thptScore > 0 ? 30 : 1200

    setText(chartHeading, `Đối chiếu 3 trường phù hợp cho ngành ${major.name}`)
    const subtitle = chartHeading.nextElementSibling
    setText(subtitle, thptScore > 0
      ? `So sánh điểm THPT ${snapshot.thptScore}/30 với mốc tham chiếu gần nhất trong dữ liệu trường.`
      : `Bạn đã có điểm ĐGNL ${snapshot.dgnlScore}/1200. Mốc dưới đây dùng để tham khảo; cần kiểm tra đúng phương thức ĐGNL của từng trường.`)

    comparisonRows.forEach((row, index) => {
      const school = schools[index]
      if (!school) {
        row.classList.add('hidden')
        return
      }
      row.classList.remove('hidden')
      const labels = row.querySelectorAll(':scope > div:first-child > span')
      const reference = school.admission?.scoreRange
      const referenceScore = Number(reference?.max)
      setText(labels[0], `${school.name} — ${major.name}`)
      const difference = thptScore > 0 && referenceScore > 0 ? thptScore - referenceScore : null
      setText(labels[1], difference === null
        ? `Điểm ĐGNL: ${snapshot.dgnlScore} · Mốc THPT: ${reference?.label ?? 'cần đối chiếu'}`
        : `Điểm của bạn: ${snapshot.thptScore} · Mốc tham chiếu: ${referenceScore}${difference >= 0 ? ` (+${difference.toFixed(1)})` : ` (${difference.toFixed(1)})`}`)
      const bars = row.querySelectorAll('.relative > div')
      if (bars[0]) bars[0].style.width = referenceScore > 0 ? `${Math.min(100, referenceScore / 30 * 100)}%` : '0%'
      if (bars[1]) {
        bars[1].style.width = `${Math.min(100, comparisonScore / comparisonScale * 100)}%`
        bars[1].textContent = String(comparisonScore)
      }
    })
  }

  groupControl.select.addEventListener('change', () => {
    const group = CAREER_REPORT_GROUPS.find(({ id }) => id === groupControl.select.value) ?? CAREER_REPORT_GROUPS[0]
    majorControl.select.replaceChildren(...group.majors.map((major) => {
      const option = document.createElement('option')
      option.value = major.id
      option.textContent = major.name
      return option
    }))
    renderComparison()
  })
  majorControl.select.addEventListener('change', renderComparison)
  renderComparison()
}

export function restructureAssessmentReportFlow(document, snapshot) {
  const exploreSection = document.getElementById('explore-18-section')
  const detailSection = exploreSection?.nextElementSibling?.tagName === 'SECTION'
    ? exploreSection.nextElementSibling
    : null
  detailSection?.remove()
  exploreSection?.remove()

  const roadmapHeading = [...document.querySelectorAll('h2')]
    .find((element) => element.textContent?.includes('tự mình kiểm chứng'))
  const roadmapSection = roadmapHeading?.closest('section')
  if (!roadmapSection) return

  const advice = document.createElement('section')
  advice.className = 'flex flex-col gap-7 rounded-3xl bg-surface-container-lowest p-8 shadow-sm lg:p-12'
  advice.innerHTML = `
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2 font-label-lg text-label-lg font-bold text-primary">
        <span class="material-symbols-outlined text-xl">lightbulb</span>
        <span>PHÂN HỆ 05 · LỜI KHUYÊN ĐỊNH HƯỚNG</span>
      </div>
      <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface">Giữ nhiều lựa chọn, nhưng kiểm chứng từng hướng một</h2>
      <p class="max-w-4xl font-body-md text-body-md leading-relaxed text-on-surface-variant">Điểm số cho biết hướng nào đáng ưu tiên khám phá, không khẳng định một ngành chắc chắn phù hợp. ${snapshot.shortName} nên chọn 2–3 ngành nổi bật, đọc kỹ công việc hằng ngày và thử nhiệm vụ thực tế trước khi quyết định.</p>
    </div>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div class="rounded-2xl bg-surface-container-low p-5"><strong class="text-on-surface">Đọc chi tiết ngành</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Hiểu mình sẽ học gì, làm gì và những mặt khó của nghề.</p></div>
      <div class="rounded-2xl bg-surface-container-low p-5"><strong class="text-on-surface">Đối chiếu điều kiện</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">So sánh điểm, học phí, khu vực và môi trường đào tạo.</p></div>
      <div class="rounded-2xl bg-surface-container-low p-5"><strong class="text-on-surface">Tạo bằng chứng mới</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Dùng Roadmap để thử việc thật của ngành và ghi lại cảm nhận.</p></div>
    </div>`
  roadmapSection.parentElement?.insertBefore(advice, roadmapSection)

  normalizeReportNavigation(document, 'overview')
}

export function personalizeMajorReport(document, snapshot, major, careerMajor, matchScore) {
  personalizeCommonReportDocument(document, snapshot)
  if (!major) return

  replaceTextNodes(document, [
    [/Marketing & Truyền Thông Số/g, major.name],
    [/Marketing & Truyền thông Số/g, major.name],
    [/7340114/g, major.code ?? major.id],
    [/Kinh doanh & Quản trị/g, major.category?.name ?? careerMajor?.groupName ?? 'Nhóm ngành phù hợp'],
    [/Kinh Doanh & Quản Trị/g, major.category?.name ?? careerMajor?.groupName ?? 'Nhóm ngành phù hợp'],
  ])

  const hero = document.querySelector('main h1')?.closest('section')
  setText(hero?.querySelector('h1'), major.name)
  setText(hero?.querySelector('h1 + p'), careerMajor?.personalizedReason ?? major.summary ?? major.description)
  const compatibility = hero?.querySelector('.font-headline-md')
  setText(compatibility, `${matchScore}%`)

  const badges = [...(hero?.querySelectorAll('span') ?? [])]
  const codeBadge = badges.find((element) => element.textContent?.includes('Mã ngành:'))
  setText(codeBadge, `Mã ngành: ${major.code ?? major.id}`)
  const combinationBadge = badges.find((element) => element.textContent?.includes('Tổ hợp:'))
  setText(combinationBadge, `Tổ hợp: ${(major.admissionCombinations ?? []).map(({ id, label }) => id ?? label).join(', ') || 'Cần đối chiếu'}`)

  const sectionA = findSection(document, 'Sơ Đồ Hội Tụ')
  if (sectionA) {
    setText(sectionA.querySelector('h2'), `Sơ Đồ Hội Tụ Bằng Chứng Của ${snapshot.shortName}`)
    const paragraphs = sectionA.querySelectorAll('.grid > div > p')
    setText(paragraphs[0], `Tổ hợp RIASEC ${snapshot.top3} được đối chiếu với các chiều ${major.filterRefs?.riasecIds?.join(', ') || 'liên quan'} của ngành.`)
    setText(paragraphs[2], careerMajor?.personalizedReason ?? 'Trải nghiệm hiện tại được dùng như tín hiệu ban đầu và cần tiếp tục kiểm chứng.')
    setText(paragraphs[3], `Môn thế mạnh đã khai báo: ${snapshot.profile.strengths?.join(', ') || 'chưa cập nhật'}. GPA hiện tại: ${snapshot.gpa}.`)
  }

  const sectionB = findSection(document, 'Chương Trình Đào Tạo')
  if (sectionB) {
    const skillTitles = sectionB.querySelectorAll('.grid > div:first-child .font-label-md.font-bold')
    ;[...(major.skills ?? [])].slice(0, skillTitles.length).forEach((skill, index) => setText(skillTitles[index], skill))
  }

  const sectionC = findSection(document, 'Nhận Định Khách Quan')
  if (sectionC && careerMajor) {
    const paragraphs = sectionC.querySelectorAll('.grid > div p')
    setText(paragraphs[0], careerMajor.tradeoff)
    setText(paragraphs[1], careerMajor.evidenceGap)
  }
}

export function personalizePdfReport(document, snapshot) {
  personalizeCommonReportDocument(document, snapshot)
  const firstHeading = document.querySelector('h1')
  if (firstHeading) setText(firstHeading, `Báo cáo định hướng cá nhân của ${snapshot.shortName}`)
}

export function riasecSummary(snapshot) {
  if (!snapshot.riasec) return 'Chưa hoàn thành RIASEC'
  return snapshot.riasec.ranking.slice(0, 3).map(({ code, score }) => `${RIASEC_DIMENSIONS[code].label} ${Math.round(score)}%`).join(' · ')
}
