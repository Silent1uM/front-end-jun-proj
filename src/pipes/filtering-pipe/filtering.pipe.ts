import { Pipe, PipeTransform } from "@angular/core";
import { CompanyListItemViewModel } from 'src/classes/company-list-item-view-model';
import { filterType } from 'src/types/filter-types';

@Pipe({
  name: "filteringBy"
})

export class FilteringPipe implements PipeTransform {

    transform(inputArray: CompanyListItemViewModel[], filters?: filterType[]): CompanyListItemViewModel[] {
        if (filters && Array.isArray(inputArray)) {
               
          let arrayToReturn: CompanyListItemViewModel[]  = inputArray;
          
          filters.forEach(function (filterObj) {
            const filterKey = Object.keys(filterObj)[0];
            const filterValue = filterObj[filterKey].toLowerCase();
            
            inputArray.forEach(function (objectToFilter) {
                
              arrayToReturn = arrayToReturn.filter((objectToFilter) => 
                objectToFilter[filterKey].toLowerCase().indexOf(filterValue) >= 0);
            })
          });

          return arrayToReturn;
        }
        else {
            return inputArray;
        }
      }
}