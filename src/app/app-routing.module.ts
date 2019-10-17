import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  {
    path: 'top',
    component: TopComponent
  },
  {
    path: 'explore',
    component: ExploreComponent
  },
  {
    path: '',
    redirectTo: 'top',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
