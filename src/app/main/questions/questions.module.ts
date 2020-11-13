
import { QuestionsComponent } from './questions.component';
import { LoginGuard } from 'app/shared/guards/login.guard';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
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
import { MirapiSearchBarModule, MirapiWidgetModule } from '@mirapi/components';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectModule } from 'app/shared/components/multiselect/multiselect.module';
import { NgModule } from '@angular/core';
import { MatGridListModule, MatCardModule, MatMenuModule, MatBadgeModule } from '@angular/material';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionsService } from './questions.service';
import { QuestionDetailService } from './question-detail/question-detail.service';
import { NewQuestionComponent } from './new-question/new-question.component';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MyUploadAdapter } from './new-question/UploadAdapter';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { SafePipe } from 'app/shared/pipes/SafePipe';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'app/shared/services/auth.service';

const routes = [
  {
      path     : '',
      pathMatch: 'full',
      component: QuestionsComponent,
  },
  {
    path     : 'questions/:id',
    pathMatch: 'full',
    component: QuestionDetailComponent,
    resolve: {
      data: QuestionDetailService
  }
},{
    path     : 'new-questions',
    pathMatch: 'full',
    component: NewQuestionComponent ,
},
{
  path     : 'update-question/:id',
  pathMatch: 'full',
  component: UpdateQuestionComponent,
  resolve: {
    data: QuestionDetailService
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
    MatMenuModule
  ],
  providers :[ QuestionsService , QuestionDetailService],
  declarations: [
    SafePipe ,
    QuestionsComponent,
    QuestionDetailComponent,
    NewQuestionComponent,
    UpdateQuestionComponent
 
  ],
    entryComponents: [ ]
 
})
export class QuestionsModule { }
