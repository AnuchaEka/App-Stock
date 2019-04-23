import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackstockhistoryPage } from './backstockhistory.page';

describe('BackstockhistoryPage', () => {
  let component: BackstockhistoryPage;
  let fixture: ComponentFixture<BackstockhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackstockhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackstockhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
