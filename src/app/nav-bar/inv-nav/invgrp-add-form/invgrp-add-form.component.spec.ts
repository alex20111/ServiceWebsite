import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvgrpAddFormComponent } from './invgrp-add-form.component';

describe('InvgrpAddFormComponent', () => {
  let component: InvgrpAddFormComponent;
  let fixture: ComponentFixture<InvgrpAddFormComponent>;

  beforeEach(waitForAsync(() => {
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
