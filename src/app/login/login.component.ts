import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

import {  Router} from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginform!: FormGroup;
  
  constructor(private loginService: LoginService, private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  Submit() {
    console.log(this.loginform.value);
    const body = {
      email: this.loginform.value.email,
      password: this.loginform.value.password
    }
    this.loginService.login(body).subscribe((res) => {
      console.log("successfull login ho ree")
       this.router.navigate(['/ValidateOTP'],{
        queryParams:{email:this.loginform.value.email}
      });
    }, (err) => console.error("Login failed", err));
  }
  SingUp(){
    this.router.navigate(["/SignUp"]);
  }
  

}
