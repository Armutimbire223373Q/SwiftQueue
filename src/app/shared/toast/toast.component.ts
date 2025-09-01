import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast"
        [class]="'toast-' + toast.type"
        [class.show]="toast.show"
        [class.hide]="!toast.show"
      >
        <div class="toast-icon">
          <svg *ngIf="toast.type === 'success'" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
          </svg>
          <svg *ngIf="toast.type === 'error'" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
          <svg *ngIf="toast.type === 'warning'" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
          </svg>
          <svg *ngIf="toast.type === 'info'" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
          </svg>
        </div>
        
        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        
        <button class="toast-close" (click)="removeToast(toast.id)">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      background: white;
      border-left: 4px solid;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 400px;
    }

    .toast.show {
      transform: translateX(0);
      opacity: 1;
    }

    .toast.hide {
      transform: translateX(100%);
      opacity: 0;
    }

    .toast-success {
      border-left-color: #10b981;
      color: #065f46;
    }

    .toast-error {
      border-left-color: #ef4444;
      color: #991b1b;
    }

    .toast-warning {
      border-left-color: #f59e0b;
      color: #92400e;
    }

    .toast-info {
      border-left-color: #3b82f6;
      color: #1e40af;
    }

    .toast-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-message {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      font-weight: 500;
    }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      opacity: 0.7;
      transition: opacity 0.15s ease;
      flex-shrink: 0;
    }

    .toast-close:hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .toast-container {
        right: 16px;
        left: 16px;
        max-width: none;
      }
      
      .toast {
        max-width: none;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeToast(id: string) {
    this.toastService.remove(id);
  }
} 