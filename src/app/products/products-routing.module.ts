import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistProductsComponent } from './wishlist-products/wishlist-products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
     path: '', component: AllProductsComponent 
  },
  {
    path:'view-product/:id',component:ViewProductsComponent
  },
  {
    path:'wishlist',component:WishlistProductsComponent
  },
  {
    path:'cart',component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
