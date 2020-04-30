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
  constructor(private httpClient : HttpClient) { }

  getBooks(currentCategoryId : number) : Observable<Book[]>{
    const searchUrl : string = `${this.baseUrl}/search/categoryId?id=${currentCategoryId}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response =>response._embedded.books)
    );
    }
}
interface GetResponseBooks{
  _embedded:{
    books: Book[];
  }
}
