import { NumberValueAccessor } from '@angular/forms';

export class PostModel {
    id: string;
    title : string;
    message : string;
    carId : String;
    userId : String;
    parentId : String;
    isAnswered : boolean;
    answer : number;
    vote : number;
    view : number;
}