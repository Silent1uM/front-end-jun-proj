import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICompanyItemResponseData } from '../../interfaces/company-item-data.interface';
import { CompanyListItemModel } from 'src/models/company-list-item-model';
import { CompanyListItemViewModel } from 'src/view-models/company-list-item-view-model';

/**HTTP сервис для запроса списка компаний */
@Injectable()
export class HttpService {

    /**
     * Конструктор
     * @param httpClient Сервис HTTP клиента
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Запрос данных о компанях
     * @param forceUpdate Принудительно запросить новые данные о компаниях. Необязательный параметр, по умолчанию false
     */
    public getCompanyData(forceUpdate: boolean = false): Observable<CompanyListItemViewModel[]> {
        
        const params = new HttpParams().set('forceUpdate', forceUpdate);
        
        return (this.httpClient.get('https://random-data-api.com/api/company/random_company?size=100', {params}) as Observable<ICompanyItemResponseData[]>)
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