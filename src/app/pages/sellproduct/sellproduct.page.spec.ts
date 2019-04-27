import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellproductPage } from './sellproduct.page';

describe('SellproductPage', () => {
  let component: SellproductPage;
  let fixture: ComponentFixture<SellproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellproductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
