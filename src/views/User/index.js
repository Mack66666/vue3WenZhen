// 获取当前年月日时间
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1; // 月份是从0开始的
var day = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
console.log(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);

const a = new Date()
let b = a.toDateString()
b=b.replace(new RegExp(/\//g),'-')
console.log(b);