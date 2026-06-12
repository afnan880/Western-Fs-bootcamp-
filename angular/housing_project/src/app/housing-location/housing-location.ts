import { Component, Input } from '@angular/core';
import { Houseinfo } from '../interfaces/houseinfo';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})

export class HousingLocation {
  @Input() housingLocation!: Houseinfo;

  ngOnInIt() {
    console.log(this.housingLocation);
  } 
}
