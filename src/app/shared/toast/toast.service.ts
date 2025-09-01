import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toasts.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000) {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type,
      duration,
      show: true
    };

    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, toast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast.id);
      }, duration);
    }

    return toast.id;
  }

  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    return this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    return this.show(message, 'info', duration);
  }

  remove(id: string) {
    const currentToasts = this.toasts.value;
    const toastToRemove = currentToasts.find(t => t.id === id);
    
    if (toastToRemove) {
      toastToRemove.show = false;
      this.toasts.next([...currentToasts]);
      
      // Remove from array after animation
      setTimeout(() => {
        const updatedToasts = this.toasts.value.filter(t => t.id !== id);
        this.toasts.next(updatedToasts);
      }, 300);
    }
  }

  clear() {
    this.toasts.next([]);
  }
} 