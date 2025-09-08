import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="nav-container">
        <div class="nav-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="logo-text">SwiftQueue</span>
        </div>
        
        <div class="nav-menu" [class.active]="isMenuOpen">
          <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/patient" class="nav-link" routerLinkActive="active">Patient</a>
          <a routerLink="/ambulance-booking" class="nav-link emergency-link" routerLinkActive="active">
            <span class="emergency-icon">🚑</span>
            Emergency
          </a>
          <a routerLink="/staff" class="nav-link" routerLinkActive="active">Staff</a>
          <a routerLink="/about" class="nav-link" routerLinkActive="active">About</a>
          <a routerLink="/contact" class="nav-link" routerLinkActive="active">Contact</a>
        </div>
        
        <div class="nav-actions">
          <a routerLink="/login" class="btn btn-outline">Login</a>
          <a routerLink="/register" class="btn btn-primary">Get Started</a>
          <button class="mobile-menu-btn" (click)="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--gray-200);
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #0066cc;
      font-weight: 700;
      font-size: 1.25rem;
    }

    .nav-logo svg {
      width: 32px;
      height: 32px;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.15s ease;
      position: relative;
    }

    .nav-link:hover,
    .nav-link.active {
      color: #0066cc;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #0066cc;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    .emergency-link {
      background: linear-gradient(135deg, #ff6b6b, #e94560);
      color: white !important;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      animation: emergency-pulse 2s ease-in-out infinite;
    }

    .emergency-link:hover {
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    }

    .emergency-link::after {
      display: none;
    }

    .emergency-icon {
      margin-right: 0.25rem;
      font-size: 0.9rem;
    }

    @keyframes emergency-pulse {
      0%, 100% { 
        box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
      }
      50% { 
        box-shadow: 0 0 0 8px rgba(255, 107, 107, 0);
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.15s ease;
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
    }

    .btn-primary {
      background: #0066cc;
      color: white;
    }

    .btn-primary:hover {
      background: #0052a3;
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: #0066cc;
      border: 1px solid #0066cc;
    }

    .btn-outline:hover {
      background: #0066cc;
      color: white;
      transform: translateY(-1px);
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .mobile-menu-btn span {
      width: 20px;
      height: 2px;
      background: #374151;
      transition: all 0.15s ease;
    }

    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        border-bottom: 1px solid #e5e7eb;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-menu-btn {
        display: flex;
      }
    }
  `]
})
export class Navbar {
  isScrolled = false;
  isMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize scroll handling in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.handleScroll();
    }
  }

  handleScroll() {
    // Check if we're in the browser before accessing window
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 100;
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
} 