import { Component ,OnInit,Inject,PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
// import {isPlatformBrowser } fr
import { isPlatformBrowser, NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,  
  imports: [NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
movies:any[]=[];
  constructor(private router:Router, private loginService:LoginService,@Inject(PLATFORM_ID) private platformId: Object){}

ngOnInit(){
 console.log("success on the Init");
 console.log("Browser:", isPlatformBrowser(this.platformId));
  let movieId = "1";
  // const data={
  //   movieId:movieId
  // }
   console.log("success on the Init 2");
this.loginService.moviecard(movieId).subscribe(
  (res:any) => {
  // console.log("API Response:", JSON.stringify(res, null, 2));
this.movies=res.data;
  },
  (err) => console.error("Login failed", err)
);
}

getMovieDetails(data:number){
 this.router.navigate(['/about'], {
  queryParams: { movieId: data }
});
}

}
