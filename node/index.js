console.log('Hello World');
function greet(name) {
    console.log('Hello, ' + name + "How are you");
    console.log(`Hello, ${name} How are you`);
}
greet('Alice');
greet('Bob');

var age = 30;

function displayAge() {
    var age = 25;
    let city = 'New York';
}
console.log('outside the function' + age);
displayAge();
console.log('Outside the function' + age);