import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '../environments/environment';
// import { Http } from '@angular/http';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient, private dataService: DataService ) {

 }


   config: {
    user: string;
    status: string;
    userGroup: string;
    accessGroup: string;
    msg: string;
  } = {
    user: '',
    status: '',
    userGroup: '',
    accessGroup: '',
    msg: ''
  };

   activeTab = 0;

   pubTree = false;
   pagination = false;
   thumbnails = false;
   pressproof = false;

   @Output() changePagination: EventEmitter<boolean> = new EventEmitter();
   @Output() changePubTree: EventEmitter<boolean> = new EventEmitter();
   @Output() changeThumbnails: EventEmitter<boolean> = new EventEmitter();
   @Output() changePressproof: EventEmitter<boolean> = new EventEmitter();


   // Login Api

   login( username, password ) {

  //    this.url = this.baseUrl + '/gateway.php' + '?method=Login' + '&User=' + username + '&Password=' + password;
      const url: string = API_URL;

      const params: HttpParams = new HttpParams().
      set('method', 'Login').
      set('User', username).
      set('Password', password);
      console.log(params.toString());
      console.log(url);
      return ( this.http.get( url, { params } ));

    }

// Publication tree
    getPubTree( ) {
          const url: string = API_URL;
          const params: HttpParams = new HttpParams().
          set('method', 'NewGetPubTree').
          set('UserGroup', this.config.userGroup);
 //         console.log(params.toString());
 //         console.log(url);
          return ( this.http.get( url, { params }));
        }


        updatePubTree () {
          this.pubTree = !this.pubTree;
          this.changePubTree.emit(this.pubTree);
        }

      getPubData () {
        const url: string = API_URL;
        const params: HttpParams = new HttpParams().
        set('method', 'GetPubData').
        set('Publication', <string> this.dataService.selectedPub ).
        set('Edition', <string> this.dataService.selectedEdt);
//        console.log(params.toString());
//        console.log(url);
        return ( this.http.get( url, { params }));
    }


    // Api for pagination tab
  getPagination (pub, edt, pubDate) {
    const url: string = API_URL;
    const params: HttpParams = new HttpParams().
    set('method', 'GetPaginationInfo').
    set('Publication', pub).
    set('Edition', edt).
    set('PubDate', pubDate);
    return ( this.http.get( url, { params }));
  }

      // Api for thumbnails tab
      getThumbnails (pub, edt, pubDate) {
        const url: string = API_URL;
        const params: HttpParams = new HttpParams().
        set('method', 'GetThumbnails').
        set('Publication', pub).
        set('Edition', edt).
        set('PubDate', pubDate);
 //       console.log(url);
        return ( this.http.get( url, { params }));
      }

  updatePagination() {
    this.pagination = !this.pagination;
    this.changePagination.emit(this.pagination);
  }


  updateThumbnails() {
    this.thumbnails = !this.thumbnails;
    this.changeThumbnails.emit(this.thumbnails);
  }


  updatePressproof() {
    this.pressproof = !this.pressproof;
    this.changePressproof.emit(this.pressproof);
  }


      // Api for Press Proof tab
      getPressproof (pub, edt, pubDate) {
        const url: string = API_URL;
        const params: HttpParams = new HttpParams().
        set('method', 'GetPressproof').
        set('Publication', pub).
        set('Edition', edt).
        set('PubDate', pubDate);
 //       console.log(url);
        return ( this.http.get( url, { params }));
      }


  // New Publication API
  getPubList () {
    const url: string = API_URL;
    const params: HttpParams = new HttpParams().
    set('method', 'GetPubList').
    set('UserGroup', this.config.userGroup );
    return ( this.http.get( url, { params }));
  }

  getEdtList (pub) {
    const url: string = API_URL;
    const params: HttpParams = new HttpParams().
    set('method', 'GetEdtList').
    set('Publication', pub);
    return ( this.http.get( url, { params }));

  }

  getDestList() {
    const url: string = API_URL;
    const params: HttpParams = new HttpParams().
    set('method', 'GetDestList');
    return ( this.http.get( url, { params }));
  }

  getNewPubData(pub, edt) {
    const url: string = API_URL;
    const params: HttpParams = new HttpParams().
    set('method', 'GetPubData').
    set('Publication', pub).
    set('Edition', edt);
    return ( this.http.get( url, { params }));
  }

  createPub(pub, prod, edt, sect, pdate, dest, hld, colour, pubSize) {
/*
            params: {method: "CreatePub",
                Publication: $scope.pb.pub.Publication,
                Product: $scope.product,
                Edition: $scope.ed.edt.Edition,
                Section: $scope.section,
                PubDate: pdt,
                DestGroup: $scope.dst.dest.DestGroup,
                Hold: hld,
                DefaultColour: $scope.clr.colour.colour,
                PubSize: $scope.pubSize.psize
*/
      const url: string = API_URL;
      const params: HttpParams = new HttpParams().
      set('method', 'CreatePub').
      set('Publication', pub).
      set('Product', prod).
      set('Edition', edt).
      set('Section', sect).
      set('PubDate', pdate).
      set('DestGroup', dest).
      set('Hold', hld ).
      set('DefaultColour', colour).
      set('PubSize', pubSize);
      return ( this.http.get( url, { params }));
  }
  // Pause for number of milliseconds
  pause(numberMillis) {
    let now: any = new Date();
    const exitTime: any = now.getTime() + numberMillis;
    while (true) {
        now = new Date().getTime();
        if ( now > exitTime ) {
            return;
        }
    }
  }
}

