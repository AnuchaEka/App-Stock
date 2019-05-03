import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktoshophistoryPage } from './backtoshophistory.page';

describe('BacktoshophistoryPage', () => {
  let component: BacktoshophistoryPage;
  let fixture: ComponentFixture<BacktoshophistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacktoshophistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktoshophistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
