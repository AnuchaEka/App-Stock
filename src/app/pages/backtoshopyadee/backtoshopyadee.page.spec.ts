import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktoshopyadeePage } from './backtoshopyadee.page';

describe('BacktoshopyadeePage', () => {
  let component: BacktoshopyadeePage;
  let fixture: ComponentFixture<BacktoshopyadeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacktoshopyadeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktoshopyadeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
