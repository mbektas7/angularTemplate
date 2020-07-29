import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, Router, RouterModule } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { PageClaims } from 'enums/pageTypes.enum';
import { LoginGuard } from 'app/shared/guards/login.guard';


const routes: Routes = [
  {
      path     : '',
      component: DashboardComponent,
      canActivate: [LoginGuard],
      data: {pageType: PageClaims.dashboard}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MirapiSharedModule,
    MatTableModule
],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
