import { Observable } from "rxjs";

const url = 'wss://echo.websocket.events/.ws'
// const url = 'wss://echo.websocket.org'

//Внешний Producer
const socket: WebSocket = new WebSocket(url)
const sequence5$ = new Observable<MessageEvent>(subscriber => {
  socket.addEventListener('message', event => subscriber.next(event))
})

const subscription5 = sequence5$.subscribe(value => console.log('subscription5: ', value.data))

socket.addEventListener('open', ()=>{
  let count = 1
  const intervalId = setInterval(()=>{
    //Преобразуем count в string. Send принимает string | ArrayBufferLike | Blob | ArrayBufferView.
    socket.send((count++).toString())
  },1000)
})

//Начальным значением value.data для subscription6 будет значение count на момент подписки.
setTimeout(()=>{
  const subscription6 = sequence5$.subscribe(value => console.log('subscription6: ', value.data))
}, 5000)
