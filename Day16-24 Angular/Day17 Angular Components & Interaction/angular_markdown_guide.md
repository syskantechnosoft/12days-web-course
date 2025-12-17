# Angular Components & Templates - Complete Study Guide

## Table of Contents
1. [Introduction to Angular Components](#introduction)
2. [Creating Components - Different Methods](#creating-components)
3. [Component Metadata & Decorators](#metadata-decorators)
4. [Data Binding & Templates](#data-binding)
5. [Example: Reusable Header Component](#reusable-header)
6. [Animated Image Placeholder: Component Lifecycle](#lifecycle)

---

## 1. Introduction to Angular Components {#introduction}

### What are Components?

Components are the fundamental building blocks of Angular applications. A component controls a patch of screen called a view through its associated template. Each component consists of:

- **TypeScript Class**: Contains the application logic and data
- **HTML Template**: Defines the view structure
- **CSS Styles**: Defines the presentation

### Component Architecture

```
┌─────────────────────────────────┐
│         Component               │
├─────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐   │
│  │ Template │  │  Styles  │   │
│  │  (HTML)  │  │   (CSS)  │   │
│  └──────────┘  └──────────┘   │
│         ▲              ▲        │
│         │              │        │
│         └──────┬───────┘        │
│                │                │
│      ┌─────────▼─────────┐     │
│      │   Class Logic     │     │
│      │   (TypeScript)    │     │
│      └───────────────────┘     │
└─────────────────────────────────┘
```

### Key Characteristics

1. **Encapsulation**: Each component has its own HTML, CSS, and TypeScript code
2. **Reusability**: Components can be reused throughout the application
3. **Modularity**: Break complex UIs into smaller, manageable pieces
4. **Maintainability**: Easier to test and maintain isolated components

---

## 2. Creating Components - Different Methods {#creating-components}

### Method 1: Using Angular CLI (Recommended)

The Angular CLI is the fastest and most standard way to generate components.

#### Basic Commands

```bash
# Full command
ng generate component user-profile

# Short form
ng g c user-profile

# Generate without test file
ng g c user-profile --skip-tests

# Generate with inline template and styles
ng g c user-profile --inline-template --inline-style

# Generate in specific folder
ng g c components/user-profile

# Generate with custom prefix
ng g c user-profile --prefix custom

# Generate as standalone component (Angular 14+)
ng g c user-profile --standalone
```

#### What CLI Creates

When you run `ng g c user-profile`, Angular CLI creates:

```
src/app/user-profile/
├── user-profile.component.ts       # Component class
├── user-profile.component.html     # Template
├── user-profile.component.css      # Styles
└── user-profile.component.spec.ts  # Unit tests
```

---

### Method 2: Manual Component Creation

Creating components manually provides full control over structure.

#### Step 1: Create Component Class

**File: `user-profile/user-profile.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // Properties
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  userAge: number = 28;
  isActive: boolean = true;
  profileImage: string = 'assets/images/default-avatar.png';
  
  // Computed property
  get statusText(): string {
    return this.isActive ? 'Active' : 'Inactive';
  }
  
  // Array
  skills: string[] = ['Angular', 'TypeScript', 'RxJS'];
  
  // Object
  address = {
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  };

  constructor() {
    console.log('UserProfileComponent constructor called');
  }

  ngOnInit(): void {
    console.log('UserProfileComponent initialized');
    this.loadUserData();
  }

  // Methods
  loadUserData(): void {
    // Simulate loading data
    console.log('Loading user data...');
  }

  updateProfile(): void {
    console.log('Profile updated for:', this.userName);
    alert(`Profile updated for ${this.userName}`);
  }

  toggleStatus(): void {
    this.isActive = !this.isActive;
  }

  addSkill(skill: string): void {
    if (skill && !this.skills.includes(skill)) {
      this.skills.push(skill);
    }
  }
}
```

#### Step 2: Create Template

**File: `user-profile/user-profile.component.html`**

```html
<div class="user-profile-container">
  <div class="profile-header">
    <img [src]="profileImage" [alt]="userName" class="profile-image">
    <h2>{{ userName }}</h2>
    <span class="status-badge" [class.active]="isActive">
      {{ statusText }}
    </span>
  </div>

  <div class="profile-details">
    <div class="detail-item">
      <label>Email:</label>
      <span>{{ userEmail }}</span>
    </div>

    <div class="detail-item">
      <label>Age:</label>
      <span>{{ userAge }} years</span>
    </div>

    <div class="detail-item">
      <label>Location:</label>
      <span>{{ address.city }}, {{ address.country }}</span>
    </div>

    <div class="detail-item">
      <label>Skills:</label>
      <div class="skills-list">
        <span class="skill-tag" *ngFor="let skill of skills">
          {{ skill }}
        </span>
      </div>
    </div>
  </div>

  <div class="profile-actions">
    <button class="btn btn-primary" (click)="updateProfile()">
      Update Profile
    </button>
    <button class="btn btn-secondary" (click)="toggleStatus()">
      Toggle Status
    </button>
  </div>
</div>
```

#### Step 3: Create Styles

**File: `user-profile/user-profile.component.css`**

```css
.user-profile-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #007bff;
  margin-bottom: 15px;
}

.profile-header h2 {
  margin: 10px 0;
  color: #333;
  font-size: 28px;
}

.status-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background-color: #dc3545;
  color: white;
}

.status-badge.active {
  background-color: #28a745;
}

.profile-details {
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item label {
  font-weight: 600;
  color: #555;
  min-width: 120px;
}

.detail-item span {
  color: #333;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background-color: #e7f3ff;
  color: #007bff;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.profile-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.btn:active {
  transform: translateY(0);
}
```

#### Step 4: Register in Module

**File: `app.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent  // Register your component here
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Step 5: Use the Component

**File: `app.component.html`**

```html
<div class="app-container">
  <h1>My Angular Application</h1>
  
  <!-- Use the component with its selector -->
  <app-user-profile></app-user-profile>
</div>
```

---

### Method 3: Inline Component

For simple components, you can define template and styles inline within the TypeScript file.

**File: `inline-greeting.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-greeting',
  template: `
    <div class="greeting-card">
      <div class="greeting-header">
        <h2>{{ title }}</h2>
        <span class="emoji">{{ emoji }}</span>
      </div>
      
      <p class="greeting-message">{{ message }}</p>
      
      <div class="greeting-info">
        <p><strong>Date:</strong> {{ currentDate | date:'fullDate' }}</p>
        <p><strong>Time:</strong> {{ currentDate | date:'shortTime' }}</p>
      </div>
      
      <div class="greeting-actions">
        <button (click)="changeGreeting()" class="btn-change">
          Change Greeting
        </button>
        <button (click)="showAlert()" class="btn-alert">
          Show Alert
        </button>
      </div>
    </div>
  `,
  styles: [`
    .greeting-card {
      max-width: 400px;
      margin: 20px auto;
      padding: 25px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      color: white;
      font-family: 'Arial', sans-serif;
    }

    .greeting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .greeting-header h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }

    .emoji {
      font-size: 40px;
    }

    .greeting-message {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 20px;
      opacity: 0.95;
    }

    .greeting-info {
      background: rgba(255, 255, 255, 0.1);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .greeting-info p {
      margin: 8px 0;
      font-size: 14px;
    }

    .greeting-actions {
      display: flex;
      gap: 10px;
    }

    .greeting-actions button {
      flex: 1;
      padding: 12px;
      border: 2px solid white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-change {
      background-color: white;
      color: #667eea;
    }

    .btn-change:hover {
      background-color: #f0f0f0;
      transform: translateY(-2px);
    }

    .btn-alert {
      background-color: transparent;
      color: white;
    }

    .btn-alert:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  `]
})
export class InlineGreetingComponent implements OnInit {
  title: string = 'Welcome!';
  message: string = 'This is an inline component with embedded template and styles.';
  emoji: string = '👋';
  currentDate: Date = new Date();
  
  greetings = [
    { title: 'Hello!', message: 'Have a wonderful day ahead!', emoji: '😊' },
    { title: 'Welcome!', message: 'This is an inline component with embedded template and styles.', emoji: '👋' },
    { title: 'Greetings!', message: 'Thanks for exploring Angular components!', emoji: '🎉' },
    { title: 'Hi There!', message: 'Inline components are great for simple use cases!', emoji: '✨' }
  ];
  
  currentGreetingIndex: number = 1;

  constructor() {
    console.log('InlineGreetingComponent created');
  }

  ngOnInit(): void {
    // Update date every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  changeGreeting(): void {
    this.currentGreetingIndex = (this.currentGreetingIndex + 1) % this.greetings.length;
    const greeting = this.greetings[this.currentGreetingIndex];
    this.title = greeting.title;
    this.message = greeting.message;
    this.emoji = greeting.emoji;
  }

  showAlert(): void {
    alert(`${this.title}\n\n${this.message}`);
  }
}
```

---

## 3. Component Metadata & Decorators {#metadata-decorators}

### The @Component Decorator

The `@Component` decorator marks a class as an Angular component and provides configuration metadata.

### Component Metadata Properties

```
┌─────────────────────────────────────────┐
│      @Component Decorator              │
├─────────────────────────────────────────┤
│                                         │
│  selector: 'app-example'               │
│  ├─ How to use component in HTML       │
│                                         │
│  templateUrl / template                 │
│  ├─ View definition (HTML)             │
│                                         │
│  styleUrls / styles                     │
│  ├─ Component styling (CSS)            │
│                                         │
│  providers                              │
│  ├─ Services for this component        │
│                                         │
│  encapsulation                          │
│  ├─ View encapsulation strategy        │
│                                         │
│  changeDetection                        │
│  ├─ Change detection strategy          │
│                                         │
│  standalone                             │
│  ├─ Standalone component flag          │
│                                         │
└─────────────────────────────────────────┘
```

### Complete Metadata Example

**File: `advanced-component.component.ts`**

```typescript
import { 
  Component, 
  OnInit, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// Service for demonstration
import { DataService } from './services/data.service';

@Component({
  // Component selector - how to use in templates
  selector: 'app-advanced-component',
  
  // External template file
  templateUrl: './advanced-component.component.html',
  
  // Multiple style files
  styleUrls: [
    './advanced-component.component.css',
    './advanced-component.theme.css'
  ],
  
  // Component-level service providers
  providers: [DataService],
  
  // View encapsulation strategy
  encapsulation: ViewEncapsulation.Emulated,
  
  // Change detection strategy
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  // Host element bindings
  host: {
    'class': 'advanced-component',
    '[class.active]': 'isActive',
    '[attr.data-id]': 'componentId',
    '(click)': 'onHostClick()'
  },
  
  // Animation triggers (if using animations)
  animations: [
    // Animation definitions would go here
  ]
})
export class AdvancedComponentComponent implements OnInit {
  // Input property - receives data from parent
  @Input() title: string = 'Advanced Component';
  @Input() isActive: boolean = false;
  @Input() componentId: string = 'comp-1';
  
  // Output property - emits events to parent
  @Output() statusChanged = new EventEmitter<boolean>();
  @Output() dataLoaded = new EventEmitter<any[]>();
  
  // Component properties
  data: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private dataService: DataService) {
    console.log('AdvancedComponentComponent: Constructor');
  }

  ngOnInit(): void {
    console.log('AdvancedComponentComponent: ngOnInit');
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    
    try {
      this.data = this.dataService.getData();
      this.dataLoaded.emit(this.data);
    } catch (err) {
      this.error = 'Failed to load data';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  toggleStatus(): void {
    this.isActive = !this.isActive;
    this.statusChanged.emit(this.isActive);
  }

  onHostClick(): void {
    console.log('Host element clicked');
  }
}
```

**File: `services/data.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private data = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 }
  ];

  getData(): any[] {
    return [...this.data];
  }

  addItem(item: any): void {
    this.data.push(item);
  }
}
```

### View Encapsulation Modes

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

// 1. Emulated (Default) - Scoped styles using attribute selectors
@Component({
  selector: 'app-emulated',
  template: `
    <div class="container">
      <h3>Emulated Encapsulation</h3>
      <p>Styles are scoped to this component using attributes</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      background-color: #e3f2fd;
      border: 2px solid #2196f3;
    }
    h3 { color: #1976d2; }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class EmulatedComponent { }

// 2. None - No encapsulation, styles are global
@Component({
  selector: 'app-none',
  template: `
    <div class="container">
      <h3>No Encapsulation</h3>
      <p>Styles are global and affect all elements</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      background-color: #ffebee;
      border: 2px solid #f44336;
    }
    h3 { color: #c62828; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class NoneComponent { }

// 3. ShadowDom - Native Shadow DOM encapsulation
@Component({
  selector: 'app-shadow',
  template: `
    <div class="container">
      <h3>Shadow DOM Encapsulation</h3>
      <p>Uses native Shadow DOM for style isolation</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      background-color: #e8f5e9;
      border: 2px solid #4caf50;
    }
    h3 { color: #2e7d32; }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShadowComponent { }
```

### Change Detection Strategies

```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

// Default Strategy - checks component on every change detection cycle
@Component({
  selector: 'app-default-cd',
  template: `<div>{{ data.value }}</div>`,
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultCDComponent {
  @Input() data: any;
}

// OnPush Strategy - only checks when:
// 1. Input reference changes
// 2. Event originates from component
// 3. Manually triggered
@Component({
  selector: 'app-onpush-cd',
  template: `
    <div>{{ data.value }}</div>
    <button (click)="update()">Update</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushCDComponent {
  @Input() data: any;
  
  update(): void {
    // This will trigger change detection
    console.log('Updated');
  }
}
```

---

## 4. Data Binding & Templates {#data-binding}

Data binding is the mechanism that coordinates data between the component class and the template.

### Data Binding Types Overview

```
┌─────────────────────────────────────────────────────┐
│              Data Binding Flow                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Component Class  ←→  Template (View)              │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  1. Interpolation {{ }}                     │  │
│  │     Component → Template (One-way)          │  │
│  │     Usage: Display data                     │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  2. Property Binding [property]             │  │
│  │     Component → Template (One-way)          │  │
│  │     Usage: Set element properties           │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  3. Event Binding (event)                   │  │
│  │     Template → Component (One-way)          │  │
│  │     Usage: Handle user actions              │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  4. Two-way Binding [(ngModel)]             │  │
│  │     Component ←→ Template (Two-way)         │  │
│  │     Usage: Form inputs, editable data       │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 4.1 Interpolation {{ }}

Interpolation embeds expressions into marked up text.

**File: `interpolation-demo.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolation-demo',
  templateUrl: './interpolation-demo.component.html',
  styleUrls: ['./interpolation-demo.component.css']
})
export class InterpolationDemoComponent {
  // Simple properties
  title: string = 'Interpolation Examples';
  count: number = 42;
  price: number = 299.99;
  isAvailable: boolean = true;
  rating: number = 4.5;
  
  // Object
  product = {
    name: 'Laptop',
    brand: 'TechBrand',
    year: 2024,
    specs: {
      ram: '16GB',
      processor: 'Intel i7'
    }
  };
  
  // Array
  tags: string[] = ['Electronics', 'Computers', 'Popular'];
  numbers: number[] = [10, 20, 30, 40, 50];
  
  // Methods
  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
  
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
  
  calculateDiscount(price: number, percentage: number): number {
    return price - (price * percentage / 100);
  }
  
  // Getter
  get formattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }
  
  get discountedPrice(): string {
    return `$${this.calculateDiscount(this.price, 10).toFixed(2)}`;
  }
  
  get availabilityText(): string {
    return this.isAvailable ? 'In Stock' : 'Out of Stock';
  }
}
```

**File: `interpolation-demo.component.html`**

```html
<div class="interpolation-container">
  <h1>{{ title }}</h1>
  
  <!-- Simple property binding -->
  <section class="demo-section">
    <h2>Simple Properties</h2>
    <div class="demo-item">
      <strong>Count:</strong> {{ count }}
    </div>
    <div class="demo-item">
      <strong>Price:</strong> {{ price }}
    </div>
    <div class="demo-item">
      <strong>Available:</strong> {{ isAvailable }}
    </div>
    <div class="demo-item">
      <strong>Rating:</strong> {{ rating }} / 5
    </div>
  </section>
  
  <!-- Object property access -->
  <section class="demo-section">
    <h2>Object Properties</h2>
    <div class="demo-item">
      <strong>Product:</strong> {{ product.name }}
    </div>
    <div class="demo-item">
      <strong>Brand:</strong> {{ product.brand }}
    </div>
    <div class="demo-item">
      <strong>Year:</strong> {{ product.year }}
    </div>
    <div class="demo-item">
      <strong>RAM:</strong> {{ product.specs.ram }}
    </div>
    <div class="demo-item">
      <strong>Processor:</strong> {{ product.specs.processor }}
    </div>
  </section>
  
  <!-- Array operations -->
  <section class="demo-section">
    <h2>Array Operations</h2>
    <div class="demo-item">
      <strong>First Tag:</strong> {{ tags[0] }}
    </div>
    <div class="demo-item">
      <strong>All Tags:</strong> {{ tags.join(', ') }}
    </div>
    <div class="demo-item">
      <strong>Number of Tags:</strong> {{ tags.length }}
    </div>
    <div class="demo-item">
      <strong>Sum of Numbers:</strong> {{ numbers.reduce((a, b) => a + b, 0) }}
    </div>
  </section>
  
  <!-- Method calls -->
  <section class="demo-section">
    <h2>Method Calls</h2>
    <div class="demo-item">
      <strong>Current Date:</strong> {{ getCurrentDate() }}
    </div>
    <div class="demo-item">
      <strong>Current Time:</strong> {{ getCurrentTime() }}
    </div>
    <div class="demo-item">
      <strong>10% Discount:</strong> {{ calculateDiscount(price, 10) }}
    </div>
  </section>
  
  <!-- Getters -->
  <section class="demo-section">
    <h2>Computed Properties (Getters)</h2>
    <div class="demo-item">
      <strong>Formatted Price:</strong> {{ formattedPrice }}
    </div>
    <div class="demo-item">
      <strong>Discounted Price:</strong> {{ discountedPrice }}
    </div>
    <div class="demo-item">
      <strong>Availability:</strong> {{ availabilityText }}
    </div>
  </section>
  
  <!-- Expressions -->
  <section class="demo-section">
    <h2>Template Expressions</h2>
    <div class="demo-item">
      <strong>Count + 10:</strong> {{ count + 10 }}
    </div>
    <div class="demo-item">
      <strong>Price * 2:</strong> {{ price * 2 }}
    </div>
    <div class="demo-item">
      <strong>Uppercase Brand:</strong> {{ product.brand.toUpperCase() }}
    </div>
    <div class="demo-item">
      <strong>String Length:</strong> {{ title.length }} characters
    </div>
    
    <!-- Ternary operator -->
    <div class="demo-item">
      <strong>Status:</strong> {{ isAvailable ? 'Available Now' : 'Coming Soon' }}
    </div>
    <div class="demo-item">
      <strong>Rating Display:</strong> {{ rating >= 4 ? 'Excellent' : 'Good' }}
    </div>
    
    <!-- String concatenation -->
    <div class="demo-item">
      <strong>Full Product Name:</strong> {{ product.brand + ' ' + product.name }}
    </div>
  </section>
  
  <!-- Template expression limitations -->
  <section class="demo-section warning">
    <h2>⚠️ NOT Allowed in Interpolation</h2>
    <ul>
      <li>Assignments: <code>{{ count = 100 }}</code></li>
      <li>new, typeof, instanceof operators</li>
      <li>Chaining expressions with ; or ,</li>
      <li>Increment/Decrement: <code>{{ count++ }}</code></li>
      <li>Bitwise operators: | and &</li>
    </ul>
  </section>
</div>
```

**File: `interpolation-demo.component.css`**

```css
.interpolation-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 36px;
}

.demo-section {
  background: white;
  padding: 25px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #3498db;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.demo-item {
  padding: 12px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  border-radius: 4px;
}

.demo-item strong {
  color: #2c3e50;
  margin-right: 10px;
}

.demo-section.warning {
  background-color: #fff3cd;
  border: 2px solid #ffc107;
}

.demo-section.warning h2 {
  color: #856404;
  border-bottom-color: #ffc107;
}

.demo-section.warning ul {
  margin: 0;
  padding-left: 20px;
}

.demo-section.warning li {
  margin: 8px 0;
  color: #856404;
}

code {
  background-color: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}
```

---

### 4.2 Property Binding [property]

Property binding sets the value of a target property.

**File: `property-binding.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent {
  // Image properties
  imageUrl: string = 'https://via.placeholder.com/400x300/3498db/ffffff?text=Property+Binding';
  imageAlt: string = 'Property Binding Demo Image';
  imageWidth: number = 400;
  imageHeight: number = 300;
  
  // Button and input properties
  isButtonDisabled: boolean = false;
  isInputReadonly: boolean = false;
  inputPlaceholder: string = 'Enter your name...';
  inputValue: string = 'John Doe';
  maxLength: number = 50;
  
  // Link properties
  websiteUrl: string = 'https://angular.io';
  linkTarget: string = '_blank';
  linkTitle: string = 'Visit Angular Official Website';
  
  // Style properties
  textColor: string = '#3498db';
  fontSize: number = 20;
  backgroundColor: string = '#ecf0f1';
  borderWidth: number = 2;
  
  // Class properties
  isActive: boolean = true;
  isPrimary: boolean = false;
  isLarge: boolean = false;
  currentTheme: string = 'light-theme';
  
  // Dynamic classes object
  cardClasses = {
    'card': true,
    'card-primary': false,
    'card-large': false
  };
  
  // Attribute properties
  dataId: string = 'item-123';
  ariaLabel: string = 'Close dialog';
  colSpan: number = 2;
  rowSpan: number = 1;

  // Methods
  toggleButton(): void {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  toggleReadonly(): void {
    this.isInputReadonly = !this.isInputReadonly;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  togglePrimary(): void {
    this.isPrimary = !this.isPrimary;
    this.cardClasses['card-primary'] = this.isPrimary;
  }

  toggleSize(): void {
    this.isLarge = !this.isLarge;
    this.cardClasses['card-large'] = this.isLarge;
  }

  changeTheme(): void {
    this.currentTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
  }

  increaseFont(): void {
    this.fontSize += 2;
  }

  decreaseFont(): void {
    if (this.fontSize > 10) {
      this.fontSize -= 2;
    }
  }

  changeBorderWidth(): void {
    this.borderWidth = this.borderWidth === 2 ? 5 : 2;
  }
}
```

**File: `property-binding.component.html`**

```html
<div class="property-binding-container" [class]="currentTheme">
  <h1>Property Binding Examples</h1>

  <!-- Image Property Binding -->
  <section class="demo-section">
    <h2>1. Image Properties</h2>
    <div class="demo-content">
      <img [src]="imageUrl" 
           [alt]="imageAlt"
           [width]="imageWidth"
           [height]="imageHeight"
           class="demo-image">
      <div class="info">
        <p><strong>Source:</strong> {{ imageUrl }}</p>
        <p><strong>Dimensions:</strong> {{ imageWidth }}x{{ imageHeight }}</p>
      </div>
    </div>
  </section>

  <!-- Button State Binding -->
  <section class="demo-section">
    <h2>2. Button State Binding</h2>
    <div class="demo-content">
      <button [disabled]="isButtonDisabled" class="demo-button">
        {{ isButtonDisabled ? 'Disabled Button' : 'Enabled Button' }}
      </button>
      <button (click)="toggleButton()" class="control-button">
        Toggle Button State
      </button>
      <p class="status">Button is currently: <strong>{{ isButtonDisabled ? 'Disabled' : 'Enabled' }}</strong></p>
    </div>
  </section>

  <!-- Input Properties -->
  <section class="demo-section">
    <h2>3. Input Properties</h2>
    <div class="demo-content">
      <input type="text"
             [value]="inputValue"
             [placeholder]="inputPlaceholder"
             [readonly]="isInputReadonly"
             [maxlength]="maxLength"
             class="demo-input">
      <button (click)="toggleReadonly()" class="control-button">
        Toggle Readonly
      </button>
      <p class="status">Input is: <strong>{{ isInputReadonly ? 'Readonly' : 'Editable' }}</strong></p>
    </div>
  </section>

  <!-- Link Properties -->
  <section class="demo-section">
    <h2>4. Anchor (Link) Binding</h2>
    <div class="demo-content">
      <a [href]="websiteUrl" 
         [target]="linkTarget"
         [title]="linkTitle"
         class="demo-link">
        Visit Angular Documentation
      </a>
      <p class="info">Opens in: <strong>{{ linkTarget === '_blank' ? 'New Tab' : 'Same Tab' }}</strong></p>
    </div>
  </section>

  <!-- Style Binding -->
  <section class="demo-section">
    <h2>5. Style Binding</h2>
    <div class="demo-content">
      <div class="style-demo-box"
           [style.color]="textColor"
           [style.font-size.px]="fontSize"
           [style.background-color]="backgroundColor"
           [style.border-width.px]="borderWidth"
           [style.border-style]="'solid'"
           [style.border-color]="textColor">
        Dynamic Styled Content
      </div>
      <div class="controls">
        <button (click)="increaseFont()" class="control-button">+ Font</button>
        <button (click)="decreaseFont()" class="control-button">- Font</button>
        <button (click)="changeBorderWidth()" class="control-button">Toggle Border</button>
      </div>
      <p class="info">Font Size: <strong>{{ fontSize }}px</strong>, Border: <strong>{{ borderWidth }}px</strong></p>
    </div>
  </section>

  <!-- Single Class Binding -->
  <section class="demo-section">
    <h2>6. Class Binding (Single)</h2>
    <div class="demo-content">
      <div class="box" [class.active]="isActive">
        Box with Active State
      </div>
      <button (click)="toggleActive()" class="control-button">
        Toggle Active Class
      </button>
      <p class="status">Active state: <strong>{{ isActive ? 'ON' : 'OFF' }}</strong></p>
    </div>
  </section>

  <!-- Multiple Class Binding -->
  <section class="demo-section">
    <h2>7. Class Binding (Multiple)</h2>
    <div class="demo-content">
      <div [class]="currentTheme === 'dark-theme' ? 'box dark' : 'box light'">
        Box with Dynamic Multiple Classes
      </div>
      <div [ngClass]="cardClasses" class="card-demo">
        Card Component
      </div>
      <div class="controls">
        <button (click)="togglePrimary()" class="control-button">Toggle Primary</button>
        <button (click)="toggleSize()" class="control-button">Toggle Size</button>
      </div>
    </div>
  </section>

  <!-- Attribute Binding -->
  <section class="demo-section">
    <h2>8. Attribute Binding</h2>
    <div class="demo-content">
      <button [attr.aria-label]="ariaLabel" 
              [attr.data-id]="dataId"
              class="demo-button">
        Button with ARIA
      </button>
      
      <table class="demo-table">
        <tr>
          <td [attr.colspan]="colSpan">Merged Cell (colspan={{ colSpan }})</td>
          <td>Cell 3</td>
        </tr>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </tr>
      </table>
      
      <div [attr.role]="'alert'" 
           [attr.aria-live]="'polite'"
           class="alert-box">
        Accessible Alert Box
      </div>
    </div>
  </section>

  <!-- Theme Toggle -->
  <section class="demo-section">
    <h2>9. Theme Switching</h2>
    <div class="demo-content">
      <button (click)="changeTheme()" class="theme-toggle">
        Switch to {{ currentTheme === 'light-theme' ? 'Dark' : 'Light' }} Theme
      </button>
      <p class="status">Current Theme: <strong>{{ currentTheme }}</strong></p>
    </div>
  </section>
</div>
```

**File: `property-binding.component.css`**

```css
.property-binding-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
}

.property-binding-container.light-theme {
  background-color: #f8f9fa;
  color: #2c3e50;
}

.property-binding-container.dark-theme {
  background-color: #2c3e50;
  color: #ecf0f1;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
}

.demo-section {
  background: white;
  padding: 25px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark-theme .demo-section {
  background: #34495e;
  color: #ecf0f1;
}

.demo-section h2 {
  color: #3498db;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.dark-theme .demo-section h2 {
  color: #5dade2;
}

.demo-content {
  padding: 15px 0;
}

.demo-image {
  display: block;
  margin: 0 auto 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-button,
.control-button {
  padding: 12px 24px;
  margin: 5px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-button {
  background-color: #3498db;
  color: white;
}

.demo-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.6;
}

.demo-button:not(:disabled):hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.control-button {
  background-color: #27ae60;
  color: white;
}

.control-button:hover {
  background-color: #229954;
  transform: translateY(-2px);
}

.demo-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

.demo-input:focus {
  outline: none;
  border-color: #3498db;
}

.demo-input:read-only {
  background-color: #ecf0f1;
  cursor: not-allowed;
}

.demo-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.demo-link:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.style-demo-box {
  padding: 30px;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.box {
  padding: 30px;
  margin: 15px 0;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  background-color: #ecf0f1;
  border: 3px solid #bdc3c7;
  transition: all 0.3s ease;
}

.box.active {
  background-color: #d5f4e6;
  border-color: #27ae60;
  color: #27ae60;
  transform: scale(1.05);
}

.box.light {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.box.dark {
  background-color: #34495e;
  color: #ecf0f1;
}

.card-demo {
  padding: 30px;
  margin: 15px 0;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.card {
  background-color: #ffffff;
  border: 2px solid #bdc3c7;
}

.card-primary {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
}

.card-large {
  padding: 50px;
  font-size: 24px;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.demo-table td {
  padding: 12px;
  border: 1px solid #bdc3c7;
  text-align: center;
}

.alert-box {
  padding: 15px;
  margin: 15px 0;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  color: #856404;
}

.info,
.status {
  margin: 15px 0;
  padding: 10px;
  background-color: #e8f4f8;
  border-left: 4px solid #3498db;
  border-radius: 4px;
}

.dark-theme .info,
.dark-theme .status {
  background-color: #2c3e50;
  border-left-color: #5dade2;
}

.controls {
  margin: 15px 0;
}

.theme-toggle {
  padding: 15px 30px;
  font-size: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}
```

---

### 4.3 Event Binding (event)

Event binding listens for and responds to user actions.

**File: `event-binding.component.ts`**

```typescript
import { Component } from '@angular/core';

interface LogEntry {
  timestamp: Date;
  event: string;
  details: string;
}

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent {
  // Click events
  clickCount: number = 0;
  lastClickPosition: { x: number, y: number } = { x: 0, y: 0 };
  
  // Keyboard events
  lastKeyPressed: string = '';
  keyPressCount: number = 0;
  inputValue: string = '';
  
  // Mouse events
  mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  isMouseInside: boolean = false;
  
  // Form events
  selectedOption: string = '';
  checkboxState: boolean = false;
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  // Event log
  eventLog: LogEntry[] = [];
  
  // Dropdown options
  options = ['Option 1', 'Option 2', 'Option 3'];

  // Click event handler
  onButtonClick(): void {
    this.clickCount++;
    this.addLog('Click', `Button clicked ${this.clickCount} times`);
  }

  // Click with event object
  onClickWithEvent(event: MouseEvent): void {
    this.lastClickPosition = { x: event.clientX, y: event.clientY };
    this.addLog('Click with Event', `Clicked at (${event.clientX}, ${event.clientY})`);
  }

  // Double click
  onDoubleClick(): void {
    this.addLog('Double Click', 'Button double-clicked');
    alert('Button double-clicked!');
  }

  // Keyboard events
  onKeyUp(event: KeyboardEvent): void {
    this.lastKeyPressed = event.key;
    this.keyPressCount++;
    this.addLog('Key Up', `Key released: ${event.key}`);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addLog('Key Down', 'Enter key pressed');
      event.preventDefault();
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    this.addLog('Key Press', `Character: ${event.key}`);
  }

  // Input event
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.addLog('Input', `Input value: ${this.inputValue}`);
  }

  // Change event
  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    this.addLog('Change', `Selected: ${this.selectedOption}`);
  }

  // Mouse events
  onMouseMove(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  onMouseEnter(): void {
    this.isMouseInside = true;
    this.addLog('Mouse Enter', 'Mouse entered the area');
  }

  onMouseLeave(): void {
    this.isMouseInside = false;
    this.addLog('Mouse Leave', 'Mouse left the area');
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this.addLog('Mouse Over', `Over element: ${target.tagName}`);
  }

  // Focus events
  onFocus(inputName: string): void {
    this.addLog('Focus', `${inputName} input focused`);
  }

  onBlur(inputName: string): void {
    this.addLog('Blur', `${inputName} input lost focus`);
  }

  // Checkbox change
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkboxState = target.checked;
    this.addLog('Checkbox', `Checkbox is ${this.checkboxState ? 'checked' : 'unchecked'}`);
  }

  // Form submit
  onSubmit(event: Event): void {
    event.preventDefault();
    this.addLog('Form Submit', `Form submitted with data: ${JSON.stringify(this.formData)}`);
    alert('Form submitted! Check the event log.');
  }

  // Custom event with parameters
  onCustomClick(message: string, event: MouseEvent): void {
    this.addLog('Custom Click', `${message} at (${event.clientX}, ${event.clientY})`);
  }

  // Template reference variable event
  onReferenceClick(button: HTMLButtonElement): void {
    button.textContent = 'Clicked!';
    setTimeout(() => {
      button.textContent = 'Click Me (Reference)';
    }, 1000);
    this.addLog('Reference Click', 'Button clicked using template reference');
  }

  // Clear log
  clearLog(): void {
    this.eventLog = [];
  }

  // Helper method
  private addLog(event: string, details: string): void {
    this.eventLog.unshift({
      timestamp: new Date(),
      event,
      details
    });
    
    // Keep only last 20 entries
    if (this.eventLog.length > 20) {
      this.eventLog = this.eventLog.slice(0, 20);
    }
  }
}
```

**File: `event-binding.component.html`**

```html
<div class="event-binding-container">
  <h1>Event Binding Examples</h1>

  <!-- Click Events -->
  <section class="demo-section">
    <h2>1. Click Events</h2>
    <div class="demo-content">
      <button (click)="onButtonClick()" class="demo-btn">
        Simple Click (Count: {{ clickCount }})
      </button>
      
      <button (click)="onClickWithEvent($event)" class="demo-btn">
        Click with Event Object
      </button>
      
      <button (dblclick)="onDoubleClick()" class="demo-btn">
        Double Click Me
      </button>
      
      <button (click)="onCustomClick('Custom message', $event)" class="demo-btn">
        Click with Parameters
      </button>
      
      <button #refBtn (click)="onReferenceClick(refBtn)" class="demo-btn">
        Click Me (Reference)
      </button>
      
      <div class="info-box">
        <p><strong>Click Count:</strong> {{ clickCount }}</p>
        <p><strong>Last Click Position:</strong> X: {{ lastClickPosition.x }}, Y: {{ lastClickPosition.y }}</p>
      </div>
    </div>
  </section>

  <!-- Keyboard Events -->
  <section class="demo-section">
    <h2>2. Keyboard Events</h2>
    <div class="demo-content">
      <input 
        type="text"
        placeholder="Type something..."
        (keyup)="onKeyUp($event)"
        (keydown)="onKeyDown($event)"
        (keypress)="onKeyPress($event)"
        class="demo-input">
      
      <input 
        type="text"
        placeholder="Press Enter to submit"
        (keyup.enter)="addLog('Enter Key', 'Enter pressed!')"
        (keyup.escape)="addLog('Escape Key', 'Escape pressed!')"
        class="demo-input">
      
      <div class="info-box">
        <p><strong>Last Key Pressed:</strong> {{ lastKeyPressed || 'None' }}</p>
        <p><strong>Key Press Count:</strong> {{ keyPressCount }}</p>
      </div>
    </div>
  </section>

  <!-- Mouse Events -->
  <section class="demo-section">
    <h2>3. Mouse Events</h2>
    <div class="demo-content">
      <div 
        class="mouse-tracking-area"
        [class.mouse-inside]="isMouseInside"
        (mousemove)="onMouseMove($event)"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        (mouseover)="onMouseOver($event)">
        <p>Move your mouse over this area</p>
        <p><strong>Mouse Position:</strong> X: {{ mousePosition.x }}, Y: {{ mousePosition.y }}</p>
        <p><strong>Mouse Inside:</strong> {{ isMouseInside ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  </section>

  <!-- Input Event -->
  <section class="demo-section">
    <h2>4. Input Event</h2>
    <div class="demo-content">
      <input 
        type="text"
        placeholder="Type to see input event"
        (input)="onInput($event)"
        class="demo-input">
      
      <div class="info-box">
        <p><strong>Current Input Value:</strong> {{ inputValue || 'Empty' }}</p>
        <p><strong>Length:</strong> {{ inputValue.length }} characters</p>
      </div>
    </div>
  </section>

  <!-- Change Event -->
  <section class="demo-section">
    <h2>5. Change Event (Select)</h2>
    <div class="demo-content">
      <select (change)="onChange($event)" class="demo-select">
        <option value="">Select an option</option>
        <option *ngFor="let option of options" [value]="option">
          {{ option }}
        </option>
      </select>
      
      <div class="info-box">
        <p><strong>Selected Option:</strong> {{ selectedOption || 'None' }}</p>
      </div>
    </div>
  </section>

  <!-- Checkbox Event -->
  <section class="demo-section">
    <h2>6. Checkbox Change Event</h2>
    <div class="demo-content">
      <label class="checkbox-label">
        <input 
          type="checkbox"
          (change)="onCheckboxChange($event)">
        <span>Accept Terms and Conditions</span>
      </label>
      
      <div class="info-box">
        <p><strong>Checkbox State:</strong> {{ checkboxState ? 'Checked' : 'Unchecked' }}</p>
      </div>
    </div>
  </section>

  <!-- Focus and Blur Events -->
  <section class="demo-section">
    <h2>7. Focus and Blur Events</h2>
    <div class="demo-content">
      <input 
        type="text"
        placeholder="Name"
        (focus)="onFocus('Name')"
        (blur)="onBlur('Name')"
        class="demo-input">
      
      <input 
        type="email"
        placeholder="Email"
        (focus)="onFocus('Email')"
        (blur)="onBlur('Email')"
        class="demo-input">
    </div>
  </section>

  <!-- Form Submit Event -->
  <section class="demo-section">
    <h2>8. Form Submit Event</h2>
    <div class="demo-content">
      <form (submit)="onSubmit($event)" class="demo-form">
        <input 
          type="text"
          placeholder="Name"
          [(ngModel)]="formData.name"
          name="name"
          class="demo-input">
        
        <input 
          type="email"
          placeholder="Email"
          [(ngModel)]="formData.email"
          name="email"
          class="demo-input">
        
        <textarea 
          placeholder="Message"
          [(ngModel)]="formData.message"
          name="message"
          class="demo-textarea"
          rows="3"></textarea>
        
        <button type="submit" class="demo-btn submit-btn">
          Submit Form
        </button>
      </form>
    </div>
  </section>

  <!-- Event Log -->
  <section class="demo-section event-log-section">
    <div class="log-header">
      <h2>Event Log</h2>
      <button (click)="clearLog()" class="clear-btn">Clear Log</button>
    </div>
    <div class="event-log">
      <div *ngIf="eventLog.length === 0" class="no-events">
        No events logged yet. Interact with the components above!
      </div>
      <div *ngFor="let log of eventLog" class="log-entry">
        <span class="log-time">{{ log.timestamp | date:'HH:mm:ss' }}</span>
        <span class="log-event">{{ log.event }}</span>
        <span class="log-details">{{ log.details }}</span>
      </div>
    </div>
  </section>
</div>
```

**File: `event-binding.component.css`**

```css
.event-binding-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 36px;
}

.demo-section {
  background: white;
  padding: 25px;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.demo-section h2 {
  color: #e74c3c;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 2px solid #e74c3c;
  padding-bottom: 10px;
}

.demo-content {
  padding: 15px 0;
}

.demo-btn {
  padding: 12px 24px;
  margin: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
}

.demo-btn:active {
  transform: translateY(0);
}

.demo-input,
.demo-select {
  width: 100%;
  padding: 12px 16px;
  margin: 10px 0;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.demo-input:focus,
.demo-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.demo-textarea {
  width: 100%;
  padding: 12px 16px;
  margin: 10px 0;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
}

.demo-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.info-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #667eea;
  border-radius: 6px;
}

.info-box p {
  margin: 8px 0;
  color: #2c3e50;
}

.mouse-tracking-area {
  padding: 40px;
  margin: 20px 0;
  background-color: #ecf0f1;
  border: 3px dashed #95a5a6;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mouse-tracking-area.mouse-inside {
  background-color: #d5f4e6;
  border-color: #27ae60;
  border-style: solid;
  transform: scale(1.02);
}

.mouse-tracking-area p {
  margin: 10px 0;
  font-size: 16px;
  color: #2c3e50;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  cursor: pointer;
}

.demo-form {
  max-width: 500px;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  font-size: 18px;
}

.submit-btn:hover {
  box-shadow: 0 6px 12px rgba(39, 174, 96, 0.3);
}

.event-log-section {
  background: #2c3e50;
  color: #ecf0f1;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.log-header h2 {
  color: #3498db;
  border-bottom-color: #3498db;
  margin-bottom: 0;
}

.clear-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.event-log {
  max-height: 400px;
  overflow-y: auto;
  background-color: #34495e;
  border-radius: 8px;
  padding: 15px;
}

.no-events {
  text-align: center;
  padding: 40px;
  color: #95a5a6;
  font-style: italic;
}

.log-entry {
  padding: 12px;
  margin-bottom: 10px;
  background-color: #2c3e50;
  border-left: 4px solid #3498db;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 80px 150px 1fr;
  gap: 15px;
  align-items: center;
  transition: all 0.2s ease;
}

.log-entry:hover {
  background-color: #34495e;
  transform: translateX(5px);
}

.log-time {
  color: #95a5a6;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.log-event {
  color: #3498db;
  font-weight: 600;
  font-size: 14px;
}

.log-details {
  color: #ecf0f1;
  font-size: 14px;
}

/* Scrollbar styling */
.event-log::-webkit-scrollbar {
  width: 8px;
}

.event-log::-webkit-scrollbar-track {
  background: #2c3e50;
  border-radius: 4px;
}

.event-log::-webkit-scrollbar-thumb {
  background: #3498db;
  border-radius: 4px;
}

.event-log::-webkit-scrollbar-thumb:hover {
  background: #5dade2;
}
```

---

### 4.4 Two-Way Binding [(ngModel)]

Two-way binding combines property and event binding for synchronized data flow.

**File: `two-way-binding.component.ts`**

```typescript
import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
  age: number;
  bio: string;
}

@Component({
  selector: 'app-two-way-binding',
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.css']
})
export class TwoWayBindingComponent {
  // Simple properties
  username: string = 'John Doe';
  email: string = 'john@example.com';
  age: number = 25;
  bio: string = 'Software developer passionate about Angular';
  
  // Boolean
  newsletter: boolean = true;
  terms: boolean = false;
  
  // Select
  country: string = 'USA';
  countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France', 'India', 'Australia'];
  
  // Radio
  gender: string = 'male';
  
  // Multiple selections
  selectedHobbies: string[] = [];
  hobbies: string[] = ['Reading', 'Gaming', 'Sports', 'Music', 'Travel', 'Cooking'];
  
  // Color picker
  favoriteColor: string = '#3498db';
  
  // Range slider
  experience: number = 5;
  
  // Date
  birthDate: string = '1998-01-15';
  
  // User object
  user: User = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    bio: 'UX Designer with 5 years of experience'
  };

  // Methods
  resetForm(): void {
    this.username = '';
    this.email = '';
    this.age = 18;
    this.bio = '';
    this.newsletter = false;
    this.terms = false;
    this.country = '';
    this.gender = '';
    this.selectedHobbies = [];
    this.favoriteColor = '#000000';
    this.experience = 0;
    this.birthDate = '';
  }

  submitForm(): void {
    const formData = {
      username: this.username,
      email: this.email,
      age: this.age,
      bio: this.bio,
      newsletter: this.newsletter,
      terms: this.terms,
      country: this.country,
      gender: this.gender,
      hobbies: this.selectedHobbies,
      favoriteColor: this.favoriteColor,
      experience: this.experience,
      birthDate: this.birthDate
    };
    
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
  }

  updateUser(): void {
    alert(`User Updated:\nName: ${this.user.name}\nEmail: ${this.user.email}\nAge: ${this.user.age}`);
  }

  isFormValid(): boolean {
    return this.username.length > 0 && 
           this.email.includes('@') && 
           this.age >= 18 && 
           this.terms;
  }
}
```

**File: `two-way-binding.component.html`**

```html
<div class="two-way-binding-container">
  <h1>Two-Way Data Binding with [(ngModel)]</h1>

  <div class="explanation-box">
    <h3>💡 What is Two-Way Binding?</h3>
    <p>Two-way binding synchronizes data between the component class and the template in both directions:</p>
    <ul>
      <li><strong>Component → Template:</strong> Display current value</li>
      <li><strong>Template → Component:</strong> Update value when user interacts</li>
    </ul>
    <p><strong>Syntax:</strong> <code>[(ngModel)]="property"</code></p>
    <p><strong>Note:</strong> Requires <code>FormsModule</code> to be imported in your module</p>
  </div>

  <!-- Text Input -->
  <section class="demo-section">
    <h2>1. Text Input Binding</h2>
    <div class="form-group">
      <label>Username:</label>
      <input 
        type="text"
        [(ngModel)]="username"
        placeholder="Enter username"
        class="form-control">
      <div class="output">
        <strong>Current Value:</strong> {{ username }}
      </div>
      <div class="output">
        <strong>Length:</strong> {{ username.length }} characters
      </div>
    </div>
  </section>

  <!-- Email Input -->
  <section class="demo-section">
    <h2>2. Email Input Binding</h2>
    <div class="form-group">
      <label>Email:</label>
      <input 
        type="email"
        [(ngModel)]="email"
        placeholder="Enter email"
        class="form-control">
      <div class="output">
        <strong>Current Value:</strong> {{ email }}
      </div>
      <div class="output" [class.valid]="email.includes('@')" [class.invalid]="!email.includes('@') && email.length > 0">
        <strong>Valid Email:</strong> {{ email.includes('@') ? 'Yes' : 'No' }}
      </div>
    </div>
  </section>

  <!-- Number Input -->
  <section class="demo-section">
    <h2>3. Number Input Binding</h2>
    <div class="form-group">
      <label>Age:</label>
      <input 
        type="number"
        [(ngModel)]="age"
        min="0"
        max="120"
        class="form-control">
      <div class="output">
        <strong>Current Value:</strong> {{ age }} years
      </div>
      <div class="output" [class.valid]="age >= 18" [class.invalid]="age < 18">
        <strong>Status:</strong> {{ age >= 18 ? 'Adult' : 'Minor' }}
      </div>
    </div>
  </section>

  <!-- Textarea -->
  <section class="demo-section">
    <h2>4. Textarea Binding</h2>
    <div class="form-group">
      <label>Bio:</label>
      <textarea 
        [(ngModel)]="bio"
        placeholder="Tell us about yourself"
        rows="4"
        class="form-control"></textarea>
      <div class="output">
        <strong>Character Count:</strong> {{ bio.length }} / 500
      </div>
      <div class="bio-preview">
        <strong>Preview:</strong>
        <p>{{ bio || 'No bio entered yet' }}</p>
      </div>
    </div>
  </section>

  <!-- Checkbox -->
  <section class="demo-section">
    <h2>5. Checkbox Binding</h2>
    <div class="form-group">
      <label class="checkbox-label">
        <input 
          type="checkbox"
          [(ngModel)]="newsletter">
        <span>Subscribe to newsletter</span>
      </label>
      <div class="output">
        <strong>Newsletter:</strong> {{ newsletter ? 'Subscribed' : 'Not Subscribed' }}
      </div>

      <label class="checkbox-label">
        <input 
          type="checkbox"
          [(ngModel)]="terms">
        <span>I accept the terms and conditions</span>
      </label>
      <div class="output">
        <strong>Terms:</strong> {{ terms ? 'Accepted' : 'Not Accepted' }}
      </div>
    </div>
  </section>

  <!-- Select Dropdown -->
  <section class="demo-section">
    <h2>6. Select Dropdown Binding</h2>
    <div class="form-group">
      <label>Country:</label>
      <select 
        [(ngModel)]="country"
        class="form-control">
        <option value="">Select a country</option>
        <option *ngFor="let c of countries" [value]="c">
          {{ c }}
        </option>
      </select>
      <div class="output">
        <strong>Selected Country:</strong> {{ country || 'None' }}
      </div>
    </div>
  </section>

  <!-- Radio Buttons -->
  <section class="demo-section">
    <h2>7. Radio Button Binding</h2>
    <div class="form-group">
      <label>Gender:</label>
      <div class="radio-group">
        <label class="radio-label">
          <input 
            type="radio"
            [(ngModel)]="gender"
            value="male">
          <span>Male</span>
        </label>
        <label class="radio-label">
          <input 
            type="radio"
            [(ngModel)]="gender"
            value="female">
          <span>Female</span>
        </label>
        <label class="radio-label">
          <input 
            type="radio"
            [(ngModel)]="gender"
            value="other">
          <span>Other</span>
        </label>
      </div>
      <div class="output">
        <strong>Selected Gender:</strong> {{ gender || 'Not selected' }}
      </div>
    </div>
  </section>

  <!-- Range Slider -->
  <section class="demo-section">
    <h2>8. Range Slider Binding</h2>
    <div class="form-group">
      <label>Years of Experience: {{ experience }}</label>
      <input 
        type="range"
        [(ngModel)]="experience"
        min="0"
        max="20"
        class="range-slider">
      <div class="range-labels">
        <span>0 years</span>
        <span>20 years</span>
      </div>
      <div class="output">
        <strong>Experience Level:</strong> 
        {{ experience < 2 ? 'Junior' : experience < 5 ? 'Mid-Level' : 'Senior' }}
      </div>
    </div>
  </section>

  <!-- Color Picker -->
  <section class="demo-section">
    <h2>9. Color Picker Binding</h2>
    <div class="form-group">
      <label>Favorite Color:</label>
      <input 
        type="color"
        [(ngModel)]="favoriteColor"
        class="color-picker">
      <div class="color-preview" [style.background-color]="favoriteColor">
        Color Preview
      </div>
      <div class="output">
        <strong>Selected Color:</strong> {{ favoriteColor }}
      </div>
    </div>
  </section>

  <!-- Date Picker -->
  <section class="demo-section">
    <h2>10. Date Picker Binding</h2>
    <div class="form-group">
      <label>Birth Date:</label>
      <input 
        type="date"
        [(ngModel)]="birthDate"
        class="form-control">
      <div class="output">
        <strong>Selected Date:</strong> {{ birthDate || 'Not selected' }}
      </div>
    </div>
  </section>

  <!-- Object Binding -->
  <section class="demo-section">
    <h2>11. Binding with Objects</h2>
    <div class="form-group">
      <label>User Name:</label>
      <input 
        type="text"
        [(ngModel)]="user.name"
        class="form-control">
      
      <label>User Email:</label>
      <input 
        type="email"
        [(ngModel)]="user.email"
        class="form-control">
      
      <label>User Age:</label>
      <input 
        type="number"
        [(ngModel)]="user.age"
        class="form-control">
      
      <label>User Bio:</label>
      <textarea 
        [(ngModel)]="user.bio"
        rows="3"
        class="form-control"></textarea>
      
      <button (click)="updateUser()" class="btn btn-primary">
        Update User
      </button>
      
      <div class="user-card">
        <h3>User Profile</h3>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Age:</strong> {{ user.age }}</p>
        <p><strong>Bio:</strong> {{ user.bio }}</p>
      </div>
    </div>
  </section>

  <!-- Form Summary -->
  <section class="demo-section summary-section">
    <h2>Form Summary</h2>
    <div class="summary-grid">
      <div class="summary-item">
        <strong>Username:</strong>
        <span>{{ username || 'Not set' }}</span>
      </div>
      <div class="summary-item">
        <strong>Email:</strong>
        <span>{{ email || 'Not set' }}</span>
      </div>
      <div class="summary-item">
        <strong>Age:</strong>
        <span>{{ age }} years</span>
      </div>
      <div class="summary-item">
        <strong>Country:</strong>
        <span>{{ country || 'Not selected' }}</span>
      </div>
      <div class="summary-item">
        <strong>Gender:</strong>
        <span>{{ gender || 'Not selected' }}</span>
      </div>
      <div class="summary-item">
        <strong>Experience:</strong>
        <span>{{ experience }} years</span>
      </div>
      <div class="summary-item">
        <strong>Newsletter:</strong>
        <span>{{ newsletter ? 'Yes' : 'No' }}</span>
      </div>
      <div class="summary-item">
        <strong>Terms:</strong>
        <span>{{ terms ? 'Accepted' : 'Not Accepted' }}</span>
      </div>
    </div>
    
    <div class="form-actions">
      <button 
        (click)="submitForm()" 
        [disabled]="!isFormValid()"
        class="btn btn-success">
        Submit Form
      </button>
      <button 
        (click)="resetForm()" 
        class="btn btn-danger">
        Reset Form
      </button>
    </div>
    
    <div class="validation-message" *ngIf="!isFormValid()">
      ⚠️ Please fill all required fields and accept terms to submit
    </div>
  </section>
</div>
```

**File: `two-way-binding.component.css`**

```css
.two-way-binding-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 36px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.explanation-box {
  background: white;
  padding: 25px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.explanation-box h3 {
  color: #667eea;
  margin-top: 0;
}

.explanation-box ul {
  margin: 15px 0;
  padding-left: 25px;
}

.explanation-box li {
  margin: 8px 0;
}

.explanation-box code {
  background-color: #f8f9fa;
  padding: 3px 8px;
  border-radius: 4px;
  color: #e83e8c;
  font-family: 'Courier New', monospace;
}

.demo-section {
  background: white;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #764ba2;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
  border-bottom: 2px solid #764ba2;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-bottom: 10px;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.output {
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #667eea;
  border-radius: 4px;
  margin-top: 10px;
  color: #2c3e50;
}

.output.valid {
  background-color: #d4edda;
  border-left-color: #28a745;
  color: #155724;
}

.output.invalid {
  background-color: #f8d7da;
  border-left-color: #dc3545;
  color: #721c24;
}

.bio-preview {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.bio-preview p {
  margin: 8px 0 0 0;
  color: #495057;
  font-style: italic;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  margin: 12px 0;
  cursor: pointer;
  font-weight: normal;
  color: #495057;
}

.checkbox-label input,
.radio-label input {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.radio-group {
  display: flex;
  gap: 25px;
  margin: 15px 0;
}

.range-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #e1e8ed;
  outline: none;
  -webkit-appearance: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  color: #6c757d;
}

.color-picker {
  width: 100px;
  height: 50px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  cursor: pointer;
}

.color-preview {
  margin-top: 15px;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 22px;
}

.user-card p {
  margin: 10px 0;
  font-size: 16px;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.summary-section {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.summary-section h2 {
  color: white;
  border-bottom-color: white;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.summary-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.summary-item strong {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.summary-item span {
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.validation-message {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #856404;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
```

---

## 5. Example: Reusable Header Component {#reusable-header}

Let's create a complete, reusable header component that demonstrates all the concepts we've learned.

**File: `header/header.component.ts`**

```typescript
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface MenuItem {
  label: string;
  route?: string;
  action?: () => void;
  icon?: string;
  children?: MenuItem[];
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Input properties - configured by parent component
  @Input() title: string = 'My Application';
  @Input() logo?: string;
  @Input() menuItems: MenuItem[] = [];
  @Input() userInfo?: UserInfo;
  @Input() showSearch: boolean = true;
  @Input() theme: 'light' | 'dark' = 'light';
  
  // Output events - communicate with parent
  @Output() logoClick = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() userMenuClick = new EventEmitter<string>();
  @Output() themeToggle = new EventEmitter<'light' | 'dark'>();
  
  // Component state
  isMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  searchValue: string = '';
  activeMenuItem: string = '';

  constructor() {
    console.log('HeaderComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('HeaderComponent: Initialized with:', {
      title: this.title,
      menuItems: this.menuItems.length,
      userInfo: this.userInfo,
      theme: this.theme
    });
  }

  // Handle logo click
  onLogoClick(): void {
    console.log('Logo clicked');
    this.logoClick.emit();
  }

  // Handle menu item click
  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item.label);
    this.activeMenuItem = item.label;
    this.isMenuOpen = false;
    
    if (item.action) {
      item.action();
    }
    
    this.menuItemClick.emit(item);
  }

  // Toggle mobile menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  // Toggle user menu
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Handle search
  onSearch(): void {
    if (this.searchValue.trim()) {
      console.log('Searching for:', this.searchValue);
      this.searchQuery.emit(this.searchValue);
    }
  }

  // Handle search input
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  }

  // Clear search
  clearSearch(): void {
    this.searchValue = '';
    this.searchQuery.emit('');
  }

  // Handle user menu actions
  onUserMenuAction(action: string): void {
    console.log('User menu action:', action);
    this.isUserMenuOpen = false;
    this.userMenuClick.emit(action);
  }

  // Toggle theme
  onThemeToggle(): void {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.theme = newTheme;
    this.themeToggle.emit(newTheme);
  }

  // Get user initials for avatar
  getUserInitials(): string {
    if (!this.userInfo) return '';
    return this.userInfo.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
```

**File: `header/header.component.html`**

```html
<header class="app-header" [class.dark-theme]="theme === 'dark'">
  <div class="header-container">
    <!-- Logo Section -->
    <div class="header-logo" (click)="onLogoClick()">
      <img 
        *ngIf="logo" 
        [src]="logo" 
        [alt]="title"
        class="logo-image">
      <span class="logo-text">{{ title }}</span>
    </div>

    <!-- Desktop Navigation -->
    <nav class="header-nav desktop-nav">
      <ul class="nav-list">
        <li 
          *ngFor="let item of menuItems" 
          class="nav-item"
          [class.active]="activeMenuItem === item.label">
          <a 
            (click)="onMenuItemClick(item)"
            class="nav-link">
            <span *ngIf="item.icon" class="nav-icon">{{ item.icon }}</span>
            {{ item.label }}
          </a>
          
          <!-- Dropdown for items with children -->
          <ul *ngIf="item.children && item.children.length > 0" class="dropdown-menu">
            <li *ngFor="let child of item.children" class="dropdown-item">
              <a (click)="onMenuItemClick(child)">{{ child.label }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Search Bar -->
    <div *ngIf="showSearch" class="header-search">
      <div class="search-input-group">
        <span class="search-icon">🔍</span>
        <input 
          type="text"
          [(ngModel)]="searchValue"
          (keyup.enter)="onSearch()"
          placeholder="Search..."
          class="search-input">
        <button 
          *ngIf="searchValue"
          (click)="clearSearch()"
          class="clear-btn">
          ✕
        </button>
      </div>
    </div>

    <!-- Actions Section -->
    <div class="header-actions">
      <!-- Theme Toggle -->
      <button 
        (click)="onThemeToggle()"
        class="icon-btn theme-toggle"
        [title]="'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme'">
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </button>

      <!-- Notifications -->
      <button class="icon-btn notification-btn" title="Notifications">
        🔔
        <span class="notification-badge">3</span>
      </button>

      <!-- User Menu -->
      <div *ngIf="userInfo" class="user-menu-container">
        <button 
          (click)="toggleUserMenu()"
          class="user-menu-btn">
          <div class="user-avatar" *ngIf="!userInfo.avatar">
            {{ getUserInitials() }}
          </div>
          <img 
            *ngIf="userInfo.avatar"
            [src]="userInfo.avatar"
            [alt]="userInfo.name"
            class="user-avatar-img">
          <span class="user-name">{{ userInfo.name }}</span>
          <span class="dropdown-arrow">▼</span>
        </button>

        <!-- User Dropdown Menu -->
        <div *ngIf="isUserMenuOpen" class="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-avatar large" *ngIf="!userInfo.avatar">
              {{ getUserInitials() }}
            </div>
            <img 
              *ngIf="userInfo.avatar"
              [src]="userInfo.avatar"
              [alt]="userInfo.name"
              class="user-avatar-img large">
            <div class="user-info">
              <div class="user-info-name">{{ userInfo.name }}</div>
              <div class="user-info-email">{{ userInfo.email }}</div>
              <div *ngIf="userInfo.role" class="user-info-role">{{ userInfo.role }}</div>
            </div>
          </div>
          
          <div class="user-dropdown-divider"></div>
          
          <ul class="user-dropdown-menu">
            <li (click)="onUserMenuAction('profile')">
              <span class="menu-icon">👤</span> Profile
            </li>
            <li (click)="onUserMenuAction('settings')">
              <span class="menu-icon">⚙️</span> Settings
            </li>
            <li (click)="onUserMenuAction('billing')">
              <span class="menu-icon">💳</span> Billing
            </li>
            <li class="divider"></li>
            <li (click)="onUserMenuAction('help')">
              <span class="menu-icon">❓</span> Help & Support
            </li>
            <li (click)="onUserMenuAction('logout')" class="logout">
              <span class="menu-icon">🚪</span> Logout
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        (click)="toggleMenu()"
        class="mobile-menu-toggle">
        <span class="hamburger-icon">☰</span>
      </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <nav *ngIf="isMenuOpen" class="mobile-nav">
    <ul class="mobile-nav-list">
      <li 
        *ngFor="let item of menuItems"
        class="mobile-nav-item"
        [class.active]="activeMenuItem === item.label">
        <a 
          (click)="onMenuItemClick(item)"
          class="mobile-nav-link">
          <span *ngIf="item.icon" class="nav-icon">{{ item.icon }}</span>
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</header>
```

**File: `header/header.component.css`**

```css
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.app-header.dark-theme {
  background-color: #1e293b;
  color: #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo Section */
.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.header-logo:hover {
  opacity: 0.8;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
}

.dark-theme .logo-text {
  color: #a78bfa;
}

/* Desktop Navigation */
.desktop-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dark-theme .nav-link {
  color: #cbd5e1;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #667eea;
}

.dark-theme .nav-link:hover {
  background-color: #334155;
  color: #a78bfa;
}

.nav-item.active .nav-link {
  background-color: #ede9fe;
  color: #667eea;
  font-weight: 600;
}

.dark-theme .nav-item.active .nav-link {
  background-color: #4c1d95;
  color: #a78bfa;
}

.nav-icon {
  font-size: 18px;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 5px 0 0 0;
  padding: 8px 0;
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dark-theme .dropdown-menu {
  background-color: #334155;
}

.nav-item:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item a {
  display: block;
  padding: 10px 20px;
  color: #4b5563;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-theme .dropdown-item a {
  color: #cbd5e1;
}

.dropdown-item a:hover {
  background-color: #f3f4f6;
  color: #667eea;
}

.dark-theme .dropdown-item a:hover {
  background-color: #475569;
}

/* Search Bar */
.header-search {
  margin: 0 20px;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: #9ca3af;
}

.search-input {
  padding: 10px 40px 10px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  width: 280px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.dark-theme .search-input {
  background-color: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  width: 320px;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  color: #4b5563;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
}

.dark-theme .icon-btn {
  background-color: #334155;
}

.icon-btn:hover {
  background-color: #e5e7eb;
  transform: translateY(-2px);
}

.dark-theme .icon-btn:hover {
  background-color: #475569;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

/* User Menu */
.user-menu-container {
  position: relative;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-theme .user-menu-btn {
  background-color: #334155;
}

.user-menu-btn:hover {
  background-color: #e5e7eb;
}

.dark-theme .user-menu-btn:hover {
  background-color: #475569;
}

.user-avatar,
.user-avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-avatar.large,
.user-avatar-img.large {
  width: 60px;
  height: 60px;
  font-size: 20px;
}

.user-avatar-img {
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
}

.dark-theme .user-name {
  color: #f1f5f9;
}

.dropdown-arrow {
  font-size: 10px;
  color: #6b7280;
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.dark-theme .user-dropdown {
  background-color: #1e293b;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-dropdown-header {
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-info-name {
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 4px;
}

.dark-theme .user-info-name {
  color: #f1f5f9;
}

.user-info-email {
  font-size: 13px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark-theme .user-info-email {
  color: #94a3b8;
}

.user-info-role {
  font-size: 12px;
  color: #667eea;
  margin-top: 4px;
  font-weight: 500;
}

.user-dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0 10px;
}

.dark-theme .user-dropdown-divider {
  background-color: #334155;
}

.user-dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 8px;
}

.user-dropdown-menu li {
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s ease;
}

.dark-theme .user-dropdown-menu li {
  color: #cbd5e1;
}

.user-dropdown-menu li:hover {
  background-color: #f3f4f6;
}

.dark-theme .user-dropdown-menu li:hover {
  background-color: #334155;
}

.user-dropdown-menu li.logout {
  color: #ef4444;
}

.user-dropdown-menu li.logout:hover {
  background-color: #fee2e2;
}

.dark-theme .user-dropdown-menu li.logout:hover {
  background-color: #7f1d1d;
}

.user-dropdown-menu li.divider {
  height: 1px;
  background-color: #e5e7eb;
  padding: 0;
  margin: 4px 0;
  cursor: default;
}

.dark-theme .user-dropdown-menu li.divider {
  background-color: #334155;
}

.user-dropdown-menu li.divider:hover {
  background-color: #e5e7eb;
}

.menu-icon {
  font-size: 18px;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #4b5563;
}

.dark-theme .mobile-menu-toggle {
  color: #cbd5e1;
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  border-top: 1px solid #e5e7eb;
  padding: 10px 20px;
  background-color: white;
}

.dark-theme .mobile-nav {
  background-color: #1e293b;
  border-top-color: #334155;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-item {
  margin: 5px 0;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-theme .mobile-nav-link {
  color: #cbd5e1;
}

.mobile-nav-link:hover,
.mobile-nav-item.active .mobile-nav-link {
  background-color: #f3f4f6;
  color: #667eea;
}

.dark-theme .mobile-nav-link:hover,
.dark-theme .mobile-nav-item.active .mobile-nav-link {
  background-color: #334155;
  color: #a78bfa;
}

/* Responsive Design */
@media (max-width: 968px) {
  .desktop-nav {
    display: none;
  }
  
  .header-search {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .user-name {
    display: none;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0 15px;
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  .user-menu-btn {
    padding: 6px 8px;
  }
  
  .user-dropdown {
    right: -10px;
    min-width: 260px;
  }
}
```

**File: `app.component.ts` (Using the Header)**

```typescript
import { Component } from '@angular/core';
import { MenuItem, UserInfo } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  currentTheme: 'light' | 'dark' = 'light';
  
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

  onUser
    