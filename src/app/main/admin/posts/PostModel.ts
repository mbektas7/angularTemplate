import { NumberValueAccessor } from '@angular/forms';

export class PostModel {
    id: string;
    title : string;
    message : string;
    carId : string;
    userId : string;
    parentId : string;
    isAnswered : boolean;
    answer : number;
    vote : number;
    view : number;
}