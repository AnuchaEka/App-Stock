import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellhistorylistPage } from './sellhistorylist.page';

describe('SellhistorylistPage', () => {
  let component: SellhistorylistPage;
  let fixture: ComponentFixture<SellhistorylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellhistorylistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellhistorylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
