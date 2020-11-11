import { TagsModel } from './TagsModel';

export class BlogModel {
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