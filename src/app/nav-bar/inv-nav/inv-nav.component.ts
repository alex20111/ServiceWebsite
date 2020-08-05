import { InventoryService } from './../../services/inventory.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvgrpAddFormComponent } from './invgrp-add-form/invgrp-add-form.component';


@Component({
  selector: 'app-inv-nav',
  templateUrl: './inv-nav.component.html',
  styleUrls: ['./inv-nav.component.css']
})
export class InvNavComponent implements OnInit, OnDestroy {
  loading = true;


  constructor(public invSrv: InventoryService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("registering");
    this.invSrv.loadInventoryGroup().subscribe(
      (invGroup: any[]) => {
        this.loading = false;
      }
    );
  }

  // open the modal component
  openFormModal() {
    const modalRef = this.modalService.open(InvgrpAddFormComponent);

    modalRef.result.then((result) => {
      console.log(result);
      this.addNewGroup(result);

    }).catch((error) => {
      console.log(error);
    });
  }

  private addNewGroup(grpName: string) {
    console.log('aaaaaaa');

    const newGrp = {
      groupName: grpName,
      id: -1
    };

    console.log('adding -->group name: ', newGrp);
    this.invSrv.addInvGroupToList(newGrp).subscribe(
      (grp: any) => {
        console.log("Answer from server: ", grp);
        this.invSrv.groupList().push({
          groupName: grp.groupName,
          id: grp.id
        });
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error) {
    console.log("error add inv grouo: ", error);

  }

  ngOnDestroy() {
  }
}
