import { Component,  ViewChild, AfterViewInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-jqtree',
  template: ` <jqxTree #treeReference  [auto-create]="false" (onItemClick)="onItemclick($event)"> </jqxTree>`,
  styleUrls: ['./jqtree.component.scss']
})


export class JqtreeComponent implements AfterViewInit {
  @ViewChild('treeReference') tree: jqxTreeComponent;
  selectedNode: any;
  pubTree = false;
  interval: any;
  treeSource: any[] = [];

  constructor( private apiService: ApiService, private dataService: DataService ) {

   }

  treeSettings: jqwidgets.TreeOptions =
  {
      width: '100%',
      height: '100%',
      source: this.treeSource
  };

   public getPubTree(): void {
    this.apiService.getPubTree().subscribe( data => {
      this.treeSource = <any> data;
      console.log('Source: ' + this.treeSource);
      this.tree.setOptions ( {
        source: this.treeSource
      });

    },
    error => {
      console.log ( 'HTTP Error' + error );
    });
  }

  onItemclick(event) {
    console.log(event);
    console.log(event.args);
    let arry: Array<any> = [];
    let pub = '';
    let edt = '';
    let pdate = '';

    arry = event.args.element.id.split('-');

      if ( arry.length !== 3 ) {
          return;
      } else {
        pdate = arry[0];
        edt = arry[2];
        pub = arry[1];
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
          console.log(this.dataService.pubType + ' ' + this.dataService.pubDescription );
          console.log(pub + ' ' + edt + ' ' + pdate + this.dataService.pubType);
          this.selectedNode = event.args.element.id;
          switch ( this.apiService.activeTab ) {
            case 0:
              this.apiService.pagination = false;
              this.apiService.updatePagination();
              break;

            case 1:
              this.apiService.thumbnails = false;
              this.apiService.updateThumbnails();
            break;
          }
      });
      }

    }

  ngAfterViewInit(): void {
    this.tree.createComponent(this.treeSettings);
    this.tree.selectItem(null);
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
    this.apiService.updatePagination();

  }

}
