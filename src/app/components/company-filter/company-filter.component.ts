import { Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CompanyListItemViewModel } from 'src/view-models/company-list-item-view-model';
import { filterType } from 'src/types/filter-types';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./company-filter.component.scss']
})

/**Компонент фильтрации списка компаний */
export class CompanyFilter implements OnInit, OnDestroy {

    /**Выбранный фильтр по имени */
    public chosenNameFilter: filterType = {name : ""};
    
    /**Выбранный фильтр по типу */
    public chosenTypeFilter: filterType;
    
    /**Выбранный фильтр по индустрии */
    public chosenIndusrtyFilter: filterType;

    /**Список возможных фильтров по типам компаний */
    public typesFiltersList : filterType [] = [];

    /**Список возможных фильтров по типам индустрий */
    public industryFiltersList : filterType [] = [];   
    
    /**Сеттер - ивент, реагирующий на получение нового списка компаний 
     * @param newCompanyList: Новый список компаний
    */
    @Input()
    public set prepareNewFiltersList(newCompanyList: CompanyListItemViewModel[]) { 
        this.generateTypesFiltersList(newCompanyList);
        this.generateIndustryFiltersList(newCompanyList);       
        this.resetFilterParams();
    }

    /**Ивент изменения текущих фильтров */
    @Output()
    public onFiltersChanged = new EventEmitter<filterType[]>();

    /**Reactive form с элементами для выбора фильтров */
    public filterForm: FormGroup = new FormGroup({

        companyName: new FormControl(),
        companyTypes: new FormControl(0),
        companyIndustry: new FormControl(0)
    });
    
    /** Подписки компонента */
    private _subscriptions: Subscription[] = [];

    /**Инициализация компонента */
    public ngOnInit(): void {

        this._subscriptions.push(
            this.filterForm.get('companyName').valueChanges.subscribe(value => {                
                this.chosenNameFilter = {name: value.trim()};
                this.generateNewFilterList();
        }));
        
        this._subscriptions.push(
            this.filterForm.get('companyTypes').valueChanges.subscribe(value => {                
                this.chosenTypeFilter = {type: value};
                this.generateNewFilterList();
        }));

        this._subscriptions.push(
            this.filterForm.get('companyIndustry').valueChanges.subscribe(value => {            
                this.chosenIndusrtyFilter ={industry: value};           
                this.generateNewFilterList();
        }));
    }

    /**Уничтожение объекта */
    public ngOnDestroy(): void {
        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    /**Конструктор */
    constructor() {
        this.chosenTypeFilter = {type: this._filterDisabledString};
        this.chosenIndusrtyFilter = {industry: this._filterDisabledString}        
    }

    /**Значения фильтров, которые будут установлены по умолчанию*/
    private readonly _filterDisabledString : string = " "; 

    /**Генерация нового списка применяемых фильтров*/
    private generateNewFilterList(): void {
        const resultFilterList : filterType [] = [];
        
        if (this.chosenNameFilter['name']) {
            resultFilterList.push(this.chosenNameFilter);
        }

        if (this.chosenTypeFilter['type'] !== this._filterDisabledString) {
            resultFilterList.push(this.chosenTypeFilter);
        }
               
        if (this.chosenIndusrtyFilter['industry'] !== this._filterDisabledString) {
            resultFilterList.push(this.chosenIndusrtyFilter);
        }   
        this.onFiltersChanged.emit(resultFilterList);
    }

    /**
     * Формирование списка допустимых фильтров по типам компаний
     * @param newCompanyList Новый список компаний
     */
    private generateTypesFiltersList(newCompanyList: CompanyListItemViewModel[]): void {
        
        this.typesFiltersList = [{type: this._filterDisabledString}];
                
        const newTypesFilterList: string[] = [];
        
        newCompanyList.forEach(company => {
            
            const companyType:string = company.type;
              
            if (!newTypesFilterList.includes(companyType)) {
                newTypesFilterList.push(companyType);
                this.typesFiltersList.push({type: companyType});
            }           
        })
    }

    /**
     * Формирование списка допустимых фильтров по индустриям компаний
     * @param newCompanyList Новый список компаний
     */
    private generateIndustryFiltersList(newCompanyList: CompanyListItemViewModel[]): void {
        
        this.industryFiltersList = [{industry: this._filterDisabledString}];
               
        const newIndustryFilterList: string[] = [];
        
        newCompanyList.forEach(company => {           
            const compatyIndustry:string = company.industry;

            if (!newIndustryFilterList.includes(compatyIndustry)) {
                newIndustryFilterList.push(compatyIndustry);
                this.industryFiltersList.push({industry: compatyIndustry});
            }            
        }) 
    }

    /**Сброс текущих фильтров*/
    private resetFilterParams() {
        this.filterForm.get('companyName').setValue("");
        this.filterForm.get('companyTypes').setValue(this._filterDisabledString);
        this.filterForm.get('companyIndustry').setValue(this._filterDisabledString);
    }
}