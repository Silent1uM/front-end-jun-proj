import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyListItemViewModel } from 'src/classes/company-list-item-view-model';

@Component({
    selector: 'detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.components.scss']
})

export class CompanyDetail {
    
    public company: CompanyListItemViewModel;

    constructor(private _router: Router) {
        this.company = this._router.getCurrentNavigation().extras.state.companyData;
    }

}