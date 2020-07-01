import { PropertyFilterValuesModel } from './FilterModel';

export class FilterModelV2 {
    take: number;
    beginIndex: number;
    orderByDesc: boolean;
    orderByColumnName: string;
    PropertyFilterValues: PropertyFilterValuesModel[];

    
    constructor(pageSize: number, page: number, sortName: string, columnName: string) {

        if (sortName === 'desc') {  this.orderByDesc = true; }
        else if (sortName === 'asc' ){this.orderByDesc = false; }
        this.beginIndex = page;
        this.take = pageSize;
        this.PropertyFilterValues = new Array();
        this.orderByColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1);        
        this.PropertyFilterValues = new Array();
        this.PropertyFilterValues.push();
    }
    
}