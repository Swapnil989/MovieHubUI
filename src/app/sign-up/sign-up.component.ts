import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,  
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../login/login.Component.css']
})
export class SignUpComponent {
  SingUp!: FormGroup

  constructor(private sign: FormBuilder, private loginService: LoginService,private router:Router) { }

  ngOnInit() {
    this.SingUp = this.sign.group({
      email: [''],
      password: [''],
      userName: [''],
      mobile: [],
      gender: [],

    })
  }

  Submit() {
       console.log(this.SingUp.value.gender)
    const data = {
      email: this.SingUp.value.email,
      password: this.SingUp.value.password,
      username: this.SingUp.value.userName,
      mobile: this.SingUp.value.mobile,
      gender: this.SingUp.value.gender,
    }
    this.loginService.SingUp(data).subscribe((res) => {
      console.log("user Creatde Successfully");
      this.router.navigate(["/login"]);
    }, (err) => {
      console.log("user Creatde Failed");
    })

  }

}
