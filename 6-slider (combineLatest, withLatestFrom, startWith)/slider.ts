import { combineLatest, fromEvent, map, Observable, startWith, tap, withLatestFrom } from "rxjs";

const quality = fromEvent(document.getElementById('quality') as HTMLInputElement, 'change')
const rating = fromEvent(document.getElementById('rating') as HTMLInputElement, 'change')
const actual = fromEvent(document.getElementById('actual') as HTMLInputElement, 'change')

//Если не подписаться на поток, то функция не будет вызывать изменений в DOM
const qualityValue =getRangeInputValue(quality)
const ratingValue = getRangeInputValue(rating)
const actualValue = getRangeInputValue(actual)

//combineLatest - объединяет в массив последние значения каждого из полученных потоков
const slideSequence$ = combineLatest([qualityValue, ratingValue, actualValue])
  .pipe(
    map(([qualityValue, ratingValue, actualValue]) => {
      return Math.round((qualityValue + ratingValue + actualValue) / 3)
    })
  )

fromEvent<MouseEvent>(
  document.getElementById('send-result') as HTMLButtonElement, 'click'
)
  .pipe(
    //Получение последнего значения полученного потока
    withLatestFrom(slideSequence$)
  )
  .subscribe(value => console.log(value))

/**
 * Преобразует поток событий change в поток значений rangeInput,
 * выполняя сайд эффект по изменению цвета HTML элемента
 * @param source$ Observable<Event>
 */
function getRangeInputValue(source$: Observable<Event>) {
  return source$
    .pipe(
      map((event: Event) => {
        return event.target as HTMLInputElement
      }),
      tap(changeInputColor),
      map((inputElement: HTMLInputElement) => parseInt(inputElement.value)),
      //Задание начального значения горячего потока
      startWith(5)
    )
}

/**
 * Принимает input type="range" и изменяет его цвет в зависимости от значения
 * @param InputElement
 */
function changeInputColor(InputElement: HTMLInputElement) {
  InputElement.classList.remove('bad', 'normal', 'good')
  const inputRangeValue = parseInt(InputElement.value)
  if (inputRangeValue < 30) {
    InputElement.classList.add('bad')
    return
  }
  if (inputRangeValue > 30 && inputRangeValue < 70) {
    InputElement.classList.add('normal')
    return
  }
  InputElement.classList.add('good')
}
