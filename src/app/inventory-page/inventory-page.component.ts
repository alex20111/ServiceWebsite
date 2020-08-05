import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css']
})

// display the inventory item list for the group

export class InventoryPageComponent implements OnDestroy, OnInit {
 
  dtOptions: DataTables.Settings = {};
    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  invGroup: any;

  // page title
  title: string;

  constructor(private route: ActivatedRoute,
              public invSrv: InventoryService) { }

  ngOnInit(): void {
    console.log("Init inventory");

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15
    };

    this.route.params.subscribe(params => {
      // Retrieve the product by id
      let id = params["invId"];
      console.log("Requested id: " , id);

      this.invSrv.loadGroupItems(id).subscribe(
        (items: any) => {
          console.log('Group items: ' , items);
          this.invGroup = items;
          this.title = items.groupName;
          // this.invItems = items;
                  // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        },
        (error) => {
          console.log('error', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
