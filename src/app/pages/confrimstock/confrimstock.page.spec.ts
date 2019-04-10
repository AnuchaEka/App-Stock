import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimstockPage } from './confrimstock.page';

describe('ConfrimstockPage', () => {
  let component: ConfrimstockPage;
  let fixture: ComponentFixture<ConfrimstockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfrimstockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfrimstockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
