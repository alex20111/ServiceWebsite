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

   getChartTemperature(): Observable<TempOjb>{
    return this.http.get<TempOjb>(`${this.apiUrl}/bwservice/webapi/temperature/tempChart`);
   }
}

export class TempOjb{
    currTemp1: string     = null;
	  currTemp1Date: string = null;
	  currTemp2: string     = null;
	  currTemp2Date: string = null;
	  currPool: string      = null;
	  currPoolDate: string  = null;

  tempChart: TempChart[] = [];
}

export class TempChart{
    temp1: string     = null;
	  temp1Date: string = null;
	  temp2: string     = null;
	  temp2Date: string = null;
	  pool: string      = null;
	  poolDate: string  = null;
    recordedDateTime: string = null;
}
