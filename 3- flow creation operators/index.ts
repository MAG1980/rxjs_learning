import { defer, from, iif, of } from "rxjs";
import { ajax } from "rxjs/internal/ajax/ajax";

const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
/*Логика работы с RxJS заключается в работе с Observable:
создании потоков, их трансформации, создании вспомогательных потоков и комбинировании их*/

//Наиболее часто используемые операторы:
// of() - создаёт холодный поток из ряда значений

const sequence6$ = of(1, 2, 3)
sequence6$.subscribe((value) => console.log("of (row): ", value))

// from() - Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.
const sequence7$ = from([1, 2, 3])
sequence7$.subscribe((value) => console.log("from (Array): ", value))


/*Пример создания холодного потока из Promise. Оператор from() позволяет перейти от Promise к потоку
(преобразовать Promise в поток).*/
const sequence8$ = from(fetch(apiUrl).then(post => post.json()))
sequence8$.subscribe((value) => console.log("from (Promise): ", value))


/*Проверяет логическое значение во время подписки и выбирает один из двух наблюдаемых источников.
iif ожидает функцию, которая возвращает логическое значение (функция условия),
и два источника: trueResult и falseResult, а также возвращает Observable.
В момент подписки вызывается функция условия.
Если результат равен true, подписка будет на источник, переданный как trueResult,
в противном случае подписка будет на источник, переданный как falseResult.
Если вам нужно проверить более двух вариантов, чтобы выбрать между более чем одним наблюдаемым, взгляните на метод создания отсрочки.
*/
const random = Math.round(Math.random() * 10)
const sequence9$ = iif(() => random > 5, sequence7$, sequence8$)
console.log("Random = ", random, " ", Boolean(random > 5))
sequence9$.subscribe((value) => console.log("iif: ", value))

/*Создает Observable, который при подписке вызывает фабрику Observable, чтобы создать Observable для каждого нового Observer.*/
const sequence10$ = defer(
  () => random > 5
    ? random >= 8
      ? of('Value >= 8')
      : of('Value > 5 < 8')
    : of('Value < 5')
)

/*Создает наблюдаемый объект, который по умолчанию будет выполнять запрос AJAX,
используя XMLHttpRequest в глобальной области видимости.*/
sequence10$.subscribe((value) => console.log("defer (factory): ", value))

const sequence11$ = ajax(apiUrl)
sequence11$.subscribe((value) => console.log("ajax: ", value))


/*fromEvent создает Observable, который генерирует события определенного типа, поступающие от заданной цели события.
Создает Observable из событий DOM, событий Node.js EventEmitter или других.
fromEvent принимает в качестве первого аргумента цель события,
которая представляет собой объект с методами для регистрации функций обработчика событий.*/
//fromEvent()


/*
RxJS служит не только для создания потоков, но и для их трансформации.
Для трансформации данных служат такие операторы, как map().
*/
/*Пример преобразования Promise, возвращающего данные,
хранящиеся в файле, в поток с помощью from fs.readFile
Команда для запуска примера:
  npx ts-node fileRead.ts
 */
