import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="layout-container">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                <path d="M8 12h16M8 16h16M8 20h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0066cc"/>
                    <stop offset="1" stop-color="#3385d6"/>
                  </linearGradient>
                </defs>
              </svg>
              <span class="logo-text">SwiftQueue</span>
            </div>
            <p class="logo-subtitle">Digital Queue Management</p>
          </div>
          
          <nav class="nav-menu">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Dashboard
            </a>
            <a routerLink="/dashboard/queue-status" routerLinkActive="active" class="nav-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Queue Status
            </a>
            <a routerLink="/dashboard/appointments" routerLinkActive="active" class="nav-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
              </svg>
              Appointments
            </a>
          </nav>

          <div class="user-menu">
            <div class="user-info">
              <div class="user-avatar">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
              </div>
              <div class="user-details">
                <span class="user-name">Dr. Admin</span>
                <span class="user-role">Hospital Staff</span>
              </div>
            </div>
            <button class="logout-btn btn btn-outline btn-sm">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .layout-container {
      min-height: 100vh;
      background: var(--gray-50);
    }

    .header {
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-md) var(--space-lg);
      gap: var(--space-xl);
    }

    .logo-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .logo-subtitle {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin: 0;
      margin-left: 2.5rem;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      color: var(--gray-600);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .nav-link:hover {
      color: var(--primary-blue);
      background: rgba(0, 102, 204, 0.05);
      text-decoration: none;
    }

    .nav-link.active {
      color: var(--primary-blue);
      background: rgba(0, 102, 204, 0.1);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: var(--gradient-primary);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: var(--gray-900);
      font-size: 0.875rem;
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-xl) var(--space-lg);
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: var(--space-md);
      }

      .nav-menu {
        gap: var(--space-md);
      }

      .nav-link {
        font-size: 0.875rem;
        padding: var(--space-xs) var(--space-sm);
      }

      .user-menu {
        align-self: stretch;
        justify-content: space-between;
      }

      .main-content {
        padding: var(--space-lg) var(--space-md);
      }
    }
  `]
})
export class Layout {} 