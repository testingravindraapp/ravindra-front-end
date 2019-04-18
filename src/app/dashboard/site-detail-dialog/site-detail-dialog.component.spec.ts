import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailDialogComponent } from './site-detail-dialog.component';

describe('SiteDetailDialogComponent', () => {
  let component: SiteDetailDialogComponent;
  let fixture: ComponentFixture<SiteDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
