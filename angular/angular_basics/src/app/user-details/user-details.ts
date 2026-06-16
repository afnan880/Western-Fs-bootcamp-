import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  @Input() childUserName: string = '';
  @Input() childUserList: Person[] = [];
@Output() usernNameChange: EventEmitter<string> = new EventEmitter<string>();

constructor(){
  this.childUserName = 'Default User';
}
ngOnInit() {
  this.childUserName = 'Default User';
}

sendUserName(value: string) {
  if (value){
    console.log('Emitting user name change:', value);
    this.usernNameChange.emit(value);
  }
}
}
