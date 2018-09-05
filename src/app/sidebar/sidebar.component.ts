import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatTabChangeEvent } from '@angular/material';
import { NewpubComponent } from '../newpub/newpub.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() logincontent: NewpubComponent;

  links = ['Pagination', 'Thumbnails', 'Press Proof'];
  // selected = new FormControl(0);

  constructor( private  apiService: ApiService, private router: Router, public dialog: MatDialog ) {}

  selectedIndex = 0;

  selectTab(index: number): void {
    this.selectedIndex = index;
    this.apiService.activeTab = index;
    switch (index ) {
      case 0:
      // this.router.navigate(['pagination']);
       this.apiService.pagination = false;
       this.apiService.updatePagination();
       break;

     case 1:
        // this.router.navigate(['thumbnail']);
       this.apiService.thumbnails = false;
       this.apiService.updateThumbnails();
       break;

      case 2:
       // this.router.navigate(['thumbnail']);
        this.apiService.pressproof = false;
        this.apiService.updatePressproof();
        break;
   }
  }

  onLinkClick(event: MatTabChangeEvent) {

    this.apiService.activeTab = event.index;
    this.selectedIndex =  event.index;

    switch ( event.index ) {
      case 0:
      // this.router.navigate(['pagination']);
       this.apiService.pagination = false;
       this.apiService.updatePagination();
       break;

     case 1:
       // this.router.navigate(['thumbnail']);
       this.apiService.thumbnails = false;
       this.apiService.updateThumbnails();
       break;

      case 2:
       // this.router.navigate(['thumbnail']);
        this.apiService.pressproof = false;
        this.apiService.updatePressproof();
        break;
   }
  }

  openDialog(): void {
      const dialogRef = this.dialog.open( NewpubComponent, {
      width: '450px'
    });


      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }


}
