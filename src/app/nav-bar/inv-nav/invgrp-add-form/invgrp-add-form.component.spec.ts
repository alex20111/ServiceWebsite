import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvgrpAddFormComponent } from './invgrp-add-form.component';

describe('InvgrpAddFormComponent', () => {
  let component: InvgrpAddFormComponent;
  let fixture: ComponentFixture<InvgrpAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvgrpAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvgrpAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
