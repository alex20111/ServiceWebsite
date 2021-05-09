import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddInventoryPageComponent } from './add-inventory-page.component';

describe('AddInventoryPageComponent', () => {
  let component: AddInventoryPageComponent;
  let fixture: ComponentFixture<AddInventoryPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInventoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
