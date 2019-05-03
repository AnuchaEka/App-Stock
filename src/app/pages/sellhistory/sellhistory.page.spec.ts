import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellhistoryPage } from './sellhistory.page';

describe('SellhistoryPage', () => {
  let component: SellhistoryPage;
  let fixture: ComponentFixture<SellhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
