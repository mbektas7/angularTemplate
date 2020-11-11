import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AdminService } from "../admin/admin.service";
import { PostModel } from "../admin/posts/PostModel";
import { mirapiAnimations } from "@mirapi/animations";
import { AuthService } from "app/shared/services/auth.service";
import { TestService } from 'app/shared/test.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-questions",
    templateUrl: "./questions.component.html",
    styleUrls: ["./questions.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: mirapiAnimations,
})
export class QuestionsComponent implements OnInit {
    posts: any;
    isLoggedIn = false;
    searchText: "string";
    summary: any;
    user: any;
    subscription: Subscription;
    
    constructor(
        private adminService: AdminService,
        private authService: AuthService,
        private testService : TestService
    ) {
      
     
        if (this.authService.loggedIn()) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    ngOnInit() {
       
    
        this.getList();
        this.getSummary();
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
        this.adminService
            .getList("post/filter/" + this.searchText)
            .then((data) => {
                this.posts = data;
            });
    }

    getSummary() {
        this.adminService.getList("post/getSummary/").then((data) => {
            this.summary = data;
        });
    }
}
