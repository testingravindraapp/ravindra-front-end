export interface ISiteData {
    _id?: string;
    // location: string;
    siteId: number;
    contractorId: number;
    image: string;
    submittedOn: Date;
    lat_Long_True: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    status?: string;
}

export interface IDialogData {
    name: string;
    siteId: number;
    contractorId: number;
    location: string;
    index: number;
}
