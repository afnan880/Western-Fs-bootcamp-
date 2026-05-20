var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
console.log(days[0]  +  days[6]);
console.log(days[2]);

for (var i=0; i < days.length; i++) {
    console.log(days[i]);
}

days.forEach(function(day, index ) {
    console.log(index,day);
});

// arrow function => instead of function in foreach loop
days.forEach((day, index) => {
    console.log(index, day);
});

function hello(name) {
    console.log("Hello " + name);
}
hello("John");
var helloArrow = (name) => {
    console.log("Hello " + name);
}
helloArrow("John");