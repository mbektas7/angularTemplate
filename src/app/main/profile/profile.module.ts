import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { MirapiSharedModule } from '@mirapi/shared.module';


import { ProfileComponent } from 'app/main/profile/profile.component';
import { ProfileAboutComponent } from 'app/main/profile/tabs/about/about.component';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { LoginGuard } from 'app/shared/guards/login.guard';
import { SelectCarComponent } from '../admin/cars/select-car/select-car.component';
import { MatDialogModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { ProfileDetailService } from './profil-detail.service';
import { SorularimComponent } from './tabs/sorularim/sorularim.component';
import { CevaplarimComponent } from './tabs/cevaplarim/cevaplarim.component';
import { MypostDetailComponent } from '../myposts/mypost-detail/mypost-detail.component';
import { MirapiConfirmDialogComponent } from '@mirapi/components/confirm-dialog/confirm-dialog.component';
import { MirapiConfirmDialogModule } from '@mirapi/components';
const routes = [

    {
        path: ':id',
        pathMatch: 'full',
        component: ProfileComponent,
        resolve: {
            data: ProfileDetailService
        }

    }
];
@NgModule({
    declarations: [ProfileComponent, ProfileAboutComponent,SelectCarComponent, SorularimComponent, CevaplarimComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatTabsModule,
        MatTabsModule,
        MirapiSharedModule,
        MatInputModule,
        MatChipsModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule,
        MatNativeDateModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MirapiConfirmDialogModule,
        
    ],
    providers: [ProfileDetailService],
    entryComponents :[
        SelectCarComponent,
        MirapiConfirmDialogComponent,
    ]
})
export class ProfileModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('en-in'); // DD/MM/YYYY
    }
}
