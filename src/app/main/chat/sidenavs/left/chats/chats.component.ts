import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { mirapiAnimations } from '@mirapi/animations';

import { ChatService } from 'app/main/chat/chat.service';
import { MirapiMatSidenavHelperService } from '@mirapi/directives/mirapi-mat-sidenav/mirapi-mat-sidenav.service';


@Component({
    selector     : 'chat-chats-sidenav',
    templateUrl  : './chats.component.html',
    styleUrls    : ['./chats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : mirapiAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy
{
    chats: any[];
    chatSearch: any;
    contacts: any[];
    searchText: string;
    user: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     * @param {MirapiMatSidenavHelperService} _mirapiMatSidenavHelperService
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _chatService: ChatService,
        private _mirapiMatSidenavHelperService: MirapiMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.chatSearch = {
            name: ''
        };
        this.searchText = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        
        this.user = this._chatService.user;
       
        this.chats = this._chatService.chats;
        this.contacts = this._chatService.contacts;
        console.log(this.contacts);
        this._chatService.onChatsUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedChats => {
                this.chats = updatedChats;
            });

        this._chatService.onUserUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedUser => {
                this.user = updatedUser;
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    getChat(contact): void
    {
        
        this._chatService.getChat(contact);

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._mirapiMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

  
    setUserStatus(status): void
    {
        this._chatService.setUserStatus(status);
    }

    /**
     * Change left sidenav view
     *
     * @param view
     */
    changeLeftSidenavView(view): void
    {
        this._chatService.onLeftSidenavViewChanged.next(view);
    }

    /**
     * Logout
     */
    logout(): void
    {
        console.log('logout triggered');
    }
}
