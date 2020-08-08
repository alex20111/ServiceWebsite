import { InventoryService } from 'src/app/services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { numberValidator } from 'src/app/helpers/number.validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-inventory-page',
  templateUrl: './add-inventory-page.component.html',
  styleUrls: ['./add-inventory-page.component.css']
})
export class AddInventoryPageComponent implements OnInit {
// TODO add validation - 
// add inventory tale link


  groupList: any[] = [];
  groupSelected = "6";


  addItemForm: FormGroup;
  submitted = false;
  loading = false;

  previewUrl: any = null;
  thumbFileData: File = null;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, 
    public invSvc: InventoryService, 
    private router: Router) { }

  ngOnInit(): void {
    console.log('add page');
    this.addItemForm = this.formBuilder.group({
      inv_name: ['', [Validators.required, Validators.minLength(2)]],
      inv_qty: ['0', [Validators.required, Validators.min(0), Validators.max(999)]],
      inv_category: [''],
      inv_groupId: ['', Validators.required],
      inv_details: [''],
      references: new FormArray([])
    }, {
      validator: numberValidator('inv_qty')
    });

    this.groupList = this.invSvc.groupList();

    this.route.params.subscribe(params => {
      // Retrieve the product by id
      let id = params["grpId"];
      this.groupSelected = id;
      console.log("add req id: ", id);     
    });
    
  }

  // form submit !!!!!!!!!!!1
  addInvItem() {
    this.submitted = true;

    if (this.addItemForm.invalid) {
        return;
    }

    this.loading = true;
    const formValue = this.addItemForm.value;
    // references
    let ref = [];
    formValue.references.forEach((value, index) => {
      ref[index] = {
        referenceName: value.inv_ref_name,
        type: (value.inv_link_html ? 'html' : 'text')
      };
    });

    const form = { // construct form to add through multi part
      name: formValue.inv_name,
      qty: formValue.inv_qty,
      category: formValue.inv_category,
      details: formValue.inv_details,
      groupId: formValue.inv_groupId,
      references: ref
    };

    // add all required informtuon to send to multi part,
    const formData = new FormData();
    if (this.thumbFileData){
      formData.append('file', this.thumbFileData);
    }
    formData.append('formField', JSON.stringify(form));

    this.invSvc.addItemToGroup(formData).subscribe(
      (result: any) => {

        console.log('add result' , result);
        this.submitted = false;
        this.loading = false;
        this.router.navigate(['/inv/', this.groupSelected ]);
        // this.router.navigate(['/invAdd/',  ]);
      },
      (err) => {
        console.log("add error" , err);
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  addRef($event) {
    $event.preventDefault(); //to not sub,mit the form
    console.log("add ref");
    this.r.push(this.formBuilder.group({
      inv_ref_name: [''],
      inv_link_html: [false]
    }));

  }

  // togger between link and text in the reference
  toggleLink(i) {

    let gh = this.r.at(i); //fetch the form at the occurance

    let html = gh.value.inv_link_html; // get the value of the html link.. if true, it's an html link

    html = !html; // swithc it

    gh.setValue({
      inv_ref_name: gh.value.inv_ref_name,
      inv_link_html: html
    });
  }

  fileProgress(fileInput: any) {
    this.thumbFileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() { // preview the image on page
    // Show preview 
    var mimeType = this.thumbFileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.thumbFileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  // convenience getters for easy access to form fields
  get r() { return this.fAdd.references as FormArray; }
  get fAdd() { return this.addItemForm.controls; }
}
