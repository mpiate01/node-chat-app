var moment = require('moment')   //momentjs.com

var data = new moment()

console.log(data.format()) //2018-08-30T09:14:00+01:00
console.log(data.format('MMM YYYY')) //Aug 2018
console.log(data.format('MMM Do YYYY')) //Aug 30th 2018
console.log(data.format('MMM Do, YYYY')) //Aug 30th, 2018
console.log(data.format('hh:mm a')) //09:20 am
console.log(data.format('h:mm a')) //9:20 am

data.add(100, 'years') // +100 anni

var createdAt = moment().valueOf()  //to get timestamp
console.log(createdAt) // 1535617709020

