import { FormControl } from '@angular/forms';
import { NewGroupNameModalComponent } from './new-group-name-modal/new-group-name-modal.component';
import { Component, OnInit, OnDestroy, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';

function search(text: string, pipe: PipeTransform, items: any): any {
  return items.filter(inv => {
    const term = text.toLowerCase();
    return (
      inv.name.toLowerCase().includes(term) ||
      pipe.transform(inv.qty).includes(term) ||
      inv.category.toLowerCase().includes(term) ||
      inv.details.toLowerCase().includes(term)
    );
  });
}

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css'],
  providers: [DecimalPipe]
})

// display the inventory item list for the group
export class InventoryPageComponent implements OnDestroy, OnInit {

  filter: any = ''; //textbox to filter

  invGroup: any;  // inventory list page group information also containing the item list
  filteredInvGroup$: any[] = [];
  page = 1;
  pageSize = 15;
  collectionSize = 0;

  // page title
  title: string;

  deleted = false;

  //error messages:
  error: string;

  constructor(private route: ActivatedRoute, private pipe: DecimalPipe,
    public invSrv: InventoryService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.error = '';
      this.deleted = false;
      // Retrieve the product by id
      let id = params["invId"];

      if (id === 'all') {
        this.loadAllItems();
      } else if (id === 'search') {
        this.invGroup = this.invSrv.searchItemsResult;
        this.refreshFilterInvGroup();
        this.title = this.invGroup.groupName;
      } else {
        this.invSrv.loadGroupItems(id).subscribe(
          (items: any) => {
            console.log('Group items: ', items);
            this.invGroup = items;
            this.refreshFilterInvGroup();
            this.title = items.groupName;
          },
          (error) => {
            console.error('Load Group error', error);
            this.error = 'An error occured while loading the items for the group';
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.dtTrigger.unsubscribe();
  }
  deteleGroup(groupId: string) {
    if (confirm('Are you sure to delete the group?')) {

      this.invSrv.deleteGroup(groupId).subscribe(
        (result) => {
          this.deleted = true;
          if (this.invGroup.invItems?.length > 0) {
            this.invGroup.invItems = [];
            this.refreshFilterInvGroup();
          }
        },
        (error) => {
          console.error('Delete group error: ', error);
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
          // console.log("group updated");
          this.title = updGrp.groupName;
        }
      );

    }).catch((error) => {
      if (error !== 'Cross click') {
        console.error('Update group name error: ', error);
        this.error = 'An error occured while trying to update the group name';
      }
    });
  }
  deleteItem(item) {
    if (confirm('Are you sure to delete the item?')) {
      this.invSrv.deleteItem(item.id).subscribe(
        (result) => {
          // console.log("Result of deleting item: ", result);
          this.invGroup.invItems = this.invGroup.invItems.filter(it => it.id !== item.id);
          this.refreshFilterInvGroup();
        },
        (error) => {
          console.log('Error deleting item', error);
          this.error = 'error deleting item';
        }
      );
    }
  }
  loadAllItems() {
    this.invSrv.loadAllInventoryItems().subscribe(
      (itmList) => {
        this.invGroup = itmList;
        this.refreshFilterInvGroup();
        this.title = itmList.groupName;
      }
    );
  }

  editItem(item: any) {
    this.invSrv.populateItemToEdit(item);
    this.router.navigate(['/invEdit', item.id]);
  }

  // pagination changed
  refreshTable(refreshItem: any) { // coming from the html page. 
    // console.log("Refresh item: " , refreshItem);
    let ref;
    if (refreshItem !== 'inv') { // inv comes from the html page.
      ref = refreshItem;
    } else {
      ref = this.invGroup.invItems;
    }

    this.filteredInvGroup$ = ref
      .map((itm, i) => ({ idx: i + 1, ...itm }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  // search filter changed// coming from the textbox.
  filterChanged(text): void {
    const result = search(text, this.pipe, this.invGroup.invItems);
    this.page = 1;
    this.refreshTable(result);
    this.collectionSize = result.length;
  }

  refreshFilterInvGroup() {
    this.refreshTable(this.invGroup.invItems);
    this.collectionSize = this.invGroup.invItems.length;
  }


}
