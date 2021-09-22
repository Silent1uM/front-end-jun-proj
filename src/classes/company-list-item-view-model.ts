import {CompanyListItemModel} from "./company-list-item-model";

/**
 * Класс View-модель для страницы со списком компаний
 */
export class CompanyListItemViewModel {
   
    public logo: string;
    public name: string;
    public industry: string;
    public type: string; 
    
    public id: number;
    public catchPhrase: string;
    public phoneNumber: string;
    public fullAddress:string;

    constructor(data: CompanyListItemModel) {
        if (!data) {
            return;
        }
      
        this.logo = data.logo
        this.name = `${data.suffix} ${data.businessName}`;
        this.industry = data.industry;
        this.type = data.type;

        this.id = data.id;
        this.catchPhrase = data.catchPhrase;
        this.phoneNumber = data.phoneNumber;
        this.fullAddress = data.fullAddress;
    };
}