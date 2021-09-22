import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyListItemViewModel } from 'src/classes/company-list-item-view-model';
import { HttpService } from 'src/services/http-service/http.service';
import { filterType } from 'src/types/filter-types';

@Component({
    selector: 'list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyList {

    public companyListToView: CompanyListItemViewModel[] = [];
    public isLoading = false;
    public sortField: string = "";
    public filters: filterType [];

    constructor(private httpService: HttpService, private router: Router) { }

    public ngOnInit() {
        this.requestCompanyListData();
    }

    public requestCompanyListData() {
        this.isLoading = true;
        this.httpService.getData().subscribe((data: CompanyListItemViewModel[]) => {
            this.companyListToView = data;
            this.isLoading = false;
        }
        );
    }
   
    public redirectToDetail(company: CompanyListItemViewModel) {
        this.router.navigate(['/detail', company.id], {state : {companyData: company}});
    }

    onSortFieldChanged (newSortField: string) {
        this.sortField = newSortField;
        console.log(`New sort field setted: ${this.sortField}`);
    }

    onFiltersChanged (newFiltersList: filterType[]) {
        this.filters = newFiltersList;
    }
}