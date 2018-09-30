import { Injectable } from '@angular/core'
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Comments } from '../models/comments';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  albumsRef:AngularFireList<any>;
  albums: Observable<any[]>;
  albumID: string = '';

  commentsRef:AngularFireList<any[]>;
  comments: Observable<any[]>;

  
  constructor(private db: AngularFireDatabase) { 
    this.albumsRef = db.list('albums');
    this.albums = this.albumsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>({key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.commentsRef = db.list('comments');
    this.comments = this.commentsRef.snapshotChanges().pipe(
      map(changes => changes.map(c =>({key: c.payload.key, ...c.payload.val() }))),
      map(change => change.filter(c => c['albumId'] === parseInt(this.albumID)))
    );
  }

  setAlbumId(str: string) {
    this.albumID = str;
  }

  getAlbums() {
    return this.albums;
  }
  getComments() {
    return this.comments;
  }

  saveComment(form) {
    return this.commentsRef.push(form);
}


}
