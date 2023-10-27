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


//RxJS позволяет работать со многими значениями во времени (multiply queries over time).
//При решении синхронных задач для этой цели используются массивы.
//Для решения асинхронных задач для работы со многими значениями во времени прекрасно подходит Observable RxJS.
//Использовать RxJS следует только при возникновении необходимости (для асинхронной работы со МНОГИМИ значениями во
// времени), когда применяется комплексная логика с большим количеством асинхронных событий.
//Для асинхронной работы с одиночными значениями прекрасно подходят Promise (async - await).
import {interval} from "rxjs"

interval(1000).subscribe((value)=>{
  console.log(value)
})
