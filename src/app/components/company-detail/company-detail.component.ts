import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyListItemViewModel } from 'src/view-models/company-list-item-view-model';

@Component({
    selector: 'detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.components.scss']
})

/**Компонент - детали о компании */
export class CompanyDetail {
    
    /**Компания */
    public company: CompanyListItemViewModel;

    /**
     * Конструктор
     * @param _router Сервис навигации
     */
    constructor(private _router: Router) {
        this.company = this._router.getCurrentNavigation().extras.state.companyData;
    }

}