import {Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-pagination',
  template: `<jqxGrid #gridReference [auto-create]='false'></jqxGrid>
              <jqxMenu #jqxMenu (onItemclick)="onItemclick($event)" >
                <ul>
                <li><a href="#">Resend</a></li>
                <li>
                  Release
                  <ul>
                    <li><a href="#ReleaseSelected">Selected</a></li>
                    <li><a href="#ReleaseAll">All</a></li>
                  </ul>
                </li>
                <li><a href="#HoldAll">Hold All</a></li>
                <li><a href="#Promote">Promote</a></li>
                <li><a href="#MoveTo">Move To Preprint</a></li>
                <li><a href="#ToggleColour">Toggle Colour</a></li>
                <li><a href="#ChangeDestination">Change Destination</a></li>
                <li><a href="#ChangeEdition">Change Edition</a></li>
                <li><a href="#CreateEbook">Create Ebook</a></li>
                </ul>
              </jqxMenu>`,
  styleUrls: ['./pagination.component.scss']
})

/*
									"field" => "S1",
									"field" => "FirstPage",
									"field" => "S2",
									"field" => "SecondPage",
									"field" => "PairPage",
									"field" => "Destination",
									"field" => "Hold",
*/

export class PaginationComponent implements AfterViewInit {
  @ViewChild('gridReference') myGrid: jqxGridComponent;
  @ViewChild('jqxMenu') contextMenu: jqxMenuComponent;

  pagination = false;
  interval: any;
/*
  paginationData: any = [ {'S1': false, 'FirstPage': 'W_DM14.001.1ST.PDF', 'S2': false, 'SecondPage': 'W_DM14.032.1ST.PDF',
    'PairPage': 'B_MDM14.1ST.xxx.001-032.CMYK.PDF', 'Destination': 'BEL', 'Hold': true},
  {'S1': false, 'FirstPage': 'W_DM14.002.1ST.PDF', 'S2': false, 'SecondPage': 'W_DM14.031.1ST.PDF',
  'PairPage': 'B_MDM14.1ST.xxx.002-031.CMYK.PDF', 'Destination': 'BEL', 'Hold': true}];
*/


  paginationData: Array<any> = [];
  selectedPairPages: Array<any> = [];
  selectedPages: Array<any> = [];
  timeItemSelected: number;
  Refresh: boolean ;
  refreshInterval: number;
  columns: Array<any> = [];

  source: Array<any> = [];


  dataAdapter = new jqx.dataAdapter(this.source);

  constructor( private apiService: ApiService, private dataService: DataService, private winRef: WindowRefService ) {
                  this.timeItemSelected = Date.now();
                  this.Refresh = false;
                  this.refreshInterval = 6000;

                  this.columns['Tabloid'] = [
                    { text: '', datafield: 'S1', width: 50, columntype: 'checkbox' },
                    { text: 'First Page', datafield: 'FirstPage', width: 200, cellsrenderer: this.setBG },
                    { text: '', datafield: 'S2', width: 50, columntype: 'checkbox'},
                    { text: 'Second Page', datafield: 'SecondPage', width: 200, cellsrenderer: this.setBG  },
                    { text: 'Pair Page', datafield: 'PairPage', width: 250, cellsrenderer: this.setBG  },
                    { text: 'Destination', datafield: 'Destination', width: 250 },
                    { text: 'Hold', datafield: 'Hold', width: 50 , columntype: 'checkbox' }
                  ];
                  this.columns['Broadsheet'] = [
                    { text: '', datafield: 'S1', width: 50, columntype: 'checkbox' },
                    { text: 'First Page', datafield: 'FirstPage', width: 200, cellsrenderer: this.setBG },
                    { text: 'Pair Page', datafield: 'PairPage', width: 250, cellsrenderer: this.setBG  },
                    { text: 'Destination', datafield: 'Destination', width: 250 },
                    { text: 'Hold', datafield: 'Hold', width: 50 , columntype: 'checkbox' }
                  ];
                  this.columns['Quarterfold'] = [
                    { text: '', datafield: 'S1', width: 40, columntype: 'checkbox' },
                    { text: 'First Page', datafield: 'FirstPage', width: 200, cellsrenderer: this.setBG },
                    { text: '', datafield: 'S2', width: 40, columntype: 'checkbox' },
                    { text: 'Second Page', datafield: 'SecondPage', width: 200, cellsrenderer: this.setBG  },
                    { text: '', datafield: 'S3', width: 40, columntype: 'checkbox' },
                    { text: 'Third Page', datafield: 'ThirdPage', width: 200, cellsrenderer: this.setBG  },
                    { text: '', datafield: 'S4', width: 40, columntype: 'checkbox' },
                    { text: 'Fourth Page', datafield: 'FourthPage', width: 200, cellsrenderer: this.setBG  },
                    { text: 'Pair Page', datafield: 'PairPage', width: 250, cellsrenderer: this.setBG  },
                    { text: 'Destination', datafield: 'Destination', width: 250 },
                    { text: 'Hold', datafield: 'Hold', width: 50 , columntype: 'checkbox' }
                  ];
                  this.source['Tabloid'] = {
                    localdata: this.paginationData,
                    datatype: 'json',
                    datafields: [
                        { name: 'S1', type: 'boolean'},
                        { name: 'FirstPage', type: 'string' },
                        { name: 'S2', type: 'boolean'},
                        { name: 'SecondPage', type: 'string' },
                        { name: 'PairPage', type: 'string' },
                        { name: 'Destination', type: 'string' },
                        { name: 'Hold', type: 'boolean'}
                    ],
                };

                this.source['Broadsheet'] = {
                  localdata: this.paginationData,
                  datatype: 'json',
                  datafields: [
                      { name: 'S1', type: 'boolean'},
                      { name: 'FirstPage', type: 'string' },
                      { name: 'PairPage', type: 'string' },
                      { name: 'Destination', type: 'string' },
                      { name: 'Hold', type: 'boolean'}
                  ],
              };

              this.source['Quarterfold'] = {
                localdata: this.paginationData,
                datatype: 'json',
                datafields: [
                    { name: 'S1', type: 'boolean'},
                    { name: 'FirstPage', type: 'string' },
                    { name: 'S2', type: 'boolean'},
                    { name: 'SecondPage', type: 'string' },
                    { name: 'S3', type: 'boolean'},
                    { name: 'ThirdPage', type: 'string' },
                    { name: 'S4', type: 'boolean'},
                    { name: 'FourthPage', type: 'string' },
                    { name: 'PairPage', type: 'string' },
                    { name: 'Destination', type: 'string' },
                    { name: 'Hold', type: 'boolean'}
                ],
            };
        }

       // dataAdapter = new jqx.dataAdapter( this.source['Tabloid']);

        settings: jqwidgets.GridOptions = {
          width: '100%',
          height: 'auto',
          source: this.dataAdapter,
          pageable: false,
          autoheight: true,
          sortable: true,
          altrows: true,
          enabletooltips: false,
          editable: false,
          selectionmode: 'multiplerows',
          theme: 'energyblue',
          columns: this.columns['Tabloid']
      };


            menuSettings: jqwidgets.MenuOptions = {
              width: 150,
              height: 180,
              autoOpenPopup: true,
              mode: 'popup',
            };


/*
            menuSettings: jqwidgets.MenuOptions = {
              source:
                { label: 'Release', expanded: true, items: [
                    { label: 'Selected' },
                    { label: 'All', selected: true }
                ]},
                { label: 'Hold All' },
                { label: 'Promote' },
                { label: 'Move To'},
                { label: 'Change', items: [
                  { label: 'Colour' },
                  { label: 'Edition' },
                  { label: 'Destination' }
                ]},
                { label: 'Ebook' }],
              width: 150,
              height: 180,
              autoOpenPopup: false,
              mode: 'popup'
            };
*/
            /*
            settings: jqwidgets.GridOptions = {
              width: '100%',
              height: 'auto',
              source: this.dataAdapter,
              pageable: false,
              autoheight: true,
              sortable: true,
              altrows: true,
              enabletooltips: false,
              editable: true,
              selectionmode: 'multiplerows',
              theme: 'energyblue',
              columns:
              [
                { text: '', datafield: 'S1', width: 50,
                columntype: 'checkbox', cellvaluechanging: (row, datafield) => this.checkBox(row, datafield , this.paginationData) },
                { text: 'First Page', datafield: 'FirstPage', width: 250, cellsrenderer: this.setBG },
                { text: '', datafield: 'S2', width: 50, columntype: 'checkbox',
                cellvaluechanging: (row, datafield) => this.checkBox(row, datafield , this.paginationData)},
                { text: 'Second Page', datafield: 'SecondPage', width: 250, cellsrenderer: this.setBG  },
                { text: 'Pair Page', datafield: 'PairPage', width: 250, cellsrenderer: this.setBG  },
                { text: 'Destination', datafield: 'Destination', width: 250 },
                { text: 'Hold', datafield: 'Hold', width: 50 , columntype: 'checkbox',
                cellvaluechanging: (row, datafield) => this.checkBox(row, datafield , this.paginationData)}
              ]
          };
*/

isRightClick(event: any): boolean {
  let rightclick;
  if (!event) {
    event = window.event;
  }
  if (event.which) {
    rightclick = (event.which === 3);
  } else {
      if (event.button) {
        rightclick = (event.button === 2);
       return rightclick;

      }

    }
  }

  onItemclick(event) {
    console.log(event);
    const menuItem = event.args.textContent;
    switch (menuItem) {

      case 'Resend':
          console.log(menuItem);
          break;
      case 'All':

        console.log(menuItem);
        break;

      case 'Selected':
      console.log(menuItem);
        break;

      default:

        break;
    }
    return;
  }


contextmenuMenu(): boolean {
  return false;
}

mousedown(event: any): boolean {
  const rightClick = this.isRightClick(event) || jqx.mobile.isTouchDevice();
  if (rightClick) {
      this.contextMenu.open(parseInt(event.clientX, 10), parseInt(event.clientY, 10));
      return false;
  }
}

  ngAfterViewInit(): void {
    this.contextMenu.createWidget(this.menuSettings);
    /*
    this.contextMenu.setOptions( {
      source: [
        { label: 'Release', expanded: true, items: [
            { label: 'Selected' },
            { label: 'All', selected: true }
        ]
        },
        { label: 'Hold All' },
        { label: 'Promote' },
        { label: 'Move To'},
        { label: 'Change', items: [
        { label: 'Colour' },
        { label: 'Edition' },
        { label: 'Destination' }
      ]}],
      width: 200,
      height: 150,
      autoOpenPopup: false,
      mode: 'popup'

    });
    */
   //  this.contextMenu.close();

    this.myGrid.createWidget(this.settings);

     this.apiService.changePagination.subscribe(pagination => {
      this.pagination = pagination;
      if ( this.pagination ) {

        if ( this.dataService.selectedPub !== '' &&
          this.dataService.selectedEdt !== '' &&
          this.dataService.selectedPubDate !== '' ) {
          this.apiService.getPagination(this.dataService.selectedPub,
            this.dataService.selectedEdt,
            this.dataService.selectedPubDate ).subscribe(data => {
             this.paginationData = <any> data;
             if ( this.paginationData.length > 0 ) {
                for ( let i = 0 ; i < this.paginationData.length ; i++ ) {
                    if ( this.paginationData[i].S1 === '0' ) {
                      this.paginationData[i].S1 = false;
                    } else {
                      this.paginationData[i].S1 = true;
                    }
                    if ( this.paginationData[i].S2 === '0' ) {
                      this.paginationData[i].S2 = false;
                    } else {
                      this.paginationData[i].S2 = true;
                    }
                    if ( this.paginationData[i].Hold === '0' ) {
                      this.paginationData[i].Hold = false;
                    } else {
                      this.paginationData[i].Hold = true;
                    }
                }
             }

              // this.paginationData = <any> data;
              // this.myGrid.setOptions( { columns: this.columns[this.dataService.pubType]});
              this.source[this.dataService.pubType].localdata = this.paginationData;
              this.dataAdapter = new jqx.dataAdapter(this.source[this.dataService.pubType]);
              this.myGrid.setOptions( {
                width: '100%',
                height: 'auto',
                source: this.dataAdapter,
                pageable: false,
                autoheight: true,
                sortable: true,
                altrows: true,
                enabletooltips: false,
                editable: true,
                selectionmode: 'multiplerows',
                theme: 'energyblue',
                columns: this.columns[this.dataService.pubType]
              });

              // this.settings.columns = this.columns[this.dataService.pubType];
              // this.myGrid.setOptions({ source: this.dataAdapter });
               // this.myGrid.selectrow(10);


               this.myGrid.onRowselect.subscribe( event => {
                  this.selectPairPage(event.args.rowindex);
               });

               this.myGrid.onRowclick.subscribe( event => {
                  if (event.args.rightclick) {
                    const scrollTop: number = this.winRef.nativeWindow.scrollTop;
                    const scrollLeft: number = this.winRef.nativeWindow.scrollLeft;
                    let xOffset = 0;
                    let yOffset = 0;
                    const menuWidth: number = this.contextMenu.width();
                    const menuHeight: number = this.contextMenu.height();
                    const windowWidth: number = this.winRef.nativeWindow.width;
                    const windowHeight: number = this.winRef.nativeWindow.height;
                    const eventX = parseInt(event.args.originalEvent.clientX, 10);
                    const eventY = parseInt(event.args.originalEvent.clientY, 10);

                    if (eventX + menuWidth > windowWidth) {
                        xOffset = menuWidth;
                    }
                    if (eventY + menuHeight > windowHeight) {
                        yOffset = menuHeight;
                    }

                      this.contextMenu.open( eventX, eventY );
                      return false;
                  }
              });

               this.myGrid.onCellvaluechanged.subscribe( event => {
                console.log(event.args);
                console.log(event.args.rowindex);
                this.selectPage(event.args.rowindex, event.args.datafield );
             });
/*
             this.contextMenu.onItemclick.subscribe( event => {
                console.log(event);
                const menuItem = event.args.textContent;
                switch (menuItem) {

                  case 'Resend':
                      console.log(menuItem);
                      break;
                  case 'All':

                    console.log(menuItem);
                    break;

                  case 'Selected':
                  console.log(menuItem);
                    break;

                  default:

                    break;
                }
                return;
                // this.paginationService.pause(10000);

              });
*/
            });
            this.apiService.updatePagination();
          }

        }
    });

      this.refreshData();
      this.interval = setInterval(() => {
          this.refreshData();
      }, 60000);


    }

    checkBox( row, datafield , pgData ) {
      // let ind: number;
      // let page: string;
      // convert string to number
      // ind = <number><any> row;
      // ind = parseInt(row);
       console.log(row);
      console.log(datafield);
      // page = this.paginationData[ind].FirstPage;
      console.log(pgData[row].FirstPage);
    }

    setBG( row, column, fieldName ) {
      const arry: any = fieldName.split('_');
      const pageName: string = arry[1];
      const status: string = arry[0];
      let colour: string;
      let style: any = '';

      switch ( status ) {
        case 'Y':
          colour = 'class="yellowfg"';
        break;

        case 'B':
            colour = 'class="whitefg"';
            break;
        case 'I':
            colour = 'class="greyfg"';
            break;
        case 'R':
            colour = 'class="redfg"';
            break;
        case 'G':
            colour = 'class="greenfg"';
            break;
        case 'W':
            colour = 'class="whitefg"';
            break;
        default:
            colour = 'class="whitefg"';
      }
      style = '<div ' + colour + '>' +  pageName + '</div>';
      return ( style );
    }

    refreshData() {
      this.apiService.updatePagination();

    }

    private add2Array(page) {
        let deleted: boolean;

        deleted = false;

        for ( let i = 0 ; i < this.selectedPages.length; i++ ) {
            if ( this.selectedPages[i] === page ) {
                this.selectedPages.splice(i, 1);
                deleted = true;
                break;
            }
        }
        if ( ! deleted ) {
            this.selectedPages.push(page);
        }
    }

    private addPairPage2Array (page) {
      let deleted: boolean;
        deleted = false;
        for ( let i = 0 ; i < this.selectedPairPages.length; i++ ) {
            if ( this.selectedPairPages[i] === page ) {
                this.selectedPairPages.splice(i, 1);
                deleted = true;
                break;
            }
        }

        if ( ! deleted ) {
            this.selectedPairPages.push(page);
        }
    }


    private selectPage( index, fieldName ) {
        let page = '';
        let arry = [];
        this.timeItemSelected = Date.now();
        switch ( fieldName ) {
            case 'S1':
                arry = this.paginationData[index].FirstPage.split('_');
                page = 'FirstPage:' + arry[1];
                this.add2Array(page);
                break;
            case 'S2':
                arry = this.paginationData[index].SecondPage.split('_');
                page = 'SecondPage:' + arry[1];
                this.add2Array(page);
                break;
            case 'S3':
                arry = this.paginationData[index].ThirdPage.split('_');
                page = 'ThirdPage:' + arry[1];
                this.add2Array(page);
                break;
            case 'S4':
                arry = this.paginationData[index].FourthPage.split('_');
                page = 'FourthPage:' + arry[1];
                this.add2Array(page);
                break;
            case 'Hold':
              return;
        }
        this.dataService.selectedPages = this.selectedPages.toString();
        console.log(this.dataService.selectedPages);
        console.log('fieldName: ' + fieldName);
      }


      private selectPairPage( index ) {
        let arry = [];
        let pairPage = '';
        arry = this.paginationData[index].PairPage.split('_');
        pairPage = this.paginationData[index].Destination + ':' + arry[1];
        this.addPairPage2Array(pairPage);
        this.dataService.selectedPairPages = this.selectedPairPages.toString();
        console.log(this.dataService.selectedPairPages);
      }
}
