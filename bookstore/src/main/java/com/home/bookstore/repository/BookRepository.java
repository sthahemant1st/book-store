package com.home.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.home.bookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
