# User CRUD Application CodeBase

## angular.json
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": "c89c4b0e-f1e2-4e3a-b5e0-8bf452352f26"
  },
  "newProjectRoot": "projects",
  "projects": {
    "user-crud": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "polyfills": [
              "zone.js"
            ],
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "user-crud:build:production"
            },
            "development": {
              "buildTarget": "user-crud:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
```

## package.json
```json
{
  "name": "user-crud",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "packageManager": "npm@11.6.2",
  "dependencies": {
    "@angular/animations": "^21.0.6",
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/platform-browser": "^21.0.0",
    "@angular/router": "^21.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "^0.16.0"
  },
  "devDependencies": {
    "@angular/build": "^21.0.4",
    "@angular/cli": "^21.0.4",
    "@angular/compiler-cli": "^21.0.0",
    "jsdom": "^27.1.0",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}

```

## src\app\app.config.ts
```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations()
  ]
};

```

## src\app\app.css
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 1rem 2rem;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links a {
    color: #ddd;
    text-decoration: none;
    margin-left: 1rem;
    padding: 0.5rem;
}

.nav-links a.active {
    color: white;
    border-bottom: 2px solid white;
}

.btn-logout {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.container {
    padding: 2rem;
}
```

## src\app\app.html
```html
<nav class="navbar" *ngIf="authService.isAuthenticated()">
  <div class="nav-brand">User CRUD</div>
  <div class="nav-links">
    <a routerLink="/signal-crud" routerLinkActive="active">Signal CRUD</a>
    <a routerLink="/legacy-crud" routerLinkActive="active">Legacy CRUD</a>
    <button (click)="logout()" class="btn-logout">Logout</button>
  </div>
</nav>

<div class="container">
  <router-outlet></router-outlet>
  <app-toast></app-toast>
</div>
```

## src\app\app.routes.ts
```ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signal-crud', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'signal-crud',
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/signal-crud/user-list/user-list.component').then(m => m.UserListSignalComponent) },
            { path: 'add', loadComponent: () => import('./features/signal-crud/user-form/user-form.component').then(m => m.UserFormSignalComponent) },
            { path: 'edit/:id', loadComponent: () => import('./features/signal-crud/user-form/user-form.component').then(m => m.UserFormSignalComponent) }
        ]
    },
    {
        path: 'legacy-crud',
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/legacy-crud/user-list/user-list.component').then(m => m.UserListLegacyComponent) },
            { path: 'add', loadComponent: () => import('./features/legacy-crud/user-form/user-form.component').then(m => m.UserFormLegacyComponent) },
            { path: 'edit/:id', loadComponent: () => import('./features/legacy-crud/user-form/user-form.component').then(m => m.UserFormLegacyComponent) }
        ]
    }
];

```

## src\app\app.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { AuthService } from './core/auth/auth.service';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock AuthService
    const authServiceMock = {
      logout: () => { },
      isAuthenticated: () => false // signal
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

```

## src\app\app.ts
```ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = signal('user-crud');
  authService = inject(AuthService); // public by default for template

  logout() {
    this.authService.logout();
  }
}

```

## src\app\core\auth\auth.service.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { provideRouter } from '@angular/router';

describe('AuthService', () => {
    let service: AuthService;
    let toastServiceSpy: any;

    beforeEach(() => {
        const spy = { show: (() => { }) };
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideRouter([]),
                { provide: ToastService, useValue: spy }
            ]
        });
        service = TestBed.inject(AuthService);
        toastServiceSpy = TestBed.inject(ToastService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login admin successfully', () => {
        service.login('admin');
        expect(service.currentUser()?.role).toBe('admin');
    });

    it('should register successfully', () => {
        const newUser = { name: 'Test', username: 'testuser', email: 'test@test.com' };
        service.register(newUser);
        expect(service.currentUser()?.username).toBe('testuser');
        expect(localStorage.getItem('registered_users')).toContain('testuser');
    });

    it('should logout', () => {
        service.login('admin');
        service.logout();
        expect(service.currentUser()).toBeNull();
    });
});

```

## src\app\core\auth\auth.service.ts
```ts
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);
    private toastService = inject(ToastService);

    // Signal to hold the current user
    currentUser = signal<User | null>(this.getUserFromStorage());

    // Computed signal to check if user is authenticated
    isAuthenticated = computed(() => !!this.currentUser());

    constructor() {
        // Effect to persist user to local storage whenever it changes
        effect(() => {
            const user = this.currentUser();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', 'mock-jwt-token-' + user.id);
            } else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
            }
        });
    }

    login(username: string): boolean {
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const foundUser = storedUsers.find((u: User) => u.username === username);

        let userToLogin: User;

        if (foundUser) {
            userToLogin = foundUser;
        } else if (username === 'admin') {
            // Default Admin
            userToLogin = {
                id: 1,
                name: 'Admin User',
                username: 'admin',
                email: 'admin@example.com',
                role: 'admin'
            };
        } else {
            // Fallback for demo if no registration needed
            userToLogin = {
                id: Math.floor(Math.random() * 1000),
                name: 'Test ' + username,
                username: username,
                email: `${username}@test.com`,
                role: 'user'
            };
        }

        this.currentUser.set(userToLogin);
        this.toastService.show('Login Successful', 'success');
        this.router.navigate(['/signal-crud']);
        return true;
    }

    register(user: Partial<User>): boolean {
        const newUser: User = {
            id: Math.floor(Math.random() * 100000),
            name: user.name || 'User',
            username: user.username!,
            email: user.email!,
            role: 'user', // Default role
            ...user
        } as User;

        // Persist to "DB"
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        storedUsers.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(storedUsers));

        this.currentUser.set(newUser);
        this.toastService.show('Registration Successful', 'success');
        this.router.navigate(['/signal-crud']);
        return true;
    }

    socialLogin(provider: string) {
        // Mock social login
        const mockUser: User = {
            id: Math.floor(Math.random() * 1000),
            name: `Social User (${provider})`,
            username: `social_${provider}`,
            email: `user@${provider}.com`,
            role: 'user'
        };
        this.currentUser.set(mockUser);
        this.toastService.show(`Login with ${provider} Successful`, 'success');
        this.router.navigate(['/signal-crud']);
    }

    logout() {
        this.currentUser.set(null);
        this.toastService.show('Logged out', 'info');
        this.router.navigate(['/login']);
    }

    private getUserFromStorage(): User | null {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

```

## src\app\core\guards\auth.guard.ts
```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    // Redirect to login page
    return router.createUrlTree(['/login']);
};

```

## src\app\core\interceptors\error.interceptor.ts
```ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Auto logout if 401 response returned from api
                authService.logout();
            }

            const err = error.error?.message || error.statusText;
            console.error('Global Error Interceptor:', err);
            return throwError(() => error);
        })
    );
};

```

## src\app\core\interceptors\jwt.interceptor.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { jwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../auth/auth.service';
import { signal } from '@angular/core';

describe('jwtInterceptor', () => {
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    let authServiceMock: any;

    beforeEach(() => {
        authServiceMock = {
            currentUser: signal(null),
            isAuthenticated: signal(false),
            getToken: () => localStorage.getItem('token')
        };

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([jwtInterceptor])),
                provideHttpClientTesting(),
                { provide: AuthService, useValue: authServiceMock }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);

        // Mock token persistence behavior if any
        localStorage.clear();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should add Authorization header if token exists', () => {
        localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
        // Mock token logic - usually AuthService handles this or interceptor reads
        // Assuming interceptor reads from AuthService or LocalStorage.
        // If the implementation reads from AuthService.currentUser(), we need to set it.

        // Let's verify implementation of jwt.interceptor.ts
        // "jwtInterceptor correctly injects AuthService and adds an Authorization header"
        // So we should set the signal.
        authServiceMock.currentUser.set({ id: 1, name: 'Test' });
        authServiceMock.isAuthenticated.set(true); // if using computed

        // But we actually mock the TOKEN in localStorage if that's what interceptor uses
        // OR if interceptor gets token from AuthService.getToken() mocking that would be best.
        // Assuming simple Bearer token logic from prev context.

        // Actually earlier summary said: "Uses Angular Signals (currentUser, isAuthenticated) and an effect to persist user data and token in localStorage."
        // And "jwtInterceptor ... attach a mock JWT token".
        // Let's assume it reads from localStorage 'token' key if not using authService.getToken().
        localStorage.setItem('token', 'mock-token');

        httpClient.get('/test').subscribe();

        const req = httpTestingController.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeTruthy();
        expect(req.request.headers.get('Authorization')).toContain('Bearer');
        req.flush({});
    });

    it('should not add header if no token', () => {
        authServiceMock.currentUser.set(null);
        localStorage.removeItem('token');

        httpClient.get('/test').subscribe();

        const req = httpTestingController.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeFalsy();
        req.flush({});
    });
});

```

## src\app\core\interceptors\jwt.interceptor.ts
```ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};

```

## src\app\core\models\user.model.ts
```ts
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    role?: 'admin' | 'user'; // For authorization simulation
}

```

## src\app\features\auth\login\login.component.css
```css
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top left, #1e1b4b, var(--background-color));
    padding: 1rem;
}

.auth-card {
    width: 100%;
    max-width: 480px;
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-header {
    text-align: center;
    margin-bottom: 2rem;
}

.auth-header h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: var(--border-color);
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--border-color);
}

.divider span {
    padding: 0 1rem;
    color: var(--text-muted);
    font-size: 0.875rem;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-size: 0.875rem;
    font-weight: 500;
}

.error-msg {
    color: var(--error-color);
    font-size: 0.875rem;
    text-align: center;
}

.full-width {
    width: 100%;
}

.auth-footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.875rem;
}
```

## src\app\features\auth\login\login.component.html
```html
<div class="auth-container">
    <div class="card auth-card">
        <div class="auth-header">
            <h2>Welcome Back</h2>
            <p class="text-muted">Sign in to continue to UserCrud</p>
        </div>

        <div class="grid-social">
            <button class="btn btn-outline" (click)="onSocialLogin('Google')">
                Google
            </button>
            <button class="btn btn-outline" (click)="onSocialLogin('Facebook')">
                Facebook
            </button>
            <button class="btn btn-outline" (click)="onSocialLogin('LinkedIn')">
                LinkedIn
            </button>
        </div>

        <div class="divider">
            <span>Or continue with</span>
        </div>

        <form (ngSubmit)="onLogin()" class="auth-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" [(ngModel)]="username" name="username" placeholder="admin" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" [(ngModel)]="password" name="password" placeholder="••••••••"
                    required>
            </div>

            <div *ngIf="errorMsg" class="error-msg">
                {{ errorMsg }}
            </div>

            <button type="submit" class="btn btn-primary full-width">
                Sign In
            </button>
        </form>

        <div class="auth-footer">
            <p class="text-muted">
                Don't have an account? <a routerLink="/register">Sign up</a>
            </p>
        </div>
    </div>
</div>
```

## src\app\features\auth\login\login.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/auth/auth.service';
import { provideRouter } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        // Manual Mock
        const authSpy = {
            login: () => { },
            socialLogin: () => { }
        };
        const toastSpy = {
            show: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                provideRouter([]),
                { provide: AuthService, useValue: authSpy },
                { provide: ToastService, useValue: toastSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

```

## src\app\features\auth\login\login.component.ts
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);

    username = '';
    password = '';

    errorMsg = '';

    onLogin() {
        if (this.username && this.password) {
            this.authService.login(this.username);
        } else {
            this.errorMsg = 'Please enter username and password';
        }
    }

    onSocialLogin(provider: string) {
        this.authService.socialLogin(provider);
    }
}

```

## src\app\features\auth\register\register.component.css
```css
.auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

form div {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
}
```

## src\app\features\auth\register\register.component.html
```html
<div class="auth-container">
    <h2>Register</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div>
            <label for="name">Full Name</label>
            <input id="name" type="text" formControlName="name">
            <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="error">Name is
                required</div>
        </div>
        <div>
            <label for="username">Username</label>
            <input id="username" type="text" formControlName="username">
            <div *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.errors as errors"
                class="error">
                <span *ngIf="errors['required']">Username is required</span>
                <span *ngIf="errors['minlength']">Must be > 6 chars</span>
                <span *ngIf="errors['pattern']">Alphanumeric only (no spaces/symbols)</span>
            </div>
        </div>
        <div>
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email">
            <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors as errors"
                class="error">
                <span *ngIf="errors['required']">Email is required</span>
                <span *ngIf="errors['pattern']">Invalid format (alphanumeric only, @ and .)</span>
            </div>
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password">
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="error">
                Password is required</div>
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>

    <p>Already have an account? <a routerLink="/login">Login</a></p>
</div>
```

## src\app\features\auth\register\register.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/auth/auth.service';
import { provideRouter } from '@angular/router';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        const authSpy = {
            register: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [RegisterComponent],
            providers: [
                provideRouter([]),
                { provide: AuthService, useValue: authSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be invalid initially', () => {
        expect(component.registerForm.valid).toBeFalsy();
    });
});

```

## src\app\features\auth\register\register.component.ts
```ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    registerForm = this.fb.group({
        name: ['', Validators.required],
        username: ['', [
            Validators.required,
            Validators.minLength(7),
            Validators.pattern('^[a-zA-Z0-9]+$')
        ]],
        email: ['', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$')
        ]],
        password: ['', Validators.required]
    });

    onSubmit() {
        if (this.registerForm.valid) {
            const formValue = this.registerForm.value;
            // Filter out nulls/undefineds roughly or just cast if confident
            const user = {
                name: formValue.name || '',
                username: formValue.username || '',
                email: formValue.email || '',
                password: formValue.password || ''
            };
            this.authService.register(user);
        }
    }
}

```

## src\app\features\dashboard.component.ts
```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <div class="card">
      <h3>Dashboard</h3>
      <p>Welcome to the User Management System.</p>
      <p>Select a CRUD implementation from the sidebar to get started.</p>
    </div>
  `
})
export class DashboardComponent { }

```

## src\app\features\legacy-crud\user-form\user-form.component.css
```css
.form-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.btn-primary {
    background-color: #28a745;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

button:disabled {
    background-color: #ccc;
}

.error {
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
}
```

## src\app\features\legacy-crud\user-form\user-form.component.html
```html
<div class="form-container">
    <h2>{{ isEditMode ? 'Edit' : 'Add' }} User (Legacy - Reactive Forms)</h2>

    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" formControlName="name">
            <div class="error" *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">Name is required
            </div>
        </div>

        <div>
            <label for="username">Username</label>
            <input type="text" id="username" formControlName="username">
            <div class="error" *ngIf="userForm.get('username')?.touched && userForm.get('username')?.invalid">
                <span *ngIf="userForm.get('username')?.hasError('required')">Username is required</span>
                <span *ngIf="userForm.get('username')?.hasError('minlength')">Must be > 6 chars</span>
                <span *ngIf="userForm.get('username')?.hasError('pattern')">Alphanumeric only</span>
            </div>
        </div>

        <div>
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email">
            <div class="error" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.invalid">
                <span *ngIf="userForm.get('email')?.hasError('required')">Email is required</span>
                <span *ngIf="userForm.get('email')?.hasError('pattern')">Invalid format (@ and . only)</span>
            </div>
        </div>

        <div>
            <label for="role">Role</label>
            <select id="role" formControlName="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>

        <div class="actions">
            <button type="submit" [disabled]="userForm.invalid" class="btn btn-primary">Save</button>
            <a routerLink="/legacy-crud" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>
```

## src\app\features\legacy-crud\user-form\user-form.component.ts
```ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserLegacyService } from '../user-legacy.service';

@Component({
    selector: 'app-user-form-legacy',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormLegacyComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserLegacyService);

    userForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        username: ['', [
            Validators.required,
            Validators.minLength(7),
            Validators.pattern('^[a-zA-Z0-9]+$')
        ]],
        email: ['', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$')
        ]],
        role: ['user']
    });

    isEditMode = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            const user = this.userService.getUserById(+id);
            if (user) {
                this.userForm.patchValue(user as any);
            }
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            const formValue = this.userForm.value as any;
            if (this.isEditMode) {
                this.userService.updateUser(formValue).subscribe(() => {
                    this.router.navigate(['/legacy-crud']);
                });
            } else {
                this.userService.addUser(formValue).subscribe(() => {
                    this.router.navigate(['/legacy-crud']);
                });
            }
        }
    }
}

```

## src\app\features\legacy-crud\user-legacy.service.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { UserLegacyService } from './user-legacy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserLegacyService', () => {
    let service: UserLegacyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserLegacyService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(UserLegacyService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add user to localStorage via Observable', () => {
        const user: any = { id: 0, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        service.addUser(user).subscribe(added => {
            expect(added.name).toBe('Test');
            const stored = JSON.parse(localStorage.getItem('users_legacy') || '[]');
            expect(stored.length).toBe(1);
        });
    });
});

```

## src\app\features\legacy-crud\user-legacy.service.ts
```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserLegacyService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor() {
        this.loadUsers(); // Call loadUsers in the constructor to initialize from localStorage
    }

    public loadUsers(): void {
        this.loadingSubject.next(true);
        // Simulate Async
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users_legacy') || '[]');
            this.usersSubject.next(users);
            this.loadingSubject.next(false);
        }, 500);
    }

    addUser(user: User): Observable<User> {
        const newUser = { ...user, id: Math.floor(Math.random() * 100000) };
        const currentUsers = this.usersSubject.value;
        const updatedUsers = [...currentUsers, newUser];

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(newUser);
    }

    updateUser(user: User): Observable<User> {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(u => u.id === user.id ? user : u);

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(user);
    }

    deleteUser(id: number): Observable<void> {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(u => u.id !== id);

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(void 0);
    }

    getUserById(id: number): User | undefined {
        return this.usersSubject.value.find(u => u.id === id);
    }
}

```

## src\app\features\legacy-crud\user-list\user-list.component.css
```css
/* Reusing styles from signal crud list roughly */
.list-container {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.btn {
    padding: 5px 10px;
    margin-right: 5px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    border: none;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-info {
    background-color: #17a2b8;
    color: white;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-sm {
    font-size: 0.8rem;
}
```

## src\app\features\legacy-crud\user-list\user-list.component.html
```html
<div class="list-container">
    <div class="header">
        <h2>User Management (Legacy Observables)</h2>
        <a routerLink="/legacy-crud/add" class="btn btn-primary">Add User</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let user of users$ | async" appHighlight>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role | role }}</td>
                <td>
                    <a [routerLink]="['/legacy-crud/edit', user.id]" class="btn btn-sm btn-info">Edit</a>
                    <button (click)="deleteUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## src\app\features\legacy-crud\user-list\user-list.component.ts
```ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // AsyncPipe
import { RouterLink } from '@angular/router';
import { UserLegacyService } from '../user-legacy.service';
import { RolePipe } from '../../../shared/pipes/role.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-user-list-legacy',
  standalone: true,
  imports: [CommonModule, RouterLink, RolePipe, HighlightDirective],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListLegacyComponent implements OnInit {
  public userService = inject(UserLegacyService);
  public users$ = this.userService.users$;

  ngOnInit() {
    this.userService.loadUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe();
    }
  }
}

```

## src\app\features\signal-crud\user-form\user-form.component.css
```css
.form-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.btn-primary {
    background-color: #28a745;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

button:disabled {
    background-color: #ccc;
}

.error {
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
}
```

## src\app\features\signal-crud\user-form\user-form.component.html
```html
<div class="form-container">
    <h2>{{ isEditMode ? 'Edit' : 'Add' }} User (Signals - Template Driven)</h2>

    <form (ngSubmit)="onSubmit()" #userForm="ngForm">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" required [(ngModel)]="user.name" name="name" #name="ngModel">
            @if (name.invalid && (name.dirty || name.touched)) {
            <div class="error">Name is required.</div>
            }
        </div>

        <div>
            <label for="username">Username</label>
            <input type="text" id="username" required minlength="7" pattern="^[a-zA-Z0-9]+$" [(ngModel)]="user.username"
                name="username" #username="ngModel">
            @if (username.invalid && (username.dirty || username.touched)) {
            <div class="error">
                @if(username.errors?.['required']) { Username is required. }
                @if(username.errors?.['minlength']) { Must be > 6 chars. }
                @if(username.errors?.['pattern']) { Alphanumeric only. }
            </div>
            }
        </div>

        <div>
            <label for="email">Email</label>
            <input type="email" id="email" required pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$"
                [(ngModel)]="user.email" name="email" #email="ngModel">
            @if (email.invalid && (email.dirty || email.touched)) {
            <div class="error">
                @if(email.errors?.['required']) { Email is required. }
                @if(email.errors?.['pattern']) { Invalid format (alphanumeric only, @ and .). }
            </div>
            }
        </div>

        <div>
            <label for="role">Role</label>
            <select id="role" [(ngModel)]="user.role" name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>

        <div class="actions">
            <button type="submit" [disabled]="userForm.invalid" class="btn btn-primary">Save</button>
            <a routerLink="/signal-crud" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>
```

## src\app\features\signal-crud\user-form\user-form.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormSignalComponent } from './user-form.component';
import { UserSignalService } from '../user-signal.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('UserFormSignalComponent', () => {
    let component: UserFormSignalComponent;
    let fixture: ComponentFixture<UserFormSignalComponent>;

    beforeEach(async () => {
        const userServiceMock = {
            users: signal([]),
            addUser: () => { },
            updateUser: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [UserFormSignalComponent, FormsModule],
            providers: [
                provideRouter([]),
                { provide: UserSignalService, useValue: userServiceMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserFormSignalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

```

## src\app\features\signal-crud\user-form\user-form.component.ts
```ts
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserSignalService } from '../user-signal.service';
import { User } from '../../../core/models/user.model';

@Component({
    selector: 'app-user-form-signal',
    standalone: true,
    imports: [FormsModule, RouterLink], // Template Driven
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormSignalComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    public userService = inject(UserSignalService); // Make public for template binding if needed, or use getter

    user: User = {
        id: 0,
        name: '',
        username: '',
        email: '',
        role: 'user'
    };
    isEditMode = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            const existingUser = this.userService.users().find(u => u.id === +id);
            if (existingUser) {
                this.user = { ...existingUser };
            }
        }
    }

    onSubmit() {
        if (this.isEditMode) {
            this.userService.updateUser(this.user);
        } else {
            this.userService.addUser(this.user);
        }
        this.router.navigate(['/signal-crud']);
    }
}

```

## src\app\features\signal-crud\user-list\user-list.component.css
```css
.list-container {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.user-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
}

.user-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
}

.user-card p {
    margin: 5px 0;
    font-size: 0.9rem;
    color: #666;
}

.card-actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.btn {
    padding: 5px 10px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    font-size: 0.9rem;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-info {
    background-color: #17a2b8;
    color: white;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}
```

## src\app\features\signal-crud\user-list\user-list.component.html
```html
<div class="list-container">
    <div class="header">
        <h2>User Management (Signals)</h2>
        <a routerLink="/signal-crud/add" class="btn btn-primary">Add User</a>
    </div>

    <div class="card-grid">
        @for (user of userService.users(); track user.id) {
        <div class="user-card" appHighlight>
            <h3>{{ user.name }}</h3>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Role:</strong> {{ user.role | role }}</p>

            <div class="card-actions">
                <a [routerLink]="['/signal-crud/edit', user.id]" class="btn btn-sm btn-info">Edit</a>
                <button (click)="deleteUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
        </div>
        } @empty {
        <p>No users found. Add one to get started!</p>
        }
    </div>

    <p>Total Users: {{ userService.totalUsers() }}</p>
</div>
```

## src\app\features\signal-crud\user-list\user-list.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListSignalComponent } from './user-list.component';
import { UserSignalService } from '../user-signal.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('UserListSignalComponent', () => {
    let component: UserListSignalComponent;
    let fixture: ComponentFixture<UserListSignalComponent>;

    beforeEach(async () => {
        const userServiceMock = {
            users: signal([]),
            totalUsers: signal(0),
            loadUsers: () => { },
            deleteUser: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [UserListSignalComponent],
            providers: [
                provideRouter([]),
                { provide: UserSignalService, useValue: userServiceMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserListSignalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

```

## src\app\features\signal-crud\user-list\user-list.component.ts
```ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSignalService } from '../user-signal.service';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { RolePipe } from '../../../shared/pipes/role.pipe';

@Component({
  selector: 'app-user-list-signal',
  standalone: true,
  imports: [RouterLink, HighlightDirective, RolePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListSignalComponent implements OnInit {
  public userService = inject(UserSignalService);

  ngOnInit() {
    this.userService.loadUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id);
    }
  }
}

```

## src\app\features\signal-crud\user-signal.service.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { UserSignalService } from './user-signal.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserSignalService', () => {
    let service: UserSignalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserSignalService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(UserSignalService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add user to localStorage', () => {
        const user: any = { id: 0, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        service.addUser(user);
        const stored = JSON.parse(localStorage.getItem('users_signal') || '[]');
        expect(stored.length).toBe(1);
        expect(service.users().length).toBe(1);
    });

    it('should delete user', () => {
        const user: any = { id: 1, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        localStorage.setItem('users_signal', JSON.stringify([user]));
        service.loadUsers();

        service.deleteUser(1);
        expect(service.users().length).toBe(0);
    });
});

```

## src\app\features\signal-crud\user-signal.service.ts
```ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root' // or provided in the feature module if we had one
})
export class UserSignalService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Signals
    private usersSignal = signal<User[]>([]);
    readonly users = this.usersSignal.asReadonly();

    readonly totalUsers = computed(() => this.users().length);

    loadUsers() {
        // Load from localStorage instead of http mock
        const users = JSON.parse(localStorage.getItem('users_signal') || '[]');
        this.usersSignal.set(users);
    }

    addUser(user: User) {
        const newUser = { ...user, id: Math.floor(Math.random() * 100000) };
        this.usersSignal.update(users => {
            const updated = [...users, newUser];
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }

    updateUser(user: User) {
        this.usersSignal.update(users => {
            const updated = users.map(u => u.id === user.id ? user : u);
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }

    deleteUser(id: number) {
        this.usersSignal.update(users => {
            const updated = users.filter(u => u.id !== id);
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }
}

```

## src\app\shared\components\layout\main-layout.component.ts
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    template: `
    <div class="layout-container">
      <aside class="sidebar">
        <div class="logo">
          <h1>UserCrud</h1>
        </div>
        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span>Dashboard</span>
          </a>
          <a routerLink="/users/signal" routerLinkActive="active" class="nav-item">
            <span>Signal CRUD</span>
          </a>
          <a routerLink="/users/reactive" routerLinkActive="active" class="nav-item">
            <span>Reactive CRUD</span>
          </a>
        </nav>
        <div class="user-info">
          <div *ngIf="authService.currentUser() as user">
            <p class="user-name">{{ user.name }}</p>
            <p class="user-role">{{ user.role }}</p>
          </div>
          <button (click)="authService.logout()" class="btn btn-outline btn-sm">
            Logout
          </button>
        </div>
      </aside>

      <main class="main-content">
        <header class="top-bar">
          <h2 class="page-title">Dashboard</h2> <!-- Dynamic title could be added here -->
        </header>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
    styles: [`
    .layout-container {
      display: flex;
      height: 100vh;
      background-color: var(--background-color);
    }

    .sidebar {
      width: 260px;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }

    .logo h1 {
      margin: 0 0 2rem 0;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.5rem;
    }

    .nav-links {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      color: var(--text-muted);
      transition: all 0.2s;
    }

    .nav-item:hover, .nav-item.active {
      background-color: rgba(99, 102, 241, 0.1);
      color: var(--primary-color);
    }

    .user-info {
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .user-name {
      font-weight: 500;
      margin: 0;
    }

    .user-role {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 1rem 0;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-bar {
      height: 64px;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      background-color: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-color);
      z-index: 10;
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .content-wrapper {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }
  `]
})
export class MainLayoutComponent {
    authService = inject(AuthService);
}

```

## src\app\shared\components\toast\toast.component.ts
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [ngClass]="toast.type" (click)="remove(toast.id)">
          {{ toast.message }}
        </div>
      }
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      padding: 15px 20px;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    }
    .success { background-color: #28a745; }
    .error { background-color: #dc3545; }
    .info { background-color: #17a2b8; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
    toastService = inject(ToastService);

    remove(id: number) {
        this.toastService.remove(id);
    }
}

```

## src\app\shared\components\toast-container.component.ts
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts()" 
           class="toast" 
           [ngClass]="toast.type"
           (click)="toastService.remove(toast.id)">
        {{ toast.message }}
      </div>
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .toast {
      padding: 1rem 1.5rem;
      border-radius: var(--radius);
      color: white;
      box-shadow: var(--shadow-lg);
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      min-width: 250px;
    }
    
    .toast.success { background-color: var(--success-color); }
    .toast.error { background-color: var(--error-color); }
    .toast.info { background-color: var(--primary-color); }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastContainerComponent {
    toastService = inject(ToastService);
}

```

## src\app\shared\directives\highlight.directive.ts
```ts
import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    private el = inject(ElementRef);

    @Input() appHighlight = '';

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.appHighlight || 'lightgreen');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

```

## src\app\shared\pipes\role.pipe.ts
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {

    transform(value: string | undefined): string {
        if (!value) return 'Unknown';
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

}

```

## src\app\shared\pipes\truncate.pipe.ts
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number = 20): string {
        if (!value) return '';
        return value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}

```

## src\app\shared\services\toast.service.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add toast', () => {
        service.show('Test Message', 'success');
        expect(service.toasts().length).toBe(1);
        expect(service.toasts()[0].message).toBe('Test Message');
        expect(service.toasts()[0].type).toBe('success');
    });

    it('should remove toast', () => {
        service.show('Test Message');
        const id = service.toasts()[0].id;
        service.remove(id);
        expect(service.toasts().length).toBe(0);
    });
});

```

## src\app\shared\services\toast.service.ts
```ts
import { Injectable, signal } from '@angular/core';

export interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts = signal<Toast[]>([]);

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        const id = Date.now();
        const toast: Toast = { message, type, id };
        this.toasts.update(toasts => [...toasts, toast]);

        setTimeout(() => {
            this.remove(id);
        }, 3000); // Auto remove after 3 seconds
    }

    remove(id: number) {
        this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }
}

```

## src\index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>UserCrud</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

## src\main.ts
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

## src\styles.css
```css
:root {
    --primary-color: #6366f1;
    /* Indigo 500 */
    --primary-hover: #4f46e5;
    /* Indigo 600 */
    --secondary-color: #ec4899;
    /* Pink 500 */
    --background-color: #0f172a;
    /* Slate 900 */
    --surface-color: #1e293b;
    /* Slate 800 */
    --text-color: #f8fafc;
    /* Slate 50 */
    --text-muted: #94a3b8;
    /* Slate 400 */
    --border-color: #334155;
    /* Slate 700 */
    --error-color: #ef4444;
    /* Red 500 */
    --success-color: #22c55e;
    /* Green 500 */

    --font-family: 'Inter', system-ui, -apple-system, sans-serif;
    --radius: 0.75rem;
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

body {
    margin: 0;
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.5;
}

* {
    box-sizing: border-box;
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s;
}

a:hover {
    color: var(--primary-hover);
}

button {
    cursor: pointer;
}

input,
select,
textarea {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    font-size: 1rem;
    width: 100%;
    transition: border-color 0.2s, ring 0.2s;
    outline: none;
}

input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    font-weight: 500;
    border: none;
    transition: all 0.2s;
    gap: 0.5rem;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
}

.btn-outline {
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
}

.btn-outline:hover {
    background-color: var(--surface-color);
    border-color: var(--text-muted);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.card {
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
}

.grid-social {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}
```

