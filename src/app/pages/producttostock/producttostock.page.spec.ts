import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttostockPage } from './producttostock.page';

describe('ProducttostockPage', () => {
  let component: ProducttostockPage;
  let fixture: ComponentFixture<ProducttostockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttostockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttostockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
