import {
  bufferCount,
  concatAll,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  pluck, reduce,
  switchMap
} from "rxjs";
import { subscribe } from "diagnostics_channel";
import { ajax } from "rxjs/internal/ajax/ajax";
import { AjaxResponse } from "rxjs/internal/ajax/AjaxResponse";

export interface IResult {
  body: string;
  email: string;
  id: number;
  name: string
  postId: number
}

const InputElement = document.getElementById('search') as HTMLInputElement
const container = document.querySelector(".container") as HTMLDivElement
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
          map<AjaxResponse<any>, IResult[]>((httpResponse: AjaxResponse<any>) => httpResponse.response),
          //Преобразуем входной массив в поток, состоящий из элементов массива
          concatAll(),
          map((item: IResult) => createCard(item)),
          //Объединяет элементы входного потока в группы
          bufferCount(3),
          //Формирование ряда карточек из массива HTML-строк
          reduce((resultStr: string, htmlStr: string[]) => {
            return resultStr += createRow(htmlStr)
          }, ''),
          map(resultStr => resultStr.trim().replace(/\s(<)/g, '<'))
        )
    })
  )
  .subscribe(htmlString => container.innerHTML=htmlString)

export function request(source$: Observable<any>) {
  return source$.pipe(
    map(httpResponse => httpResponse.response)
  )
}

export function createCard({ body, email, id, name, postId }: IResult) {
  return `
  <div class="col-md-4">
        <div class="card">
            <img src="https://placehold.co/600x400/orange/white" alt="" class="card-img-top">
        </div>
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div class="card-text">${body}</div>
        </div>
    </div>
  `
}

export function createRow(htmlStrings: string[]) {
  return `<div class="row">
${htmlStrings.join('')}
</div>`
}