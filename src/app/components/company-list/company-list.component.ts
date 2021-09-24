import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CompanyListItemViewModel } from 'src/view-models/company-list-item-view-model';
import { HttpService } from 'src/services/http-service/http.service';
import { filterType } from 'src/types/filter-types';

@Component({
    selector: 'list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})

/**Компонент со списком компаний */
export class CompanyList implements OnInit{
    
    /**Список компаний для отображения */
    public companyListToView: CompanyListItemViewModel[] = [];
    
    /**Флаг загрузки списка компаний */
    public isLoading: boolean = false;

    /**Флаг ошибки */
    public isError: boolean = false;

    /**Текущее поле для сортировки */
    public sortField: string = "";

    /**Список текущих фильтров */
    public filters: filterType [];
    
    /**Текущий размер ОТОБРАЖАЕМОГО списка*/
    private _listSize: number = 0;  

    /**
     * Конструктор
     * @param _httpService Сервис запросов списка компаний
     * @param _router Сервис маршрутизации 
     */
    constructor(private _httpService: HttpService, private _router: Router) {  }

    /**Инициализация */
    public ngOnInit(): void {       
        this.requestCompanyListData();
    }

    /**
     * Запрос списка компаний
     * @param forceUpdate Принудительно запросить новые данные о компаниях. Необязательный параметр, по умолчанию false
     */
    public requestCompanyListData(forceUpdate: boolean = false): void {
        this.isLoading = true;
        this.isError = false;
        this._httpService.getCompanyData(forceUpdate).subscribe((data: CompanyListItemViewModel[]) => {
            this.companyListToView = data;
            this.isLoading = false;
        }, (error: any) => {
            this.isLoading = false;
            this.isError = true;
            console.log(error.message);
        }, () => {
            this.isLoading = false;
        });
    }
    
    /**Подсчет количества отображаемых компаний. Привязан к ngFor в HTML*/
    public countListSize = (index: number): void => {
        this._listSize = index + 1;
    }

    /**Проверка присутствия элементов в списке компаний */
    public get isCompanyListEmpty(): boolean {
        return this._listSize === 0;
    }

    /**Редирект к странице с детальной информацией */
    public redirectToDetail(company: CompanyListItemViewModel): void {
        this._router.navigate(['/detail', company.id], {state : {companyData: company}});
    }

    /**Реакция на событие изменения поля сортировки*/
    public onSortFieldChanged (newSortField: string): void {
        this.sortField = newSortField;
    }

    /**Реакция на событие изменения используемых фильтров*/
    public onFiltersChanged (newFiltersList: filterType[]): void {
        this.resetListSize();
        this.filters = newFiltersList;
    }

    /**Сброс счетчика отображаемых компаний*/
    private resetListSize(): void {
        this._listSize = 0;
    }
}