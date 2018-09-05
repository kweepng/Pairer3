import {Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

// usage:
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})



export class TreeComponent implements OnInit  {
 nodes = [];
 options = { displayField: 'label' };
 selectedNode: any;

  pubTree = false;
  interval: any;
  constructor( private apiService: ApiService, private router: Router,
    private dataService: DataService ) {

  }

  public getPubTree(): void {
    this.apiService.getPubTree().subscribe( data => {
      console.log(data);
      this.nodes = <any> data;
    },
    error => {
      console.log ( 'HTTP Error' + error );
    });
  }

  ngOnInit(): void {
      this.apiService.changePubTree.subscribe(pubTree => {
        this.pubTree = pubTree;
        if ( this.pubTree ) {
          this.getPubTree();
          this.apiService.updatePubTree();
        }
      });
      this.refreshData();
      this.interval = setInterval(() => {
          this.refreshData();
      }, 60000);

  }

  refreshData() {
    this.apiService.updatePubTree();
  }

  onActivate($event) {
    let arry: Array<any> = [];
    let pub = '';
    let edt = '';
    let pdate = '';
   // console.log($event);
   // console.log($event.node.data.params);
    arry = $event.node.data.params.split(',');

      if ( arry.length !== 3 ) {
          return;
      } else {
        pub = arry[0];
        edt = arry[2];
        pdate = arry[1];
        if ( pub === this.dataService.selectedPub &&
        edt === this.dataService.selectedEdt &&
        pdate === this.dataService.selectedPubDate ) {
          this.dataService.pubChanged = false;
        } else {
          this.dataService.pubChanged = true;
        }

        this.dataService.selectedPub = pub;
        this.dataService.selectedEdt = edt;
        this.dataService.selectedPubDate = pdate;

        this.apiService.getPubData().subscribe(data => {
          arry = <any> data[0];
          this.dataService.pubType = arry['Type'];
          this.dataService.pubDescription = arry['Description'];
     //     console.log(this.dataService.pubType + ' ' + this.dataService.pubDescription );
     //     console.log(pub + ' ' + edt + ' ' + pdate + this.dataService.pubType);
          this.selectedNode = $event.node;
          switch ( this.apiService.activeTab ) {
            case 0:
              this.apiService.pagination = false;
              this.apiService.updatePagination();
              break;

            case 1:
              this.apiService.thumbnails = false;
              this.apiService.updateThumbnails();
              break;

            case 2:
              this.apiService.pressproof = false;
              this.apiService.updatePressproof();
              break;
          }

      });
      }

    }

  }

