import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MypostsComponent } from './myposts.component';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionDetailComponent } from '../questions/question-detail/question-detail.component';
import { QuestionDetailService } from '../questions/question-detail/question-detail.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatExpansionModule, MatDialogModule, MatDividerModule, MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatGridListModule, MatCardModule } from '@angular/material';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { MirapiConfirmDialogModule, MirapiWidgetModule } from '@mirapi/components';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectModule } from 'app/shared/components/multiselect/multiselect.module';
import { QuestionsService } from '../questions/questions.service';
import { MypostDetailComponent } from './mypost-detail/mypost-detail.component';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';

const routes = [
  {
      path     : '',
      pathMatch: 'full',
      component: MypostsComponent,
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
    AngularMultiSelectModule,
    MultiselectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MirapiConfirmDialogModule
    
  ],
  providers :[ QuestionsService , QuestionDetailService],
  declarations: [
    MypostsComponent,
    MypostDetailComponent  
 
  ],
  entryComponents: [
    MirapiConfirmDialogComponent,
    MypostDetailComponent
  ]
 
})
export class MypostsModule { }
