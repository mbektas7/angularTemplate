import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';




import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { ChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { ChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { MirapiSharedModule } from '@mirapi/shared.module';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';
import { ChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';



const routes: Routes = [
    {
        path: 'chat',
        component: ChatComponent,
        children: [],
        resolve: {
            chat: ChatService
        }
    }
];

@NgModule({
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatContactSidenavComponent,
        ChatStartComponent,
        ChatRightSidenavComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatChatsSidenavComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,

        MirapiSharedModule,

    ],
    providers   : [
        ChatService
    ]
})
export class ChatModule
{
}
