import { interval, Observable, Subscriber } from "rxjs";

//Создаём класс, расширяющий Subscriber, и переопределяем его встроенный метод next
class DoubleSubscriber extends Subscriber<number> {
  next(value: number) {
    super.next(value * 2);
  }
}


//Внутреннее устройства оператора lift
function double(source$: Observable<number>): Observable<number> {
  //Создаём объект Observable
  const o$:Observable<number> = new Observable()
  //Переопределяем свойство Observable-объекта на входной поток
  o$.source = source$
  //Переопределяем метод operator Observable-объекта на входной поток
  o$.operator = {
    //
    call: function (subscriber: Subscriber<number>, source: Observable<number>) {
      source.subscribe(new DoubleSubscriber(subscriber))
    }
  }
  return o$
}

interval(1000)
  .pipe(
    double
  )
  .subscribe((value) => console.log(value))