import { Pipe, PipeTransform } from "@angular/core";
import { CompanyListItemViewModel } from "src/classes/company-list-item-view-model";

@Pipe({
  name: "sortBy"
})

export class SortingPipe  implements PipeTransform {
  transform(array: CompanyListItemViewModel[], field: string): CompanyListItemViewModel[] {
    if (!Array.isArray(array)) {
      return array;
    }
    array.sort((a: CompanyListItemViewModel, b: CompanyListItemViewModel) => {
      const aField: string = a[field].toLocaleUpperCase();
      const bField: string = b[field].toLocaleUpperCase();
      
      if (aField < bField) {
          return -1;
      } 
      else if (aField > bField) {
          return 1;
      } 
      else {
          return 0;
      }
    });
    return array;
  }
}