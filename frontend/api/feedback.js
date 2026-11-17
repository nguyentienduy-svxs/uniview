const FEEDBACK_EMAIL = 'lamhuynhhueman.ptht@gmail.com'

function json(response, status, body) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

async function saveToSupabase(entry) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return { configured: false }
  const response = await fetch(`${url}/rest/v1/feedback`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      id: entry.id,
      user_id: entry.userId || null,
      user_name: entry.userName,
      email: entry.email || null,
      rating: entry.rating,
      category: entry.category,
      message: entry.message,
      page: entry.page,
      created_at: entry.createdAt,
    }),
  })
  if (!response.ok) throw new Error(`SUPABASE_${response.status}`)
  return { configured: true }
}

async function sendEmail(entry) {
  if (process.env.SEND_FEEDBACK_EMAILS === 'false') {
    return { disabled: true }
  }

  const excelLink = process.env.VITE_APP_URL
    ? `${process.env.VITE_APP_URL}/feedbacks-export.xlsx`
    : 'https://uniview.vn/feedbacks-export.xlsx'

  const senderType = entry.userId ? 'Đã đăng nhập' : 'Chưa đăng nhập (Khách)'
  const emailContent = `Có phản hồi mới từ người dùng trên UniView:
- Người gửi: ${entry.userName || 'Khách vãng lai'} (${senderType})
- Email liên hệ: ${entry.email || 'Không cung cấp'}
- Đánh giá: ${entry.rating}/5 sao
- Nhóm góp ý: ${entry.category || 'Trải nghiệm chung'}
- Trang gửi: ${entry.page || 'Trang chủ'}
- Nội dung góp ý:
${entry.message}

---------------------------------------------------
📊 File Excel (.xlsx) tổng hợp toàn bộ phản hồi:
${excelLink}
(Dữ liệu cũng được ghi tự động vào file feedbacks-export.xlsx trong thư mục dự án)`

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FEEDBACK_FROM_EMAIL || 'UniView Feedback <onboarding@resend.dev>',
        to: [FEEDBACK_EMAIL],
        subject: `[UniView Feedback] ${entry.category} · ${entry.rating}/5 sao`,
        text: emailContent,
      }),
    })
    if (!response.ok) throw new Error(`RESEND_${response.status}`)
    return { provider: 'resend' }
  }

  const response = await fetch(`https://formsubmit.co/ajax/${FEEDBACK_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `[UniView Feedback] ${entry.category} · ${entry.rating}/5`,
      _template: 'table',
      _captcha: 'false',
      'Người gửi': `${entry.userName || 'Khách vãng lai'} (${senderType})`,
      Email: entry.email || 'Không cung cấp',
      'Đánh giá': `${entry.rating}/5 sao`,
      'Nhóm góp ý': entry.category,
      'Nội dung': entry.message,
      'Trang gửi': entry.page,
      'Thời gian': entry.createdAt,
      'File Excel tổng hợp': excelLink,
    }),
  })
  if (!response.ok) throw new Error(`FORMSUBMIT_${response.status}`)
  return { provider: 'formsubmit' }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return json(response, 405, { error: 'METHOD_NOT_ALLOWED' })
  const entry = request.body
  if (!entry?.message || String(entry.message).trim().length < 3) return json(response, 400, { error: 'MESSAGE_TOO_SHORT' })
  if (!Number.isInteger(entry.rating) || entry.rating < 1 || entry.rating > 5) return json(response, 400, { error: 'INVALID_RATING' })

  const results = await Promise.allSettled([saveToSupabase(entry), sendEmail(entry)])
  const database = results[0].status === 'fulfilled' ? results[0].value : { configured: true, error: results[0].reason?.message }
  const email = results[1].status === 'fulfilled' ? results[1].value : { error: results[1].reason?.message }
  if (database.error && email.error) return json(response, 502, { error: 'FEEDBACK_DELIVERY_FAILED', database, email })
  return json(response, 200, { ok: true, database, email })
}
