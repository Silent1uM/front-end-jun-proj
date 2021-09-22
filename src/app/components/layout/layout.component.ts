import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-layout',
    templateUrl: './layout.component.html' 
})

export class MainLayout {

    constructor(private router: Router){}

    public goToYandexMapPage() {
        this.router.navigate(['/company-yandex-map']);
    }   

    public goToCompanyListPage() {
        this.router.navigate(['/company-list']);
    }

    
}