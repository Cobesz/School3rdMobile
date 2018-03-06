import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/filter';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';
import {Geofence} from '@ionic-native/geofence';
import {LocationTracker} from "../../providers/locationTracker";
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  map: GoogleMap;

  public watch: any;
  // public lat: number;
  // public lng: number;

  lat;
  long;
  userMarker;
  fence;

  fenceLat;
  fenceLng;

  random;

  constructor(private googleMaps: GoogleMaps,
              private geolocation: Geolocation,
              private backgroundGeolocation: BackgroundGeolocation,
              private locationTracker: LocationTracker,
              private geofence: Geofence,
              private localNotifications: LocalNotifications,
              public zone: NgZone) {
    // initialize the plugin
    geofence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )
  }

  ionViewDidLoad() {
    this.startBackgroundTracking();
    this.getCurrentPosition();

    this.random = Math.random() * 0.01;
    console.log((Math.random() * 0.01));
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;

      this.long = resp.coords.longitude;
      this.createMap();
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //onscreen geolocation
  watchPosition() {
    const subscription = this.geolocation.watchPosition()
      .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;

        this.map.animateCamera({
          target: {
            lat: this.lat,
            lng: this.long,
          },
          zoom: 15,
        });
        console.log(position.coords.longitude + ' ' + position.coords.latitude);

      });
  }

  createMap() {

    let mapOptions: GoogleMapOptions = {
      'controls': {
        'myLocationButton': true
      },
      camera: {
        target: {
          lat: this.lat,
          lng: this.long,
        },
        zoom: 15,
      }
    };

    this.fenceLat = this.lat + Math.random() * 0.02;
    this.fenceLng = this.long + Math.random() * 0.02;

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait until map is ready.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.


        this.map.setMyLocationEnabled(true);
        this.watchPosition();

        this.map.addMarkerCluster({
          //maxZoomLevel: 5,
          boundsDraw: true,
          markers: [
            {
              "position": {
                "lat": this.fenceLat,
                "lng": this.fenceLng


              },
              "Title": "Harrie",
              "icon": "green"
            }
          ],
          icons: [
            {min: 2, max: 100, icon: 'green', anchor: {x: 16, y: 16}},
          ]
        });
        // add geofence to the marker
        this.addGeofence();
      });
  }

  private addGeofence() {

    //options describing geofence
    this.fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: this.fenceLat, //center of geofence radius
      longitude: this.fenceLng,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
        id: 1, //any unique ID
        title: 'You crossed a fence', //notification title
        text: 'You just arrived at your destination.', //notification body
        openAppOnClick: true //open app when notification is tapped
      }
    };

    this.geofence.addOrUpdate(this.fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }


  //background tracking and notifications are taken care of here.
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
        this.long = location.longitude;
      });
    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    this.geofence.onTransitionReceived().subscribe(() => {
      this.localNotifications.schedule({
        id: 1,
        text: 'Gevonden!',
      });
    });
  }

  stopBackgroundTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }


}
