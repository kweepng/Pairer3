import {Component, AfterViewInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { debug } from 'util';

@Component({
  selector: 'app-newpub',
  templateUrl: './newpub.component.html',
  styleUrls: ['./newpub.component.scss']
})

export class NewpubComponent  implements AfterViewInit {

  pubData: {
    pub: string;
    prod: string;
    edt: string;
    sect: string;
    pdate: string;
    psize: number;
    hold: boolean;
    colour: string;
    dest: string;
  } = {
    pub: 'DM',
    prod: 'MDM',
    edt: '',
    sect: 'xxx',
    pdate: '01',
    psize: 32,
    hold: false,
    colour: 'CMYK',
    dest: ''
  };

  pub = 'DM';
  prod = 'MDM';
  edt = '';
  sect = 'xxx';
  pdate = '01';
  psize = 32;
  hold = false;
  colour = 'CMYK';
  dest = '';

  createBtn = false;
  pubs: Array<any> = [];
  edts: Array<any> = [];
  dests: Array<any> = [];

  colours: Array<any> = [ { colour: 'CMYK'}, { colour: 'Mono'} ];

  dates: Array<any> = [ {date: '01' },
          { date: '02' }, { date: '03' }, { date: '04' }, { date: '05' }, { date: '06' },
          { date: '07' }, { date: '08' }, { date: '09' }, { date: '10' }, { date: '11' },
          { date: '12' }, { date: '13' }, { date: '14' }, { date: '15' }, { date: '16' },
          { date: '17' }, { date: '18' }, { date: '19' }, { date: '20' }, { date: '21' },
          { date: '22' }, { date: '23' }, { date: '24' }, { date: '25' }, { date: '26' },
          { date: '27' }, { date: '28' }, { date: '29' }, { date: '30' }, { date: '31' }
          ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  constructor( private dialogRef: MatDialogRef<NewpubComponent>,
                  private apiService: ApiService, private dataService: DataService ) {
                }

        ngAfterViewInit() {
          // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
          // Add 'implements AfterViewInit' to the class.
                  this.apiService.getPubList().subscribe( data => {
                    this.pubs = <any> data;
                    if ( this.pub === '') {
                      this.pub = this.pubs[0].Publication;
                    }
                    this.apiService.getEdtList(this.pub).subscribe( data1 => {
                      this.edts = <any> data1;
                      if ( this.edt === '' ) {
                        this.edt = this.edts[0].Edition;
                      }

                      this.apiService.getNewPubData(this.pub, this.edt ).subscribe ( data2 => {
                        this.prod = data2[0]['Product'];
                        this.sect = data2[0]['Section'];
                        if ( data2[0]['Hold'] === '0' ) {
                          this.hold = false;
                        } else {
                          this.hold = true;
                        }
                        this.dest = data2[0]['DestGroup'];
                        this.colour = data2[0]['DefaultColour'];
                      });
                    });
                  });

                  this.apiService.getDestList().subscribe( data => {
                  this.dests = <any> data;
                  if ( this.dest === '' ) {
                    this.dest = this.dests[0].DestGroup;
                  }
                });
                }

  onClose() {
    this.dialogRef.close('');
  }

  pubSelectChange ( value ) {
    this.apiService.getNewPubData( value, this.edt ).subscribe ( data => {
      this.prod = data[0]['Product'];
      this.sect = data[0]['Section'];
      if ( data[0]['Hold'] === '0' ) {
        this.hold = false;
      } else {
        this.hold = true;
      }
      this.dest = data[0]['DestGroup'];
      this.colour = data[0]['DefaultColour'];
      this.apiService.getEdtList(this.pub).subscribe( data1 => {
        this.edts = <any> data1;
        if ( this.edt === '' ) {
          this.edt = this.edts[0].Edition;
        }
      });
      // this.debug();
    });
  }

  edtSelectChange ( value ) {
    this.apiService.getNewPubData( this.pub, value ).subscribe ( data => {
      this.prod = data[0]['Product'];
      this.sect = data[0]['Section'];
      if ( data[0]['Hold'] === '0' ) {
        this.hold = false;
      } else {
        this.hold = true;
      }
      this.dest = data[0]['DestGroup'];
      this.colour = data[0]['DefaultColour'];
      this.debug();
    });
  }

  debug() {

    console.log( 'pub= ' + this.pub + ' prod= ' + this.prod +
    ' edt= ' + this.edt + ' sect= ' + this.sect +
    ' pdate= ' + this.pdate + ' psize= ' + this.psize +
    ' hold= ' + this.hold + ' colour= ' + this.colour +
    ' dest= ' + this.dest );
  }

  onCreate() {

    let hld: string;
    let rows: Array<any>;

    if ( this.hold ) {
      hld = '1';
    } else {
      hld = '0';
    }

    this.apiService.createPub(this.pub,
      this.prod, this.edt, this.sect, this.pdate,
      this.dest, hld, this.colour, this.psize).subscribe( data => {
        rows = <any> data;
        this.dataService.selectedPub = this.pub;
        this.dataService.selectedEdt = this.edt;
        this.dataService.selectedPubDate = this.pdate;
        this.apiService.updatePubTree();
        this.onClose();
    });
  }

}
