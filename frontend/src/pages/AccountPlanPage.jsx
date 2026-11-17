import { Navigate, useLocation } from 'react-router-dom'

export default function AccountPlanPage() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  params.set('tab', 'plans')
  return <Navigate to={'/profile?' + params} replace />
}
