import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocklistPage } from './stocklist.page';

describe('StocklistPage', () => {
  let component: StocklistPage;
  let fixture: ComponentFixture<StocklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocklistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
