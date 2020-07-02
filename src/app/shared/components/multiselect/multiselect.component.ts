import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
    @Input()allItems = [];
    @Input() selectedItems = [];
    @Input() title;
    assignedItems = [];
    settings = {};
    willBeDeletedItems = [];
    willBeAddedItems = [];
    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
    async ngOnInit() {
        if (this.allItems){
            this.allItems = this.allItems.map((c) => {
                return { id: c.id, itemName: c.name };
            });
        }
      
        this.initClaimMultiSelectSettings();
        if (this.selectedItems){
            this.selectedItems = this.selectedItems.map((c) => {
                return { id: c.id, itemName: c.name };
            });
            this.assignedItems = this.selectedItems.slice(0);
        }
       
    }


    onItemSelect(item: any) {
        const index = this.selectedItems.indexOf(item);
        if(index <= -1){
            this.selectedItems.push(item);
        }
        this.itemSelected.emit(this.selectedItems);

    }
    OnItemDeSelect(item: any) {
        const index = this.selectedItems.indexOf(item);
        if (index > -1){
            this.selectedItems.slice(index, 1);
        }
        this.itemSelected.emit(this.selectedItems);

    }
    onSelectAll(items: Array<any>) {
        this.selectedItems = items;
        this.itemSelected.emit(this.selectedItems);

    }
    onDeSelectAll(items: Array<any>) {
        this.selectedItems = items;
        this.itemSelected.emit(this.selectedItems);
    }
    
  
  
   
    private initClaimMultiSelectSettings(): void {
        this.settings = {
            singleSelection: false,
            enableSearchFilter: true,
            addNewItemOnFilter: false,
            text: this.title,
            selectAllText: 'Hepsini seç',
            unSelectAllText: 'Bütün seçimleri kaldır',
        };
    }
    private selectItem(item) {
        if (this.assignedItems.filter(c => c.id === item.id).length === 0 &&
            this.willBeAddedItems.indexOf(item) === -1
        ) {
            this.willBeAddedItems.push(item);
        }
        this.willBeDeletedItems = this.willBeDeletedItems.filter(obj => obj.id !== item.id);
    }
    private deselectItem(item) {
        this.willBeAddedItems = this.willBeAddedItems.filter(obj => obj.id !== item.id);
        if (this.assignedItems.filter(c => c.id === item.id).length > 0
            && this.willBeDeletedItems.indexOf(item) === -1) {
            this.willBeDeletedItems.push(item);
        }
    }

}
