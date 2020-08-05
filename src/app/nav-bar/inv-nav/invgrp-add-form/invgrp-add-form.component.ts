import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-invgrp-add-form',
  templateUrl: './invgrp-add-form.component.html',
  styleUrls: ['./invgrp-add-form.component.css']
})

// this is the modal component to add a new group to the form.

export class InvgrpAddFormComponent implements OnInit {
  error: string;
  addGroupForm: FormGroup;

  constructor(private invSrv: InventoryService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addGroupForm = this.formBuilder.group({
      frm_groupName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submitForm() {

    this.error = undefined;

    const nameFound = this.invSrv.isGroupExist(this.addGroupForm.value.frm_groupName);

    if (!nameFound) {

      this.activeModal.close(this.addGroupForm.value.frm_groupName);

    } else {
      this.error = 'Name already exist, please change';
    }


  }

}
