import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  lat;
  long;
  random;

  constructor(private googleMaps: GoogleMaps,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.getCurrentPosition();

    this.random = Math.random() * 0.01;
    console.log((Math.random() * 0.01));
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // this.lat = resp.coords.latitude;
      //
      // this.long = resp.coords.longitude;
      this.loadMap();
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      this.lat = data.coords.latitude;

      this.long = data.coords.longitude;
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude

      // data.coords.longitude
    });
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.long,
        },
        zoom: 15,
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Me',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.long
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
        this.map.addMarkerCluster({
          //maxZoomLevel: 5,
          boundsDraw: true,
          markers: [
            {
              "position": {
                "lat": this.lat + Math.random() * 0.01,
                "lng": this.long + Math.random() * 0.01
              },
              "Title": "Harrie",
              "icon": "green"
            },
            {
              "position": {
                "lat": this.lat + Math.random() * 0.01,
                "lng": this.long + Math.random() * 0.01
              },
              "Title": "Sjaak",
              "icon": "Blue"
            }
          ],
          icons: [
            {min: 2, max: 100, icon: 'green', anchor: {x: 16, y: 16}},
          ]
        });
      });
  }
}
