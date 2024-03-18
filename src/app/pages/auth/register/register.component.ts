import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { IRegister } from '../../../Models/auth/i-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor (private authSvc:AuthService, private fb:FormBuilder){}

  match: boolean = false;
  msg!:IRegister;
  errorMsg!:IRegister
  registered:boolean = false;


  registerForm:FormGroup = this.fb.group({

    username: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    name: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    surname: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\'\s]+$/)]),
    email: this.fb.control(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)]),
    password: this.fb.control(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)]),
    confirmPassword: this.fb.control(null, [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)])

  });


  invalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.registerForm.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Campo vuoto'
        if (field.errors['pattern'] && fieldName === 'email') errorMsg = 'Formato email errato'
        if (field.errors['pattern'] && fieldName === 'password') errorMsg = 'Formato password non accettato'
        if (field.errors['minlength'] && fieldName === 'password') errorMsg = 'Lunghezza minima password: 8 caratteri'
        if (field.errors['minlength'] && (fieldName === 'name' || fieldName === 'surname' || fieldName === 'username')) errorMsg = 'Lunghezza minima: 2 caratteri'
        if (field.errors['minlength'] && fieldName === 'confirmPassword') errorMsg = 'Lunghezza minima password: 8 caratteri'
        if (field.errors['pattern'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Sono ammesse solo lettere dell\'alfabeto'

      }

    }
    return errorMsg

  }


  ngDoCheck(){

    this.errorMsg = {
      username: this.invalidMessages('username'),
      name: this.invalidMessages('name'),
      surname: this.invalidMessages('surname'),
      email: this.invalidMessages('email'),
      password: this.invalidMessages('password'),
      confirmPassword: (this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value) && (this.registerForm.controls['confirmPassword'].dirty) ? 'Mancata corrispondenza' : this.invalidMessages('confirmPassword')
    }



    this.msg = {
      email: '',
      username:'',
      password: '',
      name: '',
      surname: '',
      confirmPassword: ''
    }

    if(this.registerForm.controls["password"].value === this.registerForm.controls["confirmPassword"].value && this.registerForm.controls["confirmPassword"].dirty){
      this.match = true
    }else{
      this.match = false
    }

    if (this.errorMsg.username) {
      this.msg.username = this.errorMsg.username
    } else {
      this.msg.username = 'Campo compilato correttamente'
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    } else {
      this.msg.name = 'Campo compilato correttamente'
    }

    if (this.errorMsg.surname) {
      this.msg.surname = this.errorMsg.surname
    } else {
      this.msg.surname = 'Campo compilato correttamente'
    }

    if (this.errorMsg.email) {
      this.msg.email = this.errorMsg.email
    } else {
      this.msg.email = 'Campo compilato correttamente'
    }

    if (this.errorMsg.password) {
      this.msg.password = this.errorMsg.password
    } else {
      this.msg.password = 'Campo compilato correttamente'
    }

    if (this.errorMsg.confirmPassword) {
      this.msg.confirmPassword = this.errorMsg.confirmPassword
    } else {
      this.msg.confirmPassword = 'Le due password combaciano'
    }
  }

  isValid(inputName:string){
    return this.registerForm.get(inputName)?.valid && this.registerForm.get(inputName)?.dirty
  }

  isInvalid(inputName:string){
    return !this.registerForm.get(inputName)?.valid && this.registerForm.get(inputName)?.dirty
  }

  register(){
    const registerData: any = this.registerForm.value
    delete registerData.confirmPassword
    console.log(this.registerForm);
    this.authSvc.signUp(this.registerForm.value).subscribe(res =>{
      this.registered = true
    });
  }
}
