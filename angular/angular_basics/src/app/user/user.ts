import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../../interfaces/person';
import { Userservice } from '../services/userservice';
import { Students } from '../students/students';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [FormsModule, Students],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userName: string = 'Harsh';

  updateUserName() {
    this.userName = 'Jake';
  }
  userList: Person[] = []
  constructor(private userService: Userservice) { this.userList = this.userService.getUsers(); 

console.log('approach 1', this.route.snapshot.paramMap.get('id'));
  console.log('approach 2', this.route.snapshot.params['id']);

  };



route = inject(ActivatedRoute);





}
