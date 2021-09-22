import { Input, Component } from '@angular/core';
import { CompanyListItemViewModel } from "src/classes/company-list-item-view-model";

@Component({
    selector: "list-item",
    templateUrl: './company-list-item.component.html',
    styleUrls: ['./company-list-item.component.scss']
})

export class CompanyListItem {

    @Input()
    public company: CompanyListItemViewModel;
    
}