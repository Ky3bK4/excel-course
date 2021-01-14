import { $ } from '@/core/dom';
import { Emitter } from '@/core/Emitter';
// Класс для создания excel элемента и переданых компонентов
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    // Присвоение опций в виде объекта если они имеются
    // Если нет то передача пустого массива
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  // Метод возращает элемент с уже готовым html компонентов
  getRoot() {
    // Создание корневого элемента 'div.excel'
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter
    }
    // Цикл прохода по переданым компонентам и создание экземпляра
    this.components = this.components.map(Component => {
      // Создание элем. 'div' с присвоением класса через
      // статическую переменную класса
      const $el = $.create('div', Component.className)
      // Создание экземпляра класса
      const component = new Component($el, componentOptions)
      // Добавление html с экземпляра
      // toHTML() - Возвращает верстку в строковом формате
      $el.html(component.toHTML())
      // Добавление элемента в корневой элемент
      $root.append($el)
      return component
    }) // Конец цикла
    
    return $root
  }


  // Метод вывода созданого элемента в переданный
  // элемент классу
  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}