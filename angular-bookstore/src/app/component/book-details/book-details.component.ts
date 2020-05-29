import { CartService } from './../../services/cart.service';
import { Book } from './../../common/book';
import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentBookDetail: Book;

  constructor(private _bookService: BookService,
                private _activatedRoute: ActivatedRoute,
                private _cartService: CartService) { }

  ngOnInit(): void {
     this._activatedRoute.paramMap.subscribe(
      ()=>{
        this.bookDetails();
      }
    );
  }
  bookDetails(){
    const hasId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasId) {
      this._bookService.getBook(+this._activatedRoute.snapshot.paramMap.get('id')).subscribe(
        data => this.currentBookDetail = data
      );
      
    }
  }
  addToCart(){
    console.log(this.currentBookDetail);
    const cartItem = new CartItem(this.currentBookDetail);
    this._cartService.addToCart(cartItem);

  }

}
