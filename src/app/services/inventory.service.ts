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

  constructor(private http: HttpClient) {
    this.apiUrl = domainName();
  }

  // fet the list from the server
  loadInventoryGroup(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bwservice/webapi/inv/invGroup`).pipe(
      map(data => {
        // add to list the return information.
        this.invGroupList = data;
        console.log("Groups from service: " , data);
        return this.invGroupList;
      }

      )
    );
  }
  groupList() {
    return this.invGroupList;
  }

  addInvGroupToList(group: any): Observable<any[]> {
   return  this.http.post<any>(`${this.apiUrl}/bwservice/webapi/inv/addGroup`, group);
  }

  addItemToGroup(item: any){
    
  }

  isGroupExist(name: string): boolean {
    const groupList = this.invGroupList;

    const found = groupList.some(g => (g.groupName as string).toLowerCase() === name.toLowerCase());

    return found;
  }

  loadGroupItems(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bwservice/webapi/inv/groupItems/${id}`);
  }
}
