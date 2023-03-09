'use strict'

let i = 0

let myFunc
myFunc = setTimeout(() => {
    console.log(i++)
    setTimeout(() => myFunc(), 2000)
}, 1000)

