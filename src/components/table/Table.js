import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  constructor($root) {
    super( $root, {  
      name: Table,
      listeners: ['click']
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }

  onClick(event) {
    
  }
}