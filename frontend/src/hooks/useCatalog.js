import { useEffect, useState } from 'react'
import { apiRequest } from '../api/apiClient'
import { useDataMode } from '../context/DataModeContext'

export function useCatalog(kind) {
  const { isRealMode } = useDataMode()
  const [state, setState] = useState({ rows: [], loading: isRealMode, error: null })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (!isRealMode) return
    const controller = new AbortController()
    setState({ rows: [], loading: true, error: null })
    apiRequest(`/${kind}`, { signal: controller.signal })
      .then((rows) => {
        if (!Array.isArray(rows)) throw new Error('Phản hồi danh sách không hợp lệ')
        if (!controller.signal.aborted) setState({ rows, loading: false, error: null })
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ rows: [], loading: false, error })
      })
    return () => controller.abort()
  }, [isRealMode, kind, attempt])
  return { ...state, retry: () => setAttempt((value) => value + 1) }
}
