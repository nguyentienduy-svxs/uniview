import { Link, useNavigate } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'

function AssessmentReviewPage() {
  const navigate = useNavigate()
  const { assessment } = useAssessment()
  const answered = Object.keys(assessment.riasecAnswers).length
  const cards = [
    { icon: 'interests', title: 'RIASEC', value: `${answered}/30 câu đã trả lời`, to: '/assessment/riasec', complete: answered === 30 },
    { icon: 'history_edu', title: 'Trải nghiệm đã có', value: assessment.experience.noExperience ? 'Chưa có trải nghiệm – vẫn có thể tiếp tục' : `${assessment.experience.selectedDomains.length} lĩnh vực đã ghi nhận`, to: '/assessment/context', complete: true },
    { icon: 'school', title: 'Học lực và điều kiện thực tế', value: `${assessment.profile.strengths.length} môn mạnh · ${assessment.profile.regions.join(', ')}`, to: '/assessment/quick-profile', complete: true },
    { icon: 'tune', title: 'Mục tiêu và ràng buộc', value: `${assessment.profile.priorities.length} tiêu chí ưu tiên · Học phí ${assessment.profile.tuition}`, to: '/assessment/quick-profile', complete: true },
  ]
  return <main className="min-h-screen bg-[#f5f7ff] py-10"><div className="mx-auto max-w-4xl px-4 sm:px-6"><p className="text-sm font-bold text-blue-600">Review assessment</p><h1 className="mt-1 font-['Epilogue'] text-3xl font-black text-slate-950">Rà soát dữ liệu trước khi tạo report</h1><p className="mt-3 leading-7 text-slate-600">Bạn có thể quay lại chỉnh từng phần. UniView chỉ tạo giả thuyết để kiểm chứng, không gắn nhãn tính cách và không đưa ra kết luận đạt/trượt.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{cards.map((card) => <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><span className="material-symbols-outlined">{card.icon}</span></span><span className={`rounded-full px-3 py-1 text-xs font-bold ${card.complete ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{card.complete ? 'Đã ghi nhận' : 'Cần hoàn thành'}</span></div><h2 className="mt-4 text-lg font-black text-slate-950">{card.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{card.value}</p><Link to={card.to} className="mt-4 inline-flex text-sm font-bold text-blue-600">Chỉnh phần này →</Link></article>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5"><p className="max-w-xl text-sm leading-6 text-blue-950">Bấm hoàn thành để chạy hàm mock deterministic. Cùng một dữ liệu sẽ luôn tạo cùng một report sau refresh.</p><button type="button" disabled={answered !== 30} onClick={() => navigate('/assessment/processing')} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40">Hoàn thành assessment →</button></div></div></main>
}

export default AssessmentReviewPage
