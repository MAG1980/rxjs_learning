import { interval, Observable, Subscriber } from "rxjs";

//Создаём класс, расширяющий Subscriber, и переопределяем его встроенный метод next
class SkipLimitSubscriber extends Subscriber<number> {
  //Номер интервала в последовательности интервалов
  interval: number = 1;
  //
  private count: number = 1;

  constructor(
    subscriber: Subscriber<any>,
    private skip: number,
    private limit: number
  ) {
    super(subscriber);
  }

  next(value: number) {
    //Левая граница интервала
    const borderLeft = this.interval * ( this.skip + this.limit ) - this.limit;
    //Правая граница интервала
    const borderRight: number = borderLeft + this.limit;
    //Проверка на принадлежность текущего элемента потока заданному интервалу
    if ( borderLeft < this.count && this.count <= borderRight ) {
      super.next(value);
      this.count++;
      //Начало нового интервала
      if ( borderRight < this.count ) {
        this.interval++;
      }
      return;
    }
    this.count++;
  }
}


/*Оператор lift используется для создания кастомных операторов
Под капотом он создаёт новый поток на основе входного потока и переопределяет его свойство operator*/
function skipLimit(skip: number, limit: number) {
  return (source$: Observable<number>) => {
    return source$
      .lift({
        call: function (subscriber: Subscriber<number>, source: Observable<number>) {
          source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit))
        }
      })
  }
}

/*----0----1----2----3----4----5--
skipLimit(2,2)
---- ---- ----2----3---- ---- --*/

interval(1000)
.pipe(
  skipLimit(2,2)
)
  .subscribe(
    (value)=>console.log(value),
    ()=>{},
    ()=>{}
    )
