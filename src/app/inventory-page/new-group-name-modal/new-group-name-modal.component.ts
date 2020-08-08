import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-group-name-modal',
  templateUrl: './new-group-name-modal.component.html',
  styleUrls: ['./new-group-name-modal.component.css']
})
export class NewGroupNameModalComponent implements OnInit {
  error: string;
  updateGroupForm: FormGroup;

  constructor(private invSrv: InventoryService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.updateGroupForm = this.formBuilder.group({
      frm_groupName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submitForm() {

    this.error = undefined;

    const nameFound = this.invSrv.isGroupExist(this.updateGroupForm.value.frm_groupName);

    if (!nameFound) {

      this.activeModal.close(this.updateGroupForm.value.frm_groupName);

    } else {
      this.error = 'Name already exist, please change';
    }


  }

}
