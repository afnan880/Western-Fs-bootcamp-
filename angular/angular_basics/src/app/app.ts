import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Person } from '../interfaces/person'
 import { CommonModule } from '@angular/common';
 import { User } from './user/user';
 import { Students } from './students/students';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, User, Students],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular Basic');
 
  name:string = 'Harsh';
 
  person: Person = {
    name: 'Harsh',
    age: 25,
    city: 'New York'
  }
 
personList: Person[] = [
  {
    name: 'Harsh',
    age: 25,
    city: 'New York'
  },
  {
    name: 'Alice',
    age: 30,
    city: 'Los Angeles'
  },
  {
    name: 'Bob',
    age: 28,
    city: 'Chicago'
  }
];    

imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.svg';

isDisabled: boolean = true;


bgColor: string = 'beige';
stylestring: string = 'color: red; font-size: 20px;';

bgRedClass = 'bg-red';
bgYellowClass = 'bg-yellow';

showMessage(): void {
  console.log('Button clicked!'); 
}
 


} 

