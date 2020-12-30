// eslint-disable-next-line no-unused-vars
import { capitalize } from './utils'


// Класс для работы с dom слушателями
export class DomListener {
  constructor($root, listeners = []) {
    // Выброс ошибки если не передан $root
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      // console.log(this[method])
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${listener} is not defined on ${this.name}`)
      }
      this.$root.on(listener, this[method] = this[method].bind(this))
    })
  }


  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // if (!this[method]) {
      //   throw new Error(`Method ${listener} is not defined on ${this.name}`)
      // }
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}