import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackstockhistorylistPage } from './backstockhistorylist.page';

describe('BackstockhistorylistPage', () => {
  let component: BackstockhistorylistPage;
  let fixture: ComponentFixture<BackstockhistorylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackstockhistorylistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackstockhistorylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
