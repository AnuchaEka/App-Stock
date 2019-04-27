import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimshopPage } from './confrimshop.page';

describe('ConfrimshopPage', () => {
  let component: ConfrimshopPage;
  let fixture: ComponentFixture<ConfrimshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfrimshopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfrimshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
