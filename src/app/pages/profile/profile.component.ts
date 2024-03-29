import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { ApiBeService } from './../../Services/api-be.service';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

updatePsw(){}

}
