import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
    MatGridListModule, MatCardModule, MatMenuModule, MatTooltipModule,
   MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatTreeModule, MatDialogModule,
   MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule,
   MatNativeDateModule } from '@angular/material';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TreeComponent } from './tree/tree.component';
import { TreeModule } from 'angular-tree-component';
import { LoginComponent } from './login/login.component';
import { LoginContentComponent } from './login-content/login-content.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { WindowRefService } from './window-ref.service';
import { JqtreeComponent } from './jqtree/jqtree.component';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewpubComponent } from './newpub/newpub.component';
import { PressproofComponent } from './pressproof/pressproof.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerlogComponent } from './trackerlog/trackerlog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginContentComponent,
    SidebarComponent,
    ThumbnailComponent,
    PaginationComponent,
    TreeComponent,
    jqxGridComponent,
    jqxMenuComponent,
    jqxTreeComponent,
    JqtreeComponent,
    NewpubComponent,
    PressproofComponent,
    TrackerComponent,
    TrackerlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule.forRoot(),
    TreeModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [DataService, ApiService, WindowRefService],
  entryComponents: [LoginContentComponent, NewpubComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
