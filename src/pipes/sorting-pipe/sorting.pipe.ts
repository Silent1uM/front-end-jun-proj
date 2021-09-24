import { Pipe, PipeTransform } from "@angular/core";
import { CompanyListItemViewModel } from "src/view-models/company-list-item-view-model";
import { filterType } from "src/types/filter-types";

@Pipe({
  name: "sortBy"
})

/**Пайп для сортировки массива */
export class SortingPipe implements PipeTransform {
  transform(array: CompanyListItemViewModel[], field: string ): CompanyListItemViewModel[];
  transform(array: filterType[], field: string): filterType[];
  /**
   * Сортировка массива. Используется перегрузка
   * @param array Входной массив для сортировки
   * @param field Поле, по которому необходимо осуществить сортировку
   */  
  transform(array: any, field: any): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    array.sort((a: any, b: any) => {

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