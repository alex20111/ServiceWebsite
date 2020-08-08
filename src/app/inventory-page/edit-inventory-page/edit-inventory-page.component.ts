import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { numberValidator } from 'src/app/helpers/number.validator';

@Component({
  selector: 'app-edit-inventory-page',
  templateUrl: './edit-inventory-page.component.html',
  styleUrls: ['./edit-inventory-page.component.css']
})
export class EditInventoryPageComponent implements OnInit {

  groupList: any[] = [];

  editForm: FormGroup;
  submitted = false;
  loading = false;

  errorMessage: string;

  groupSelected: string;

  previewUrl: any = null;
  thumbFileData: File = null;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public invSvc: InventoryService,private router: Router) { }

  get f() { return this.editForm.controls; }
  get r() { return this.f.references as FormArray; }

  ngOnInit(): void {
    console.log("edit page");
    
    this.groupList = this.invSvc.groupList();

    this.route.params.subscribe(params => {
      this.loading = true;
      this.submitted = false;
      // Retrieve the product by id
      let id = params["itmId"];
      

      console.log('Requested id: ', id);

      // fetch the item to edit and verify if the ID match
      const item = this.invSvc.getItemToEdit();

      console.log('gotItem to edit: ', item);
      if (Object.is(item.id, parseInt(id))) {       

        this.groupSelected = item.groupId;

        this.editForm = this.formBuilder.group({
          inv_name: [item.name, [Validators.required, Validators.minLength(2)]],
          inv_qty: [item.qty, [Validators.required, Validators.min(0), Validators.max(999)]],
          inv_category: [item.category],
          inv_groupId: [item.groupId, Validators.required],
          inv_details: [item.details],
          references: this.formBuilder.array([])
        }, {
          validator: numberValidator('inv_qty')
        });

        for (let rf of item.references) {
          this.r.push(this.formBuilder.group({
            inv_ref_name: [rf.referenceName],
            inv_link_html: [(rf.type === 'html' ? true : false)]
          }));
        }
        if (item.thumbBase64){

          this.previewUrl = `data:image/jpg;base64,${item.thumbBase64}`;
          console.log("thumbnail: " , this.previewUrl);
        }

      } else {
        this.errorMessage = 'Wrong item to edit, please re-load';
      }
      this.loading = false;
    });
  }

  submit() {

    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }  
    this.loading = true;
    const formValue = this.editForm.value;
    // references
    let ref = [];
    formValue.references.forEach((value, index) => {
      ref[index] = {
        referenceName: value.inv_ref_name,
        type: (value.inv_link_html ? 'html' : 'text')
      };
    });

    // get the previous thumbnail if exist
    const serviceItem = this.invSvc.getItemToEdit();
    let thumbnail = serviceItem.thumbBase64;

    // add all required informtuon to send to multi part,
    const formData = new FormData();
    if (this.thumbFileData){
      formData.append('file', this.thumbFileData);
      thumbnail = '';
    }

    const form = { // construct form to add through multi part
      id: serviceItem.id,
      name: formValue.inv_name,
      qty: formValue.inv_qty,
      category: formValue.inv_category,
      details: formValue.inv_details,
      groupId: formValue.inv_groupId,
      thumbBase64: thumbnail,
      references: ref
    };

    formData.append('formField', JSON.stringify(form));

    this.invSvc.updateItem(formData).subscribe(
      (result: any) => {

        console.log('edit result' , result);
        this.submitted = false;
        this.loading = false;
        this.router.navigate(['/inv/', this.groupSelected ]);
        // this.router.navigate(['/invAdd/',  ]);
      },
      (err) => {
        console.log("update error" , err);
        this.submitted = false;
        this.loading = false;
        this.errorMessage = ' Error while updating item';
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


}
