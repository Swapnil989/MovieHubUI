import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,FormArray, Validators } from '@angular/forms';
import {CommonModule, NgFor, NgForOf, NgIf} from '@angular/common'
import { LoginService } from '../services/login.service';
import {MatSelectModule} from '@angular/material/select';

import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-movie',
  standalone: true,  
  imports: [ReactiveFormsModule, FormsModule,NgIf,MatFormFieldModule, MatSelectModule,CommonModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {
addfrom!:FormGroup;
castlist:any []=[];

languageList:any []=[];

constructor(private form:FormBuilder,private loginService:LoginService){}

CastImage(event: any, index: number) {
  const file: File = event.target.files[0];
  if (!file) return;

  // Convert file to Base64
  const reader = new FileReader();
  reader.readAsDataURL(file);  // converts to Base64
  reader.onload = () => {
    const base64 = reader.result as string;  // Base64 string
    // Set Base64 string into the form control
    this.castArray.at(index).get('actorImage')?.setValue(base64);

    console.log("Base64 for row", index, base64);
  };
  reader.onerror = (error) => {
    console.error("Error converting file to Base64:", error);
  };
}

ngOnInit(){

  
this.loginService.getlanguge().subscribe(
  (res:any) => {
    // this.languageList=res.lanaguage;
  console.log("Full response:", res.data);
   this.languageList = res.data.map((item: any) => item.language);
    
  },
  (err) => {
    console.log("error occurs");
  }
);


  this.addfrom=this.form.group({
    movieName:['',Validators.required],
    category:['',Validators.required],
    certificateName:['',Validators.required],
    releaseDate:['',Validators.required],
    movieImage:['',Validators.required],
    trailers:['',Validators.required],
    duration:['',Validators.required],
    about:['',Validators.required],
    LangList:[[],Validators.required],
    format:['',Validators.required],
    castList: this.form.array([],Validators.required)
  })
  this.addCastRows();
}
get castArray(): FormArray<FormGroup> {
  return this.addfrom.get('castList') as FormArray<FormGroup>;
}

addCastRows() {
    this.castArray.push(
      this.form.group({
        actorName: [''],
        actorRole: [''],
        actorImage: [null]
      })
    );
}

Submit() {

  console.log("inside Submit");
 
 if (this.addfrom.invalid) {
    this.addfrom.markAllAsTouched();   // highlight validation errors
    return;                         
  }
  const formData = new FormData();

  const selectedLanguages: string[] = this.addfrom.value.LangList;

  const formattedLangList = selectedLanguages.map(lang => ({ language: lang }));
  this.addfrom.get('LangList')?.setValue(formattedLangList);



  // append simple values
  Object.keys(this.addfrom.value).forEach(key => {
    if (key !== 'castList') {
      formData.append(key, this.addfrom.value[key]);
    }
  });

  // append cast list
  this.castArray.controls.forEach((castGroup, index) => {
    formData.append(`castList[${index}].actorName`, castGroup.value.name);
    formData.append(`castList[${index}].actorRole`, castGroup.value.role);
    formData.append(`castList[${index}].actorImage`,castGroup.value.image);
  });

  console.log("the format in the rewust"+formData);
   console.log(this.addfrom.value);
   //data=this.addfrom.value;
  // send to backend API
  this.loginService.addMovie(this.addfrom.value).subscribe(res => {
    console.log("Saved", res);
  });
}

preview: any;

onFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result; // Base64 image
    };
    reader.readAsDataURL(file);
  }


  
  if (!file) return;

  // Convert file to Base64
  const reader = new FileReader();
  reader.readAsDataURL(file);  // converts to Base64
  reader.onload = () => {
    const base64 = reader.result as string;  // Base64 string
    // Set Base64 string into the form control
    this.addfrom.get('movieImage')?.setValue(base64);

    //console.log("Base64 for row", index, base64);
  };
  reader.onerror = (error) => {
    console.error("Error converting file to Base64:", error);
  };
}
addMore(){
  this.addCastRows();
}
removeRow(index: number) {
  this.castArray.removeAt(index);
}


}
