import { fromEvent, iif, map, merge, Observable, of, switchMap, zip } from "rxjs";

/*Чтобы облегчить тестирование,
нужно стремиться отделять pipe от Producer*/

/*fromEvent<TouchEvent>(document, 'touchstart')
  .pipe(
    // tap(console.log),
    map((event: TouchEvent) => event?.changedTouches[0].clientX)
  )
  .subscribe(v => console.log(v))*/

//Определение координаты touchstart
const swipeStartX$ = getX(
  fromEvent<TouchEvent>(document, 'touchstart'),
  fromEvent<MouseEvent>(document, 'mousedown'))

//Определение координаты touchend
const swipeEndX$ = getX(
  fromEvent<TouchEvent>(document, 'touchend'),
  fromEvent<MouseEvent>(document, 'mouseup'))

/*Объединяет несколько Observables для создания Observable,
значения которого вычисляются по порядку значений каждого из его входных Observables.
Оператор zip может быть использован для объединения значений нескольких Observables
в единый flow, содержащий пары, тройки и т.д. значений, в зависимости от количества
объединяемых Observables.
*/
const swipes = zip(swipeStartX$, swipeEndX$)
swipes
  .subscribe((value) => {
    console.log("Swipe coords - [start, end]", value)
  })

//Для удобства тестирования pipe нужно выносить в отдельную функции и передавать им flow
function getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>) {
  return merge(source1$, source2$)
    .pipe(
    //Переключение на другой поток в зависимости от условия iif
      switchMap((event: TouchEvent | MouseEvent) => {
        return iif(
          () => event instanceof TouchEvent,
          of(event as TouchEvent).pipe(map(event => event?.changedTouches[0].clientX)),
          of(event as MouseEvent).pipe(map(event => event?.clientX))
        )
      })
      /*      map((event: TouchEvent | MouseEvent) => {
                if (event instanceof TouchEvent) {
                  return event?.changedTouches[0].clientX
                }
                return event?.clientX
              }
            )*/
    )
}

function swipeDirection(sourses$: Observable<[number, number]>) {
  sourses$
    .pipe(
      map((coordX: [number, number]) => {
        return coordX[0] > coordX[1] ? 'to left' : 'to right'
      })
    )
    .subscribe(direction =>
      console.log("Swipe direction - ", direction))
}

swipeDirection(swipes)
