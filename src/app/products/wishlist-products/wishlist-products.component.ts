import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist-products',
  templateUrl: './wishlist-products.component.html',
  styleUrls: ['./wishlist-products.component.css']
})
export class WishlistProductsComponent implements OnInit{

  noItemMsg:boolean=true


addedItems:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    
    this.api.getWIshlist().subscribe((result:any)=>{
console.log(result);

if(result.length!=0){

  this.addedItems=result
  this.noItemMsg=true
}
if(result.length==0){
  this.noItemMsg=false
}

    },
    (result:any)=>{
      console.log(result.error);
      
    })
  }

  // delete wishlist item

  deleteWishlist(id:any){

    
    this.api.deleteWishlistItem(id).subscribe((result:any)=>{
      if(result){
        this.addedItems=result
      }
      else{
        alert(result.error)
      }
    })

  }

  // add to cart
  addToCart(item:any){

    Object.assign(item,{quantity:1})

    

    this.api.addToCart(item).subscribe((result:any)=>{
      alert(result)
      this.api.cartNumber()

      // to move item from wishlist to cart
    this.deleteWishlist(item.id)
    },
    (result:any)=>{
      alert(result.error)
    })

  }

}
