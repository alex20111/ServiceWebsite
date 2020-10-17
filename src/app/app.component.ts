import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeWebsite';
  // toggleSideMenu = false; // emmit comment or var to parent

// from button click or other // Also need to update the html in the parent compontent.. see app.component.html.
//   showMessageFromChild(message) {
//     this.toggleSideMenu = message;
//     console.log("parent");
//     console.log(message);
//     console.log(this.toggleSideMenu);
//  }
}
