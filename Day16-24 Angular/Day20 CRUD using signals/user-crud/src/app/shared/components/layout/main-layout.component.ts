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
