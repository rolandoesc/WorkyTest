import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailedAlbumComponent } from './home/albums/detailed-album/detailed-album.component';
import { AlbumsComponent } from './home/albums/albums.component';
import { AlbumResolverService } from './services/album-resolver.service';
import { SalesComponent } from './home/sales/sales.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'sales', component: SalesComponent },
  { path: 'albums', component: AlbumsComponent},
  { path: 'albums/:id', component: DetailedAlbumComponent, resolve: {data: AlbumResolverService}}  
  //
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
