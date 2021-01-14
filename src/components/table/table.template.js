const CODES = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function(_, col) {
    return `
    <div 
      class="cell"
      data-col="${col}"
      data-type="cell"
      data-id="${row}:${col}"
      contenteditable=""
    ></div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(count, content) {
  const resizer = count 
    ? '<div class="row-resize" data-resize="row"></div>' 
    : ''
  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
        ${count ? count : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

 
  rows.push(createRow(null, cols))
  for ( let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(i))
      .join('')
    rows.push(createRow(i+1, cells))
  }
  
  return rows.join('')
}