import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectComponent } from './multiselect.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MultiselectComponent],
  imports: [
    AngularMultiSelectModule,
    FormsModule,
    CommonModule
  ],
  exports: [MultiselectComponent]
})
export class MultiselectModule { }
