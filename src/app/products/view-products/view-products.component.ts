import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{

  // variable to hold quantity value
  quantity:any=1

  // variable to hold view product from api
  product:any={}

  // variable to hold id from path
  productId:string=''

  constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((result:any)=>{
      console.log(result.id);
      this.productId=result.id
      
    })

    this.api.getViewProduct(this.productId).subscribe((result:any)=>{
      console.log(result);
      this.product=result
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  // api call to add wishlist
  addWishlist(){
    const{id,title,price,image}=this.product

    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
    }
    ,(result:any)=>{

      alert(result.error)
    })
  }

  // api call to add to cart

  addToCart(product:any){

    Object.assign(product,{quantity:1})

    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartNumber()
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }
}
