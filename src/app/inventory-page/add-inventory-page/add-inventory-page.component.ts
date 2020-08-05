import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-inventory-page',
  templateUrl: './add-inventory-page.component.html',
  styleUrls: ['./add-inventory-page.component.css']
})
export class AddInventoryPageComponent implements OnInit {

  addItemForm: FormGroup;
  submitted = false;


  constructor(public formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      inv_name: ['', [Validators.required, Validators.minLength(5)]],
      inv_qty: ['', Validators.required],
      inv_category: [''],
      inv_group: ['', Validators.required],
      inv_details: [''],
      inv_thumb: [''],
      references: new FormArray([])
    });

    this.r.push(this.formBuilder.group({
      inv_ref_name: ['', Validators.required],
      inv_link_html: [false]
    }));
  }

  addInvItem() {
    console.log('add inventory item');
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addItemForm.value, null, 4));
    if (this.addItemForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addItemForm.value, null, 4));
  }

  addRef($event) {
    $event.preventDefault(); //to not sub,mit the form
    console.log("add ref");
    this.r.push(this.formBuilder.group({
      inv_ref_name: ['', Validators.required],
      inv_link_html: [false]
    }));

  }

  toggleLink(i) {

    let gh = this.r.at(i); //fetch the form at the occurance

    let html = gh.value.inv_link_html; // get the value of the html link.. if true, it's an html link

    html = !html; // swithc it

    gh.setValue({
      inv_ref_name: gh.value.inv_ref_name,
      inv_link_html: html
    });


  }

  // convenience getters for easy access to form fields
  get r() { return this.fAdd.references as FormArray; }
  get fAdd() { return this.addItemForm.controls; }
}
