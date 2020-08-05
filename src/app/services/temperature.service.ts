import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temperature } from '../_models/Temperature';
import { domainName } from '../helpers/domain';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  apiUrl: string;

  constructor(private http: HttpClient){
    this.apiUrl  = domainName();
  }


  getCurrentTemperature(): Observable<Temperature>{
    return this.http.get<Temperature>(`${this.apiUrl}/bwservice/webapi/temperature/temp`);
   }
}
