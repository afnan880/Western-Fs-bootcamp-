import { Component } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { Houseinfo } from '../interfaces/houseinfo';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  housingLocation: Houseinfo = 
    {
      id: 1,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: 'https://angular.dev/assets/images/tutorials/common/example-house.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true,
    }
  
}
