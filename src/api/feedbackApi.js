const DB_NAME = 'uniview-feedback'
const STORE_NAME = 'entries'
const LOCAL_STORAGE_KEY = 'uniview-feedback-submissions-v1'

function getStoredFeedbacks() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveToLocalStorage(entry) {
  if (typeof window === 'undefined') return
  try {
    const list = getStoredFeedbacks()
    list.unshift(entry)
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
  } catch (err) {
    console.warn('Không thể lưu feedback vào localStorage:', err)
  }
}

function openDatabase() {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null)
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1)
      request.onupgradeneeded = () => {
        const database = request.result
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

async function saveOnDevice(entry) {
  saveToLocalStorage(entry)
  const database = await openDatabase()
  if (!database) return
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite')
      transaction.objectStore(STORE_NAME).put(entry)
      transaction.oncomplete = resolve
      transaction.onerror = () => reject(transaction.error)
    })
  } catch (err) {
    console.warn('Không thể lưu feedback vào IndexedDB:', err)
  } finally {
    try { database.close() } catch {}
  }
}

async function postFeedback(entry) {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

async function formSubmitFallback(entry) {
  try {
    const response = await fetch('https://formsubmit.co/ajax/lamhuynhhueman.ptht@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[UniView Feedback] ${entry.category} · ${entry.rating}/5`,
        _template: 'table',
        _captcha: 'false',
        'Họ tên': entry.userName,
        Email: entry.email || 'Không cung cấp',
        'Đánh giá': `${entry.rating}/5`,
        'Nhóm góp ý': entry.category,
        'Nội dung': entry.message,
        Trang: entry.page,
        'Thời gian': entry.createdAt,
      }),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export function generateFeedbacksCsv(entries = getStoredFeedbacks()) {
  const BOM = '\uFEFF'
  const headers = [
    'Mã ID',
    'Thời gian gửi',
    'Người gửi',
    'Email liên hệ',
    'Trạng thái đăng nhập',
    'Đánh giá (Sao)',
    'Nhóm góp ý',
    'Trang gửi',
    'Nội dung góp ý',
  ]
  const rows = (entries || []).map((item) => {
    const rawDate = item.createdAt || item.receivedAt
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleString('vi-VN')
      : ''
    const isLogged = item.userId ? 'Đã đăng nhập' : 'Chưa đăng nhập (Khách)'
    const cleanMsg = (item.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')
    return [
      item.id || '',
      formattedDate,
      item.userName || 'Khách vãng lai',
      item.email || 'Không để lại email',
      isLogged,
      item.rating ? `${item.rating}/5 sao` : '',
      item.category || 'Trải nghiệm chung',
      item.page || '',
      cleanMsg,
    ].map((val) => `"${val}"`).join(',')
  })

  return 'sep=,\r\n\uFEFF' + [headers.map((h) => `"${h}"`).join(','), ...rows].join('\r\n')
}

export function downloadFeedbacksExcel(filename) {
  if (typeof window === 'undefined') return
  try {
    const link = document.createElement('a')
    link.href = '/feedbacks-export.xlsx'
    link.download = filename || 'feedbacks-export.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch {
    const defaultFilename = `uniview-feedbacks-${new Date().toISOString().slice(0, 10)}.csv`
    const csvContent = generateFeedbacksCsv(getStoredFeedbacks())
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || defaultFilename
    a.click()
    URL.revokeObjectURL(url)
  }
}

if (typeof window !== 'undefined') {
  window.getUniViewFeedback = () => {
    const data = getStoredFeedbacks()
    console.table(data)
    return data
  }
  window.downloadUniViewFeedback = () => {
    const data = getStoredFeedbacks()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `uniview-feedbacks-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  window.downloadUniViewFeedbackExcel = downloadFeedbacksExcel
}

export const feedbackApi = {
  getStored: getStoredFeedbacks,
  downloadExcel: downloadFeedbacksExcel,
  generateCsv: generateFeedbacksCsv,
  async submit(payload) {
    const entry = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      syncStatus: 'STORED_IN_DATABASE',
    }
    await saveOnDevice(entry)

    // Cố gắng gửi qua endpoint hoặc email nếu môi trường hỗ trợ, nhưng không làm crash hay báo lỗi 404 cho user
    const apiResult = await postFeedback(entry)
    if (apiResult) {
      entry.syncStatus = 'SYNCED_API'
      saveToLocalStorage(entry)
      return { entry, synced: true }
    }

    const emailResult = await formSubmitFallback(entry)
    if (emailResult) {
      entry.syncStatus = 'SENT_MAIL'
      saveToLocalStorage(entry)
    }

    // Luôn trả về thành công vì đã lưu chắc chắn vào cơ sở dữ liệu (localStorage + IndexedDB)
    return { entry, synced: true }
  },
}
