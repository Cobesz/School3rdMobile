import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {



  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              private geolocation: Geolocation) {

  }


}
