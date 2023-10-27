import { Observable } from "rxjs";

//Названия переменных, содержащих lazy push collections, должно оканчиваться на $.
//Если Promise принимает функции resolve и reject, то
//subscriber реализует методы next, error и complete.

//Пример custom Observable
const sequence$ = new Observable((subscriber) => {
  let count = 1
  const intervalId = setInterval(() => {
    if (count % 5 === 0) {
      clearInterval(intervalId)
      //Заканчивает коллекцию (делает поток конечным)
      subscriber.complete()
      return
    }
    subscriber.next(count++)
  }, 1000)

  //Срабатывает при вызове метода unsubscribe у подписчика
  return ()=>{
    console.log('unsubscribe')
    clearInterval(intervalId)
  }
})

/*Если не подписаться на LPC,
  то поток макрозадач заканчивается,
  но ничего не происходит.*/

const subscription = sequence$.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('complete'))

setTimeout(()=>subscription.unsubscribe(), 3000)

/*
При работе с Observable следует понять, является ли поток,
 с которым производится работа, конечным или нет.
 Например, поток Get запроса на сервер является конечным,
 а поток запросов на сервер по протоколу WebSocket или
 поток, формирующийся из значений, вводимых в input, - нет.
 */

/*Создавать кастомные Observable обычно не приходится,
  т.к. RxJS обладает богатым набором операторов создания,
  а также встроенных методов для работы с Observable.*/
