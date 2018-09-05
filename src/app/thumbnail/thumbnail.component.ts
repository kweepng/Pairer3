import {Component, Injectable, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})

export class ThumbnailComponent implements OnInit  {

  images: Array<any> = [];
  thumbnails = false;
  interval: any;
  constructor( private apiService: ApiService, private dataService: DataService ) {}

  ngOnInit () {

    this.apiService.changeThumbnails.subscribe( thumbnails => {
        this.thumbnails = thumbnails;

        if ( this.thumbnails ) {
          if ( this.dataService.selectedPub !== '' &&
          this.dataService.selectedEdt !== '' &&
          this.dataService.selectedPubDate !== '' ) {
          this.apiService.getThumbnails(this.dataService.selectedPub,
            this.dataService.selectedEdt,
            this.dataService.selectedPubDate ).subscribe(data => {
             // console.log(data);
             this.images = <any> data;
           //   console.log(this.images[1].thumbnailImage);
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
    this.apiService.thumbnails = false;
    this.apiService.updateThumbnails();
  }

}
