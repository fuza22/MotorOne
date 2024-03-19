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

  ngOnInit() {
    this.authService.getUserById(this.userData.user.id).subscribe(data => {



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
    if (this.myForm.valid) {
      this.loading = true;
      const formValues = this.myForm.value;
      const updatedUser: IUser = {
        ...this.userData.user,
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email
      };

      this.authService.update(this.userData.user.id, updatedUser)
        .pipe(
          switchMap(() => this.authService.getUserById(this.userData.user.id)),
          tap(updatedUserData => {
            console.log('User updated successfully:', updatedUserData);
            this.userData = {
              ...this.userData,
              user: updatedUserData
            };
            console.log('Updated userData:', this.userData);
            this.myForm.patchValue({
              name: updatedUserData.name,
              surname: updatedUserData.surname,
              email: updatedUserData.email
            });
            this.router.navigate(['/homepage']);
          }),
          catchError(error => {
            console.error('Error updating user:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.loading = false;
        });
    } else {
    }
  }
}
