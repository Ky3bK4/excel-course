export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Уведомляем слушателей если они есть
  emit(event, ...args) {
    this.listeners[event].forEach(listener => {
      if (!Array.isArray(this.listeners[event])) {
        return false
      }
      listener(...args)
    })
    return true
  }
  // on, listen
  // Подписываемся на уведомление
  // Добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = 
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
