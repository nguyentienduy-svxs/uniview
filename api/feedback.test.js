import assert from 'node:assert/strict'
import test from 'node:test'

import handler from './feedback.js'

function responseRecorder() {
  return {
    body: '',
    headers: {},
    statusCode: 0,
    setHeader(name, value) { this.headers[name] = value },
    end(value) { this.body = value },
  }
}

test('feedback API từ chối method không phải POST', async () => {
  const response = responseRecorder()
  await handler({ method: 'GET' }, response)
  assert.equal(response.statusCode, 405)
})

test('feedback API validate nội dung và rating trước khi gửi', async () => {
  const response = responseRecorder()
  await handler({ method: 'POST', body: { message: 'ok', rating: 8 } }, response)
  assert.equal(response.statusCode, 400)
  assert.match(response.body, /MESSAGE_TOO_SHORT/)
})
