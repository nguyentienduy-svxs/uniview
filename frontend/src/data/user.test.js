import assert from 'node:assert/strict'
import test from 'node:test'

import { DEMO_ACCOUNTS, getDemoAccount } from './user.js'
import { clearUserWorkspaceStorage, USER_WORKSPACE_STORAGE_KEYS } from '../utils/userWorkspaceStorage.js'

test('không nhúng tài khoản hoặc mật khẩu pitching vào frontend', () => {
  assert.deepEqual(DEMO_ACCOUNTS, [])
})

test('đăng nhập demo cũ không còn được xử lý cục bộ', () => {
  assert.equal(getDemoAccount('chiduy', 'ChiDuy@2026'), null)
  assert.equal(getDemoAccount('minhanh', 'MinhAnh@2026'), null)
})

test('đăng xuất xóa dữ liệu workspace nhưng giữ dữ liệu không liên quan', () => {
  const values = new Map([
    ...USER_WORKSPACE_STORAGE_KEYS.map((key) => [key, 'saved']),
    ['uniview-feedback-submitted', 'true'],
  ])
  const storage = {
    removeItem(key) {
      values.delete(key)
    },
  }

  clearUserWorkspaceStorage(storage)

  USER_WORKSPACE_STORAGE_KEYS.forEach((key) => assert.equal(values.has(key), false))
  assert.equal(values.get('uniview-feedback-submitted'), 'true')
})
