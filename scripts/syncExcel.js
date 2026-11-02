import fs from 'node:fs'
import path from 'node:path'
import { buildXlsxBuffer, generateExcelCsv } from './excelBuilder.js'

const feedbackFile = path.resolve('feedbacks-local-db.json')
const entries = fs.existsSync(feedbackFile)
  ? JSON.parse(fs.readFileSync(feedbackFile, 'utf8') || '[]')
  : []

const xlsxBuf = buildXlsxBuffer(entries)
const csvContent = generateExcelCsv(entries)

try {
  fs.writeFileSync('feedbacks-export.xlsx', xlsxBuf)
} catch (e) {
  console.warn('feedbacks-export.xlsx đang mở trong ứng dụng khác:', e.message)
}

try {
  fs.writeFileSync('feedbacks-export.csv', csvContent, 'utf8')
} catch (e) {
  console.warn('feedbacks-export.csv đang mở trong ứng dụng khác (Excel):', e.message)
}

if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true })

try {
  fs.writeFileSync('public/feedbacks-export.xlsx', xlsxBuf)
} catch {}

try {
  fs.writeFileSync('public/feedbacks-export.csv', csvContent, 'utf8')
} catch {}

console.log(`Đã xuất thành công ${entries.length} góp ý sang:`)
console.log(' - feedbacks-export.xlsx (Excel chuẩn chia cột và styling)')
console.log(' - feedbacks-export.csv (CSV có chỉ dẫn sep=,)')
