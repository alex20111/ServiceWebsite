
import { FormGroup } from '@angular/forms';

// custom validator to check that the input is a number
export function numberValidator(controlName: string) {
    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];
        if (control.errors && !control.errors.mustBeNumber) {
            // return if another validator has already found an error on the number
            return;
        }

        const nbr = control.value;
        if (!nbr.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
            control.setErrors({ mustBeNumber: true });
        } else {
            control.setErrors(null);
        }

    }
}