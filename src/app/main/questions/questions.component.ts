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
import { TagsModel } from 'app/shared/models/TagsModel';
import { PostFilterDTO } from 'app/shared/models/PostFilterDTO';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material';
import { AlertifyService } from 'app/shared/services/alertify.service';
import { LoginModalComponent } from '../authentication/login-modal/login-modal.component';

@Component({
    selector: "questions",
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
    selectedCategory  = "0Tumu";
    questionPerPage = 10;
    tags : TagsModel[] = [];
    
    constructor(
        private adminService: AdminService,
        private authService: AuthService,
        public dialog: MatDialog,
        private alertifyService : AlertifyService
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
        this.getCategories();
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

    etiketeGoreListele(item){
        let id = this.tags.find(({name})=> name ===item).Id;
        var filter = {
            categoryId : id,
            searchtext : this.searchText,
            questionPerPage : this.questionPerPage
        }
            this.adminService
            .addItem("post/filter" , filter)
            .then((data) => {
                this.posts = data;
            });
    }

    search() {

        
        var filter = {
            categoryId : this.selectedCategory,
            searchtext : this.searchText,
            questionPerPage : this.questionPerPage
        }
            this.adminService
            .addItem("post/filter" , filter)
            .then((data) => {
                this.posts = data;
            });
        
    }

    getSummary() {
        this.adminService.getList("post/getSummary/").then((data) => {
            this.summary = data;
        });
    }

    getCategories(){
        this.adminService.getList('Categories').then(data=>{

         let tumu = {
             name : "Tümü",
             Id : "0Tumu"
         };
          this.tags= data;
          this.tags.push(tumu);
          this.tags.sort((a,b) => a.Id.localeCompare(b.Id))
          console.log(this.tags);
        });
      }

      filterByCategory() {
       this.search();
    }

    getRecordPerPage(){
        this.search();
    }

    loadMore(){
        this.questionPerPage = this.questionPerPage+10;
        this.getRecordPerPage();
    }

    login(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {
          width: '500px',
          data: { }
    
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result != null) { 
           console.log(result);
           this.authService.loginWithModal(result).subscribe(() => {
            this.alertifyService.success('Giriş yapıldı.');
            this.authService.getCurrentUser().subscribe();
          }, err => {
            this.alertifyService.error('Giriş sırasında hata oluştu. Bilgilerinizi kontrol ediniz.');
          });
        } else {
           
        }
          } 
        );
      }

      
}
