import { fromEvent, map, Observable, zip } from "rxjs";

/*Чтобы облегчить тестирование,
нужно стремиться отделять pipe от Producer*/

/*fromEvent<TouchEvent>(document, 'touchstart')
  .pipe(
    // tap(console.log),
    map((event: TouchEvent) => event?.changedTouches[0].clientX)
  )
  .subscribe(v => console.log(v))*/

//Определение координаты touchstart
const swipeStartX$ = getX(fromEvent<TouchEvent>(document, 'touchstart'))

//Определение координаты touchend
const swipeEndX$ = getX(fromEvent<TouchEvent>(document, 'touchend'))

/*Объединяет несколько Observables для создания Observable,
значения которого вычисляются по порядку значений каждого из его входных Observables.
Оператор zip может быть использован для объединения значений нескольких Observables
в единый flow.
*/
const swipes = zip(swipeStartX$, swipeEndX$)
swipes
  .subscribe((value) => {
    console.log("Swipe coords - [start, end]", value)
  })

//Для удобства тестирования pipe нужно выносить в отдельную функции и передавать им flow
function getX(sources$: Observable<TouchEvent>) {
  return sources$
    .pipe(
      map((event: TouchEvent) => event?.changedTouches[0].clientX)
    )
}

function swipeDirection(sourses$: Observable<[number, number]>) {
  sourses$
    .pipe(
      map((coordX: [number, number]) => {
        return coordX[0] > coordX[1] ? 'to left' : 'to right'
      })
    )
    .subscribe(direction => console.log("Swipe direction - ", direction))
}

swipeDirection(swipes)
