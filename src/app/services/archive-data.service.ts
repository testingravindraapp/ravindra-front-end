import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class ArchiveDataService {

  private siteDataSource = new BehaviorSubject(null);
  currentSiteData = this.siteDataSource.asObservable();

  private archivedSiteDataSource = new BehaviorSubject(null);
  currentArchivedSiteData = this.archivedSiteDataSource.asObservable();

  constructor() { }

  changeSiteData(data: any) {
    this.siteDataSource.next(data);
  }

  changeArchivedSiteData(data: any) {
    this.archivedSiteDataSource.next(data);
  }
}
