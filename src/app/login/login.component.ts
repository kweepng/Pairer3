// import { i18nExtract } from '@angular/compiler-cli/src/transformers/program';
import {Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router} from '@angular/router';
import { LoginContentComponent } from '../login-content/login-content.component';

export interface DialogData {
  username: string;
  password: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  username: string;
  password: string;

  @Input() logincontent: LoginContentComponent;

  constructor(private router: Router, public dialog: MatDialog) {
     this.openDialog();
  }

   // this.openDialog();

    openDialog(): void {
      const dialogRef = this.dialog.open( LoginContentComponent, {
        width: '250px',
        data: {username: this.username, password: this.password}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.password = result;
    });
  }

}

