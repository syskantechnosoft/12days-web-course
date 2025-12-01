//components/header-product.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderCartService } from '../services/header-cart.service';
import { Book } from '../models/book.model';

@Component({
    selector: 'app-header-product',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
            GFG Bookstore </span>
      </div>
    </nav>

    <!-- Header template -->
    <div class="header">
        <!-- Filter and Sort options -->
        <div class="options">
            <div class="filter-options">
                <label for="minPrice">Min Price:</label>
                <input type="number" id="minPrice" 
                [(ngModel)]="minPrice">
                <label for="maxPrice">Max Price:</label>
                <input type="number" id="maxPrice" 
                [(ngModel)]="maxPrice">
                <button (click)="filterProducts()">Filter</button>
  
                <label for="sort">Sort by:</label>
                <select id="sort" [(ngModel)]="sortBy"
                 (change)="sortProducts()">
                    <option value="priceLowToHigh">
                        Price: Low to High</option>
                    <option value="priceHighToLow">
                        Price: High to Low</option>
                </select>
            </div>
        </div>

        <!-- Cart -->
        <div class="cart" (click)="toggleCart() ">
            <span>Cart ({{ cartItems.length }})</span>
            <div *ngIf="showCart" class="cart-items"
             (click)="preventClose($event)">
                <div *ngFor="let item of cartItems">
                    <p>{{ item.title }} - {{ item.price }}</p>
                    <button (click)="removeFromCart(item)">Remove</button>
                </div>
                <div>Total Price: {{ calculateTotalPrice() }}</div>
            </div>
        </div>
    </div>

    <!-- Product list template -->
    <div class="product-list">
        <div *ngFor="let product of filteredProducts" class="product-card">
            <img [src]="product.image" alt="Book Cover">
            <div class="product-details">
                <h3>{{ product.title }}</h3>
                <p>{{ product.description }}</p>
                <p>Price: {{ product.price }} Rs</p>
                <button (click)="addToCart(product)">Add to Cart</button>
            </div>
        </div>
    </div>
  `,
    styleUrls: ['./header-product.component.css']
})
export class HeaderProductComponent implements OnInit {
    products: Book[] = [];
    cartItems: Book[] = [];
    showCart: boolean = false;
    totalPrice: number = 0;
    minPrice: number = 0;
    maxPrice: number = 10000;
    filteredProducts: Book[] = [];
    sortBy: string = 'priceLowToHigh';

    constructor(private http: HttpClient,
        private cartService: HeaderCartService) { }

    ngOnInit(): void {
        // Fetch products from the backend
        this.http.get<Book[]>('http://localhost:5000/api/books')
            .subscribe({
                next: (products) => {
                    console.log('Products received:', products);
                    this.products = products;
                    this.filteredProducts = products;
                },
                error: (error) => {
                    console.error('Error fetching products:', error);
                }
            });

        // Subscribe to changes in the cart
        this.cartService.cart$.subscribe(cartItems => {
            this.cartItems = cartItems;
        });
    }

    addToCart(product: Book) {
        this.cartService.addToCart(product);
        this.calculateTotalPrice();
    }

    removeFromCart(product: Book) {
        this.cartService.removeFromCart(product);
        this.calculateTotalPrice();
    }

    toggleCart() {
        this.showCart = !this.showCart;
    }

    calculateTotalPrice(): number {
        return this.cartItems.reduce((total, item) =>
            total + item.price, 0);
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            const minCondition = this.minPrice ? product.price >= this.minPrice : true;
            const maxCondition = this.maxPrice ? product.price <= this.maxPrice : true;
            return minCondition && maxCondition;
        });
        this.sortProducts();
    }

    sortProducts() {
        if (this.sortBy === 'priceLowToHigh') {
            this.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (this.sortBy === 'priceHighToLow') {
            this.filteredProducts.sort((a, b) => b.price - a.price);
        }
    }

    preventClose(event: MouseEvent) {
        event.stopPropagation();
    }
}