import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    data: any = [];
    constructor(private router: Router, private authService: AuthService) {}
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
    mode: 'login' | 'register' = 'login';
    user = {
      username: '',
      password: ''
    };
    register = { name: '', email: '', password: '', confirm: '' };
    register_form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), this.passwordMatch]],    
    },{validator: this.passwordMatch('password', 'confirm_password'),})

    get register_name(): any {
      return this.register_form.get('name')
    }
    get register_email(): any {
      return this.register_form.get('email')
    }
    get register_password(): any {
      return this.register_form.get('password')
    }
    get register_confirm_password(): any {
      return this.register_form.get('confirm_password')
    }
    loginForm(form: any) {
      console.log(form.value)
      this.data = form.value
      this.authService.login({email: this.data.email, password: this.data.password}).subscribe({
        next: (res) => {
          console.log('Login successful', res)
          localStorage.setItem('authToken', res.token)
        },
        error: (err) => console.error(err)
      })
    }
    registerForm() {
      console.log(this.register_form.value)
      this.data = this.register_form.value
      this.authService.signup({name: this.data.name, email: this.data.email, password: this.data.password}).subscribe({
        next: (res) => {
          console.log('signup successful', res)
          this.mode = 'login'
        },
        error: (err) => console.error(err)
      })
    }
    setMode(next: 'login' | 'register') {
      this.mode = next;
    }
    passwordMatch(password: string, confirm_password: string) {
      return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirm_password];
      if (
        matchingControl.errors &&
        !matchingControl.errors['passwordMatch']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
    }
}
