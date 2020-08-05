import { Observable } from 'rxjs';
import { TemperatureService } from './../services/temperature.service';
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
  user: User;
  temperature: Temperature;
  loadingTemp = false;

  timer: any;

  error: string;

  constructor(private authSvc: AuthService, private tmpSvc: TemperatureService) { }
 

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

}
