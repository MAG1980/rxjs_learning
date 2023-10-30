import { fromEvent, map, tap } from "rxjs";

const quality = fromEvent(document.getElementById('quality') as HTMLInputElement, 'change')
const rating = fromEvent(document.getElementById('rating') as HTMLInputElement, 'change')
const actual = fromEvent(document.getElementById('actual') as HTMLInputElement, 'change')

quality.pipe(
  map((event: Event) => event.target as HTMLInputElement),
  tap(changeInputColor)
).subscribe((qualityValue) => console.log('qualityValue: ', qualityValue))

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
