import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutstocktoshopPage } from './cutstocktoshop.page';

describe('CutstocktoshopPage', () => {
  let component: CutstocktoshopPage;
  let fixture: ComponentFixture<CutstocktoshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutstocktoshopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutstocktoshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
