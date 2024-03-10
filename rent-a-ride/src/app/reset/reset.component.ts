import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  resetPasswordForm: FormGroup;
  token!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]]
    });

   
    // Fetch the token from ActivatedRoute
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      // Navigate to login page
      this.router.navigate(['/login']);
    } else {
      this.validateAllFormFields(this.resetPasswordForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('password');
      const confirmPassword = control.value;
      return password && confirmPassword && password.value !== confirmPassword ? { 'passwordMismatch': true } : null;
    };
  }
}
