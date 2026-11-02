import assert from 'node:assert/strict'
import test from 'node:test'

import { DEMO_ACCOUNTS, getDemoAccount } from './user.js'

test('chỉ công khai một tài khoản demo Minh Anh', () => {
  assert.equal(DEMO_ACCOUNTS.length, 1)
  assert.equal(DEMO_ACCOUNTS[0].username, 'minhanh')
  assert.equal(DEMO_ACCOUNTS[0].session.user.fullName, 'Nguyễn Minh Anh')
  assert.equal(DEMO_ACCOUNTS[0].session.user.isDemo, true)
})

test('không còn đăng nhập được các tài khoản demo cũ', () => {
  assert.equal(getDemoAccount('chiduy', 'ChiDuy@2026'), null)
  assert.ok(getDemoAccount('minhanh', 'MinhAnh@2026'))
})
