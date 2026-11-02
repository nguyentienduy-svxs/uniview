import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import {
  getMajorUniversityMatches,
  getPersonalizedReportGroups,
  RIASEC_DIMENSIONS,
} from '../data/careerReport'
import { buildReportSnapshot } from '../utils/reportTemplatePersonalization'

const TOTAL_PAGES = 7
const RIASEC_CODES = ['R', 'I', 'A', 'S', 'E', 'C']

function polarPoint(index, radius, center = 130) {
  const angle = (-90 + index * 60) * (Math.PI / 180)
  return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius]
}

function RadarChart({ scores }) {
  const result = RIASEC_CODES.map((code, index) => polarPoint(index, 82 * (Math.max(0, scores?.[code] ?? 0) / 100)).join(',')).join(' ')
  return <svg className="pdf-radar" viewBox="0 0 260 260" role="img" aria-label="Biểu đồ radar RIASEC">{[25, 50, 75, 100].map((level) => <polygon key={level} points={RIASEC_CODES.map((_, index) => polarPoint(index, 82 * level / 100).join(',')).join(' ')} fill={level === 100 ? '#f7f9fc' : 'none'} stroke="#d9e2fc" strokeWidth="1" />)}{RIASEC_CODES.map((code, index) => { const [x, y] = polarPoint(index, 82); const [lx, ly] = polarPoint(index, 105); return <g key={code}><line x1="130" y1="130" x2={x} y2={y} stroke="#d9e2fc" /><text x={lx} y={ly + 4} textAnchor="middle" fill="#56657a" fontSize="11" fontWeight="800">{code}</text></g> })}<polygon points={result} fill="rgba(29,78,216,.18)" stroke="#1d4ed8" strokeWidth="3" strokeLinejoin="round" />{RIASEC_CODES.map((code, index) => { const [x, y] = polarPoint(index, 82 * (Math.max(0, scores?.[code] ?? 0) / 100)); return <circle key={code} cx={x} cy={y} r="3.5" fill="#fff" stroke="#1d4ed8" strokeWidth="2.5" /> })}</svg>
}

function DirectionMap({ groups }) {
  const positions = ['pdf-direction-one', 'pdf-direction-two', 'pdf-direction-three']
  return <div className="pdf-direction-map"><svg viewBox="0 0 620 310" aria-hidden="true"><ellipse cx="310" cy="155" rx="220" ry="125" fill="none" stroke="#d9e2fc" strokeWidth="1" strokeDasharray="5 5" /><ellipse cx="310" cy="155" rx="150" ry="84" fill="none" stroke="#e3eaf4" strokeWidth="1" /><circle cx="310" cy="155" r="45" fill="#eaf1ff" /><path d="M310 155 L105 70 M310 155 L515 70 M310 155 L310 278" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="7 5" /><path d="M310 126 L329 155 L310 184 L291 155 Z" fill="#1d4ed8" /><circle cx="310" cy="155" r="8" fill="#172033" /></svg><div className="pdf-map-center"><strong>{groups[0]?.matchScore ?? 0}</strong><span>tín hiệu<br />ưu tiên</span></div>{groups.map((group, index) => <div key={group.id} className={`pdf-direction-node ${positions[index]}`}><span>0{index + 1}</span><div><strong>{group.name}</strong><small>{group.matchScore}/100 · {group.majors[0]?.name}</small></div></div>)}</div>
}

function Page({ children, number, snapshot, title }) {
  return <section className="pdf-a4-page"><header className="pdf-a4-header"><div><strong>UNIVIEW</strong><span>PERSONALIZED CAREER GUIDANCE</span></div><div><strong>{title}</strong><span>{snapshot.reportCode} · {snapshot.reportDate}</span></div></header><div className="pdf-a4-content">{children}</div><footer className="pdf-a4-footer"><span>Tài liệu định hướng cá nhân · Cần kiểm chứng bằng trải nghiệm thực tế</span><strong>Trang {number} / {TOTAL_PAGES}</strong></footer></section>
}

function SectionTitle({ eyebrow, children, intro }) {
  return <div className="pdf-section-title"><p>{eyebrow}</p><h2>{children}</h2>{intro && <span>{intro}</span>}</div>
}

function ReportPdfPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const snapshot = useMemo(() => buildReportSnapshot(user, assessment), [assessment, user])
  const riasec = useMemo(() => snapshot.riasec ?? { scores: {}, ranking: [] }, [snapshot.riasec])
  const groups = useMemo(() => getPersonalizedReportGroups(riasec, assessment.profile, assessment.experience, 3), [assessment.experience, assessment.profile, riasec])
  const schoolMatches = useMemo(() => getMajorUniversityMatches(assessment.profile), [assessment.profile])
  const roadmapUrl = `${window.location.origin}/roadmap/setup/directions`
  const topCodes = riasec.ranking?.slice(0, 3) ?? []

  return <main className="pdf-viewer-shell min-h-screen bg-[#e9edff]">
    <header className="pdf-viewer-toolbar sticky top-0 z-50 flex min-h-16 items-center justify-between gap-3 border-b border-[#d9e2fc] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8"><button type="button" onClick={() => navigate('/report')} className="rounded-full border border-[#e3eaf4] px-4 py-2 text-sm font-bold">← Quay lại Báo cáo Web</button><div className="min-w-0 text-center"><strong className="block truncate text-sm">UniView_Personal_Direction_Report_{snapshot.reportCode}.pdf</strong><span className="text-xs text-[#75839a]">Bản in A4 · {TOTAL_PAGES} trang</span></div><button type="button" onClick={() => window.print()} className="rounded-full bg-[#1d4ed8] px-5 py-2.5 text-sm font-bold text-white">▣ In / Tải PDF</button></header>

    <div className="pdf-pages mx-auto flex max-w-[840px] flex-col items-center gap-8 px-4 py-8">
      <Page number={1} snapshot={snapshot} title="Báo cáo định hướng cá nhân">
        <div className="pdf-cover"><div className="pdf-cover-badge">BÁO CÁO ĐỊNH HƯỚNG · MÙA TUYỂN SINH {snapshot.admissionYear}</div><h1>Bản đồ định hướng<br /><span>của {snapshot.shortName}</span></h1><p>Khám phá bản thân · Hiểu ngành học · Kiểm chứng lựa chọn</p><DirectionMap groups={groups} /><div className="pdf-cover-summary"><div><span>Mã RIASEC</span><strong>{snapshot.top3}</strong></div><div><span>Nhóm ngành ưu tiên</span><strong>{groups[0]?.name}</strong></div><div><span>Hồ sơ hoàn thiện</span><strong>{snapshot.completeness}%</strong></div></div><div className="pdf-cover-note"><strong>{snapshot.fullName}</strong> có tín hiệu ưu tiên ở {groups.map((group) => group.name).join(', ')}. Đây là ba giả thuyết để khám phá, chưa phải kết luận nghề nghiệp cố định.</div></div>
      </Page>

      <Page number={2} snapshot={snapshot} title="Phần 1 · Chân dung cá nhân">
        <SectionTitle eyebrow="PHẦN 1 · CHÂN DUNG CÁ NHÂN" intro="Các tín hiệu đang ủng hộ và những dữ liệu còn thiếu.">Bạn đang quan tâm đến kiểu hoạt động nào?</SectionTitle>
        <div className="pdf-profile-visual"><div><RadarChart scores={riasec.scores} /><span className="pdf-holland-code">Mã Holland · {snapshot.top3}</span></div><div className="pdf-top-signals">{topCodes.length ? topCodes.map(({ code, score }, index) => <article key={code}><span>0{index + 1}</span><div><h3>{code} · {RIASEC_DIMENSIONS[code].label} <b>{Math.round(score)}%</b></h3><p>{RIASEC_DIMENSIONS[code].description} {index === 0 ? 'Đây là tín hiệu nổi bật nhất ở thời điểm hiện tại.' : 'Nên đọc kết hợp với hai chiều còn lại thay vì tách riêng.'}</p></div></article>) : <article className="is-missing"><span>!</span><div><h3>Chưa hoàn thành RIASEC</h3><p>Các đề xuất hiện ưu tiên môn mạnh, trải nghiệm và điều kiện cá nhân; độ sâu phân tích sẽ tăng khi hoàn tất assessment.</p></div></article>}</div></div>
        <div className="pdf-riasec-grid pdf-riasec-compact">{Object.keys(RIASEC_DIMENSIONS).map((code) => <div key={code} className={topCodes.some((item) => item.code === code) ? 'is-top' : ''}><span>{code} · {RIASEC_DIMENSIONS[code].label}</span><strong>{Math.round(riasec.scores?.[code] ?? 0)}%</strong><i><b style={{ width: `${riasec.scores?.[code] ?? 0}%` }} /></i></div>)}</div>
        <div className="pdf-info-grid"><article><h3>Học tập & điều kiện</h3><dl><div><dt>GPA</dt><dd>{snapshot.gpa}</dd></div><div><dt>Điểm THPT</dt><dd>{snapshot.thptScore}</dd></div><div><dt>Điểm ĐGNL</dt><dd>{snapshot.dgnlScore}</dd></div><div><dt>Thế mạnh</dt><dd>{snapshot.profile.strengths?.join(', ') || 'Chưa cập nhật'}</dd></div><div><dt>Khu vực</dt><dd>{snapshot.profile.regions?.join(', ') || 'Chưa cập nhật'}</dd></div><div><dt>Ngân sách</dt><dd>{snapshot.profile.tuition ? `${snapshot.profile.tuition} triệu/năm` : 'Chưa cập nhật'}</dd></div></dl></article><article className="pdf-insight"><h3>Cách đọc hồ sơ</h3><p>Tổ hợp <strong>{snapshot.top3}</strong> cho thấy nhiều hơn một hướng phát triển. Điểm cao chỉ là tín hiệu hứng thú hiện tại; chưa phản ánh đầy đủ năng lực chuyên môn, sức bền với deadline và mức phù hợp với công việc hằng ngày.</p><p><strong>Điểm nên kiểm chứng:</strong> phản ứng khi phải sửa nhiều vòng, thực hiện phần việc lặp lại và phối hợp với người khác dưới áp lực thời gian.</p></article></div>
      </Page>

      {[0, 2].map((start, pageIndex) => <Page key={start} number={pageIndex + 3} snapshot={snapshot} title="Phần 2 · Nhóm ngành & ngành phù hợp"><SectionTitle eyebrow="PHẦN 2 · 3 NHÓM NGÀNH ƯU TIÊN" intro="Mỗi nhóm giữ đúng 3 ngành phù hợp nhất; điểm là mức ưu tiên khám phá, không phải xác suất thành công.">Những hướng đáng kiểm chứng sâu hơn</SectionTitle><div className="pdf-group-stack">{groups.slice(start, start + 2).map((group, groupIndex) => <article key={group.id} className="pdf-group-card"><header><span>NHÓM {start + groupIndex + 1}</span><h3>{group.name}</h3><strong>{group.matchScore}/100</strong></header><p>{group.personalizedReason}</p><div className="pdf-major-three">{group.majors.slice(0, 3).map((major, index) => <div key={major.id}><span>0{index + 1}</span><h4>{major.name}</h4><strong>{major.matchScore}/100</strong><p>{major.personalizedReason}</p><small><b>Cần kiểm chứng:</b> {major.evidenceGap}</small></div>)}</div></article>)}</div>{start === 2 && groups[2] && <div className="pdf-validation-plan"><h3>Kế hoạch kiểm chứng cho nhóm {groups[2].name}</h3><p>{groups[2].unknown}</p><div>{groups[2].majors.slice(0, 3).map((major, index) => <span key={major.id}><b>0{index + 1} · {major.name}</b>Thử một nhiệm vụ gần với công việc thật, ghi lại mức hứng thú, phần làm tốt và điều khiến bạn mất năng lượng.</span>)}</div></div>}</Page>)}

      {[0, 9].map((start, pageIndex) => <Page key={start} number={pageIndex + 5} snapshot={snapshot} title="Phần 3 · 18 ngành – 18 trường"><SectionTitle eyebrow="PHẦN 3 · NGÀNH HỌC VÀ TRƯỜNG ĐẠI HỌC" intro="Mỗi ngành đi cùng một trường đáng tìm hiểu nhất theo dữ liệu hiện có.">{start === 0 ? '9 lựa chọn đầu tiên' : '9 lựa chọn tiếp theo'}</SectionTitle><div className="pdf-school-list">{schoolMatches.slice(start, start + 9).map((match, index) => <article key={match.major.id}><span>{String(start + index + 1).padStart(2, '0')}</span><div><h3>{match.major.name}</h3><strong>{match.school.shortName} · {match.school.name}</strong><p>{match.fitReason}</p></div><aside><b>{match.tuitionLabel}</b><small>{match.admissionLabel}</small></aside></article>)}</div><div className="pdf-data-note">Thông tin học phí và điểm là mốc tham chiếu gần nhất trong dữ liệu UniView. Cần đối chiếu đề án tuyển sinh chính thức của trường trước khi đăng ký nguyện vọng.</div></Page>)}

      <Page number={7} snapshot={snapshot} title="Phần 4–5 · Đối chiếu & kết luận">
        <SectionTitle eyebrow="PHẦN 4 · ĐỐI CHIẾU CÁ NHÂN HÓA" intro="Một bảng duy nhất để nhìn rõ khác biệt giữa ba hướng.">Ba nhóm ưu tiên khác nhau ở đâu?</SectionTitle>
        <table className="pdf-comparison"><thead><tr><th>Tiêu chí</th>{groups.map((group) => <th key={group.id}>{group.name}</th>)}</tr></thead><tbody><tr><th>RIASEC nổi bật</th>{groups.map((group) => <td key={group.id}>{group.evidenceParts[0]}</td>)}</tr><tr><th>Môn học hỗ trợ</th>{groups.map((group) => <td key={group.id}>{group.evidenceParts[1]}</td>)}</tr><tr><th>Trải nghiệm</th>{groups.map((group) => <td key={group.id}>{group.evidenceParts[2]}</td>)}</tr><tr><th>Cần làm rõ</th>{groups.map((group) => <td key={group.id}>{group.unknown}</td>)}</tr><tr><th>Mức ưu tiên</th>{groups.map((group) => <td key={group.id}><strong>{group.matchScore}/100</strong></td>)}</tr></tbody></table>
        <div className="pdf-conclusion"><p className="pdf-eyebrow">PHẦN 5 · KẾT LUẬN VÀ BƯỚC TIẾP THEO</p><h2>Đừng dừng ở kết quả Assessment</h2><p>Hồ sơ hiện tại ưu tiên <strong>{groups[0]?.name}</strong>, nhưng vẫn nên giữ hai hướng còn lại để so sánh. Báo cáo cho biết nên bắt đầu ở đâu; <strong>Roadmap trên UniView</strong> mới là nơi bạn thử nhiệm vụ mô phỏng, ghi lại cảm nhận và tạo bằng chứng để kiểm chứng kết quả.</p><div className="pdf-roadmap-steps"><span>1 · Chọn 2–3 ngành</span><span>2 · Làm nhiệm vụ thật</span><span>3 · Đối chiếu evidence</span></div><Link to="/roadmap/setup/directions" className="pdf-roadmap-link">Mở Roadmap kiểm chứng trên UniView →<small>{roadmapUrl}</small></Link></div>
      </Page>
    </div>
  </main>
}

export default ReportPdfPage
