// services/header-cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class HeaderCartService {
    private cart: Book[] = [];
    private cartSubject = new BehaviorSubject
    <Book[]>(this.cart);
    cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) { }

    addToCart(book: Book) {
        this.cart.push(book);
        this.cartSubject.next(this.cart);
    }

    removeFromCart(book: Book) {
        const index = this.cart.findIndex
        (item => item._id === book._id);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.cartSubject.next(this.cart);
        }
    }
}