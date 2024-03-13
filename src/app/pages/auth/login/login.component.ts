import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginData } from '../../../Models/auth/i-login-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router
  ) { }

  errorMsg!: ILoginData;
  msg!: ILoginData;

  loginForm: FormGroup = this.fb.group({

    username: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    password: this.fb.control(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])

  });

  invalidMessages(fieldName: string): string {

    const field: AbstractControl | null = this.loginForm.get(fieldName);
    let errorMsg: string = ''
    if (field) {

      if (field.errors) {

        if (field.errors['required']) errorMsg = 'Campo vuoto';
        if (field.errors['minLength'] && fieldName === 'passoword') errorMsg = 'Lunghezza minima password 8 caratteri';
        if (field.errors['maxLength']&& fieldName === 'passoword') errorMsg = 'Lunghezza massima password 16 caratteri';
        if (field.errors['pattern']) errorMsg = 'Formato mail errato';
      }
    }
    return errorMsg;
  }

  isValid(inputName: string) {
    return this.loginForm.get(inputName)?.valid && this.loginForm.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.loginForm.get(inputName)?.valid && this.loginForm.get(inputName)?.dirty
  }

  ngDoCheck() {

    this.errorMsg = {

      username: this.invalidMessages('username'),
      password: this.invalidMessages('password')

    }

    this.msg = {

      username: '',
      password: ''

    }

    if (this.errorMsg.username) {

      this.msg.username = this.errorMsg.username

    } else {

      this.msg.username = 'Campo compilato correttamente'

    }

    if (this.errorMsg.password) {

      this.msg.password = this.errorMsg.password

    } else {

      this.msg.password = 'Password corretta'
    }
  }


  logIn(){
    this.authSvc.logIn(this.loginForm.value).subscribe(data =>{
      this.router.navigate(['/homepage']);
    })
  }
}
