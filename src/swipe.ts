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
getX(fromEvent<TouchEvent>(document, 'touchstart'))
  .subscribe(v => console.log("Touch start x: ", v))

//Определение координаты touchend
getX(fromEvent<TouchEvent>(document, 'touchend'))
  .subscribe(v => console.log("Touch end x: ", v))

//Для удобства тестирования pipe нужно выносить в отдельную функции и передавать им flow
function getX(sources$: Observable<TouchEvent>) {
  return sources$
    .pipe(
      map((event: TouchEvent) => event?.changedTouches[0].clientX)
    )
}
