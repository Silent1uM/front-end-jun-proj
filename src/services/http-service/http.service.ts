import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICompanyItemResponseData } from '../../interfaces/company-item-data.interface';
import { CompanyListItemModel } from '../../classes/company-list-item-model';
import { CompanyListItemViewModel } from 'src/classes/company-list-item-view-model';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) { }


    public getData(): Observable<CompanyListItemViewModel[]> {
        return (this.httpClient.get('https://random-data-api.com/api/company/random_company?size=100') as Observable<ICompanyItemResponseData[]>)
            .pipe(
                map((data: ICompanyItemResponseData[]) => {
                    const companyList: CompanyListItemViewModel[] = [];
                    data.forEach((company: ICompanyItemResponseData) => {
                        const companyItemModel = new CompanyListItemModel(company);
                        companyList.push(new CompanyListItemViewModel(companyItemModel));
                    });

                    return companyList;
                })
            );
    }

}