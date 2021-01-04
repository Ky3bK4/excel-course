import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import resizeHandler from './table.resize.js';
import { shouldResize } from './table.functions';

export class Table extends ExcelComponent {
  constructor($root) {
    super( $root, {  
      name: Table,
      listeners: ['mousedown']
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(60)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}