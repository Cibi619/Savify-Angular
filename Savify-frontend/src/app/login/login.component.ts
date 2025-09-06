import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private router: Router) {}
    mode: 'login' | 'register' = 'login';
    user = {
      username: '',
      password: ''
    };
    register = { name: '', email: '', password: '', confirm: '' };
    loginForm(form: any) {
      console.log(form.value)
    }
    registerForm(form: any) {
      console.log(form.value)
    }
    setMode(next: 'login' | 'register') {
      this.mode = next;
    }
}
