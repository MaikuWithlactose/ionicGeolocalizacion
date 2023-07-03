import { Component } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitud: number = 0;
  longitud: number = 0;

  constructor(private geolocation: Geolocation) {}

  // Opciones de geolocalización
  private options: GeolocationOptions = {
    enableHighAccuracy: true
  };

  geoPromise() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
      console.log('Geolocalización con Promesas:', position.coords);
    }).catch((error) => {
      console.log('Error en la geolocalización:', error);
    });
  }

  geoObservable() {
    this.geolocation.watchPosition(this.options).subscribe((position: GeolocationPosition | PositionError) => {
      if (position instanceof GeolocationPosition) {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        console.log('Geolocalización con Observables:', position.coords);
      } else {
        console.log('Error en la geolocalización.');
      }
    }, (error) => {
      console.log('Error en la geolocalización:', error);
    });
  }
}
