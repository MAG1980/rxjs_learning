import { debounce, debounceTime, fromEvent, switchMap } from "rxjs";
import { ajax } from "rxjs/internal/ajax/ajax";

//High order Observables
/*
 Наблюдаемые более высокого порядка
Концепция наблюдаемых более высокого порядка является расширением концепции функций высокого порядка,
где наблюдаемые принимают или испускают другие наблюдаемые.

В RxJS есть четыре оператора, которые квалифицируются как наблюдаемые более высокого порядка, это:
switchMap
concatMap
mergeMap
exhaustMap
*/
/*
Искусственный пример High order Observable
interval(200)
  .pipe(
    map((v) => {
      return of(v * 2)
    })
  )
  .subscribe((value) => console.log(value))*/

const inputElement = document.getElementById('quality') as HTMLInputElement
const sequence = fromEvent<InputEvent>(inputElement, 'input')
  .pipe(
    debounceTime(300),
    /*    map((event) => {
            const value = ( event?.target as HTMLInputElement ).value
            //На каждую итерацию возвращает новый поток, сформированный из ответа API
            return ajax('/')
          }),
          //Используется для объединения независимых недолговечных потоков
          mergeAll()
    */

    /*    //map() + mergeAll() = mergeMap()
    //Позволяет задавать количество одновременно обрабатываемых потоков с помощью второго параметра: concurrent = 2
        mergeMap((event) => {
          const value = ( event?.target as HTMLInputElement ).value
          //На каждую итерацию возвращает новый поток, сформированный из ответа API
          return ajax('https://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
        }, 2)
*/

    //switchMap позволяет получать ответ только от последнего запроса, а от всех предыдущих - отписываться.
    /*    map((event) => {
            const value = ( event?.target as HTMLInputElement ).value
            //На каждую итерацию возвращает новый поток, сформированный из ответа API
            return ajax('https://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
          }),
          //Используется для объединения независимых недолговечных потоков
          mergeAll()
    */

/*    //map() + switchAll() = switchMap()
    switchMap((event) => {
      const value = ( event?.target as HTMLInputElement ).value
      //На каждую итерацию возвращает новый поток, сформированный из ответа API
      return ajax('https://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
    }),
 */

    //map() + concatAll() = concatMap()
/*    В отличие от mergeMap (не гарантируется сохранение порядка получения ответов)
    concatMap гарантирует порядок обработки потоков*/

    //map() + exhaust = exhaustMap()
/*    Все приходящие в map новые значения будут пропускаться (skip-нуты) до тех пор,
  пока не завершится обработка текущего потока.*/
    /*
    В отличие от switchMap, который обрабатывает только последний поступивший поток,
    exhaustMap выполняет только первый поступивший поток и пропускает все потоки,
    которые появляются во время обработки текущего потока.
    */
    switchMap((event) => {
      const value = ( event?.target as HTMLInputElement ).value
      //На каждую итерацию возвращает новый поток, сформированный из ответа API
      return ajax('http://localhost:8080/')
    }),

  )
  .subscribe(value => console.log(value))