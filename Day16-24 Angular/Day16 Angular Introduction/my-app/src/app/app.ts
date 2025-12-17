import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { MyComp } from './my-comp/my-comp';
import { UserProfile } from './user-profile/user-profile';
import { AppHeader, MenuItem, UserInfo } from './app-header/app-header';
import { LifecycleDemo } from './lifecycle-demo/lifecycle-demo';
import { CommonModule } from '@angular/common';
import { Product } from './models/product';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, UserProfile, AppHeader, LifecycleDemo, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'Angular App';
  currentTheme: 'light' | 'dark' = 'light';
  counter=0;

  // Mock Data
  products: Product[] = [
    {
      id: 101,
      name: 'Wireless Headphones',
      image: 'https://placehold.co/280x180/png?text=Headphones',
      price: 199.99,
      originalPrice: 249.99, // On Sale
      inventory: 15,
      description: 'Noise cancelling over-ear headphones.'
    },
    {
      id: 102,
      name: 'Smart Watch',
      image: 'https://placehold.co/280x180/png?text=Smart+Watch',
      price: 150.00,
      originalPrice: 150.00, // Regular Price
      inventory: 3, // Low Stock (Should be orange)
      description: 'Fitness tracker with heart rate monitor.'
    },
    {
      id: 103,
      name: 'Gaming Mouse',
      image: 'https://placehold.co/280x180/png?text=Mouse',
      price: 49.99,
      originalPrice: 89.99,
      inventory: 0, // Out of Stock (Button disabled)
      description: 'RGB ergonomic gaming mouse.'
    }
  ];

  handleAddToCart(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.inventory > 0) {
      alert(`Added "${product.name}" to cart!`);
      product.inventory--;
    }
  }


  // Configure menu items
  menuItems: MenuItem[] = [
    { label: 'Home', icon: '🏠', route: '/home' },
    { label: 'Products', icon: '📦', route: '/products' },
    {
      label: 'Services',
      icon: '⚙️',
      children: [
        { label: 'Web Development' },
        { label: 'Mobile Apps' },
        { label: 'Consulting' }
      ]
    },
    { label: 'About', icon: 'ℹ️', route: '/about' },
    { label: 'Contact', icon: '📧', route: '/contact' }
  ];

  // User information
  userInfo: UserInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator'
  };

  onLogoClick(): void {
    console.log('Logo clicked - navigate to home');
    alert('Navigate to Home Page');
  }

  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item);
    alert(`Navigate to: ${item.label}`);
  }

  onSearchQuery(query: string): void {
    console.log('Search query:', query);
    if (query) {
      alert(`Searching for: ${query}`);
    }
  }
}
