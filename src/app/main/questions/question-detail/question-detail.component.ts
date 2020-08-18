import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { QuestionsService } from '../questions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { QuestionDetailService } from './question-detail.service';
import { request } from 'http';
import { AuthService } from 'app/shared/services/auth.service';
import { SaveAnswer } from 'app/main/admin/posts/saveAnswer';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: mirapiAnimations
})
export class QuestionDetailComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  post : any
  comments : any[]
  answer : string;
 
  constructor(private questionDeatilService : QuestionDetailService,private autService: AuthService) {

    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
     this.questionDeatilService.onPostChanged
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(data => {
        this.post = data;

     });
  }


  sendAnswer() {

   
    let request = new SaveAnswer()
    request.title =  ""
    request.parentId = this.post.Id;
    request.message = this.answer;
    request.userId = this.autService.getCurrentUserId();
    request.carId = this.post.car.Id;
    request.isAnswered = false;

    this.questionDeatilService.addAnswer(request).then();
    this.answer = "";
    
  }







}
