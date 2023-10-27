//cb / promise / generator / async - await

//Promise отлично работает с едниничными значениями
const sequencePromise = new Promise((res) => {
    let count = 1
    setInterval(() =>
      res(count++))
  }
)

sequencePromise.then((value) => console.log(value)) // 1
sequencePromise.then((value) => console.log(value)) // 1


//Function Generators позволяют работать с множественными значениями.
function* iteratorFn() {
  let item = 1
  while (true) {
    yield(item++)
  }
}

const sequenceGenerator = iteratorFn()

console.log(sequenceGenerator.next().value)
console.log(sequenceGenerator.next().value)
console.log(sequenceGenerator.next().value)
console.log(sequenceGenerator.next().value)

//Недостаток генераторов - чтобы получить новое значение, его нужно запросить, кроме того, они выполняются синхронно.
//Генераторы не позволяют подписаться на изменение величины.

//RxJS позволяет совместить преимущества промисов и генераторов: подписаться на изменение величины и асинхронно
// поочерёдно получать значения lazy push collection.


