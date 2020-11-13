import { Component, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';


@Component({
    selector     : 'chat-start',
    templateUrl  : './chat-start.component.html',
    styleUrls    : ['./chat-start.component.scss'],
    animations : mirapiAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ChatStartComponent
{
    constructor()
    {
    }
}
