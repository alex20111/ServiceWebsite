import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvNavComponent } from './inv-nav.component';

describe('InvNavComponent', () => {
  let component: InvNavComponent;
  let fixture: ComponentFixture<InvNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
