import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { IUser } from '../../Models/auth/i-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public authService: AuthService, public formBuilder: FormBuilder) { }

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
      this.authService.update(this.userData.user.id, updatedUser).subscribe(
        updatedUserData => {
          console.log('User updated successfully:', updatedUserData);
          this.userData = {
            ...this.userData,
            user: updatedUserData
          };
          this.loading = false;
          // Optionally, you can reset the form after successful update
          this.myForm.reset();
        },
        error => {
          console.error('Error updating user:', error);
          this.loading = false;
          // Handle error as needed (e.g., show error message)
        }
      );
    } else {
      // Form is invalid, handle accordingly (e.g., show error messages)
    }
  }
}
