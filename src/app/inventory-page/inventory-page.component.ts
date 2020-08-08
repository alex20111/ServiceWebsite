import { NewGroupNameModalComponent } from './new-group-name-modal/new-group-name-modal.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css']
})

// display the inventory item list for the group

export class InventoryPageComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  invGroup: any;  // inventory list page group information also containing the item list

  // page title
  title: string;

  deleted = false;

  //error messages:
  error: string;

  constructor(private route: ActivatedRoute,
    public invSrv: InventoryService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    console.log("Init inventory");

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15
    };

    this.route.params.subscribe(params => {

      this.error = '';
      this.deleted = false;
      // Retrieve the product by id
      let id = params["invId"];

      if (id !== 'all') {
        this.invSrv.loadGroupItems(id).subscribe(
          (items: any) => {
            // console.log('Group items: ', items);
            this.invGroup = items;
            this.title = items.groupName;
            this.rerender();
          },
          (error) => {
            console.log('Load Group error', error);
            this.error = 'An error occured while loading the items for the group';
          }
        );
      } else {
        this.loadAllItems();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    if (this.dtElement) {
      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      } else {
        this.dtTrigger.next();
      }
    } else {
      this.dtTrigger.next();
    }
  }

  deteleGroup(groupId: string) {
    if (confirm('Are you sure to delete the group?')) {

      this.invSrv.deleteGroup(groupId).subscribe(
        (result) => {
          this.deleted = true;
          if (this.invGroup.invItems?.length > 0){
            this.invGroup.invItems = [];
            this.rerender();
          }
        },
        (error) => {
          console.log('Delete group error: ', error);
          this.error = 'An error occured while trying to delete the group ';
        }
      );
    }
  }

  // open the modal component to Rename the group
  openFormModal() {
    const modalRef = this.modalService.open(NewGroupNameModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
      const newGroupName = {
        id: this.invGroup.id,
        groupName: result
      };
      console.log(newGroupName);
      this.invSrv.updateGroupName(newGroupName).subscribe(
        (updGrp) => {
          console.log("group updated");
          this.title = updGrp.groupName;
        }

      );

    }).catch((error) => {
      if (error !== 'Cross click') {
        console.log('Update group name error: ', error);
        this.error = 'An error occured while trying to update the group name';
      }
    });
  }
  deleteItem(item) {
    console.log("item to delete: ", item);
    if (confirm('Are you sure to delete the item?')) {
      this.invSrv.deleteItem(item.id).subscribe(
        (result) => {
          console.log("Result of deleting item: ", result);
          this.invGroup.invItems = this.invGroup.invItems.filter(it => it.id !== item.id);

          this.rerender();
        },
        (error) => {
          console.log('Error deleting item', error);
          this.error = 'error deleting item';
        }
      );
    }
  }
  loadAllItems() {
    console.log('Load all items');
    this.invSrv.loadAllInventoryItems().subscribe(
      (itmList) => {
        console.log("All item list", itmList);
        this.invGroup = itmList;
        this.title = itmList.groupName;
        this.rerender();
      }
    );
  }

  editItem(item: any){
    this.invSrv.populateItemToEdit(item);
    this.router.navigate(['/invEdit', item.id]);
  }
}
