let x:number = 10;
x=20;

let username:string = "John Doe";
username = "123";

let isActive:boolean = true;
isActive = false;


let num:number[] =[1,2,3,4,5]; 
let anotherNum:Array<number> = [6,7,8,9,10];

let studentMarks: number| string = 90;
studentMarks = "A";
interface person {
    name: string;
    age: number;
    email: string;
    isStudent: boolean;
}

let person: person = {name:"afnan", age: 25, email:"afnan@gmail.com",isStudent: true} ;
let person2: person = {name:"george", age: 27, email:"george@gmail.com",isStudent: false} ;

let persons: person[] = [
    {name:"afnan", age: 25, email:"afnan@gmail.com",isStudent: true},
    {name:"george", age: 27, email:"george@gmail.com",isStudent: false},
    {name:"sara", age: 22, email:"sara@gmail.com",isStudent: true}  
];
let persons2: Array<person> = [
    {name:"afnan", age: 25, email:"afnan@gmail.com",isStudent: true},
    {name:"george", age: 27, email:"george@gmail.com",isStudent: false},
    {name:"sara", age: 22, email:"sara@gmail.com",isStudent: true}  
];

function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("Afnan"));    