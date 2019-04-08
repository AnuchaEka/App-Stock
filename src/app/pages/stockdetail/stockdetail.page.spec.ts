import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockdetailPage } from './stockdetail.page';

describe('StockdetailPage', () => {
  let component: StockdetailPage;
  let fixture: ComponentFixture<StockdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
