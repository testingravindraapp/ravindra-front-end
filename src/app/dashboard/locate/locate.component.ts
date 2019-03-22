/// <reference types="@types/googlemaps" />
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ISiteData } from '../../interfaces/site';

@Component({
    selector: 'app-locate-modal',
    templateUrl: 'locate.html',
    styleUrls: ['./locate.css']
})
export class LocateComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    constructor(
        public dialogRef: MatDialogRef<LocateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ISiteData) { }

    ngOnInit() {
        const c = this.data.lat_Long_True.replace(/ /g, '').split(',');
        const mapProp = {
            center: new google.maps.LatLng(Number(c[0]), Number(c[1])),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
