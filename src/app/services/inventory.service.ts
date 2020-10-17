import { Injectable } from '@angular/core';
import { domainName } from '../helpers/domain';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiUrl: string;

  private invGroupList: any[] = [];
  private itemToEdit: any; // this is the item to edit when editing an item. 

  constructor(private http: HttpClient) {
    this.apiUrl = domainName();
  }

  // fetch the list from the server
  loadInventoryGroup(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bwservice/webapi/inv/invGroup`).pipe(
      map(data => {
        // add to list the return information.
        this.invGroupList = data;
        return this.invGroupList;
      }

      )
    );
  }

  addInvGroupToList(group: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/addGroup`, group);
  }

  addItemToGroup(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/addItem`, item);
  }

  loadGroupItems(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bwservice/webapi/inv/groupItems/${id}`);
  }

  deleteGroup(groupid: string): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/deleteGroup/`, groupid)
      .pipe(map(
        (result) => {
          this.invGroupList = this.invGroupList.filter(g => g.id != groupid);
          return result;
        }
      ));
  }
  deleteItem(itemId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/deleteItem/`, itemId);
  }
  updateGroupName(newGroupName: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/updateGroupName`, newGroupName).pipe(
      map((newGrp) => {
        let indx = this.invGroupList.findIndex(g => g.id === newGrp.id);

        if (indx > -1) {
          this.invGroupList[indx] = newGrp;
        }
        return newGrp;
      }));
  }
  loadAllInventoryItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bwservice/webapi/inv/allInvItems`);
  }

  updateItem(item): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/updateItem`, item).pipe(
      map(updItem => {
        this.itemToEdit = null;
        return updItem;
      }));
  }
  groupList() {
    return this.invGroupList;
  }
  isGroupExist(name: string): boolean {
    const groupList = this.invGroupList;

    const found = groupList.some(g => (g.groupName as string).toLowerCase() === name.toLowerCase());

    return found;
  }
  /*Method that wlll keep a reference of the item to edit, after it's done editing or error, set to null */
  populateItemToEdit(item: any) {
    this.itemToEdit = item;
  }
  getItemToEdit() {
    return this.itemToEdit;
  }

}
