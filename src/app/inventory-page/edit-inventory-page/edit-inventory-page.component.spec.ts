import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditInventoryPageComponent } from './edit-inventory-page.component';

describe('EditInventoryPageComponent', () => {
  let component: EditInventoryPageComponent;
  let fixture: ComponentFixture<EditInventoryPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInventoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
