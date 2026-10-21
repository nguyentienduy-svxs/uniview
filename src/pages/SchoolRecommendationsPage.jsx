import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useAssessment } from '../context/AssessmentContext'
import { useJourney } from '../context/JourneyContext'
import { findDemoMajor } from '../data/annualDemo'
import { getRecommendedUniversities } from '../data/careerReport'

function SchoolRecommendationsPage() {
  const [params] = useSearchParams()
  const major = findDemoMajor(params.get('major')) ?? findDemoMajor('information-technology')
  const { assessment } = useAssessment()
  const { capabilities, state, toggleShortlist, setToast } = useJourney()
  const [showAdmissionModal, setShowAdmissionModal] = useState(false)
  const schools = getRecommendedUniversities(major.id, assessment.profile)
  const missingScores = !assessment.profile.gpa && !assessment.profile.thptScore && !assessment.profile.dgnlScore

  const addToBoard = (school) => {
    if (!capabilities.canUseDecisionBoard) {
      setShowAdmissionModal(true)
      return
    }
    setToast({ type: 'success', message: `Đã ghi nhận ${school.name} để tiếp tục trên Decision Board.` })
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] py-10">
      <JourneyToast />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link to="/report#majors" className="text-sm font-bold text-blue-600">← Trở về báo cáo Assessment</Link>
        <section className="mt-5 rounded-[2rem] bg-gradient-to-br from-blue-700 to-violet-700 p-8 text-white">
          <p className="text-xs font-black uppercase tracking-[.16em] text-blue-100">Gợi ý trường ngay từ Assessment · không cần hoàn thành task</p>
          <h1 className="mt-2 font-['Epilogue'] text-3xl font-black">Trường nên tìm hiểu cho ngành {major.name}</h1>
          <p className="mt-3 max-w-3xl leading-7 text-blue-50">Mỗi thẻ giải thích theo 5 nhóm tiêu chí: liên quan ngành, khu vực, tài chính, dữ liệu xét tuyển và môi trường học. Danh sách này không phải bảng xếp hạng hay xác suất trúng tuyển.</p>
        </section>

        <section className={`mt-5 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${missingScores ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
          <div>
            <h2 className={`font-black ${missingScores ? 'text-amber-950' : 'text-emerald-950'}`}>{missingScores ? 'Chưa có điểm xét tuyển' : 'Đã có dữ liệu học lực để đối chiếu'}</h2>
            <p className={`mt-1 text-sm leading-6 ${missingScores ? 'text-amber-800' : 'text-emerald-800'}`}>{missingScores ? 'UniView giữ trạng thái “chưa có dữ liệu”, không tự gán điểm 0 và không đưa ra khả năng đậu.' : 'UniView chỉ dùng điểm làm dữ liệu đối chiếu; vẫn không tạo phần trăm trúng tuyển giả.'}</p>
          </div>
          <Link to="/assessment/quick-profile" className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-slate-800 shadow-sm">Cập nhật hồ sơ</Link>
        </section>

        {schools.length ? (
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {schools.map((school) => {
              const saved = state.shortlist.includes(school.id)
              return (
                <article key={school.id} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black uppercase text-amber-700">Demo · cần xác minh</span>
                    <button type="button" onClick={() => toggleShortlist(school.id)} className={`rounded-full p-2 ${saved ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`} title="Lưu Shortlist"><span className="material-symbols-outlined">{saved ? 'favorite' : 'favorite_border'}</span></button>
                  </div>
                  <h2 className="mt-4 text-lg font-black leading-6 text-slate-950">{school.name}</h2>
                  <p className="mt-2 text-sm font-bold text-blue-700">{school.program}</p>
                  <dl className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    <div><dt className="font-bold text-slate-900">Liên quan ngành</dt><dd>{school.criteria.major}</dd></div>
                    <div><dt className="font-bold text-slate-900">Khu vực</dt><dd>{school.criteria.location}</dd></div>
                    <div><dt className="font-bold text-slate-900">Tài chính</dt><dd>{school.criteria.finance}</dd></div>
                    <div><dt className="font-bold text-slate-900">Dữ liệu xét tuyển</dt><dd>{school.criteria.admission}</dd></div>
                    <div><dt className="font-bold text-slate-900">Môi trường học</dt><dd>{school.criteria.environment}</dd></div>
                  </dl>
                  <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><strong>Nguồn/trạng thái:</strong> {school.source}<br />Bản demo cập nhật {school.updatedAt}</div>
                  <div className="mt-auto grid gap-2 pt-5">
                    <Link to={school.path} className="rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white">Xem hồ sơ trường</Link>
                    <button type="button" onClick={() => addToBoard(school)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700">Thêm vào Decision Board</button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-black text-slate-950">Chưa có trường demo cho ngành này</h2><p className="mt-2 text-sm text-slate-600">Bạn vẫn có thể lưu ngành và tiếp tục Roadmap; dữ liệu trường cần được bổ sung/xác minh sau.</p></div>}

        <section className="mt-7 flex flex-wrap gap-3 rounded-2xl border border-blue-100 bg-white p-5">
          <Link to="/shortlist" className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-bold text-blue-700">Mở Shortlist</Link>
          <Link to="/roadmap/setup/directions" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">Tạo Roadmap kiểm chứng ngành</Link>
        </section>
      </div>

      {showAdmissionModal && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true"><div className="max-w-md rounded-3xl bg-white p-7 shadow-2xl"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><span className="material-symbols-outlined">lock</span></span><h2 className="mt-4 text-xl font-black text-slate-950">Decision Board thuộc Admission Pass</h2><p className="mt-3 text-sm leading-6 text-slate-600">Gói Năm cho phép xem gợi ý trường và lưu Shortlist ngay từ báo cáo, không phụ thuộc task. Để quản lý phương án tuyển sinh trên Decision Board, tài khoản cần Admission Pass đang hoạt động.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setShowAdmissionModal(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">Để sau</button><Link to="/admission-pass" className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white">Xem Admission Pass</Link></div></div></div>}
    </main>
  )
}

export default SchoolRecommendationsPage
