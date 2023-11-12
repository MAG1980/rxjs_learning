import "./live-search"
import { liveSearch, request } from "./live-search";
import { fromEvent } from "rxjs";
import "./live-search";
import { ajax } from "rxjs/internal/ajax/ajax";

const InputElement = document.getElementById('search') as HTMLInputElement
const container = document.querySelector(".container") as HTMLDivElement

liveSearch(
  fromEvent<KeyboardEvent>(InputElement, 'input'),
  (postId: number) => request(ajax(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`))
).subscribe(htmlString => container.innerHTML = htmlString)
