import * as util from "util";
import * as fs from "fs";
import { bindNodeCallback, from, map } from "rxjs";
import * as path from "path";

/*
RxJS служит не только для создания потоков, но и для их трансформации.
Для трансформации данных служат такие операторы, как map().
*/
//Преобразование промиса, возвращающего данные, хранящиеся в файле, в поток с помощью from
// fs.readFile


const promisifiedFileRead = util.promisify(fs.readFile)
const promisifiedFile = promisifiedFileRead(path.resolve(__dirname, 'text.txt'))
promisifiedFile.then((file) => {
    const text = file.toString()
    const regExp = />([^<]+)</
    const matches = regExp.exec(text)
    console.log("text: ", text)
    console.log("matches: ", matches)
})

//Создание потоков из данных, хранящихся в файлах

//Вариант №1: использование оператора from
const readDirs1$ = from(promisifiedFile).pipe(
  map((buffer: Buffer) => {
      const string = buffer.toString()
      console.log('string: ', string)
      const regExp = />([^<]+)</
      const matches = regExp.exec(string)
      return matches && matches[1]
  }))

readDirs1$.subscribe(value => console.log("from (promisifiedFileRead): ", value))

//Вариант №2: использование оператора bindNodeCallback
const readDirs2$ = bindNodeCallback(fs.readFile)(path.resolve(__dirname, 'text.txt'))
  .pipe(
    map((buffer: Buffer) => {
        const string = buffer.toString()
        console.log('string: ', string)
        const regExp = />([^<]+)</
        const matches = regExp.exec(string)
        return matches && matches[1]
    }))
readDirs2$.subscribe(value => console.log("bindNodeCallback: ", value))
