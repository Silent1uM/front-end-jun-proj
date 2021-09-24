import { Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'company-sort',
    templateUrl : './company-sort.component.html',
    styleUrls: ['./company-sort.component.scss']
})

/**Компонент сортировки списка компаний */
export class CompanySort implements OnInit, OnDestroy {
    
    /**Ивент, генерируемый при изменения поля сортировки*/
    @Output()
    public onSortFieldChanged = new EventEmitter<string>();

    /**Массив с типами возможных сортировок*/
    public sortingTypes = [
        { id: 0, name: "По имени", field: "name" },
        { id: 1, name: "По типу" , field: "type" },
        { id: 2, name: "По индустрии", field: "industry" }
      ];
    
    /**Номер типа сортировки по умолчанию */
    private readonly _defSortingFieldNum: number = 0;

    /**Reactive form с элементами для сортировки*/
    public sortForm: FormGroup = new FormGroup({
        sortingTypesList : new FormControl(this._defSortingFieldNum)
    });
    
    /** Подписка на изменение типа сортировки */
    private _sortingTypesListSubscription: Subscription;
    
    /**Инициализация */
    public ngOnInit(): void {
        this._sortingTypesListSubscription = this.sortForm.get('sortingTypesList').valueChanges.subscribe(value => {
            this.onSortFieldChanged.emit(this.sortingTypes[value].field);
        });

        this.onSortFieldChanged.emit(this.sortingTypes[this._defSortingFieldNum].field);
    }

    /**Уничтожение объекта */
    public ngOnDestroy(): void {
        this._sortingTypesListSubscription.unsubscribe();
    }
}