import { AbstractControl, FormControl } from '@angular/forms';
import { CustomPasswordValidation } from './custom-password-validation';

describe('CustomPasswordValidation', () => {
  it('should return an error when the value contains "password"', () => {
    const control: AbstractControl = new FormControl('myPassword123');

    expect(CustomPasswordValidation(control)).toEqual({
      passwordInvalid: true,
    });
  });

  it('should return null when the value does not contain "password"', () => {
    const control: AbstractControl = new FormControl('Secure123');

    expect(CustomPasswordValidation(control)).toBeNull();
  });
});
