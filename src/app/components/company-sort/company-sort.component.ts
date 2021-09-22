import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component ({
    selector: 'company-sort',
    templateUrl : './company-sort.component.html'
})

export class CompanySort {
    
    @Output()
    onSortFieldChanged = new EventEmitter<string>();

    public sortingTypes = [
        { id: 0, name: "По имени", field: "name" },
        { id: 1, name: "По типу" , field: "type" },
        { id: 2, name: "По индустрии", field: "industry" }
      ];

    private readonly _defSortingFieldNum: number = 0;

    public sortForm: FormGroup = new FormGroup({
        sortingTypesList : new FormControl(this._defSortingFieldNum)
    });
    
    constructor() {       
    
        this.sortForm.get('sortingTypesList').valueChanges.subscribe(value => {
            this.onSortFieldChanged.emit(this.sortingTypes[value].field);
        });
    }

    public ngOnInit() {
        this.onSortFieldChanged.emit(this.sortingTypes[this._defSortingFieldNum].field);
    }
}