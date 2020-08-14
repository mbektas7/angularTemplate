import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { QuestionsService } from '../questions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostModel } from 'app/main/admin/posts/PostModel';
import { QuestionDetailService } from './question-detail.service';

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
  constructor(private questionService : QuestionDetailService) {

    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
     this.questionService.onPostChanged
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(data => {
        this.post = data;

        this.comments = [ {'username':'Miraç', 'time':'Bugün', 'message' : 'Ben de bu konuda bilgi almak istiyorum.'}]
        this.post.comments = this.comments;

        console.log(this.post);
     });
  }







}
