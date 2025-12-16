import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-validate-otp',
  standalone: true,  

  imports: [ReactiveFormsModule, FormsModule, NgForOf],
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.css', '../login/login.component.css']
})
export class ValidateOTPComponent {
  loginform!: FormGroup;
  otpArray = [1, 2, 3, 4, 5, 6];
  otp = ['', '', '', '', '', ''];

  getOtp(i: number) {
    return this.otp[i];
  }
  setOtp(i: number, value: string) {
    this.otp[i] = value;
  }

  email: String = "";
  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.email = param['email'];
      console.log("email from the pareant" + this.email);
    })

  }

  Submit() {
    console.log(this.otp);
    const data = {
      email: this.email,
      otp: this.otp.join('')
    }
    this.loginService.ValidateOTP(data).subscribe((res) => {
      console.log("the otp is succufully valid");
    },
      (err) => {
        console.log("the otp is Failed");
      })

  }

  move(index: number, event: any) {
    // go to next box automatically
    if (event.target.value && index < 5) {
      const next = document.querySelectorAll('.otpBox')[index + 1] as HTMLElement;
      next.focus();
    }
  }

  back(index: number, event: any) {
    // backspace → go to previous box
    if (event.target.value === '' && index > 0) {
      const prev = document.querySelectorAll('.otpBox')[index - 1] as HTMLElement;
      prev.focus();
    }
  }

}
