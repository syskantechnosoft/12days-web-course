import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngClass, CurrencyPipe
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  // 1. Accept Data from Parent
  // The '!' tells TypeScript we promise this will be provided at runtime
  @Input() product!: Product;

  // 2. Send Data to Parent
  @Output() addToCart = new EventEmitter<number>();

  // Helper method to calculate discount percentage
  get discountPercentage(): number {
    if (!this.product || this.product.price >= this.product.originalPrice) return 0;
    const discount = ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100;
    return Math.round(discount);
  }

  onAddToCart(): void {
    if (this.product && this.product.inventory > 0) {
      this.addToCart.emit(this.product.id);
    }
  }
}

