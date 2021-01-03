import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { AdminService } from '../admin/admin.service';

import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { MirapiProgressBarModule, MirapiSearchBarModule, MirapiWidgetModule } from '@mirapi/components';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectModule } from 'app/shared/components/multiselect/multiselect.module';
import { MatGridListModule, MatCardModule, MatMenuModule, MatBadgeModule } from '@angular/material';

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { BlogReadComponent } from './blog-read/blog-read.component';
import { BlogService } from './blog.service';
import { NewBlogComponent } from './new-blog/new-blog.component';


const routes = [
  {
      path     : '',
      component: BlogComponent,
  },
  {
    path     : 'blog-read/:id',
    component: BlogReadComponent,
    resolve: {
      data: BlogService
  }
}
,{
  path     : 'new-blog',
  component:  NewBlogComponent  ,
}

  ];


  @NgModule({
    imports: [
      RouterModule.forChild(routes),
      MatButtonModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatPaginatorModule,
      MatRippleModule,
      MatSelectModule,
      MatSortModule,
      MatSnackBarModule,
      MatTableModule,
      MatTabsModule,
      MatExpansionModule,
      MatDialogModule,
      MatDividerModule,
      MirapiSharedModule,
      MirapiWidgetModule,
      MatAutocompleteModule,
      MirapiSearchBarModule,
      AngularMultiSelectModule,
      MultiselectModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatRadioModule,
      MatSelectModule,
      MatBadgeModule,
      MatGridListModule,
      MatCardModule,
      CKEditorModule,
      MatChipsModule,
      MatMenuModule,
      MirapiProgressBarModule
    ],
    providers :[ AdminService,BlogService ],
    declarations: [
    
      BlogComponent, 
      BlogReadComponent,  
      NewBlogComponent,
    ],
      entryComponents: [ ]
   
  })
export class BlogModule { }
