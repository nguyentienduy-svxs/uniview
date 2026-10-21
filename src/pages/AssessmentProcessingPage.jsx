import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AssessmentProcessingPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/report', { replace: true }), 650)
    return () => window.clearTimeout(timer)
  }, [navigate])
  return <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f7ff] px-4"><div className="max-w-lg rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><span className="material-symbols-outlined animate-pulse text-4xl">neurology</span></span><h1 className="mt-5 text-2xl font-black text-slate-950">Đang đối chiếu các tín hiệu</h1><p className="mt-3 leading-7 text-slate-600">RIASEC, học lực, trải nghiệm và điều kiện thực tế đang được tổng hợp theo quy tắc cố định. Không có kết quả random.</p></div></main>
}

export default AssessmentProcessingPage
