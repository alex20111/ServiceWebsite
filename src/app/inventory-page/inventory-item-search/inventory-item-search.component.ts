import { InventoryService } from 'src/app/services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-item-search',
  templateUrl: './inventory-item-search.component.html',
  styleUrls: ['./inventory-item-search.component.css']
})
export class InventoryItemSearchComponent implements OnInit {

  loading = false;
  submitted = false;
  error: string; // used when noting is found or an error occured.
  message: string;

  searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private invService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search_field: ['', [Validators.required, Validators.minLength(2)]],

    });
  }

  submitSearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      this.submitted = false;
      return;
    }
    this.loading = true;

    const formValue = this.searchForm.value;
    const text = formValue.search_field;

    this.invService.searchInventory(text).subscribe(invList => {
      this.loading = false;
      if (invList && invList.invItems.length > 0){
        console.log("got result", invList);
        this.invService.searchItemsResult = invList;
        this.router.navigate(['/inv/', 'search' ]);
      }
      else{
        this.invService.searchItemsResult = null;
        this.message = 'No match found';
      }
    });
  }

  get form(){
    return this.searchForm.controls;
  }

}
