import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from 'app/main/admin/admin.service';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { MyUploadAdapter } from 'app/main/questions/new-question/UploadAdapter';
import { CarModel } from 'app/shared/models/CarModel';
import { TagsModel } from 'app/shared/models/TagsModel';
import { BlogService } from '../blog.service';
import {map, startWith, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
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
    private adminService : AdminService,
    private blogService : BlogService
  ) {

    this._unsubscribeAll = new Subject();
    this.post.carId = "55ea2d01-c844-4d4c-b8e0-00da333ee78b";
   

   }

  async ngOnInit() {

    this.blogService.onPostChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
     this.post = data;
  });

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
     this.adminService.updateData('blog/',this.post).then( data => {
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
