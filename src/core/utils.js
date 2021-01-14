export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }

  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => index + start)
}

export function setCursor(selector, point) {
  const range = document.createRange()
  const sel = window.getSelection()
  range.setStart(selector.$el, point)
  sel.removeAllRanges()
  sel.addRange(range)
}