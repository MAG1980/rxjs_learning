import { interval, Observable, Subscriber } from "rxjs";

//Создаём класс, расширяющий Subscriber, и переопределяем его встроенный метод next
class DoubleSubscriber extends Subscriber<number> {
  next(value: number) {
    super.next(value * 2);
  }
}


/*Оператор lift используется для создания кастомных операторов
Под капотом он создаёт новый поток на основе входного потока и переопределяет его свойство operator*/
function double(source$: Observable<number>): Observable<number> {
  return source$
    .lift({
      call: function (subscriber: Subscriber<number>, source: Observable<number>) {
        source.subscribe(new DoubleSubscriber(subscriber))
      }
    })
}

interval(1000)
  .pipe(
    double
  )
  .subscribe((value) => console.log(value))