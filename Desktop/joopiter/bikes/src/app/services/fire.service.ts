import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  rider_query$: Subject<any>;
  rider$: Observable<any>;

  constructor(private db: AngularFirestore) { }


  updateRider(id, newData) {
    this.db.doc('riders/' + id).update(newData);
    this.db.doc('riders_coors/' + id).update(newData);
  }

  getRider(id) {
    return this.db.collection('riders', ref =>
      ref.where('rider', '==', id)).valueChanges();
  }

  getRiderCoors(id) {
    return this.db.collection('riders_coors', ref =>
      ref.where('rider', '==', id)).valueChanges();
  }

}
