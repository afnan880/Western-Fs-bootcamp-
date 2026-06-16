import { Component, signal } from '@angular/core';
import { Userservice } from '../services/userservice';
import { Person } from '../../interfaces/person';
@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
  studentCount = signal(0);
  studentList: Person[] = [];

  constructor(private userService: Userservice) {
    this.studentList = this.userService.getUsers();
    this.studentCount.set(this.studentList.length);
  }
}
