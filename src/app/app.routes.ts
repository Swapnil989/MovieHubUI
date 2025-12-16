import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ValidateOTPComponent } from './validate-otp/validate-otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

export const routes: Routes = [
    {path:'',redirectTo:"login",pathMatch:'full'},
    {path:"login",component:LoginComponent},
    {path:"ValidateOTP",component:ValidateOTPComponent},
    {path:"SignUp",component:SignUpComponent},
    {path:"Home",component:HomeComponent},
    {path:"about",component:AboutComponent},
    {path:"addMovie",component:AddMovieComponent}
];
