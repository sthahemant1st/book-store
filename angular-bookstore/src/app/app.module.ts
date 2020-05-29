import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { BookService } from './services/book.service';
import { BookCategoryComponent } from './component/book-category/book-category.component';
import { SearchComponent } from './component/search/search.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';


const routes : Routes = [
  {path:'cart-details' , component : CartDetailsComponent},
  {path:'books' , component : BookListComponent},
  {path:'books/:id' , component : BookDetailsComponent},
  {path:'search/:keyword' , component : BookListComponent},
  {path:'category/:id', component : BookListComponent},
  {path : '' , redirectTo : '/books', pathMatch : 'full'},
  {path : '**' , component : PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
