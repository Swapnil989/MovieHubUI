import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';

import { CommonModule,NgForOf  } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,  
  imports: [NgForOf],
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
 moviesDetails: any;
 lanaguage:any[]=[];
 cast:any[]=[]
 movieName:string="";
  constructor(private loginservice: LoginService, private route: ActivatedRoute) { }

 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const movieId = params['movieId'];

    const data = { movieId: movieId };

    this.loginservice.getMovieDetails(data).subscribe(
      (res: any) => {
        console.log("Api response success", res.data);
        this.moviesDetails=res.data[0]
        this.cast=res.data[0].castList
        this.lanaguage=res.data[0].LangList
      },
      (err: any) => {
        console.log("Api response fail", err);
      }
    );
  });
}
}
