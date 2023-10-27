//Паттерн Iterator стандартизует распределение данных во времени.
//Паттерн Iterator позволяет распределять данные во времени независимо от их формата (файлы,строки, числа, JSON -
// неважно)

//Паттерн Iterator основан на механизме перебора
//По умолчанию перебор объектов в JS не реализован (for in не в счёт)

//Для перебора объекта в JS необходимо создать кастомный итератор
class CustomIterator {
  /**
   * @param cursor  номер текущего элемента
   * @param value   значение текущего элемента
   * @param array
   * @param divisor номер элемента-разделителя
   */
  private cursor = 0
  private value: number

  constructor(private array: number[], private divisor: number = 1) {
  }

  //Возвращает элементы массива, за исключением делящихся на divisor без остатка
  public next() {
    while (this.cursor < this.array.length) {
      this.value = this.array[this.cursor++]
      if (this.value % this.divisor === 0) {
        return { done: false, value: this.value }
      }
    }
    return { done: true, value: this.value }
  }

  [Symbol.iterator]() {
    return {
      next: this.next.bind(this)
    }
  }
}

const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)

// console.log(consumer.next())   3
// console.log(consumer.next())   6
// console.log(consumer.next())   9
// console.log(consumer.next())   10
// console.log(consumer.next())   10

//Проверка возможности перебора объекта как обычного массива.
/*for (let item of consumer) {
  console.log(item)
}*/

//Проверка возможности создания массива из итерируемого объекта
Array.from(consumer).forEach(value => console.log(value))