export const USER_WORKSPACE_STORAGE_KEYS = [
  'uniview:saved:universities',
  'uniview:comparison:universities',
  'uniview:comparison:profile',
  'uniview:comparison:majors',
  'uniview:comparison:notes',
  'uniview:decision-board:universities',
  'uniview:shortlist:criteria',
]

export function clearUserWorkspaceStorage(storage = window.localStorage) {
  USER_WORKSPACE_STORAGE_KEYS.forEach((key) => storage.removeItem(key))
}
