import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import mascotImage from '../assets/UniView_DUNG_MEO_TRONG_ANH_chop_mat_cuoi.webp'
import { useAuth } from '../context/AuthContext'

function Field({ autoComplete, label, onChange, placeholder, type = 'text', value }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-[#172033]">{label}</span>
      <input
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#172033] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        onChange={onChange}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
    </label>
  )
}

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      await register(form)
      navigate('/assessment', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#fffdfb] px-3 sm:px-6 py-4 sm:py-6 flex items-center justify-center font-['Be_Vietnam_Pro']">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_18px_60px_rgba(23,32,51,.08)] lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-[#f1f3ff] p-5 sm:p-7 md:p-8">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase text-blue-700">
              Bắt đầu với UniView
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black leading-tight text-[#172033]">
              Tạo hồ sơ khám phá của riêng bạn
            </h1>
            <p className="mt-2 text-xs sm:text-sm leading-6 text-[#56657a]">
              Đăng ký để làm assessment, nhận báo cáo và xuất PDF theo đúng dữ liệu bạn cung cấp.
            </p>
          </div>

          <div className="relative mt-4 flex min-h-40 items-end justify-center rounded-2xl bg-white/75 p-4">
            <img alt="Linh vật UniView" className="h-36 w-36 object-contain drop-shadow-xl" src={mascotImage} />
            <span className="absolute left-3 top-3 rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-blue-700 shadow-2xs">
              Assessment cá nhân hóa
            </span>
            <span className="absolute bottom-3 right-3 rounded-lg bg-[#fff5db] px-2.5 py-1 text-[11px] font-bold text-amber-800 shadow-2xs">
              Báo cáo &amp; PDF riêng
            </span>
          </div>
        </section>

        <section className="p-5 sm:p-7 md:p-8 flex flex-col justify-center">
          <p className="text-[11px] font-black uppercase text-blue-700">Tài khoản trải nghiệm miễn phí</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#172033]">Tạo tài khoản</h2>
          <p className="mt-1 text-xs leading-5 text-[#56657a]">
            Chỉ cần thông tin đăng nhập. Bạn sẽ cập nhật điểm và điều kiện cá nhân trong bài assessment.
          </p>

          <form className="mt-4 space-y-3" onSubmit={submit}>
            <Field autoComplete="name" label="Họ và tên" onChange={update('fullName')} placeholder="Nguyễn Minh Anh" value={form.fullName} />
            <Field autoComplete="email" label="Email" onChange={update('email')} placeholder="name@example.com" type="email" value={form.email} />
            <Field autoComplete="new-password" label="Mật khẩu" onChange={update('password')} placeholder="Ít nhất 8 ký tự" type="password" value={form.password} />
            
            {error && (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" role="alert">
                {error}
              </p>
            )}

            <button
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#1d4ed8] px-5 text-xs sm:text-sm font-black text-white shadow-md transition hover:bg-[#1e40af] disabled:cursor-wait disabled:opacity-60 cursor-pointer"
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Đang tạo tài khoản…' : 'Tạo tài khoản và làm assessment →'}
            </button>
          </form>

          <div className="mt-3.5 rounded-xl bg-[#f7f9fc] p-3 text-[11px] leading-relaxed text-[#56657a]">
            <strong className="text-[#172033]">Dữ liệu của bạn:</strong> tài khoản trải nghiệm được lưu riêng trên thiết bị này, không bị ghi đè hay dính tài khoản demo.
          </div>

          <p className="mt-4 text-center text-xs text-[#56657a]">
            Đã có tài khoản?{' '}
            <Link className="font-black text-blue-700 hover:underline" to="/login">
              Đăng nhập ngay
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default RegisterPage
