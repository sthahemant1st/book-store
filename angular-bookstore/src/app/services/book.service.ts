import { Bookcategory } from './../common/bookcategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  //baseUrl = "http://localhost:8080/api/v1/books?size=20";
  baseUrl = "http://localhost:8080/api/v1/books";
  categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getBooks(currentCategoryId: number , currentPage: number, pageSize: number): Observable<GetResponseBooks> {
    const searchUrl: string = `${this.baseUrl}/search/categoryId?id=${currentCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
    // return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
    //   map(response => response._embedded.books)
    // );
  }

  getBookCategory(): Observable<Bookcategory[]> {
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  getBook(bookId: number): Observable<Book>{
    const url = `${this.baseUrl}/${bookId}`;
    // console.log(this.httpClient.get<Book>(url));
    return this.httpClient.get<Book>(url);

  }

  searchBooks(keyword: string): Observable<Book[]> {
    const searchUrl: string = `${this.baseUrl}/search/keyword?name=${keyword}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}
interface GetResponseBooks {
  _embedded: {
    books: Book[];
  },
  page:{
    //page size
    size:number,
    //total no of elements
    totalElements:number,
    //total page available
    totalpage: number,
    //current page number
    number: number

  }

}

interface GetResponseBookCategory {
  _embedded: {
    bookCategory: Bookcategory[];
  }
}
