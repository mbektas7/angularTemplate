import { NgModule } from '@angular/core';

import { MirapiIfOnDomDirective } from '@mirapi/directives/mirapi-if-on-dom/mirapi-if-on-dom.directive';
import { MirapiInnerScrollDirective } from '@mirapi/directives/mirapi-inner-scroll/mirapi-inner-scroll.directive';
import { MirapiPerfectScrollbarDirective } from '@mirapi/directives/mirapi-perfect-scrollbar/mirapi-perfect-scrollbar.directive';
import { MirapiMatSidenavHelperDirective, MirapiMatSidenavTogglerDirective } from '@mirapi/directives/mirapi-mat-sidenav/mirapi-mat-sidenav.directive';

@NgModule({
    declarations: [
        MirapiIfOnDomDirective,
        MirapiInnerScrollDirective,
        MirapiMatSidenavHelperDirective,
        MirapiMatSidenavTogglerDirective,
        MirapiPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        MirapiIfOnDomDirective,
        MirapiInnerScrollDirective,
        MirapiMatSidenavHelperDirective,
        MirapiMatSidenavTogglerDirective,
        MirapiPerfectScrollbarDirective
    ]
})
export class MirapiDirectivesModule
{
}
