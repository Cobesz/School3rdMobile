import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number;
  public lng: number;

  constructor(public zone: NgZone,
              private backgroundGeolocation: BackgroundGeolocation,
              private geolocation: Geolocation) {

  }

  startBackgroundTracking() {

    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}
