import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
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
import { MirapiWidgetModule } from '@mirapi/components';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectModule } from 'app/shared/components/multiselect/multiselect.module';
import { BrandsComponent } from './brands/brands.component';
import { CarsComponent } from './cars/cars.component';
import { SaveBrandComponent } from './brands/save-brand/save-brand.component';
import { SaveCarComponent } from './cars/save-car/save-car.component';
import { PostsComponent } from './posts/posts.component';
import { SavePostComponent } from './posts/save-post/save-post.component';
import { SelectCarComponent } from './cars/select-car/select-car.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';



const routes = [

  {
    path     : 'brands',
    component: BrandsComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'cars',
    component: CarsComponent,
    canActivate: [AuthGuard]

  },
  {
    path     : 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard]

  },
  {
    path     : 'new/post',
    component: SavePostComponent,
    canActivate: [AuthGuard]

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
    MatSelectModule
  ],
  declarations: [
    AdminComponent,
    BrandsComponent,
    CarsComponent,
    SaveBrandComponent,
    SaveCarComponent,
    PostsComponent,
    SavePostComponent
        
  ],
    entryComponents: [
    SaveBrandComponent,
    SaveCarComponent
  ]
})
export class AdminModule { }
