import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryItemSearchComponent } from './inventory-item-search.component';

describe('InventoryItemSearchComponent', () => {
  let component: InventoryItemSearchComponent;
  let fixture: ComponentFixture<InventoryItemSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
