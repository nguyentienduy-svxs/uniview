import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { useDataMode } from '../context/DataModeContext'
import { useJourney } from '../context/JourneyContext'
import { RIASEC_DIMENSIONS } from '../data/careerReport'
import { buildAssessmentReportViewModel } from '../data/reportViewModel'

const TOTAL_PAGES = 7
const RIASEC_CODES = ['R', 'I', 'A', 'S', 'E', 'C']

function polarPoint(index, radius, center = 130) {
  const angle = (-90 + index * 60) * Math.PI / 180
  return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius]
}

function RadarChart({ scores }) {
  const result = RIASEC_CODES.map((code, index) => polarPoint(index, 82 * Number(scores?.[code] ?? 0) / 100).join(',')).join(' ')
  return <svg className="pdf-radar" viewBox="0 0 260 260" role="img" aria-label="Biểu đồ radar RIASEC">
    {[25, 50, 75, 100].map((level) => <polygon key={level} points={RIASEC_CODES.map((_, index) => polarPoint(index, 82 * level / 100).join(',')).join(' ')} fill={level === 100 ? '#f7f9fc' : 'none'} stroke="#d9e2fc" />)}
    {RIASEC_CODES.map((code, index) => { const [x, y] = polarPoint(index, 82); const [lx, ly] = polarPoint(index, 105); return <g key={code}><line x1="130" y1="130" x2={x} y2={y} stroke="#d9e2fc" /><text x={lx} y={ly + 4} textAnchor="middle" fill="#56657a" fontSize="11" fontWeight="800">{code}</text></g> })}
    <polygon points={result} fill="rgba(29,78,216,.18)" stroke="#1d4ed8" strokeWidth="3" />
  </svg>
}

function Page({ children, number, report, title }) {
  return <section className="pdf-a4-page"><header className="pdf-a4-header"><div><strong>UNIVIEW</strong><span>PERSONALIZED CAREER GUIDANCE</span></div><div><strong>{title}</strong><span>{report.snapshot.reportCode} · {report.snapshot.reportDate}</span></div></header><div className="pdf-a4-content">{children}</div><footer className="pdf-a4-footer"><span>{report.isMockMode ? 'Dữ liệu minh họa · Mock Mode' : 'Báo cáo cá nhân hóa UniView'} · Cần kiểm chứng bằng trải nghiệm thực tế</span><strong>Trang {number} / {TOTAL_PAGES}</strong></footer></section>
}

function SectionTitle({ eyebrow, children, intro }) {
  return <div className="pdf-section-title"><p>{eyebrow}</p><h2>{children}</h2>{intro && <span>{intro}</span>}</div>
}

function MajorGrid({ group }) {
  return <div className="pdf-major-six">{group.majors.map((major, index) => <article key={major.id}><span>{String(index + 1).padStart(2, '0')} · {major.code}</span><h3>{major.name}</h3><p>{major.personalizedReason}</p><small><b>Cần kiểm chứng:</b> {major.evidenceGap}</small><em>{major.schools.length ? `Trường tham khảo: ${major.schools.map((school) => school.name).join(' · ')}` : 'Chưa có dữ liệu trường phù hợp'}</em></article>)}</div>
}

function ReportPdfPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const { isMockMode } = useDataMode()
  const { state } = useJourney()
  const report = useMemo(() => buildAssessmentReportViewModel({ user, assessment, journeyState: state, isMockMode }), [assessment, isMockMode, state, user])
  const topCodes = report.riasec.ranking?.slice(0, 3) ?? []
  const publicBaseUrl = String(import.meta.env.VITE_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
  const roadmapUrl = /^https:\/\//i.test(publicBaseUrl) && !/localhost|127\.0\.0\.1/i.test(publicBaseUrl) ? `${publicBaseUrl}/roadmap` : ''
  const fileName = `UniView_Assessment_${report.snapshot.reportCode}_${report.snapshot.admissionYear}.pdf`
  const [exportDate] = useState(() => new Date().toLocaleDateString('vi-VN'))

  useEffect(() => {
    const previous = document.title
    document.title = fileName.replace(/\.pdf$/, '')
    return () => { document.title = previous }
  }, [fileName])

  if (!report.groups.length) return <main className="min-h-screen bg-[#f6f8fc] px-4 py-16"><section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8"><h1 className="text-2xl font-black">Chưa thể tạo PDF</h1><p className="mt-3 text-slate-600">Real API chưa có kết quả Assessment. Không có dữ liệu Mock nào được chèn vào bản PDF.</p><button type="button" onClick={() => navigate('/report')} className="mt-6 rounded-xl bg-[#1d4ed8] px-5 py-3 text-sm font-bold text-white">Quay lại báo cáo</button></section></main>

  return <main className="pdf-viewer-shell min-h-screen bg-[#e9edff]">
    <header className="pdf-viewer-toolbar sticky top-0 z-50 flex min-h-16 items-center justify-between gap-3 border-b border-[#d9e2fc] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8"><button type="button" onClick={() => navigate('/report')} className="rounded-full border border-[#e3eaf4] px-4 py-2 text-sm font-bold">← Báo cáo Web</button><div className="min-w-0 text-center"><strong className="block truncate text-sm">{fileName}</strong><span className="text-xs text-[#75839a]">Bản in A4 · {TOTAL_PAGES} trang · chữ có thể chọn</span></div><button type="button" onClick={() => window.print()} className="rounded-full bg-[#1d4ed8] px-5 py-2.5 text-sm font-bold text-white">In / Tải PDF</button></header>
    <div className="pdf-pages mx-auto flex max-w-[840px] flex-col items-center gap-8 px-4 py-8">
      <Page number={1} report={report} title="Báo cáo định hướng cá nhân"><div className="pdf-cover"><div className="pdf-cover-badge">ASSESSMENT REPORT · MÙA TUYỂN SINH {report.snapshot.admissionYear} · XUẤT {exportDate}</div><h1>Bản đồ định hướng<br /><span>của {report.snapshot.shortName}</span></h1><p>3 nhóm ngành · 18 ngành · Một lộ trình kiểm chứng</p><div className="pdf-cover-summary"><div><span>Mã RIASEC</span><strong>{report.snapshot.top3}</strong></div><div><span>Hướng ưu tiên</span><strong>{report.groups[0]?.name}</strong></div><div><span>Dữ liệu hồ sơ</span><strong>{report.snapshot.completeness}%</strong></div></div><div className="pdf-cover-note">Đây là gợi ý khám phá dựa trên dữ liệu hiện có, không phải xác suất thành công hay kết luận nghề nghiệp cố định. Mỗi ngành cần được kiểm chứng bằng Roadmap.</div></div></Page>

      <Page number={2} report={report} title="Chân dung & dữ liệu học tập"><SectionTitle eyebrow="PHẦN 1 · CHÂN DUNG CÁ NHÂN" intro="Các tín hiệu đã có và phần dữ liệu còn thiếu.">RIASEC và điều kiện hiện tại</SectionTitle><div className="pdf-profile-visual"><div><RadarChart scores={report.riasec.scores} /><span className="pdf-holland-code">Mã Holland · {report.snapshot.top3}</span></div><div className="pdf-top-signals">{topCodes.length ? topCodes.map(({ code, score }, index) => <article key={code}><span>0{index + 1}</span><div><h3>{code} · {RIASEC_DIMENSIONS[code].label} <b>{Math.round(score)}</b></h3><p>{RIASEC_DIMENSIONS[code].description}</p></div></article>) : <article className="is-missing"><span>!</span><div><h3>Chưa hoàn thành RIASEC</h3><p>Không tự tạo điểm thay thế. Hãy hoàn tất Assessment để tăng độ sâu phân tích.</p></div></article>}</div></div><div className="pdf-info-grid"><article><h3>Học tập & điều kiện</h3><dl><div><dt>GPA</dt><dd>{report.profile.gpa || 'Chưa cập nhật'}</dd></div><div><dt>THPT</dt><dd>{report.profile.thptScore || 'Chưa cập nhật'}</dd></div><div><dt>ĐGNL</dt><dd>{report.profile.dgnlScore || 'Chưa cập nhật'}</dd></div><div><dt>Thế mạnh</dt><dd>{report.profile.strengths?.join(', ') || 'Chưa cập nhật'}</dd></div><div><dt>Khu vực</dt><dd>{report.profile.regions?.join(', ') || 'Chưa cập nhật'}</dd></div><div><dt>Học phí</dt><dd>{report.profile.tuition || 'Chưa cập nhật'}</dd></div></dl></article><article className="pdf-insight"><h3>Cách đọc kết quả</h3><p>Điểm RIASEC phản ánh tín hiệu hứng thú hiện tại. Các con số ưu tiên trong báo cáo dùng để sắp thứ tự khám phá, không phải tỷ lệ đậu hay xác suất phù hợp nghề nghiệp.</p><p><strong>Dữ liệu thiếu</strong> luôn được hiển thị rõ là “Chưa cập nhật”, không quy đổi thành 0.</p></article></div></Page>

      {report.groups.map((group, index) => <Page key={group.id} number={index + 3} report={report} title={`Nhóm ${index + 1} · ${group.name}`}><SectionTitle eyebrow={`PHẦN 2 · NHÓM ${index + 1} · ƯU TIÊN ${group.priorityScore}/100`} intro="Sáu ngành dùng chung một nhóm khám phá; hãy mở Roadmap trước khi thu hẹp lựa chọn.">{group.name}</SectionTitle><p className="pdf-group-intro">{group.personalizedReason}</p><MajorGrid group={group} /></Page>)}

      <Page number={6} report={report} title="18 ngành & trường tham khảo"><SectionTitle eyebrow="PHẦN 3 · TRƯỜNG ĐÀO TẠO THAM KHẢO" intro="Tối đa ba trường cho mỗi ngành; dữ liệu cần đối chiếu đề án tuyển sinh chính thức.">Danh sách đối chiếu nhanh</SectionTitle><div className="pdf-school-compact">{report.majors.map((major, index) => <article key={major.id}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{major.name}</strong><small>{major.schools.length ? major.schools.map((school) => school.name).join(' · ') : 'Chưa có dữ liệu phù hợp'}</small></div></article>)}</div><div className="pdf-data-note">UniView không dùng các trường tham khảo này để khẳng định khả năng trúng tuyển. Điểm chuẩn, học phí và phương thức phải được kiểm tra lại từ nguồn chính thức.</div></Page>

      <Page number={7} report={report} title="Bước tiếp theo · Roadmap"><SectionTitle eyebrow="PHẦN 4 · BƯỚC TIẾP THEO" intro="Assessment tạo giả thuyết; Roadmap tạo bằng chứng.">Đừng dừng ở kết quả Assessment</SectionTitle><div className="pdf-conclusion"><h2>Kiểm chứng một ngành trước</h2><p>Chọn một ngành khiến bạn tò mò nhất, hoàn thành 3–5 nhiệm vụ ngắn, nộp evidence và reflection. Sau đó UniView mới củng cố hoặc hạ ưu tiên giả thuyết ban đầu.</p><div className="pdf-task-examples">{report.groups.map((group) => { const major = group.majors[0]; return <article key={major.id}><strong>{major.name}</strong>{major.roadmapTasks.map((task) => <span key={task.id}>{task.title} · {task.duration}</span>)}</article> })}</div><div className="pdf-roadmap-steps"><span>1 · Chọn ngành</span><span>2 · Làm nhiệm vụ</span><span>3 · Đọc báo cáo kiểm chứng</span></div>{roadmapUrl ? <a href={roadmapUrl} className="pdf-roadmap-link">Mở Roadmap trên UniView<small>{roadmapUrl}</small></a> : <div className="pdf-roadmap-link">Mở UniView → Roadmap<small>Đường dẫn public sẽ xuất hiện khi cấu hình VITE_PUBLIC_APP_URL</small></div>}<p className="pdf-cover-note">Trạng thái Roadmap được lưu theo userId + assessmentResultId + majorId. Mở lại cùng ngành sẽ tiếp tục bản ghi hiện có, không tạo trùng.</p></div></Page>
    </div>
  </main>
}

export default ReportPdfPage
