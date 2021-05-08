
import { TemperatureService } from './../services/temperature.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models/User';
import { Temperature } from '../_models/Temperature';
import { domainName } from '../helpers/domain';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  user: User;
  temperature: Temperature;
  loadingTemp = false;

  timer: any;

  error: string;

  constructor(private authSvc: AuthService, private tmpSvc: TemperatureService) {


    this.multia =  [
      {
        "name": "Germany",
        "series": [
          {
            "name": "1990",
            "value": 62000000
          },
          {
            "name": "2010",
            "value": 73000000
          },
          {
            "name": "2011",
            "value": 89400000
          },
          {
            "name": "2012",
            "value": 99400000
          },
          {
            "name": "2013",
            "value": 890000
          },
          {
            "name": "2014",
            "value": 819400000
          },
          {
            "name": "2015",
            "value": 332
          },
          {
            "name": "2016",
            "value": 2389400000
          }
        ]
      }];
   }
 

  ngOnInit(): void { 
    this.authSvc.getCurrObservableUserLogged().subscribe(u => this.user = u);

    this.fetchTemperature();

    this.timer = setInterval(() => { this.fetchTemperature(); }, 60000);
    console.log("Domain: " , domainName());
  }


  fetchTemperature(){
    this.loadingTemp = true;
    this.temperature = undefined;
    this.error = '';
    this.tmpSvc.getCurrentTemperature().subscribe( 
      (temp: Temperature) => {
        this.temperature = temp;
        // console.log(temp);
        this.loadingTemp = false;
      },
      (error) => {
        console.log("error getting temperature: ");
        console.log(error);
        this.loadingTemp = false;
        this.error = 'Error getting temperature';
      }
    );
  }

  ngOnDestroy(): void {
  //  console.log('destroy');
   clearInterval(this.timer);
  }








  multia: any[];
  view: any[] = [700, 300];

  // options
  // legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
