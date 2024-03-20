import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { IUser } from '../../Models/auth/i-user';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router:Router) { }

  userData: IAuthData = {
    accessToken: '',
    user: {
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      email: '',
      username: '',
      id: 0
    }
  };
  myForm!: FormGroup;
  loading: boolean = false;
  passwordType: string = 'password';
  confirmPasswordType: string = 'password';


  ngOnInit() {

    this.authService.user$.subscribe(res => {

      if(res) this.userData = res;
      console.log(this.userData);


    })

    this.myForm = this.formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });

    this.authService.user$.subscribe(res => {
      if (res) {
        this.userData = res;
        this.patchFormValues();
      }
    });
  }

  patchFormValues() {
    this.myForm.patchValue({
      name: this.userData.user.name,
      surname: this.userData.user.surname,
      email: this.userData.user.email
    });
  }

  update() {




  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
  }
}
