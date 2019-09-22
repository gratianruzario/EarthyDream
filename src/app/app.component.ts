import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { log } from 'util';
import { Observable } from '../../node_modules/rxjs';
import { switchMap,map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: AngularFirestore
  ) {
    this.initializeApp();
    this.testDB();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  testDB(){
    this.db.collection('orderDetails').valueChanges().pipe(
      map(actions => actions.map((a, i) => {
        Object.keys(a).forEach(v=>{
          this.db.doc(`products/${v}`).valueChanges().subscribe(xx => {
               Object.assign(a[v],xx);
            });

        });
        //const data = a.payload.doc.data();
       // const id = a.payload.doc.id;
        //this.db.doc(`products/${id}`).valueChanges().subscribe(xx => {
        //   console.log(xx);
            //data[i] = xx;
       // });

        return {  ...a };
      }))
    ).subscribe(x=>{
      console.log(x)
    });


  }
}
