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

  constructor(private googleMaps: GoogleMaps,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.getCurrentPosition();

  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;

      this.long = resp.coords.longitude;
      this.loadMap();
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
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
          lng: this.long
        },
        zoom: 15
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
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
                "lat": this.lat + 0.0010,
                "lng": this.long + 0.0010
              },
              "name": "Starbucks - HI - Aiea  03641",
              "address": "Aiea Shopping Center_99-115 Aiea Heights Drive #125_Aiea, Hawaii 96701",
              "phone": "808-484-1488",
              "icon": "img/starbucks.png"
            }],
          icons: [
            {min: 2, max: 100, icon: 'green', anchor: {x: 16, y: 16}},
            {min: 100, max: 1000, icon: 'green', anchor: {x: 16, y: 16}},
            {min: 1000, max: 2000, icon: 'green', anchor: {x: 24, y: 24}},
            {min: 2000, icon: 'green', anchor: {x: 32, y: 32}}
          ]
        });
      });
  }
}
