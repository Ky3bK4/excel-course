import {$} from './../../core/dom'

export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($elem) {
    this.clear()
    this.group.push($elem)
    $elem.focus().addClass(TableSelection.className)
    this.current = $elem
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
  
  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}