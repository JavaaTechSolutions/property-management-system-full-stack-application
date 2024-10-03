export class Property {
    propertyId: number;
    propertyTitle: string;
    location: string;
    propertyTypeId: string;
    city: string;
    pincode: string;
    state: string;
    createdDate: Date;
    lastUpdatedDate: Date;

    constructor() {
        this.city = '';
        this.propertyId = 0;
        this.createdDate =  new Date();
        this.propertyTitle = '';
        this.lastUpdatedDate = new Date();
        this.state = '';
        this.location = '';
        this.propertyTypeId = '';
        this.pincode = '';
    }
}
