import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from 'app/main/admin/admin.service';
import { IkinciElModel } from 'app/shared/models/IkinciElModel';
import { MyUploadAdapter } from 'app/main/questions/new-question/UploadAdapter';
import { IkincielService } from '../ikinciel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-update-ikinciel',
  templateUrl: './update-ikinciel.component.html',
  styleUrls: ['./update-ikinciel.component.scss']
})

export class UpdateIkincielComponent implements OnInit {

  public Editor = ClassicEditor;
  private _unsubscribeAll: Subject<any>;
  post = new IkinciElModel();
  htmlEditorConfig = {
    mediaEmbed: {
        previewsInData: true
    }
}


  constructor(
    private adminService : AdminService,
    private router : Router,
    private ikinciElService : IkincielService
  )
   { 

    this._unsubscribeAll = new Subject();
    this.post.message = "";

      this.ikinciElService.onPostChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
      this.post = data;         
    });
  }

  ngOnInit() {

    
  }


  addPost(){

   this.adminService.updateData('ikinciel/',this.post).then( data => {
    this.router.navigate(['ikinciel']);
 });
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

  

}
