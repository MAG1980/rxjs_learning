import { interval, Observable } from "rxjs";

//Названия переменных, содержащих lazy push collections, должно оканчиваться на $.
//Если Promise принимает функции resolve и reject, то
//subscriber реализует методы next, error и complete.

//Пример custom Observable
const sequence1$ = new Observable((subscriber) => {
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
  return () => {
    console.log('unsubscribe')
    clearInterval(intervalId)
  }
})

/*Если не подписаться на LPC,
  то поток макрозадач заканчивается,
  но ничего не происходит.*/

const subscription = sequence1$.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('complete'))

setTimeout(() => subscription.unsubscribe(), 3000)

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

const sequence2$ = interval(1000)

/*Вызов метода subscribe у потока возвращает объект подписки,
  с помощью которого подписку можно отменить вызовом метода unsubscribe
  Отмена подписки не приводит к остановке потока.
  При этом подписчик перестаёт прослушивать данный поток.
*/
const subscriber1 = sequence2$.subscribe(value=>console.log('Subscription1 ', value))
const subscriber2 = sequence2$.subscribe(value=>console.log('Subscription2 ', value))

setTimeout(()=>subscriber1.unsubscribe(), 3000)