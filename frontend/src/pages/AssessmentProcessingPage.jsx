import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'

function AssessmentProcessingPage() {
  const navigate = useNavigate()
  const { submitAssessment } = useAssessment()
  const { saveReportToHistory, user } = useAuth()
  const [error, setError] = useState('')
  const actionsRef = useRef({ saveReportToHistory, submitAssessment })

  useEffect(() => {
    let cancelled = false
    const generate = async () => {
      try {
        const report = await actionsRef.current.submitAssessment({ userId: user.id })
        if (cancelled) return
        actionsRef.current.saveReportToHistory(report)
        window.setTimeout(() => { if (!cancelled) navigate('/report', { replace: true }) }, 650)
      } catch (requestError) {
        if (!cancelled) setError(requestError.message)
      }
    }
    void generate()
    return () => { cancelled = true }
  }, [navigate, user.id])

  return <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f7ff] px-4"><div className="max-w-lg rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><span className="material-symbols-outlined animate-pulse text-4xl">neurology</span></span><h1 className="mt-5 text-2xl font-black text-slate-950">{error ? 'Cần bổ sung dữ liệu' : 'Đang đối chiếu các tín hiệu'}</h1><p className="mt-3 leading-7 text-slate-600">{error || 'RIASEC, học lực, trải nghiệm và điều kiện thực tế đang được tổng hợp theo quy tắc cố định. Không có kết quả random.'}</p>{error && <Link className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white" to="/assessment/review">Quay lại rà soát</Link>}</div></main>
}

export default AssessmentProcessingPage
