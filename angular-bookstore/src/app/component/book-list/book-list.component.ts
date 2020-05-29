import { CartService } from './../../services/cart.service';
import { Book } from './../../common/book';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  books : Book[];
  currentCategoryId : number;
  searchedKeyword : string;
  // p: number = 1;
  // pageSize: number = 6;

  //variables for serverside pagination
  currentPage: number = 1;
  pageSize: number = 6;
  totalRecords: number = 0;



  constructor(private _bookService : BookService,
              private _activatedRoute : ActivatedRoute,
              private _cartService: CartService,
              private _spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    //this.listBooks();//yo paila ko /books link ko lagi theyo
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
    //starts the spinner...
    this._spinnerService.show();
    const hasKeyword : boolean = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (hasKeyword) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }
  updatePageSize(pageSize:number){
    this.pageSize=pageSize;
    this.listBooks;
  }

  handleListBooks(){
    const hasCategoryId : boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');      
    }else{
      this.currentCategoryId = 1;
    }
    
    this._bookService.getBooks(this.currentCategoryId,this.currentPage-1,this.pageSize).subscribe(
      this.processPagination()
    )
  }

  processPagination(){    
    return data =>{
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this._spinnerService.hide();
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;        
      }, 500);      
    }   
  }

  handleSearchBooks(){
    this.searchedKeyword = this._activatedRoute.snapshot.paramMap.get('keyword');
    
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this._spinnerService.hide();    
      this._bookService.searchBooks(this.searchedKeyword).subscribe(
        data => this.books = data
      )
    }, 500);   
    
  }

  addToCart(book: Book){
    //console.log(book);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);

  }

}
