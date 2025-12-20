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
