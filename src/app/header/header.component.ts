import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  // variable to hold cart count
  cartCountNumber:number=0

  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.api.cartCount.subscribe((result:any)=>{
      console.log(result);
      this.cartCountNumber=result
    })
  }

  search(event:any){

   this.api.searchTerm.next(event.target.value)
  }

}
