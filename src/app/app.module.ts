import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumsComponent } from './home/albums/albums.component';
import { MainService } from './services/main.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { DetailedAlbumComponent } from './home/albums/detailed-album/detailed-album.component';
import { AlbumResolverService } from './services/album-resolver.service';
import { StarRatingModule } from 'angular-star-rating'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReversePipe } from './pipes/reverse.pipe';
import { HeaderComponent } from './static/header/header.component';
import { SalesComponent } from './home/sales/sales.component';



@NgModule({
  declarations: [
    ReversePipe,
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    DetailedAlbumComponent,
    HeaderComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    StarRatingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [MainService, AlbumResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
