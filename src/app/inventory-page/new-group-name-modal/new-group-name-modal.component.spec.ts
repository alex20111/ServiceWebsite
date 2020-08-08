import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupNameModalComponent } from './new-group-name-modal.component';

describe('NewGroupNameModalComponent', () => {
  let component: NewGroupNameModalComponent;
  let fixture: ComponentFixture<NewGroupNameModalComponent>;

  beforeEach(async(() => {
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
