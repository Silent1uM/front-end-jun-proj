import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

/**
 * @title Индикатор загрузки
 */
@Component({
    selector: 'loading-spinner',
    templateUrl: './loading-spinner.component.html',
})

export class LoadingSpinner {
    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'indeterminate';
}