import { ExcelComponent } from '../../core/ExcelComponent';
import { setCursor } from '../../core/utils';
import { createTable } from './table.template';
import resizeHandler from './table.resize.js';
import { isCell, matrix, shouldResize, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import {$} from '@/core/dom'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super( $root, {  
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(60)
  }
  
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:submit', event => {
      event.preventDefault()
      this.selection.current.focus()
      // Выставление каретки в конце строки
      setCursor(this.selection.current, 1)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      const current = this.selection.current
      if (event.shiftKey) {
        const $cells = matrix($target, current)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
        
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab', 
      'ArrowUp', 
      'ArrowDown', 
      'ArrowLeft', 
      'ArrowRight'
    ]

    const {key} = event 
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next)
    }
  }

  onInput(event) {
    const text = this.selection.current.text()
    this.$emit('table:input', text)
  }

  onClick(event) {
    if (event.target.getAttribute('data-type') === 'cell') {
      this.$emit('table:click-cell', event)
    }
  }
}

