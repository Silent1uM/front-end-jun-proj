import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

/**Компонент с основным layout'ом, который присутствует на каждом экране*/
export class MainLayout {

    /**
     * Конструктор
     * @param _router Сервис маршрутизации
     */
    constructor(private _router: Router){}

    /**Переход к странице с яндекс картой */
    public goToYandexMapPage(): void {
        this._router.navigate(['/company-yandex-map']);
    }   

    /**Переход к странице со списком компаний*/
    public goToCompanyListPage(): void {
        this._router.navigate(['/company-list']);
    }   
}