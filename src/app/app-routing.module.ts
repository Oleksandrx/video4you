import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosComponent, CartoonsComponent, MusicComponent, FunComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VideosComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'cartoons', component: CartoonsComponent },
  { path: 'music', component: MusicComponent },
  { path: 'fun', component: FunComponent },
  { path: '**', redirectTo: 'videos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
