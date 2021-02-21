import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from 'app/main/admin/admin.service';
import { IkinciElModel } from 'app/shared/models/IkinciElModel';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import { MyUploadAdapter } from 'app/main/questions/new-question/UploadAdapter';

@Component({
  selector: 'app-new-ikinciel',
  templateUrl: './new-ikinciel.component.html',
  styleUrls: ['./new-ikinciel.component.scss']
})
export class NewIkincielComponent implements OnInit {

  public Editor = ClassicEditor;
  post = new IkinciElModel;
  htmlEditorConfig = {
    mediaEmbed: {
        previewsInData: true
    }
}


  constructor(
    private adminService : AdminService,
    private router : Router
  ) { 

    this.post.message = "";
  }

  ngOnInit() {
  }


  addPost(){
     this.adminService.addItem('ikinciel',this.post).then( data => {
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
