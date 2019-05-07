import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttoshoplistPage } from './producttoshoplist.page';

describe('ProducttoshoplistPage', () => {
  let component: ProducttoshoplistPage;
  let fixture: ComponentFixture<ProducttoshoplistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttoshoplistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttoshoplistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
