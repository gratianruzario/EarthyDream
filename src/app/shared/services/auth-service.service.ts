import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { tap, switchMap } from 'rxjs/operators';
import { Observable, of } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable <any>;
  constructor(public afAuth: AngularFireAuth , private db: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
     switchMap(auth => {
        if (auth) {
        return this.db.doc('users/' + auth.uid).valueChanges();
        } else {
          return of(null);
        }
       }
      )
    );
  }
}
