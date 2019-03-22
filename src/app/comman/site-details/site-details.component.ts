import { Component, Input } from '@angular/core';
import { IDialogData } from '../../interfaces/site';

@Component({
    selector: 'app-site-details',
    templateUrl: 'site-details.html',
    styleUrls: ['./site-details.css']
})
export class SiteDetailsComponent {
    @Input() siteData: IDialogData;
    constructor( ) { }
}
