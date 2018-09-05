import { Injectable } from '@angular/core';


export interface Car {
  vin: String;
  year: String;
  brand: String;
  color: String;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string;

  selectedPub = '';
  selectedEdt = '';
  selectedPubDate = '';
  pubChanged = false;
  pubType: '';
  pubDescription = '';

  selectedPages = '';
  selectedPairPages = '';

  constructor() {

    this.selectedPub = this.selectedEdt = this.selectedPubDate = '';
    this.pubChanged = false;
    this.selectedPages = '';
    this.selectedPairPages = '';
    this.pubType = '';
    this.pubDescription = '';
   }
}
