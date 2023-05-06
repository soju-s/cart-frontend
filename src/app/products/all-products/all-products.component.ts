import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  // variable to hold search term from header
  searchTerm:any=''

  // variable to hold all products
  AllProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{

      console.log(result);
      this.AllProducts=result
      
    })


    this.api.searchTerm.subscribe((result:any)=>{

      this.searchTerm=result
      console.log(this.searchTerm);
      
    })
  }


  // function to add to cart

  addToCart(Product:any){

    // add value of quantity as key value pair in the object product

    Object.assign(Product,{quantity:1})


    
    this.api.addToCart(Product).subscribe((result:any)=>{
      // call cart count
      this.api.cartNumber()
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }
}
