import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutstockhistoryPage } from './cutstockhistory.page';

describe('CutstockhistoryPage', () => {
  let component: CutstockhistoryPage;
  let fixture: ComponentFixture<CutstockhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutstockhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutstockhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
