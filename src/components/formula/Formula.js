import { ExcelComponent } from '@/core/ExcelComponent';
import { setCursor } from '../../core/utils';
// Создание компонента
export class Formula extends ExcelComponent {
  // Статика для того что бы можно было взять данные до создания экземпляра
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    const $formula = this.$root.find('#formula')
    this.$on('table:input', text => $formula.text(text))

    this.$on('table:click-cell', event => {
      $formula.text(event.target.textContent)
    })

    this.$on('table:select', currentElement => {
      $formula.text(currentElement.text())
      if (currentElement.text()) {
        setCursor(currentElement, 1)
      }
    })
  }
  
  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      this.$emit('formula:submit', event)
    }
  }
}