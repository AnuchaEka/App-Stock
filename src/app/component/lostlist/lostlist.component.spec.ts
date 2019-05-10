import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostlistComponent } from './lostlist.component';

describe('LostlistComponent', () => {
  let component: LostlistComponent;
  let fixture: ComponentFixture<LostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostlistComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
