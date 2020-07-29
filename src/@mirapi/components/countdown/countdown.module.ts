import { NgModule } from '@angular/core';

import { MirapiCountdownComponent } from '@mirapi/components/countdown/countdown.component';

@NgModule({
    declarations: [
        MirapiCountdownComponent
    ],
    exports: [
        MirapiCountdownComponent
    ],
})
export class MirapiCountdownModule
{
}
