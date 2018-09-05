import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pressproof',
  templateUrl: './pressproof.component.html',
  styleUrls: ['./pressproof.component.scss']
})
export class PressproofComponent implements OnInit {
  images: Array<any> = [];
  pressproof = false;
  interval: any;
  constructor( private apiService: ApiService, private dataService: DataService ) {}

  ngOnInit () {

    this.apiService.changePressproof.subscribe( pressproof => {
        this.pressproof = pressproof;

        if ( this.pressproof ) {
          if ( this.dataService.selectedPub !== '' &&
          this.dataService.selectedEdt !== '' &&
          this.dataService.selectedPubDate !== '' ) {
          this.apiService.getPressproof(this.dataService.selectedPub,
            this.dataService.selectedEdt,
            this.dataService.selectedPubDate ).subscribe(data => {
             //  console.log(data);
             this.images = <any> data;
             //  console.log(this.images[1].thumbnailImage);
            });
        }
      }
    });

  this.refreshData();
  this.interval = setInterval(() => {
        this.refreshData();
  }, 60000);
}

  refreshData() {
    this.apiService.pressproof = false;
    this.apiService.updatePressproof();
  }
}
