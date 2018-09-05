import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'thumbnail', component: ThumbnailComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'sidebar', component: SidebarComponent },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
