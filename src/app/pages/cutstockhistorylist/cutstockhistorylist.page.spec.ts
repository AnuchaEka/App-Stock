import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutstockhistorylistPage } from './cutstockhistorylist.page';

describe('CutstockhistorylistPage', () => {
  let component: CutstockhistorylistPage;
  let fixture: ComponentFixture<CutstockhistorylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutstockhistorylistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutstockhistorylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
