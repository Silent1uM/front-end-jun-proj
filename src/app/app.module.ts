// модули ангуляра
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// свои модули
import { AppComponent } from './app.component';
import { MainLayout } from 'src/app/components/layout/layout.component';
import { CompanyList } from 'src/app/components/company-list/company-list.component';
import { CompanyListItem } from 'src/app/components/company-list-item/company-list-item.component';
import { CompanyDetail } from 'src/app/components/company-detail/company-detail.component';
import { CompanyYandexMap } from 'src/app/components/company-yandex-map/company-yandex-map.component';
import { LoadingSpinner } from 'src/app/components/loading-spinner/loading-spinner.component';
import { CompanySort } from 'src/app/components/company-sort/company-sort.component';
import { CompanyFilter } from 'src/app/components/company-filter/company-filter.component';

// свои сервисы
import { HttpService } from 'src/services/http-service/http.service';
import { CacheInterceptor } from 'src/services/cache-interceptor/cache-interceptor';

// свои пайпы
import { SortingPipe } from 'src/pipes/sorting-pipe/sorting.pipe';
import { FilteringPipe } from 'src/pipes/filtering-pipe/filtering.pipe';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', redirectTo: 'company-list' },
    { path: 'company-list', component: CompanyList },
    { path: 'company-detail', component: CompanyDetail },
    { path: 'company-yandex-map', component: CompanyYandexMap },
    { path: 'detail/:id', component: CompanyDetail }
];

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule],

    declarations: [AppComponent,
        MainLayout,
        CompanyList,
        CompanyListItem,
        CompanyDetail,
        CompanyYandexMap,
        LoadingSpinner,
        CompanySort,
        CompanyFilter,
        SortingPipe,
        FilteringPipe],

    providers: [HttpService, {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }