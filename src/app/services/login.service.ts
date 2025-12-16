import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseurl= 'http://localhost:8080/'; 
  constructor(private http:HttpClient) { }

  login(data:any){
 return this.http.post(`${this.baseurl}login`,data, { responseType: 'text' });// when we return only string then we nee responseType text
 
  }

  ValidateOTP(data:any){
 return this.http.post(`${this.baseurl}validateOTP`,data);
 
  }
   SingUp(data:any){
 return this.http.post(`${this.baseurl}SignUp`,data);
 
  }
 moviecard(movieId: any) {
  console.log("inside mobecard")
  return this.http.post(`${this.baseurl}getMovieCard`,movieId);
}

getMovieDetails(data:any){
   return this.http.post(`${this.baseurl}aboutMovie`,data);
}
getlanguge(){
   return this.http.get(`${this.baseurl}getLanguage`);
}
addMovie(data:any){
   return this.http.post(`${this.baseurl}addMovies`,data);
}
}
