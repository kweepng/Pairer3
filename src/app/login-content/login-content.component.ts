import {Component, Inject, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../login/login.component';
// import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TreeComponent } from '../tree/tree.component';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styles: [`div {
    padding: 1rem;
  }`]
})

export class LoginContentComponent {

  loginStatus: Object;
  status: string;
  // observ: Observable;
  // @Input() logincontent: LoginContentComponent;
  // @Input() treeComponent: TreeComponent;
  @Input() treeComponent: TreeComponent;
  constructor(
    public dialogRef: MatDialogRef<LoginContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private  apiService: ApiService, public router: Router ) {}

  onNoClick(): void {
    // Sign in here
//    this.loginService.login(this.data.username, this.data.password).subscribe(res => {
  //    this.status = res['status'];
// });

    this.apiService.login(this.data.username, this.data.password).subscribe( data => {
       console.log(data);
       this.apiService.config = <any> data;
       console.log(this.apiService.config);
       this.status = this.apiService.config.status;
       if ( this.status === 'yes' ) {
          this.dialogRef.close();
          this.router.navigate(['sidebar']);
          this.apiService.pubTree = false;
          this.apiService.updatePubTree();
        }
      },
      error => {
        console.log ( 'HTTP Error' + error );
      }
    );
  }


}

