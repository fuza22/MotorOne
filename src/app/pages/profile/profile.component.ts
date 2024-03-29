import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { ApiBeService } from './../../Services/api-be.service';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userData: IAuthData = {
    accessToken: '',
    user: {
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      email: '',
      username: '',
      avatar:'',
      role:'',
      id: 0
    }
  };
  myForm!: FormGroup;
  loading: boolean = false;
  file!: File;
  id!: string | null;
  profileImageUrl: string = '';
  oldPasswordType: string = 'password';
  passwordType: string = 'password';
  confirmPasswordType: string = 'password';
  changePsw!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private beSvc: ApiBeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');

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
        console.log(res);
      }
    });

    this.changePsw = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });

  }

  patchFormValues() {
    if (this.myForm) {
      this.myForm.patchValue({
        name: this.userData.user.name,
        surname: this.userData.user.surname,
        email: this.userData.user.email
      });
    }
  }

  update() {



  }

  toggleOldPasswordVisibility() {
    this.oldPasswordType = this.oldPasswordType === 'password' ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
    }
  }

  imageUpload() {
    if (this.file) {
      this.beSvc.imageUpload(Number(this.id), this.file).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Choose an image before uploading.",
        icon: "warning",
        color:"white",
        background: "#252525",
        confirmButtonColor: "#FF003B"
      });
    }
  }

  updatePsw() {
    if (this.changePsw.invalid) {
      this.changePsw.markAllAsTouched();
      return;
    }

    const passwords = this.changePsw.value;
    const userId = this.userData.user.id;
    console.log(passwords);
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
        color: "white",
        background: "#252525",
        confirmButtonColor: "#FF003B"
      });
      return;
    }

    delete passwords.confirmPassword;

    this.beSvc.updatePassword(userId, passwords).pipe(catchError(error => {
      console.error('Error updating password', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update password. Please try again later.",
          icon: "error",
          color: "white",
          background: "#252525",
          confirmButtonColor: "#FF003B"
        });
      throw error;
    }))
    .subscribe(
      (response: any) => {
        console.log('Password updated successfully', response);
        Swal.fire({
          title: "Success!",
          text: "Password updated successfully.",
          icon: "success",
          color: "white",
          background: "#252525",
          confirmButtonColor: "#FF003B"
        });
        this.changePsw.reset();
      }
    );
  }
}
