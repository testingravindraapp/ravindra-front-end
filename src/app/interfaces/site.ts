export interface ISiteData {
    _id?: string;
    location: string;
    siteId: number;
    contractorId: number;
    image: string;
    submittedOn: Date;
    status?: string;
    lat_Long_True?: string;
}

export interface IDialogData {
    name: string;
    siteId: number;
    contractorId: number;
    location: string;
}
