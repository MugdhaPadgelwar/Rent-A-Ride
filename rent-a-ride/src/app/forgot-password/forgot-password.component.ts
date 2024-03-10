import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';  



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      // Logic to send reset instructions
      console.log('Reset instructions sent to:', this.getEmail()?.value);
    }
  }

  onCancel() {
    // Logic to cancel operation
    console.log('Operation canceled');
  }

  getEmail(): AbstractControl<any, any> | null {
    return this.forgotPasswordForm.get('email');
  }
}
