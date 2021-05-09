import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewGroupNameModalComponent } from './new-group-name-modal.component';

describe('NewGroupNameModalComponent', () => {
  let component: NewGroupNameModalComponent;
  let fixture: ComponentFixture<NewGroupNameModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGroupNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
