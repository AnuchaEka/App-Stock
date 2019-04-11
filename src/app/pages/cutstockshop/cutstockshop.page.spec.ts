import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutstockshopPage } from './cutstockshop.page';

describe('CutstockshopPage', () => {
  let component: CutstockshopPage;
  let fixture: ComponentFixture<CutstockshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutstockshopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutstockshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
