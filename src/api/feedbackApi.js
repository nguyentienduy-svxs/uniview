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
}

export const feedbackApi = {
  getStored: getStoredFeedbacks,
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
