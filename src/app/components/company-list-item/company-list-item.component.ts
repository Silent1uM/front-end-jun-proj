import { Input, Component } from '@angular/core';
import { CompanyListItemViewModel } from "src/view-models/company-list-item-view-model";

@Component({
    selector: "list-item",
    templateUrl: './company-list-item.component.html',
    styleUrls: ['./company-list-item.component.scss']
})

/**Компонент - элемент списка компаний */
export class CompanyListItem {

    /**
     * @param company информация о компании
     */
    @Input()
    public company: CompanyListItemViewModel;
    
}