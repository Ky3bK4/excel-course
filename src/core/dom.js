// Класс для работы с DOM элементами
// Class for working with DOM elements
class Dom {
  constructor(selector) {
    this.$el = typeof selector ==='string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    
    return this
  }
}
// Экспорт функции позволяющий вызывать методы 
// без определения экземпляра класа
export function $(selector) { 
  return new Dom(selector) 
}
// Метод создания элемента
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el);
}