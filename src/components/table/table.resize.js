import {$} from '../../core/dom'


export default function resizeHandler($root, event) {
  const type = event.target.dataset.resize
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const coords = $parent.getCoords()
  const Rcoords = $resizer.getCoords()
  const index = $parent.data.col
  const cells = $root.findAll(`[data-col="${index}"]`)

  if (type === 'col') {
    const resizerStartPos = window.getComputedStyle($resizer.$el).right;
    document.onmousemove = e => {
      const Rdelta = e.pageX - Rcoords.left
      $resizer.css({right: -Rdelta + 'px'})

      document.onmouseup = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta

        window.getSelection().removeAllRanges()

        cells.forEach(cell => $(cell).css({width: value + 'px'}))
        $resizer.css({right: resizerStartPos})

        document.onmousemove = null
        document.onmouseup = null
      }
    }
  } else {
    const resizerStartPos = window.getComputedStyle($resizer.$el).bottom;
    document.onmousemove = e => {
      const Rdelta = e.clientY - Rcoords.top
      $resizer.css({bottom: -Rdelta + 'px'})
      window.getSelection().removeAllRanges()
      document.onmouseup = e => {
        const delta = e.clientY - coords.bottom
        const value = coords.height + delta
        $resizer.css({bottom: resizerStartPos})
        $parent.css({height: value + 'px'})
  
        document.onmousemove = null
        document.onmouseup = null
      }
    } 
  }
  document.onmouseup = e => {
    document.onmousemove = null
    document.onmouseup = null
  }
}