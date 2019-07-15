import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VideosComponent },
  { path: 'videos', component: VideosComponent },
  { path: '**', component: VideosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
