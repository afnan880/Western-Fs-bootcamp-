import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDetails } from './customers-details';

describe('CustomersDetails', () => {
  let component: CustomersDetails;
  let fixture: ComponentFixture<CustomersDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
