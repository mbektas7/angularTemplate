import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { MirapiUtils } from '@mirapi/utils';
import { HttpRequestsService } from 'app/shared/services/httpRequests.service';

@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

 
    constructor(
        private _httpClient: HttpRequestsService
    )
    {

        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                
                this.getUser()
            ]).then(
                ([contacts, user]) => {
                    this.contacts = contacts;
                   // this.chats = chats;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }


    getChat(contactId): Promise<any>
    {
        
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });


        // Eğer daha önce böyle bir chat yoksa yeni bir sohbet başlat
        if ( !chatItem )
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }

        return new Promise((resolve, reject) => {
            this._httpClient.get('messages/getById/' + chatItem.contactId)
                .subscribe((response: any) => {
                    const chat = response["data"];

                    const chatContact = this.contacts.find((contact) => {
                        return contact.Id === contactId;
                    });

                    const chatData = {
                        chatId : chat.id,
                        dialog : chat.dialog,
                        contact: chatContact
                    };

                    this.onChatSelected.next({...chatData});

                }, reject);

        });

    }

    // yeni bir chat başlatmak için kullanılır.
    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {


            //eğer bu sohbet daha önce varsa o sohbete gidilir.
            const contact = this.contacts.find((item) => {
                return item.Id === contactId;
            });

            const chatId = MirapiUtils.generateGUID();

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.Name,
                unread         : false,
                avatar : contact.photo.path
            };

            // yeni bir chat oluşturulur ve bu soldaki chat listesine eklenir.
            this.user.chatList.push(chatListItem);

                    // Bir chat kaydet
                    this._httpClient.post('messages/createChat/' + this.user.id, chatListItem)
                        .subscribe(newUserData => {

                            //kayıt sonrası kullanıcı detayını güncelle.
                            this.getUser().then(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
            
        });
    }

   // bir kullanıcı seçildi
    selectContact(contact): void
    {

        this.onContactSelected.next(contact);
    }


    // kullanının durumunu görüntülemek için.
    setUserStatus(status): void
    {
        this.user.status = status;
    }



    // kullanıcı güncellemek için. henüz kullanılmadı.
    updateUserData(userData): void
    {
        this._httpClient.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                    this.user = userData;
                }
            );
    }


    // Konuşma güncelleme metodu. burada son mesaj servise gönderilir.
    updateDialog(chatId, message): Promise<any>
    {
        return new Promise((resolve, reject) => {



            this._httpClient.post('messages/updateChat/' + chatId, message)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

  
    // Sohbet penceresine kullanıcı listesini getirir.
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('messages/users')
                .subscribe((response: any) => {
                    resolve(response["data"]);
                }, reject);
        });
    }



    // ne yaptığına dair fikrim yok. sorun olursa bakacağız.
    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('messages/74f4e69b-5fc9-48e3-9069-67f6f9376e0d')
                .subscribe((response: any) => {
                    resolve(response["data"]);
                }, reject);
        });
    }

    // kullanıcının chatlist verilerini getirir.
    // bu sayede sohbetler sol tarafta listelenir.
    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('messages')
                .subscribe((response: any) => {
                    resolve(response["data"]);
                }, reject);
        });
    }


    deleteChat(id:string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.delete('messages/chat/',id)
                .subscribe((response: any) => {
                    resolve(response["data"]);
                }, reject);
        });
    }
}
