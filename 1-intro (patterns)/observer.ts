//ReactiveX pattern
//ReactiveX = Iterator + Observer + Functional Programming

//Для распределения данных, приходящих от Observer, во времени требуется Iterator


//Паттерн Observer - наблюдатель
interface IListener {
  next(message: string): void
}

class Producer {
  private listeners: IListener[] = []

  /**
   * Подписка слушателей на события
   * @param listener
   */
  public subscribe(listener: IListener) {
    const index = this.listeners.push(listener)
    return {
      unsubscribe: () => {
        this.listeners.splice(index - 1, 1)
      }
    }
  }

  /**
   * Уведомление о событии каждого подписчика
   * @param message
   */
  public notify(message: string) {
    this.listeners.forEach((listener) => {
      listener.next(message)
    })
  }
}

const listener1 = {
  next(message: string) {
    console.log('Listener 1: ', message)
  }
}

const listener2 = {
  next(message: string) {
    console.log('Listener 2: ', message)
  }
}

const notifier = new Producer()

const subscription1 = notifier.subscribe(listener1)
const subscription2 = notifier.subscribe(listener2)

notifier.notify('Hi all! RxJS is awesome!')

subscription1.unsubscribe()

setInterval(()=>{
  notifier.notify('After unsubscribe.')
}, 5000)