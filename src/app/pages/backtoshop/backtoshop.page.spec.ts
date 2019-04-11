import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktoshopPage } from './backtoshop.page';

describe('BacktoshopPage', () => {
  let component: BacktoshopPage;
  let fixture: ComponentFixture<BacktoshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacktoshopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktoshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
