import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CompanyListItemViewModel } from 'src/classes/company-list-item-view-model';
import { filterType } from 'src/types/filter-types';

@Component ({
    selector: 'company-filter',
    templateUrl: './company-filter.component.html'
})

export class CompanyFilter {

    private readonly _filterDisabledString : string = "Отключен"; 

    public chosenNameFilter: filterType = {name : ""};
    public chosenTypeFilter: filterType = {type: this._filterDisabledString};
    public chosenIndusrtyFilter: filterType = {industry: this._filterDisabledString};

    public typesFiltersList : {id: number, type: string}[] = [];
    public industryFiltersList : {id: number, industry: string}[] = [];   

    @Input()
    public set companyList(newCompanyList: CompanyListItemViewModel[])
    { 
        this.getTypesFiltersList(newCompanyList);
        this.getIndustryFiltersList(newCompanyList);
    }

    @Output()
    onFiltersChanged = new EventEmitter<filterType[]>();

    public filterForm: FormGroup = new FormGroup({

        companyName: new FormControl(),
        companyTypes: new FormControl(0),
        companyIndustry: new FormControl(0)
    });

    constructor() {
        this.filterForm.get('companyName').valueChanges.subscribe(value => {
            this.chosenNameFilter = {name: value.trim()};
            this.generateNewFilterList();
        });
        
        this.filterForm.get('companyTypes').valueChanges.subscribe(value => {
            this.chosenTypeFilter = {type: this.typesFiltersList[value].type};
            this.generateNewFilterList();
        });

        this.filterForm.get('companyIndustry').valueChanges.subscribe(value => {
            this.chosenIndusrtyFilter = {industry: this.industryFiltersList[value].industry};
            this.generateNewFilterList();
        });
    }

    private generateNewFilterList() {
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
        console.log(resultFilterList);
    }

    private getTypesFiltersList(newCompanyList: CompanyListItemViewModel[]) {
        
        let typesFiltersNum: number = 0;
        this.typesFiltersList = [{id : typesFiltersNum++, type: this._filterDisabledString}];
        const newTypesFilterList: string[] = [];
        
        newCompanyList.forEach(company => {
            
            const companyType:string = company.type;
              
            if (!newTypesFilterList.includes(companyType)) {
                newTypesFilterList.push(companyType);
                this.typesFiltersList.push({id: typesFiltersNum++, type: companyType});
            }           
        })
        console.log(this.typesFiltersList);  
    }

    private getIndustryFiltersList(newCompanyList: CompanyListItemViewModel[]) {
        
        let industryFiltersnum: number = 0;
        this.industryFiltersList = [{id: industryFiltersnum++, industry: this._filterDisabledString}];
        const newIndustryFilterList: string[] = [];
    
        newCompanyList.forEach(company => {           
            const compatyIndustry:string = company.industry;

            if (!newIndustryFilterList.includes(compatyIndustry)) {
                newIndustryFilterList.push(compatyIndustry);
                this.industryFiltersList.push({id: industryFiltersnum++, industry: compatyIndustry});
            }            
        })
        console.log(this.industryFiltersList);    
    }
}