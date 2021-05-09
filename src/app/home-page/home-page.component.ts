
import { TemperatureService, TempOjb } from './../services/temperature.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models/User';
import { Temperature } from '../_models/Temperature';
import { domainName } from '../helpers/domain';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  xAxisHours: string[] = [];
  sensor1: number[] = [];
  sensor2: number[] = [];
  poolTemp: number[] = [];

  displayChart: boolean = false;

  isLoading = true;
  options: any;
  updateOptions: any;

  user: User;
  temperature: Temperature;
  currTemp: TempOjb;
  loadingTemp = false;

  timer: any;

  error: string;

  constructor(private authSvc: AuthService, private tmpSvc: TemperatureService) { }


  ngOnInit(): void {

    this.buildChart();

    this.authSvc.getCurrObservableUserLogged().subscribe(u => this.user = u);

    this.generateChart();

    this.timer = setInterval(() => { this.generateChart(); }, 300000);
    console.log("Domain: ", domainName());
  }


  fetchTemperature() {
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
    clearInterval(this.timer);
  }
  generateChart() {
    this.displayChart = true;
    this.tmpSvc.getChartTemperature().subscribe(result => {
      // console.log("Result for chart: ", result);
      this.currTemp = result;
      this.isLoading = false;
      for (let cht of result.tempChart) {
        // console.log(cht); // 1, "string", false
        if (cht.temp1) {
          this.sensor1.push(parseFloat(cht.temp1));
        } else {
          this.sensor1.push(null);
        }

        if (cht.temp2) {
          this.sensor2.push(parseFloat(cht.temp2));
        } else {
          this.sensor2.push(null);
        }

        if (cht.pool) {
          this.poolTemp.push(parseFloat(cht.pool));
        } else {
          this.poolTemp.push(null);
        }
        // this.xAxisHours.push(new Date(cht.recordedDateTime));
        let dt = new Date(cht.recordedDateTime);
        this.xAxisHours.push(dt.getHours() + "h" + dt.getMinutes() );

      }
      this.updateChart();
      // console.log("this.sensor1: " , this.sensor1);
      // console.log("xAxisHours: " , this.xAxisHours);
    },
      err => {
        this.error = err.error;
        this.isLoading = false;
      });

  }


  buildChart() {
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        // data: ['Sensor 1', 'Sensor 2', 'Pool']
        data: ['Sensor 1', 'Sensor 2', 'Pool']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisHours
        }
      ],
      yAxis: [
        {
          name: 'Celcius',
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Sensor 1',
          type: 'line',
          stack: 'counts',
          connectNulls: true,
          data: []
          // data: [2,3,4,null,null,6,8]
        }
        ,
        {
          name: 'Sensor 2',
          type: 'line',
          stack: 'counts',
          connectNulls: true,
          //   areaStyle: { normal: {} },
          data: []
        },
        {
          name: 'Pool',
          type: 'line',
          stack: 'counts',
          connectNulls: true,
          //    areaStyle: { normal: {} },
          data: []
        }
      ]
    };

  }
  updateChart(){
    // update series data:
    this.updateOptions = {
      series: [{
        data: this.sensor1
      },
      {
        data: this.sensor2
      },
      {
        data: this.poolTemp
      }
    ]
    };
  }


}
