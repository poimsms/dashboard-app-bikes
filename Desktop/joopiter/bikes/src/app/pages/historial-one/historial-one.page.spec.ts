import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOnePage } from './historial-one.page';

describe('HistorialOnePage', () => {
  let component: HistorialOnePage;
  let fixture: ComponentFixture<HistorialOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
