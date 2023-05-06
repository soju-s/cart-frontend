import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  // paypal varables
  public payPalConfig ? : IPayPalConfig;
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  showPaypal:boolean=false


  // variable to hide offer image after clicked
  discountImageClicked:boolean=false
 

  // variable to hold username,flat,street,state
  username:any=''
  flat:any=''
  street:any=''
  state:any=''

  // variable to hold offer button hide
  offerButtonHide:boolean=false

  // variable to hold payment div hide 
  makePayment:boolean=false

  // variable to hold cart price total
  totalPrice:number=0

  // variable to hold all carts from api

  allCart:any=[]

  constructor(private api:ApiService,private fB:FormBuilder){}
  // tenPercentClicked
  tenPercentClicked(){
    let discount=Math.ceil(this.totalPrice*10/100) 
    this.totalPrice-=discount
    this.discountImageClicked=true
  }

  // fiftyPercentClicked

  fiftyPercentClicked(){
    let discount=Math.ceil(this.totalPrice*50/100) 
    this.totalPrice-=discount
    this.discountImageClicked=true
  }

  // reactive from

  addressForm=this.fB.group({

    username:['',[Validators.required]],
    flat:['',[Validators.required]],
    street:['',[Validators.required]],
    state:['',[Validators.required]]
  })
  // offer button clicked
  offerButtonClicked(){
    this.offerButtonHide=true
  }

  // submit button click in payment

  addressFormSubmit(){

    if(this.addressForm.valid){

      this.makePayment=true
      this.username=this.addressForm.value.username
      this.flat=this.addressForm.value.flat
      this.street=this.addressForm.value.street
      this.state=this.addressForm.value.state
    }
    else{
      alert('Enter valid details')
    }
  }

  ngOnInit(): void {
   
   
    this.api.getAllCart().subscribe((result:any)=>{
      console.log(result);
      this.allCart=result
      this.getTotalPrice()
       // paypal config
    this.initConfig();
    },(result:any)=>{
      console.log(result.error);
      
    })
  }

  // to get cart price from array of objects
  getTotalPrice(){
    let total=0
    this.allCart.forEach((items:any) => {

      total+=items.grandTotal
      this.totalPrice=Math.ceil(total)
      
    });
  }

  // delete from cart
  deleteCart(id:any){

    this.api.deleteCartItem(id).subscribe((result:any)=>{
this.allCart=result
this.api.cartNumber()
this.getTotalPrice()

    },(result:any)=>{
      console.log(result.error);
      
    })
  }

  // delete all items from cart
  deleteAllCart(){
    this.api.deleteAllItemsFromCart().subscribe((result:any)=>{
      alert(result)
      // to empty the array
      this.allCart=[]

      // to update cart item number
      this.api.cartNumber()

      // update total price
      this.getTotalPrice()

    },
    (result:any)=>{
      alert(result.error)
    })
  }

  // increment product
  incrementPrice(id:any){
    this.api.incrementQuantity(id).subscribe((result:any)=>{
      this.allCart=result

      // update price
      this.getTotalPrice()
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  // decrement product
  decrementPrice(id:any){
    this.api.decrementQuantity(id).subscribe((result:any)=>{
      this.allCart=result

      // update price
      this.getTotalPrice()
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  // papal details from ndx paypal(search in net) 
  private initConfig(): void {
    let amount=this.totalPrice.toString()
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: amount
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: amount,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            this.deleteAllCart()
            // hide paypal div when success
            this.showPaypal=false

            // make payment button hide
            this.makePayment=false

            // to reset form 
            this.addressForm.reset()
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

            this.showPaypal=false

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
            this.showPaypal=false
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
}

resetStatus(){

}

makePaymentClicked(){
 this.showPaypal=true
}

// model close button function

modelClose(){

  // to reset form

  this.addressForm.reset()

  // 

  this.showCancel=false
  this.showSuccess=false
  this.showError=false

  this.makePayment=false


}
}
