import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums$: Observable<any> = this.service.getAlbums();
  constructor(private service: MainService) { 
    
  }

  ngOnInit() {
  }

}
