import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { IonicModule } from '../../../node_modules/@ionic/angular';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent
      }
    ])
  ]
})
export class ProductModule { }
