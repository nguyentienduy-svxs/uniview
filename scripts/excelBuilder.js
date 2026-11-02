import zlib from 'node:zlib'

const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  crcTable[n] = c >>> 0
}

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function zipFiles(fileMap) {
  const localHeaders = []
  const centralHeaders = []
  let offset = 0

  for (const [filePath, content] of Object.entries(fileMap)) {
    const filenameBuf = Buffer.from(filePath, 'utf8')
    const rawData = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8')
    const compressed = zlib.deflateRawSync(rawData)
    const crc = crc32(rawData)

    // Local file header (30 bytes)
    const localHeader = Buffer.alloc(30)
    localHeader.writeUInt32LE(0x04034b50, 0)
    localHeader.writeUInt16LE(20, 4) // version needed
    localHeader.writeUInt16LE(0x0800, 6) // UTF-8 filename flag
    localHeader.writeUInt16LE(8, 8) // deflate
    localHeader.writeUInt16LE(0, 10)
    localHeader.writeUInt16LE(0, 12)
    localHeader.writeUInt32LE(crc, 14)
    localHeader.writeUInt32LE(compressed.length, 18)
    localHeader.writeUInt32LE(rawData.length, 22)
    localHeader.writeUInt16LE(filenameBuf.length, 26)
    localHeader.writeUInt16LE(0, 28)

    const localChunk = Buffer.concat([localHeader, filenameBuf, compressed])
    localHeaders.push(localChunk)

    // Central directory header (46 bytes)
    const centralHeader = Buffer.alloc(46)
    centralHeader.writeUInt32LE(0x02014b50, 0)
    centralHeader.writeUInt16LE(20, 4) // version made by
    centralHeader.writeUInt16LE(20, 6) // version needed
    centralHeader.writeUInt16LE(0x0800, 8)
    centralHeader.writeUInt16LE(8, 10)
    centralHeader.writeUInt16LE(0, 12)
    centralHeader.writeUInt16LE(0, 14)
    centralHeader.writeUInt32LE(crc, 16)
    centralHeader.writeUInt32LE(compressed.length, 20)
    centralHeader.writeUInt32LE(rawData.length, 24)
    centralHeader.writeUInt16LE(filenameBuf.length, 28)
    centralHeader.writeUInt16LE(0, 30)
    centralHeader.writeUInt16LE(0, 32)
    centralHeader.writeUInt16LE(0, 34)
    centralHeader.writeUInt16LE(0, 36)
    centralHeader.writeUInt32LE(0, 38)
    centralHeader.writeUInt32LE(offset, 42)

    const centralChunk = Buffer.concat([centralHeader, filenameBuf])
    centralHeaders.push(centralChunk)

    offset += localChunk.length
  }

  const centralDir = Buffer.concat(centralHeaders)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(centralHeaders.length, 8)
  eocd.writeUInt16LE(centralHeaders.length, 10)
  eocd.writeUInt32LE(centralDir.length, 12)
  eocd.writeUInt32LE(offset, 16)
  eocd.writeUInt16LE(0, 20)

  return Buffer.concat([...localHeaders, centralDir, eocd])
}

function escapeXml(str) {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getColName(colIdx) {
  let name = ''
  let num = colIdx
  while (num >= 0) {
    name = String.fromCharCode((num % 26) + 65) + name
    num = Math.floor(num / 26) - 1
  }
  return name
}

export function buildXlsxBuffer(entries) {
  const headers = [
    { label: 'Mã góp ý (ID)', width: 22 },
    { label: 'Thời gian gửi', width: 22 },
    { label: 'Người gửi', width: 24 },
    { label: 'Email liên hệ', width: 28 },
    { label: 'Trạng thái', width: 24 },
    { label: 'Đánh giá', width: 14 },
    { label: 'Nhóm góp ý', width: 28 },
    { label: 'Trang gửi', width: 24 },
    { label: 'Nội dung góp ý', width: 55 },
  ]

  let sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>
`
  headers.forEach((h, i) => {
    sheetXml += `    <col min="${i + 1}" max="${i + 1}" width="${h.width}" customWidth="1"/>\n`
  })
  sheetXml += `  </cols>
  <sheetData>
    <row r="1" ht="28" customHeight="1">
`
  // Header row
  headers.forEach((h, colIdx) => {
    const cellRef = `${getColName(colIdx)}1`
    sheetXml += `      <c r="${cellRef}" t="inlineStr" s="1"><is><t>${escapeXml(h.label)}</t></is></c>\n`
  })
  sheetXml += `    </row>\n`

  // Data rows
  entries.forEach((item, rowIdx) => {
    const rowNum = rowIdx + 2
    const rawDate = item.createdAt || item.receivedAt
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      : ''
    const isLogged = item.userId ? 'Đã đăng nhập' : 'Khách vãng lai (Chưa đăng nhập)'
    const ratingStr = item.rating ? `${item.rating} / 5 ⭐` : ''

    const values = [
      item.id || '',
      formattedDate,
      item.userName || 'Khách vãng lai',
      item.email || 'Không để lại email',
      isLogged,
      ratingStr,
      item.category || 'Trải nghiệm chung',
      item.page || '',
      item.message || '',
    ]

    sheetXml += `    <row r="${rowNum}" ht="26" customHeight="1">\n`
    values.forEach((val, colIdx) => {
      const cellRef = `${getColName(colIdx)}${rowNum}`
      // Column 5 (rating) center; Column 8 (message) wrap text; others left
      const styleIdx = colIdx === 5 ? '3' : (colIdx === 8 ? '4' : '2')
      sheetXml += `      <c r="${cellRef}" t="inlineStr" s="${styleIdx}"><is><t>${escapeXml(val)}</t></is></c>\n`
    })
    sheetXml += `    </row>\n`
  })

  sheetXml += `  </sheetData>
</worksheet>`

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font>
      <sz val="11"/>
      <name val="Calibri"/>
      <color rgb="FF1E293B"/>
    </font>
    <font>
      <b/>
      <sz val="11"/>
      <name val="Calibri"/>
      <color rgb="FFFFFFFF"/>
    </font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill>
      <patternFill patternType="solid">
        <fgColor rgb="FF1D4ED8"/>
      </patternFill>
    </fill>
  </fills>
  <borders count="2">
    <border>
      <left/><right/><top/><bottom/><diagonal/>
    </border>
    <border>
      <left style="thin"><color rgb="FFE2E8F0"/></left>
      <right style="thin"><color rgb="FFE2E8F0"/></right>
      <top style="thin"><color rgb="FFE2E8F0"/></top>
      <bottom style="thin"><color rgb="FFE2E8F0"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="5">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <!-- 1: Header (Navy Blue background, bold white, center, border) -->
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center" wrapText="1"/>
    </xf>
    <!-- 2: Regular data row -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment vertical="center"/>
    </xf>
    <!-- 3: Center data row (rating) -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- 4: Message data row (wrap text) -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment vertical="center" wrapText="1"/>
    </xf>
  </cellXfs>
</styleSheet>`

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Góp Ý UniView" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`

  const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`

  return zipFiles({
    '[Content_Types].xml': contentTypesXml,
    '_rels/.rels': relsXml,
    'xl/_rels/workbook.xml.rels': workbookRelsXml,
    'xl/workbook.xml': workbookXml,
    'xl/styles.xml': stylesXml,
    'xl/worksheets/sheet1.xml': sheetXml,
  })
}

export function generateExcelCsv(entries) {
  // Thêm chỉ dẫn sep=, để Microsoft Excel trên Windows tự nhận diện dấu phẩy chia cột
  const headers = [
    'Mã góp ý (ID)',
    'Thời gian gửi',
    'Người gửi',
    'Email liên hệ',
    'Trạng thái đăng nhập',
    'Đánh giá (Sao)',
    'Nhóm góp ý',
    'Trang gửi',
    'Nội dung góp ý',
  ]
  const rows = entries.map((item) => {
    const rawDate = item.createdAt || item.receivedAt
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      : ''
    const isLogged = item.userId ? 'Đã đăng nhập' : 'Khách vãng lai (Chưa đăng nhập)'
    const cleanMsg = (item.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')
    return [
      item.id || '',
      formattedDate,
      item.userName || 'Khách vãng lai',
      item.email || 'Không để lại email',
      isLogged,
      item.rating ? `${item.rating}/5` : '',
      item.category || 'Trải nghiệm chung',
      item.page || '',
      cleanMsg,
    ].map((val) => `"${val}"`).join(',')
  })

  return 'sep=,\r\n\uFEFF' + [headers.map((h) => `"${h}"`).join(','), ...rows].join('\r\n')
}

