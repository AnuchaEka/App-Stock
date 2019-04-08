import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocklostPage } from './stocklost.page';

describe('StocklostPage', () => {
  let component: StocklostPage;
  let fixture: ComponentFixture<StocklostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocklostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocklostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
