import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

const { Geolocation } = Plugins;
declare const google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  lat: number;
  long: number;
  uid; 


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
  }


  getCurrentPosition() {

    const coordinates = Geolocation.getCurrentPosition().then(position => {
      console.log(position);
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;

      let latLng = new google.maps.LatLng(this.lat, this.long);

      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.locationsCollection = this.afs.collection(
        `locations/${this.uid}/track`,
        ref => ref.orderBy('timestamp')
      )
      
    })
    
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    })
  }

}
