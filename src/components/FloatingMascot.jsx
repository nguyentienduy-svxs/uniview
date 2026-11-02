import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { feedbackApi } from '../api/feedbackApi'
import mascotImage from '../assets/UniView_DUNG_MEO_TRONG_ANH_chop_mat_cuoi.webp'
import { useAuth } from '../context/AuthContext'

const FEEDBACK_SUBMITTED_KEY = 'uniview_feedback_sent_v1'

const PROMPTS = [
  'Cậu thấy website tớ như nào? Có thể ghi cải thiện góp ý giúp team tớ được không? ✨',
  'Có bước nào khiến cậu khó hiểu hoặc chưa thuận tiện không? Chia sẻ cho tớ nhé! 🐾',
  'Trước khi cậu rời đi, team tớ rất muốn lắng nghe thêm một điều nên cải thiện.',
]

function FloatingMascot() {
  const location = useLocation()
  const { user } = useAuth()
  const [promptIndex, setPromptIndex] = useState(0)

  // Kiểm tra người dùng đã từng gửi góp ý chưa (nếu đã gửi thì không spam hỏi lại)
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(FEEDBACK_SUBMITTED_KEY) === 'true'
  })

  const [bubbleOpen, setBubbleOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.localStorage.getItem(FEEDBACK_SUBMITTED_KEY) !== 'true'
  })

  const [panelOpen, setPanelOpen] = useState(false)
  const timerRefs = useRef([])

  const [form, setForm] = useState({
    category: 'Trải nghiệm chung',
    email: user?.email ?? '',
    message: '',
    rating: 5,
  })
  const [status, setStatus] = useState('IDLE') // 'IDLE' | 'SENDING' | 'SENT'

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

  // Hẹn giờ đổi câu hỏi (chỉ chạy khi người dùng CHƯA gửi góp ý, tránh spam)
  useEffect(() => {
    if (hasSubmitted) return

    const secondTimer = window.setTimeout(() => {
      if (window.localStorage.getItem(FEEDBACK_SUBMITTED_KEY) !== 'true') {
        setPromptIndex(1)
        setBubbleOpen(true)
      }
    }, 3 * 60 * 1000)

    const finalTimer = window.setTimeout(() => {
      if (window.localStorage.getItem(FEEDBACK_SUBMITTED_KEY) !== 'true') {
        setPromptIndex(2)
        setBubbleOpen(true)
      }
    }, 8 * 60 * 1000)

    timerRefs.current = [secondTimer, finalTimer]

    return () => {
      window.clearTimeout(secondTimer)
      window.clearTimeout(finalTimer)
    }
  }, [hasSubmitted])

  const openPanel = () => {
    setForm((current) => ({
      ...current,
      email: current.email || user?.email || '',
    }))
    setStatus('IDLE')
    setPanelOpen(true)
    setBubbleOpen(false)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (form.message.trim().length < 3 || status === 'SENDING') return
    setStatus('SENDING')

    const displayName = user?.fullName
      || (form.email.trim() ? form.email.trim() : 'Khách vãng lai (Chưa đăng nhập)')

    await feedbackApi.submit({
      ...form,
      email: form.email.trim(),
      message: form.message.trim(),
      page: `${location.pathname}${location.search}`,
      userId: user?.id ?? null,
      userName: displayName,
      isGuest: !user,
    })

    // Đã gửi thành công -> ghi nhớ để không spam bubble nữa
    setHasSubmitted(true)
    try {
      window.localStorage.setItem(FEEDBACK_SUBMITTED_KEY, 'true')
    } catch {}

    timerRefs.current.forEach((timerId) => window.clearTimeout(timerId))
    setBubbleOpen(false)
    setStatus('SENT')
    setForm((current) => ({ ...current, message: '' }))

    // Tự động đóng popup sau 2.5s cảm ơn
    window.setTimeout(() => {
      setPanelOpen(false)
      setStatus('IDLE')
    }, 2500)
  }

  return (
    <aside
      className="fixed bottom-4 right-3 z-[80] flex flex-col items-end sm:bottom-6 sm:right-6 font-['Be_Vietnam_Pro']"
      aria-label="Linh vật UniView và hòm thư góp ý"
    >
      {/* Popup Form Góp Ý */}
      {panelOpen && (
        <div className="mb-3 w-[min(380px,calc(100vw-24px))] overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-200">
          <header className="flex items-center justify-between bg-gradient-to-r from-[#172033] to-[#1e293b] px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🐱</span>
              <div>
                <strong className="block text-sm font-bold">
                  {hasSubmitted ? 'Góp ý thêm cho team UniView' : 'Góp ý cho team UniView'}
                </strong>
                <span className="text-[11px] text-slate-300">
                  Mỗi chia sẻ giúp tụi mình cải thiện tốt hơn.
                </span>
              </div>
            </div>

            <button
              aria-label="Đóng popup"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              onClick={() => {
                setPanelOpen(false)
                setStatus('IDLE')
              }}
              type="button"
            >
              ×
            </button>
          </header>

          {status === 'SENT' ? (
            <div className="p-6 text-center space-y-3 animate-in fade-in duration-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Cảm ơn bạn rất nhiều!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Góp ý của bạn đã được ghi nhận. Team UniView sẽ trân trọng lắng nghe để nâng cấp website tốt hơn.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPanelOpen(false)
                    setStatus('IDLE')
                  }}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition shadow-sm cursor-pointer"
                >
                  Đã hiểu &amp; Đóng
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-3.5 p-5" onSubmit={submit}>
              <div>
                <span className="block text-xs font-bold text-[#56657a]">Mức độ hài lòng của bạn</span>
                <div className="mt-1.5 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      aria-label={`${value} sao`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition cursor-pointer ${
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
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-[#172033] outline-none focus:border-blue-500 cursor-pointer"
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

              <button
                className="flex min-h-10 w-full items-center justify-center rounded-xl bg-[#1d4ed8] text-xs font-bold text-white shadow-md transition hover:bg-[#1e40af] disabled:opacity-50 cursor-pointer"
                disabled={status === 'SENDING' || form.message.trim().length < 3}
                type="submit"
              >
                {status === 'SENDING' ? 'Đang gửi góp ý…' : 'Gửi góp ý cho team UniView →'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Cụm Linh vật đứng nguyên bản + Bong bóng lời thoại */}
      <div className="flex items-end gap-3">
        {/* Bong bóng câu hỏi của Linh vật (chỉ hiển thị khi chưa gửi góp ý và bong bóng đang mở) */}
        {bubbleOpen && !panelOpen && !hasSubmitted && (
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
            if (panelOpen) {
              setPanelOpen(false)
            } else {
              openPanel()
            }
          }}
          title={hasSubmitted ? "Bấm vào mình nếu bạn muốn góp ý thêm nhé!" : "Bấm vào mình để gửi góp ý cho team nhé!"}
        >
          <img
            alt="Linh vật mèo UniView"
            className="h-28 w-28 object-contain drop-shadow-[0_18px_20px_rgba(29,78,216,0.28)] transition-transform group-hover:scale-105 sm:h-32 sm:w-32"
            draggable="false"
            src={mascotImage}
          />
          {/* Badge nhỏ nếu có thông báo và bong bóng chưa tắt */}
          {!bubbleOpen && !panelOpen && !hasSubmitted && (
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
