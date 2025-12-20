Below is a **trainer-grade, end-to-end Angular course material** written fully in **Markdown**, structured for **self-learning, classroom delivery, and hands-on labs**.
It uses **modern Angular (v16+) concepts** including **Standalone Components, Signals, Functional Guards, RxJS Interop**, and **best practices**.

---

# 📘 Angular Routing, Guards & Forms

**(Modern Angular with Signals, Observables & Standalone APIs)**

---

## 📌 Target Audience

* Angular beginners to intermediate developers
* Corporate training / upskilling programs
* Developers migrating from Angular ≤14 to modern Angular

---

## 🧭 Course Objectives

By the end of this course, learners will be able to:

* Configure Angular routing using **standalone APIs**
* Implement **route guards** using functional and signal-based approaches
* Build **template-driven and reactive forms**
* Integrate **signals with forms**
* Handle validations, async data, and navigation securely
* Troubleshoot common routing and form issues

---

# 🧩 Module 1: Angular Routing – Fundamentals

---

## 1.1 What is Angular Routing?

**Routing** allows navigation between different views/components without reloading the page.

### Real-world analogy

> A website like a shopping mall:
>
> * Entrance → Home
> * Sections → Products, Cart, Profile
> * Security → Login before Checkout

---

## 1.2 Routing Architecture (Diagram)

```
Browser URL
    |
    v
Angular Router
    |
    v
Routes Configuration
    |
    v
Component Rendered in <router-outlet>
```

---

## 1.3 Standalone Routing Setup (Angular 16+)

### main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

---

### app.routes.ts

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
```

---

### app.component.html

```html
<nav>
  <a routerLink="/">Home</a> |
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

---

## 1.4 Router Directives

| Directive        | Purpose        |
| ---------------- | -------------- |
| routerLink       | Navigation     |
| routerLinkActive | Active styling |
| router-outlet    | View container |

---

## 🧪 Exercise 1

1. Create routes for `/login` and `/dashboard`
2. Add navigation menu
3. Highlight active route

---

# 🔐 Module 2: Route Guards (Modern Angular)

---

## 2.1 What is a Route Guard?

Guards **control access** to routes based on conditions.

### Types

* `CanActivate`
* `CanDeactivate`
* `Resolve`
* `CanLoad`

---

## 2.2 Functional Guard (Recommended)

### auth.service.ts

```ts
import { signal } from '@angular/core';

export class AuthService {
  isLoggedIn = signal(false);
}
```

---

### auth.guard.ts

```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
```

---

### Protected Route

```ts
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

---

## 2.3 Guard Flow Diagram

```
User clicks /dashboard
      |
      v
authGuard executes
      |
   logged in?
    /      \
  yes      no
   |        |
 show    redirect
```

---

## 🧪 Exercise 2

* Create a `roleGuard`
* Allow only `admin` role users
* Redirect others to `/unauthorized`

---

# 📝 Module 3: Template-Driven Forms

---

## 3.1 What is Template-Driven Form?

Form logic is defined **in HTML** using directives.

### Use when:

* Simple forms
* Minimal validation
* Less dynamic behavior

---

## 3.2 Example: Login Form

### login.component.ts

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  submit() {
    console.log(this.user);
  }
}
```

---

### login.component.html

```html
<form #f="ngForm" (ngSubmit)="submit()">
  <input name="email"
         [(ngModel)]="user.email"
         required
         email />

  <input name="password"
         [(ngModel)]="user.password"
         required
         minlength="6" />

  <button [disabled]="f.invalid">Login</button>
</form>
```

---

## 🧪 Exercise 3

* Add confirm password field
* Disable submit until passwords match

---

# 🧪 Module 4: Reactive Forms (Enterprise Standard)

---

## 4.1 What is Reactive Form?

* Form model defined in TypeScript
* Better validation & testability
* Suitable for complex forms

---

## 4.2 Reactive Form Setup

### register.component.ts

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log(this.form.value);
  }
}
```

---

### register.component.html

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="name" />
  <input formControlName="email" />
  <input formControlName="password" />
  <button [disabled]="form.invalid">Register</button>
</form>
```

---

## 4.3 Reactive Form Diagram

```
FormControl
    |
 FormGroup
    |
 Template Binding
```

---

## 🧪 Exercise 4

* Add custom validator for strong password
* Display validation messages

---

# ⚡ Module 5: Signals + Forms (Angular 16+)

---

## 5.1 Why Signals with Forms?

Signals provide:

* Fine-grained reactivity
* Better performance
* Clean state management

---

## 5.2 Signal + Reactive Form Example

```ts
import { signal, effect } from '@angular/core';

isFormValid = signal(false);

constructor() {
  effect(() => {
    this.isFormValid.set(this.form.valid);
  });
}
```

---

### Template

```html
<button [disabled]="!isFormValid()">Submit</button>
```

---

## 🔄 Module 6: Observables with Routing & Forms

---

### Route Params

```ts
this.route.params.subscribe(params => {
  console.log(params['id']);
});
```

---

### Async Validator (Email Exists)

```ts
emailExists(control: AbstractControl) {
  return this.http.get(`/api/users/${control.value}`)
    .pipe(map(res => res ? { exists: true } : null));
}
```

---

# 🛠️ Troubleshooting Guide

| Issue               | Solution                                 |
| ------------------- | ---------------------------------------- |
| Route not loading   | Check `<router-outlet>`                  |
| Form not updating   | Import FormsModule / ReactiveFormsModule |
| Guard not firing    | Ensure provided properly                 |
| Signal not updating | Use `effect()`                           |

---

# ✅ Best Practices

* Prefer **Reactive Forms** for enterprise apps
* Use **Functional Guards**
* Use **Signals for state**, RxJS for async
* Lazy load routes
* Centralize validations

---

# ❓ FAQ

**Q: Signals replace Observables?**
No. Signals handle state, Observables handle async streams.

**Q: Template vs Reactive Forms?**
Reactive forms are recommended for scalable apps.

**Q: Can guards use signals?**
Yes. Signals are ideal for auth state.

---

# 🧠 Quiz

1. Which directive renders routed components?
2. Difference between `CanActivate` and `CanLoad`?
3. When should you use template-driven forms?
4. How do signals improve performance?

---

# 📚 Assignment (Capstone)

Build a **Secure Registration App**:

* Routes: Login, Register, Dashboard
* Guarded dashboard
* Reactive form with validations
* Signals for auth state
* Async email validation

---

If you want:

* 📄 **Single downloadable Markdown / Word / PDF**
* 🖼️ **PNG architecture diagrams**
* 🧪 **Hands-on lab sheets**
* 🎓 **Trainer notes + slides**

say **“Generate trainer pack”**.
