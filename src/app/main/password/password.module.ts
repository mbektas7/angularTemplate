import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { PasswordComponent } from './password.component';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { MirapiWidgetModule } from '@mirapi/components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes = [
    {
        path     : '',
        component: PasswordComponent,
        pathMatch: 'full'
    }
]
@NgModule({
  declarations: [
      PasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MirapiSharedModule,
    MirapiWidgetModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule                        
  ],
  
  entryComponents: [
    PasswordComponent
]
})
export class PasswordModule { }
