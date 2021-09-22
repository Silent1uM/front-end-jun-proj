import { ICompanyItemResponseData } from "../interfaces/company-item-data.interface";

export class CompanyListItemModel {
    
    public id: number;
    public logo: string;
    public suffix: string;
    public businessName: string;
    public industry: string;
    public type: string;

    public catchPhrase: string;
    public phoneNumber: string;    
    public fullAddress: string;

    constructor(data: ICompanyItemResponseData) {
        if (!data) {
            return;
        }

        this.id = data.id;
        this.logo = data.logo;
        this.suffix = data.suffix;
        this.businessName = data.business_name;
        this.industry = data.industry;
        this.type = data.type;

        this.catchPhrase = data.catch_phrase;
        this.phoneNumber = data.phone_number;       
        this.fullAddress = data.full_address;
    };
}