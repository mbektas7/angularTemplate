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
import { ProfileService } from 'app/main/profile/profile.service';
import { ProfileComponent } from 'app/main/profile/profile.component';
import { ProfileAboutComponent } from 'app/main/profile/tabs/about/about.component';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { LoginGuard } from 'app/shared/guards/login.guard';
import { PageClaims } from 'enums/pageTypes.enum';
const routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [LoginGuard],
        data: {pageType: PageClaims.profile}

    }
];
@NgModule({
    declarations: [ProfileComponent, ProfileAboutComponent],
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
        MatAutocompleteModule
    ],
    providers: [ProfileService]
})
export class ProfileModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('tr-tr'); // DD/MM/YYYY
    }
}
