import { debounceTime, filter, fromEvent, interval, map, skip, take, tap } from "rxjs";
/*
Marble diagram позволяют визуализировать процесс трансформации потоков.
Для лучшего понимания работы потоков нужно использовать Marble diagram.
https://rxmarbles.com/
Мраморные диаграммы (Marble diagram) — это способ визуального представления Observables.
Шарики представляют собой выдаваемое значение,
ход времени представлен слева направо,
вертикальная линия представляет завершение наблюдаемого,а X представляет ошибку.
С помощью только этих основных частей может быть представлен any Observable.
Чаще всего они используются, чтобы показать, как оператор преобразует Observable.
*/


const sequence12$ = interval(1000)
/*
  sequence12$   ---0---1---2---3---4---5---
    tap((v)=>{
      console.log(v)
      return [1,2,3,4,5]
    })
                ---0---1---2---3---4---5---
    filter((value) => value % 2 === 0),
                ---0---1---2---3---4---5---
    map((x)=>x**2)
   sequence12$  ---0--- ---4--- ---16--- ---
    skip(2)
                --- --- --- --- ---16--- ---
    take(1)
                --- --- --- --- ---16|
*/

//Для синхронного преобразования данных в потоке используется оператор map.
sequence12$.subscribe((value) => console.log("sequence12$: ", value))
sequence12$
  .pipe(
    //Оператор tap используется для создания сайд-эффектов (асинхронной логики).
    tap((v) => {
      console.log(v)
      return [1, 2, 3, 4, 5]
    }),
    //Оператор filter оставляет в потоке только значения удовлетворяющие условию.
    filter((value) => value % 2 === 0),
    //Для синхронного преобразования данных в потоке используется оператор map
    map(value => value ** 2),
    //Оператор skip принимает количество элементов, которые нужно пропустить
    skip(2),
    //Оператор take принимает номера элементов, которые нужно оставить.
    //Оператор take завершает поток.
    take(1)
  )
  .subscribe(
    (value) => console.log("sequence12$ result: ", value),
    () => {
    },
    () => console.log("Transformed sequence12$ is completed!"))

//Обработка данных, поступающих из HTML input, с помощью flow.
const element = document.querySelector('input') as HTMLInputElement
console.log(element)
fromEvent(element, 'input')
  .subscribe((event) => {
    console.log("Dirty event: ", event.target)
  })

/*
Пример использования оператора debounceTime для снижения частоты обращения к серверу.
Если промежуток времени между текущим и предыдущим значением менее заданного,
то предыдущее значение будет отброшено.
*/
fromEvent(element, 'input')
  .pipe(
    debounceTime(500),
    //Извлечение значения input из event
    map(event => (event?.target as HTMLInputElement).value),
  )
  .subscribe((value) => {
    console.log("Debounced input value: ", value)
  })
