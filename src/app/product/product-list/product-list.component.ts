import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable, from, of, combineLatest, concat, forkJoin } from 'rxjs';
import { switchMap, map, mergeMap, toArray, take, mergeAll, concatMap, tap, scan, flatMap, first, last } from 'rxjs/operators';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: any[] = [];
  productImages = {};
  constructor( private db: AngularFirestore) { }

  ngOnInit() {
    this.getAllProducts();
  }


  getAllProducts() {
    this.db.collection('products').snapshotChanges().pipe(

      mergeMap(products => {
        const obs = products.map( product => {
          return this.getProductImages(product.payload.doc.id).pipe(map(images => {
             return Object.assign(product, images);
             }
            ));
      });
        return forkJoin(obs);
      }),

    ).subscribe(products => {

       console.log(products);
       this.productList = products;
    }, error => {
      console.log(error);
    });


  }

  getAllProducts_old() {
    this.db.collection('products').snapshotChanges().pipe(
      mergeMap(product => product),
      mergeMap(product => this.getProductImages(product.payload.doc.id), (productObj , productImage) => {
         return  {...productObj.payload.doc.data(), ...productImage };
       }),
       toArray()

    ).subscribe(products => {

       console.log(products);
       this.productList = products;
    }, error => {
      console.log(error);
    });

  //   scan((acc, value) => {
  //     acc.push(value);
  //     return acc;
  // }, []),
  }

  getProductImages(id): Observable<any> {
        return this.db.doc(`productImages/${ id}`).valueChanges().pipe(take(1));
  }

}
