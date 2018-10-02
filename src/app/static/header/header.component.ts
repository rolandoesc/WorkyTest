import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  albums$: Observable<any> = this.service.getAlbums();
  constructor(private service: MainService) { }

  ngOnInit() {
  }

}
