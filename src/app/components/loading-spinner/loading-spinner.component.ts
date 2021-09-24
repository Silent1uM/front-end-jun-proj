import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
    selector: 'loading-spinner',
    templateUrl: './loading-spinner.component.html',
})

/**Компонент индикатора загрузки списка компаний*/
export class LoadingSpinner {
    public color: ThemePalette = 'primary';
    public mode: ProgressSpinnerMode = 'indeterminate';
}