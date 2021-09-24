import { Pipe, PipeTransform } from "@angular/core";
import { CompanyListItemViewModel } from 'src/view-models/company-list-item-view-model';
import { filterType } from 'src/types/filter-types';

@Pipe({
  name: "filteringBy"
})

/**Пайп фильтрации списка*/
export class FilteringPipe implements PipeTransform {
    /**
     * Фильтрация компонента
     * @param inputArray Входной массив для фильтрации
     * @param filters Массив фильтров
     */
    transform(inputArray: CompanyListItemViewModel[], filters?: filterType[]): CompanyListItemViewModel[] {
        if (filters && Array.isArray(inputArray)) {

          filters.forEach(function (filterObj) {
            const filterKey = Object.keys(filterObj)[0];
            const filterValue = filterObj[filterKey].toLowerCase();
            
            inputArray.forEach(function (objectToFilter) {
                
              inputArray = inputArray.filter((objectToFilter) => 
                objectToFilter[filterKey].toLowerCase().indexOf(filterValue) >= 0);
            })
          });

          return inputArray;
        }
        else {
          
            return inputArray;
        }
      }
}