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

  salesRef: AngularFireList<any>;
  sales: Observable<any[]>

  purchasesRef: AngularFireList<any>;
  purchases: Observable<any[]>


    
  
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

    this.salesRef = db.list('sales');
    this.sales = this.salesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>({key: c.payload.key, ...c.payload.val() }))
      ), map(changes => changes.reduce((labels, sale) => {
          sale['albums'].forEach(album => {
            labels[album.label] = {
              id: album.label,
              quantity:
                labels[album.label] && labels[album.label].quantity
                  ? labels[album.label].quantity + album.quantity
                  : album.quantity
            };
          });
          return labels
         }, {})      
      )//map
    );

    this.purchasesRef = db.list('purchases');
    this.purchases = this.purchasesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>({key: c.payload.key, ...c.payload.val() }))
      ), map(changes => changes.reduce((labels, purchase) => {
          purchase['albums'].forEach(album => {
            labels[album.label] = {
              id: album.label,
              quantity:
                labels[album.label] && labels[album.label].quantity
                  ? labels[album.label].quantity + album.quantity
                  : album.quantity
            };
          });
          return labels
         }, {})      
      )//map
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

  getSales() {
    return this.sales;
  }

  getPurchases() {
    return this.purchases;
  }
}
