import { NumberValueAccessor } from '@angular/forms';
import { TagsModel } from 'app/shared/models/TagsModel';

export class PostModel {
    Id: string;
    title : string;
    message : string;
    carId : string;
    userId : string;
    parentId : string;
    isAnswered : boolean;
    answer : number;
    vote : number;
    view : number;
    categories : TagsModel[];
    imageList : any[];
}