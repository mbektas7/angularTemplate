import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mirapiWidgetToggle]'
})
export class MirapiWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
