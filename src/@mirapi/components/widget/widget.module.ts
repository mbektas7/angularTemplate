import { NgModule } from '@angular/core';

import { MirapiWidgetComponent } from './widget.component';
import { MirapiWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        MirapiWidgetComponent,
        MirapiWidgetToggleDirective
    ],
    exports     : [
        MirapiWidgetComponent,
        MirapiWidgetToggleDirective
    ],
})
export class MirapiWidgetModule
{
}
