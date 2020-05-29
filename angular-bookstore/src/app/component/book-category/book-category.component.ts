import { BookService } from 'src/app/services/book.service';
import { Bookcategory } from './../../common/bookcategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  bookCategories : Bookcategory[];

  constructor(private _bookService : BookService) { }

  ngOnInit(): void {
    this.listBookCategories();
    console.log(this.bookCategories);
  }

  listBookCategories(){
    this._bookService.getBookCategory().subscribe(
      data => this.bookCategories = data
    );
  }

}
