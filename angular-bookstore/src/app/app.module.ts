import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { TestComponent } from './component/test/test.component';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
