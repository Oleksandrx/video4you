import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// material design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
         MatListModule, MatCardModule, MatFormFieldModule, MatDialogModule  } from '@angular/material';
import { MatInputModule } from '@angular/material/input';


// my components, services
import { VideosComponent, VideoCardComponent, VideoCardModalComponent } from './components';
import { VideoService } from './services';

const matMmodules = [
  MatButtonModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatVideoModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  BrowserAnimationsModule
];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    VideosComponent,
    VideoCardComponent,
    VideoCardModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    matMmodules
  ],
  entryComponents: [
    VideoCardModalComponent
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
