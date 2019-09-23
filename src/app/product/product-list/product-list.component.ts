import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: any[] = [];
  constructor( private db: AngularFirestore) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.db.collection('products').snapshotChanges().pipe(
      map(actions => actions.map((action, i) => {

        const data = action.payload.doc.data();
        const id = action.payload.doc.id;

        return { id, ...data };
      }))
    ).subscribe(products => {
      this.productList = products;
    });


  }

}
