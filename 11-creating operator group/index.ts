import { filter, interval, Observable, pipe, Subscriber } from "rxjs";

//Создаём класс, расширяющий Subscriber, и переопределяем его встроенный метод next
class DoubleSubscriber extends Subscriber<number> {
  next(value: number) {
    super.next(value * 2);
  }
}

//Создание группы операторов filter и double (выделение их в отдельную цепочку внутри pipe)
const finterWihtDouble = pipe(
  filter((value:number) => value%3 === 0),
    double
)

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
    //Использование группы операторов (цепочки)
    finterWihtDouble
  )
  .subscribe((value) => console.log(value))