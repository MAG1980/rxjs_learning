import { debounceTime, distinctUntilChanged, filter, fromEvent, map, pluck, switchMap } from "rxjs";
import { subscribe } from "diagnostics_channel";
import { ajax } from "rxjs/internal/ajax/ajax";

const InputElement = document.getElementById('search') as HTMLInputElement
fromEvent<KeyboardEvent>(InputElement, 'input')
  .pipe(
    debounceTime(300),
    map(event => (event?.target as HTMLInputElement).value),
    //Фильтрация длины поискового запроса
    filter((postId: string) => postId.length > 1),
    //Обрезка пробельных символов в начале и конце строки и преобразование к типу number
    map((postId: string) => parseInt(postId.trim())),
    //Предотвращает последующие идентичные выбросы из наблюдаемого (сравнивает ссылки на объекты)
    //Сравнивает текущее значение с последним переданным значением (не имеет глубокой истории).
    //Хорошо работает в связке с debounceTime.
    distinctUntilChanged(),
    switchMap((postId: number) => {
      return ajax(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .pipe(
          map(httpResponse => httpResponse.response)
        )
    })
  )
  .subscribe(value => console.log(value))