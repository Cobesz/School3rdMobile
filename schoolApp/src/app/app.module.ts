import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MapsPage} from "../pages/maps/maps";
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {Geofence} from '@ionic-native/geofence';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {LocationTracker} from "../providers/locationTracker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {CameraManager} from "../providers/camera";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MapsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapsPage,
    LocationTracker,
    Camera,
    Base64ToGallery,
    CameraManager,
    GoogleMaps,
    BackgroundGeolocation,
    Geolocation,
    Geofence,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
