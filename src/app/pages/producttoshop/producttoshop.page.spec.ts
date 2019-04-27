import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttoshopPage } from './producttoshop.page';

describe('ProducttoshopPage', () => {
  let component: ProducttoshopPage;
  let fixture: ComponentFixture<ProducttoshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttoshopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttoshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
