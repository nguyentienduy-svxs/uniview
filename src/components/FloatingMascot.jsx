import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { feedbackApi } from '../api/feedbackApi'
import mascotImage from '../assets/UniView_DUNG_MEO_TRONG_ANH_chop_mat_cuoi.webp'
import { useAuth } from '../context/AuthContext'

const PROMPTS = [
  'Cậu thấy website tớ như nào? Có thể ghi cải thiện góp ý giúp team tớ được không? ✨',
  'Có bước nào khiến cậu khó hiểu hoặc chưa thuận tiện không? Chia sẻ cho tớ nhé! 🐾',
  'Trước khi cậu rời đi, team tớ rất muốn lắng nghe thêm một điều nên cải thiện.',
]

function FloatingMascot() {
  const location = useLocation()
  const { user } = useAuth()
  const [promptIndex, setPromptIndex] = useState(0)
  const [bubbleOpen, setBubbleOpen] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [view, setView] = useState('FORM') // 'FORM' | 'DATABASE'
  const [databaseEntries, setDatabaseEntries] = useState(() => feedbackApi.getStored())

  const [form, setForm] = useState({
    category: 'Trải nghiệm chung',
    email: user?.email ?? '',
    message: '',
    rating: 5,
  })
  const [status, setStatus] = useState('IDLE')
  const [lastSavedId, setLastSavedId] = useState('')

  // Hiệu ứng nhún nhẹ nhàng như thiết kế ban đầu
  const [bobOffset, setBobOffset] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    let startTime = performance.now()
    const animate = (time) => {
      const elapsed = time - startTime
      setBobOffset(Math.sin(elapsed / 650) * 6)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  // Hẹn giờ đổi câu hỏi: 3 phút sau đổi câu 2, thêm 5 phút (phút thứ 8) đổi câu cuối
  useEffect(() => {
    const secondTimer = window.setTimeout(() => {
      setPromptIndex(1)
      setBubbleOpen(true)
    }, 3 * 60 * 1000)

    const finalTimer = window.setTimeout(() => {
      setPromptIndex(2)
      setBubbleOpen(true)
    }, 8 * 60 * 1000)

    return () => {
      window.clearTimeout(secondTimer)
      window.clearTimeout(finalTimer)
    }
  }, [])

  const openPanel = () => {
    setForm((current) => ({
      ...current,
      email: current.email || user?.email || '',
    }))
    setDatabaseEntries(feedbackApi.getStored())
    setView('FORM')
    setStatus('IDLE')
    setPanelOpen(true)
    setBubbleOpen(false)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (form.message.trim().length < 3 || status === 'SENDING') return
    setStatus('SENDING')

    const result = await feedbackApi.submit({
      ...form,
      email: form.email.trim(),
      message: form.message.trim(),
      page: `${location.pathname}${location.search}`,
      userId: user?.id ?? null,
      userName: user?.fullName ?? 'Người dùng trải nghiệm',
    })

    const updatedList = feedbackApi.getStored()
    setDatabaseEntries(updatedList)
    setLastSavedId(result?.entry?.id ? result.entry.id.slice(0, 8) : 'DB-' + Date.now().toString(36))
    setStatus('SENT')
    setForm((current) => ({ ...current, message: '' }))
  }

  return (
    <aside
      className="fixed bottom-4 right-3 z-[80] flex flex-col items-end sm:bottom-6 sm:right-6 font-['Be_Vietnam_Pro']"
      aria-label="Linh vật UniView và hòm thư góp ý"
    >
      {/* Popup Form Góp Ý & Database Viewer */}
      {panelOpen && (
        <div className="mb-3 w-[min(400px,calc(100vw-24px))] overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-200">
          <header className="flex items-center justify-between bg-gradient-to-r from-[#172033] to-[#1e293b] px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🐱</span>
              <div>
                <strong className="block text-sm font-bold">Góp ý cho team UniView</strong>
                <span className="text-[11px] text-slate-300">
                  {view === 'FORM' ? 'Mỗi chia sẻ giúp tụi mình cải thiện tốt hơn.' : `Cơ sở dữ liệu: ${databaseEntries.length} góp ý`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDatabaseEntries(feedbackApi.getStored())
                  setView(view === 'FORM' ? 'DATABASE' : 'FORM')
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-slate-200 transition"
                title="Xem cơ sở dữ liệu đã lưu"
              >
                {view === 'FORM' ? `🗄️ Database (${databaseEntries.length})` : '✍️ Góp ý'}
              </button>

              <button
                aria-label="Đóng popup"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-lg text-slate-300 hover:bg-white/10 hover:text-white"
                onClick={() => setPanelOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
          </header>

          {/* VIEW 1: FORM ĐIỀN GÓP Ý */}
          {view === 'FORM' && (
            <form className="space-y-3.5 p-5" onSubmit={submit}>
              <div>
                <span className="block text-xs font-bold text-[#56657a]">Mức độ hài lòng của bạn</span>
                <div className="mt-1.5 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      aria-label={`${value} sao`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition ${
                        value <= form.rating
                          ? 'bg-amber-50 text-amber-500 shadow-xs'
                          : 'bg-slate-50 text-slate-300 hover:text-slate-400'
                      }`}
                      onClick={() => setForm((current) => ({ ...current, rating: value }))}
                      type="button"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-[#56657a]">Bạn muốn góp ý về</span>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-[#172033] outline-none focus:border-blue-500"
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  value={form.category}
                >
                  <option>Trải nghiệm chung</option>
                  <option>Assessment &amp; Kết quả định hướng</option>
                  <option>Khám phá ngành &amp; Trường</option>
                  <option>Roadmap ôn thi &amp; tuyển sinh</option>
                  <option>Công cụ kiểm tra điểm tuyển sinh</option>
                  <option>Lỗi giao diện hoặc nội dung</option>
                  <option>Đề xuất tính năng mới</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-[#56657a]">Chia sẻ cảm nghĩ / góp ý của bạn</span>
                <textarea
                  className="min-h-24 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-xs leading-5 text-[#172033] outline-none focus:border-blue-500"
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Điều gì tốt, điều gì còn thiếu hoặc cần cải thiện?"
                  required
                  value={form.message}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-[#56657a]">Email phản hồi (không bắt buộc)</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#172033] outline-none focus:border-blue-500"
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="name@example.com"
                  type="email"
                  value={form.email}
                />
              </label>

              {status === 'SENT' && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-center text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="font-extrabold text-emerald-800 flex items-center justify-center gap-1.5 text-sm">
                    <span>✓ Đã lưu góp ý vào Database thành công!</span>
                  </div>
                  <p className="text-emerald-700 text-[11px] leading-relaxed">
                    Mã lưu trữ: <strong>#{lastSavedId}</strong> · Dữ liệu đã được ghi vào Local Database và sẵn sàng trích xuất.
                  </p>
                  <div className="flex gap-2 justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setView('DATABASE')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
                    >
                      Xem trong Database ({databaseEntries.length}) →
                    </button>
                    <button
                      type="button"
                      onClick={() => setPanelOpen(false)}
                      className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-xl font-bold text-xs hover:bg-emerald-50 transition"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}

              <button
                className="flex min-h-10 w-full items-center justify-center rounded-xl bg-[#1d4ed8] text-xs font-bold text-white shadow-md transition hover:bg-[#1e40af] disabled:opacity-50 cursor-pointer"
                disabled={status === 'SENDING' || form.message.trim().length < 3}
                type="submit"
              >
                {status === 'SENDING' ? 'Đang lưu vào database…' : 'Gửi góp ý cho team UniView →'}
              </button>
            </form>
          )}

          {/* VIEW 2: DATABASE VIEWER */}
          {view === 'DATABASE' && (
            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">
                  Cơ sở dữ liệu ({databaseEntries.length} bản ghi)
                </span>
                {typeof window !== 'undefined' && window.downloadUniViewFeedback && (
                  <button
                    type="button"
                    onClick={() => window.downloadUniViewFeedback()}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1d4ed8] hover:underline bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <span>📥 Tải JSON</span>
                  </button>
                )}
              </div>

              {databaseEntries.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  Chưa có góp ý nào trong database. Hãy gửi góp ý đầu tiên nhé!
                </div>
              ) : (
                <div className="space-y-2.5 divide-y divide-slate-100">
                  {databaseEntries.map((entry, idx) => (
                    <div key={entry.id || idx} className="pt-2 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#172033]">{entry.userName || 'Người dùng'}</span>
                        <span className="text-amber-500 font-bold">{'★'.repeat(entry.rating || 5)}</span>
                      </div>
                      <div className="text-[11px] text-blue-700 font-semibold">{entry.category}</div>
                      <p className="text-slate-700 bg-slate-50 p-2 rounded-xl text-xs leading-relaxed">
                        {entry.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{entry.email || 'Ẩn danh'}</span>
                        <span>{entry.createdAt ? new Date(entry.createdAt).toLocaleString('vi-VN') : 'Vừa xong'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setView('FORM')}
                className="w-full mt-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                ← Quay lại viết góp ý mới
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cụm Linh vật đứng nguyên bản + Bong bóng lời thoại */}
      <div className="flex items-end gap-3">
        {/* Bong bóng câu hỏi của Linh vật */}
        {bubbleOpen && !panelOpen && (
          <div className="relative max-w-[280px] rounded-3xl rounded-br-sm bg-[#172033] p-4 text-xs font-bold leading-relaxed text-white shadow-[0_16px_36px_rgba(15,23,42,0.28)] transition-all animate-in fade-in slide-in-from-right-2">
            <button
              aria-label="Tắt câu hỏi"
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
              onClick={() => setBubbleOpen(false)}
              type="button"
            >
              ×
            </button>
            <div className="cursor-pointer pr-4" onClick={openPanel}>
              <p className="text-[11px] font-medium text-blue-200">Meow meow! 🐾 UniView nhắn nè:</p>
              <p className="mt-1 text-xs text-white">{PROMPTS[promptIndex]}</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-600/80 px-2.5 py-0.5 text-[11px] font-semibold text-white hover:bg-blue-600">
                Bấm vào đây để góp ý ✍️
              </span>
            </div>
          </div>
        )}

        {/* Linh vật mèo đứng nguyên vẹn như thiết kế gốc của bạn Duy */}
        <div
          className="group relative cursor-pointer select-none transition-transform duration-150 ease-out"
          style={{ transform: `translate3d(0, ${bobOffset}px, 0)` }}
          onClick={() => {
            if (panelOpen) setPanelOpen(false)
            else openPanel()
          }}
          title="Bấm vào mình để gửi góp ý cho team nhé!"
        >
          <img
            alt="Linh vật mèo UniView"
            className="h-28 w-28 object-contain drop-shadow-[0_18px_20px_rgba(29,78,216,0.28)] transition-transform group-hover:scale-105 sm:h-32 sm:w-32"
            draggable="false"
            src={mascotImage}
          />
          {/* Badge nhỏ thông báo nếu bong bóng đang đóng */}
          {!bubbleOpen && !panelOpen && (
            <span className="absolute right-1 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-black text-white shadow-md ring-2 ring-white animate-bounce">
              💬
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}

export default FloatingMascot
