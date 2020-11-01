import { Component, OnInit } from '@angular/core';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { CarModel } from 'app/main/admin/cars/CarModel';
import { AdminService } from 'app/main/admin/admin.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith, takeUntil} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TagsModel } from 'app/shared/models/TagsModel';
import { MyUploadAdapter } from '../new-question/UploadAdapter';
import { QuestionDetailService } from '../question-detail/question-detail.service';
import { timingSafeEqual } from 'crypto';
import { Router } from '@angular/router';



@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {

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


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: any[] = [];
  images:  any[]=[];

  @ViewChild('fruitInput',{static:false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static:false}) matAutocomplete: MatAutocomplete;
  
  constructor(
    private router : Router,
    private questionDeatilService : QuestionDetailService,
    private adminService : AdminService
  ) {
    this._unsubscribeAll = new Subject();
   }

  async ngOnInit() {


    this.questionDeatilService.onPostChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
     this.post = data;
    this.post.categories.forEach(element => {
       this.selectedTags.push(element["category"])
    });
  });
  console.log(this.post);
    this.getCarList();
    this.getCategories();
    // await this.adminService.getList('Categories');
   this.getPostImages();
  }

  getCarList(){
    this.adminService.getList('car').then(data=>{
      this.cars = data;
    });
  }
  getPostImages(){
    this.questionDeatilService.getPostImages().then(data=>{
        this.images = data;
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



  savePost(){


    this.post.categories = this.selectedTags;
    this.post.imageList = this.images;
    this.adminService.updateData('post/',this.post).then(data=>{
      this.router.navigateByUrl('/questions/'+this.post.Id);  
    });

  }

  deletePhoto(file : any){
    console.log(file);

    const index: number = this.images.indexOf(file);
    if (index !== -1) {
        this.images.splice(index, 1);
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
      this.images.push(reader.result)

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
