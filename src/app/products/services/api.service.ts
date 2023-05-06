import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // behaviour subject for cart
  cartCount=new BehaviorSubject(0)


  // variable to hold search term from header behaviour subject
  searchTerm=new BehaviorSubject('')


  // variable to hold base url
  Base_Url='https://e-commerce-lld0.onrender.com'

  constructor(private http:HttpClient) { 

    this.cartNumber()
  }

  // api call for all products
  getAllProducts(){
   return this.http.get(`${this.Base_Url}/products/all-products`)
  }

  // api call for view products
  getViewProduct(id:any){
    return this.http.get(`${this.Base_Url}/products/view-products/${id}`)
  }

  // add to wishlist
  addToWishlist(id:any,title:any,price:any,image:any){


    const body={
      id,
      title,
      price,
      image
    }

    return this.http.post(`${this.Base_Url}/wishlist/add-product`,body)
  }

  // get added wishlist item
  getWIshlist(){
    return this.http.get(`${this.Base_Url}/wishlist/get-items`)
  }

  // delete wishlist item
  deleteWishlistItem(id:any){
 return this.http.delete(`${this.Base_Url}/wishlist/remove-item/${id}`)
  }

  // add to cart
  addToCart(product:any){

    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }

    return this.http.post(`${this.Base_Url}/cart/add-cart`,body)
  }

// view cart

getAllCart(){

  return this.http.get(`${this.Base_Url}/cart/all-cart`)

}

// to get cart count for bheaviour subject
cartNumber(){

  this.getAllCart().subscribe((result:any)=>{
    this.cartCount.next(result.length)
  })
}

//  delete from cart

deleteCartItem(id:any){
  return this.http.delete(`${this.Base_Url}/cart/remove-item/${id}`)
}

// delete all items from cart
deleteAllItemsFromCart(){
  return this.http.delete(`${this.Base_Url}/cart/remove-all-item`)
}

// increment quantity
incrementQuantity(id:any){

  return this.http.get(`${this.Base_Url}/cart/increment-quantity/${id}`)
}

// decrement quantity
decrementQuantity(id:any){
  return this.http.get(`${this.Base_Url}/cart/decrement-quantity/${id}`)
}
}
