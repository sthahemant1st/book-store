package com.home.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.home.bookstore.entity.BookCategory;

@RepositoryRestResource(collectionResourceRel = "bookCategory" , path = "book-category")
@CrossOrigin("http://localhost:4200")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long>{

}
