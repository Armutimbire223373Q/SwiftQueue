import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container neon-bg">
      <div class="auth-card animate-slide-in neon-card">
        <!-- Header -->
        <div class="auth-header animate-fade-in">
          <div class="logo animate-bounce-in neon-logo">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
              <path d="M8 12h16M8 16h16M8 20h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0066cc"/>
                  <stop offset="1" stop-color="#3385d6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="neon-title">Welcome to SwiftQueue</h1>
          <p class="neon-subtitle">Sign in to your hospital staff account</p>
        </div>

        <!-- Login Form -->
        <form class="auth-form animate-fade-in" (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group animate-slide-left">
            <label class="form-label neon-label" for="email">Email Address</label>
            <div class="input-wrapper neon-input-wrapper">
              <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input neon-input"
                placeholder="Enter your email"
                [(ngModel)]="loginData.email"
                required
                #email="ngModel"
              />
            </div>
            <div class="form-error neon-error" *ngIf="email.invalid && email.touched">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group animate-slide-right">
            <label class="form-label neon-label" for="password">Password</label>
            <div class="input-wrapper neon-input-wrapper">
              <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
              </svg>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                class="form-input neon-input"
                placeholder="Enter your password"
                [(ngModel)]="loginData.password"
                required
                #password="ngModel"
              />
              <button
                type="button"
                class="password-toggle neon-toggle"
                (click)="togglePassword()"
              >
                <svg *ngIf="!showPassword" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <svg *ngIf="showPassword" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/>
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                </svg>
              </button>
            </div>
            <div class="form-error neon-error" *ngIf="password.invalid && password.touched">
              Password is required
            </div>
          </div>

          <div class="form-options animate-slide-up">
            <label class="checkbox-label neon-checkbox">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
              <span class="checkmark neon-checkmark"></span>
              Remember me
            </label>
            <a href="#" class="forgot-password neon-link">Forgot password?</a>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg auth-submit neon-submit-btn"
            [disabled]="loginForm.invalid || isLoading"
            [class.animate-pulse]="isLoading"
          >
            <span *ngIf="!isLoading">Sign In</span>
            <div *ngIf="isLoading" class="loading-state">
              <div class="spinner neon-spinner"></div>
              <span>Signing in...</span>
            </div>
          </button>
        </form>

        <!-- Footer -->
        <div class="auth-footer animate-fade-in">
          <p>Don't have an account? <a routerLink="/register" class="neon-link">Create one here</a></p>
        </div>
      </div>

      <!-- Background Elements -->
      <div class="bg-elements">
        <div class="bg-circle bg-circle-1 animate-float"></div>
        <div class="bg-circle bg-circle-2 animate-float"></div>
        <div class="bg-circle bg-circle-3 animate-float"></div>
        <div class="bg-shape bg-shape-1 animate-rotate"></div>
        <div class="bg-shape bg-shape-2 animate-rotate"></div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: var(--space-lg);
      position: relative;
      overflow: hidden;
    }

    .bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }

    .bg-circle-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
    }

    .bg-circle-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
    }

    .bg-circle-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
    }

    .bg-shape {
      position: absolute;
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }

    .bg-shape-1 {
      top: 30%;
      right: 25%;
    }

    .bg-shape-2 {
      bottom: 30%;
      left: 25%;
    }

    .auth-card {
      background: var(--white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--space-3xl);
      width: 100%;
      max-width: 400px;
      position: relative;
      z-index: 1;
    }

    .auth-header {
      text-align: center;
      margin-bottom: var(--space-2xl);
    }

    .logo {
      margin-bottom: var(--space-lg);
      display: flex;
      justify-content: center;
    }

    .auth-header h1 {
      margin: 0 0 var(--space-sm) 0;
      color: var(--gray-900);
      font-size: 1.75rem;
    }

    .auth-header p {
      color: var(--gray-600);
      margin: 0;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .form-label {
      font-weight: 500;
      color: var(--gray-700);
      font-size: 0.875rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: var(--space-md);
      color: var(--gray-400);
      z-index: 1;
    }

    .form-input {
      width: 100%;
      padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      background: var(--white);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .password-toggle {
      position: absolute;
      right: var(--space-md);
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: var(--space-xs);
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast);
    }

    .password-toggle:hover {
      color: var(--gray-600);
    }

    .form-error {
      color: var(--error);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--gray-700);
    }

    .checkbox-label input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 16px;
      height: 16px;
      border: 2px solid var(--gray-300);
      border-radius: var(--radius-sm);
      position: relative;
      transition: all var(--transition-fast);
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 4px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .forgot-password {
      font-size: 0.875rem;
      color: var(--primary-blue);
      text-decoration: none;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .auth-submit {
      width: 100%;
      margin-top: var(--space-md);
    }

    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .auth-footer {
      text-align: center;
      margin-top: var(--space-xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--gray-200);
    }

    .auth-footer p {
      color: var(--gray-600);
      margin: 0;
    }

    .auth-footer a {
      color: var(--primary-blue);
      font-weight: 500;
      text-decoration: none;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    /* Animation Classes */
    .animate-slide-in {
      animation: slideInUp 0.6s ease-out;
    }

    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }

    .animate-bounce-in {
      animation: bounceIn 1s ease-out;
    }

    .animate-slide-left {
      animation: slideInLeft 0.6s ease-out 0.2s both;
    }

    .animate-slide-right {
      animation: slideInRight 0.6s ease-out 0.4s both;
    }

    .animate-slide-up {
      animation: slideInUp 0.6s ease-out 0.6s both;
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-rotate {
      animation: rotate 10s linear infinite;
    }

    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @media (max-width: 768px) {
      .auth-container {
        padding: var(--space-md);
      }

      .auth-card {
        padding: var(--space-xl);
      }

      .auth-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class Login implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;

  ngOnInit() {
    // Initialize component
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginData.email && this.loginData.password) {
      this.isLoading = true;
      
      // Simulate login API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login attempt:', this.loginData);
        // Here you would typically call your authentication service
        // and redirect to dashboard on success
      }, 2000);
    }
  }
}
