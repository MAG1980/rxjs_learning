import { interval, Observable } from "rxjs";

/**
 * Только возвращает принимаемый поток без каких-либо изменений
 * @param source$
 */
function doNothing(source$: Observable<any>) {
  return source$
}

/**
 * Принимает поток (Observable), но не использует его для работы.
 * Вместо этого создаёт новый Observable, не зависящий от входящего потока.
 * Внутри pipe каждый следующий оператор в качестве входных данных получает результат,
 * возвращаемый предыдущим оператором.
 * @param source$ Observable
 */
function toText(source$: Observable<any>) {
  return new Observable(subscriber => {
    subscriber.next('RxJS is Awesome!')
    subscriber.complete()
  })
}

/*Внутри pipe каждый следующий оператор в качестве входных данных получает результат,
  возвращаемый предыдущим оператором.
  А subscribe срабатывает для итогового результата.
  Если в процессе преобразования потоков внутри pipe необходимость в части исчезает, то можно их остановить.
  Take Until.
  */
interval(1000)
  .pipe(
    toText
  )
  .subscribe(
    value => console.log(value),
    ()=>{},
    ()=>console.log('complete')) //Выведет 'RxJS is Awesome!' и остановит поток.
