import {Injectable, NgZone} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";

@Injectable()
export class CameraManager {


  constructor(private camera: Camera,
              private base64ToGallery: Base64ToGallery) {
  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      let base64Image = 'data:image/jpeg;base64,' + imageData;


    }, (err) => {
      // Handle error
    });
  }


}
