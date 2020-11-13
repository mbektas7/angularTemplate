import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { AdminService } from "../admin/admin.service";
import { PostModel } from "../admin/posts/PostModel";
import { mirapiAnimations } from "@mirapi/animations";
import { AuthService } from "app/shared/services/auth.service";
import { TestService } from 'app/shared/test.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Component({
    selector: "app-questions",
    templateUrl: "./questions.component.html",
    styleUrls: ["./questions.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: mirapiAnimations,
})
export class QuestionsComponent implements OnInit , OnDestroy {
    posts: any;
    isLoggedIn = false;
    searchText: "string";
    summary: any;
    user: User;
    userSub: Subscription;
    
    constructor(
        private adminService: AdminService,
        private authService: AuthService,
        private testService : TestService,
        private localStorageService : LocalStorageService
    ) {

        console.log("question module loaded");
        
      this.authService.getCurrentUser().subscribe();


    }

    ngOnInit() {
        this.userSub = this.authService.user$.subscribe((user: User) => {
            this.user = user;
            if (this.user) {
                this.isLoggedIn = true;
            }
            
          });
    
        this.getList();
        this.getSummary();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }


    getList() {
        this.adminService.getList("post").then((data) => {
            this.posts = data;
        });
    }

    add(item) {
        this.adminService.addItem("post", item).then(() => {
            this.getList();
        });
    }

    search() {
        if (this.searchText.length>0) {
            this.adminService
            .getList("post/filter/" + this.searchText)
            .then((data) => {
                this.posts = data;
            });
        } else {
            this.getList();
        }
        
    }

    getSummary() {
        this.adminService.getList("post/getSummary/").then((data) => {
            this.summary = data;
        });
    }
}
