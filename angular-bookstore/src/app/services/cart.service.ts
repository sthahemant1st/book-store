import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find book item based on cart item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined)
    }
    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    // console.log(this.cartItems);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //loop through cartitem and calculate total price and total quantity
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }
  decrementItem(cartId: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == cartId) {
        if (this.cartItems[i].quantity == 1) {
          this.cartItems.splice(i, 1);
        } else {
          this.cartItems[i].quantity--;
        }
      }
    }
    this.calculateTotalPrice();
  }
  deleteItem(cartId: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == cartId) {
        this.cartItems.splice(i, 1);
      }
    }
    this.calculateTotalPrice();

  }
}
