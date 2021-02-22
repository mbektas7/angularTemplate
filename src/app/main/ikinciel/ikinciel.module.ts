import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IkincielComponent } from './ikinciel.component';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatExpansionModule, MatDialogModule, MatDividerModule, MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatBadgeModule, MatGridListModule, MatCardModule, MatMenuModule, MatButtonToggleModule, MatListModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MirapiWidgetModule, MirapiSearchBarModule, MirapiProgressBarModule, MirapiHighlightModule } from '@mirapi/components';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectModule } from 'app/shared/components/multiselect/multiselect.module';
import { AdminService } from '../admin/admin.service';
import { IkincielService } from './ikinciel.service';
import { IkincielDetayComponent } from './ikinciel-detay/ikinciel-detay.component';
import { NewIkincielComponent } from './new-ikinciel/new-ikinciel.component';
import { UpdateIkincielComponent } from './update-ikinciel/update-ikinciel.component';



const routes = [
  {
      path     : '',
      component: IkincielComponent,
  },
{
  path     : 'new-ikinciel', 
  component: NewIkincielComponent
},
  {
    path     : 'ikinciel-detay/:id',
    component: IkincielDetayComponent,
    resolve: {
      data: IkincielService
  }
},
{
  path     : 'update-ikinciel/:id',
  component: UpdateIkincielComponent,
  resolve: {
    data: IkincielService
}
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
      MatButtonModule,
      MatButtonToggleModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatTabsModule,
      MirapiSharedModule,
      MirapiHighlightModule,
      CKEditorModule,
      MirapiProgressBarModule,
      MatFormFieldModule,
    ],
    providers :[ AdminService,IkincielService ],
    declarations: [
    
      IkincielComponent,
    
      IkincielDetayComponent,
    
      NewIkincielComponent,
    
      UpdateIkincielComponent, 

    ],
      entryComponents: [ ]
   
  })
export class IkincielModule { }
