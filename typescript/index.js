"use strict";
let x = 10;
x = 20;
let username = "John Doe";
username = "123";
let isActive = true;
isActive = false;
let num = [1, 2, 3, 4, 5];
let anotherNum = [6, 7, 8, 9, 10];
let studentMarks = 90;
studentMarks = "A";
let person = { name: "afnan", age: 25, email: "afnan@gmail.com", isStudent: true };
let person2 = { name: "george", age: 27, email: "george@gmail.com", isStudent: false };
let persons = [
    { name: "afnan", age: 25, email: "afnan@gmail.com", isStudent: true },
    { name: "george", age: 27, email: "george@gmail.com", isStudent: false },
    { name: "sara", age: 22, email: "sara@gmail.com", isStudent: true }
];
let persons2 = [
    { name: "afnan", age: 25, email: "afnan@gmail.com", isStudent: true },
    { name: "george", age: 27, email: "george@gmail.com", isStudent: false },
    { name: "sara", age: 22, email: "sara@gmail.com", isStudent: true }
];
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Afnan"));
