import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Comments } from '../../../models/comments';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detailed-album',
  templateUrl: './detailed-album.component.html',
  styleUrls: ['./detailed-album.component.scss']
})
export class DetailedAlbumComponent implements OnInit, OnDestroy {
  album$: Object = {};
  comments$: Observable<Comments[]> = this.service.getComments();
  average$: Observable<Comments[]>;

  commentForm: FormGroup;





  constructor(private service: MainService, private fb: FormBuilder) {
    this.commentForm = fb.group({
      'stars': new FormControl("", Validators.required),
      'comment': new FormControl("", Validators.required),
      'albumId': new FormControl("", Validators.required),
      'id': new FormControl(this.id())
    });

    this.service.albums.subscribe(
      (data:any) => {
        let id = data;
        id = id.filter(el => el.key === this.service.albumID)
        this.album$ = id[0];
        (<FormControl>this.commentForm.controls['albumId']).setValue(this.album$['key']);

      },
      (error:any) => console.log(error)
    );

    this.service.getComments().subscribe(
      (data: any) => {
        let avg = data;
        avg = avg.reduce((acc, val) => acc + val.stars, 0) / avg.length;
        avg = avg.toFixed(2);
        this.average$ = avg;  
      }
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {}


  sendComment({value}) {
    console.log(value);
    value.albumId = parseInt(value.albumId);
    this.service.saveComment(value);
  }
  id() {
    return '_' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

}
