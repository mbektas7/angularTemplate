import { Component, OnInit } from '@angular/core';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { CarModel } from 'app/shared/models/CarModel';
import { AdminService } from 'app/main/admin/admin.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TagsModel } from 'app/shared/models/TagsModel';
import { Router } from '@angular/router';
import { MyUploadAdapter } from 'app/main/questions/new-question/UploadAdapter';





@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {

  public Editor = ClassicEditor;
  post = new PostModel;
  title = "";
  message = "";
  cars : CarModel[]
  categories = [];
  imageList : string[] = [];
  public imagePath;
  imgURL: any[]=[];
  ///

  selectedTags : TagsModel[] = [];
  tags : TagsModel[] = [];
 
  baseTagListesi: TagsModel[] = [];
  tagListesiString: string[];

  htmlEditorConfig = {
    mediaEmbed: {
        previewsInData: true
    }
}

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: any[] = [];


  @ViewChild('fruitInput',{static:false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static:false}) matAutocomplete: MatAutocomplete;
  
  constructor(
    private router : Router,
    private adminService : AdminService
  ) {
    this.post.message = "";
    this.post.carId = "55ea2d01-c844-4d4c-b8e0-00da333ee78b";


   }

  async ngOnInit() {

    this.getCarList();
    this.getCategories();
    // await this.adminService.getList('Categories');

  }

  getCarList(){
    this.adminService.getList('car').then(data=>{
      this.cars = data;
    });
  }

  getCategories(){
    this.adminService.getList('Categories').then(data=>{
    
      //this.selectedTags = data;
      this.tags = data;
       this.baseTagListesi = this.tags; 
       this.tagListesiString = data.map(x => {
           return x.name;
       });
       
       for (let i = 0; i < this.selectedTags.length; i++) {
           const index = this.tags.findIndex(
               x =>
                   x.Id ==
                   this.selectedTags[i].Id
           );
           if (index >= 0) {
               this.tags.splice(index, 1);
           }
       }
    });
  }



  addPost(){


    this.post.categories = this.selectedTags;
    this.post.imageList = this.imgURL;
     this.adminService.addItem('blog',this.post).then( data => {
      this.router.navigate(['blog']);
   });
  }

  deletePhoto(file : any){
    console.log(file);

    const index: number = this.imgURL.indexOf(file);
    if (index !== -1) {
        this.imgURL.splice(index, 1);
    }   
  }


  public onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };

    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }


  onFileChanged(event) {
    const file = event.target.files[0]
    this.preview(file);
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL.push(reader.result)

    }

    console.log(this.imageList);
  }




  searchAddressText(searcText: any) {
       
    if (this.baseTagListesi) {
        if (searcText){
            this.filteredTags = [];
          for (let i = 0; i < this.baseTagListesi.length; i++) {      
           if ((this.baseTagListesi[i]).name.toUpperCase().indexOf(searcText.toUpperCase()) !== -1) {
               const data = {Id: this.baseTagListesi[i].Id, name: this.baseTagListesi[i].name};
               this.filteredTags.push(data);
            }
        }
        this.tags = this.filteredTags;
        }
        else {
            this.tags = this.baseTagListesi;
        } 
    }

}


  selected(event: MatAutocompleteSelectedEvent): void {
    console.log();
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    const tag = { Id : event.option.value, name: event.option.viewValue}
    this.selectedTags.push(tag);
    //this.addAdressToUser(userId, event.option.value);
    //this.getAddressList();
    for (let i = 0; i < this.selectedTags.length; i++) {
      const index = this.tags.findIndex(
          x =>
              x.Id ==
              this.selectedTags[i].Id
      );
      if (index >= 0) {
          this.tags.splice(index, 1);
      }
  }
}

remove(id: string,name:string): void {

  const index = this.selectedTags.findIndex(x => x.Id == id);
  if (index >= 0) {
      this.selectedTags.splice(index, 1);
      const tag = { Id : id, name: name}
      this.tags.push(tag);
     
  }
}




}
