import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
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
          <h1 class="neon-title">Join SwiftQueue</h1>
          <p class="neon-subtitle">Create your hospital staff account</p>
        </div>

        <!-- Registration Form -->
        <form class="auth-form animate-fade-in" (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-row">
            <div class="form-group animate-slide-left">
              <label class="form-label neon-label" for="firstName">First Name</label>
              <div class="input-wrapper neon-input-wrapper">
                <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  class="form-input neon-input"
                  placeholder="Enter first name"
                  [(ngModel)]="registerData.firstName"
                  required
                  #firstName="ngModel"
                />
              </div>
              <div class="form-error neon-error" *ngIf="firstName.invalid && firstName.touched">
                First name is required
              </div>
            </div>

            <div class="form-group animate-slide-right">
              <label class="form-label neon-label" for="lastName">Last Name</label>
              <div class="input-wrapper neon-input-wrapper">
                <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  class="form-input neon-input"
                  placeholder="Enter last name"
                  [(ngModel)]="registerData.lastName"
                  required
                  #lastName="ngModel"
                />
              </div>
              <div class="form-error neon-error" *ngIf="lastName.invalid && lastName.touched">
                Last name is required
              </div>
            </div>
          </div>

          <div class="form-group animate-slide-up">
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
                [(ngModel)]="registerData.email"
                required
                #email="ngModel"
              />
            </div>
            <div class="form-error neon-error" *ngIf="email.invalid && email.touched">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group animate-slide-up">
            <label class="form-label neon-label" for="role">Role</label>
            <div class="input-wrapper neon-input-wrapper">
              <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.5 4.5H4a1 1 0 100 2h1.5a5 5 0 009 0H16a1 1 0 100-2h-1.5A5 5 0 0010 11z"/>
              </svg>
              <select
                id="role"
                name="role"
                class="form-select neon-select"
                [(ngModel)]="registerData.role"
                required
                #role="ngModel"
              >
                <option value="">Select your role</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Administrator</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>
            <div class="form-error neon-error" *ngIf="role.invalid && role.touched">
              Please select your role
            </div>
          </div>

          <div class="form-row">
            <div class="form-group animate-slide-left">
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
                  placeholder="Create password"
                  [(ngModel)]="registerData.password"
                  required
                  #password="ngModel"
                />
                <button
                  type="button"
                  class="password-toggle neon-password-toggle"
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

            <div class="form-group animate-slide-right">
              <label class="form-label neon-label" for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper neon-input-wrapper">
                <svg class="input-icon neon-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-input neon-input"
                  placeholder="Confirm password"
                  [(ngModel)]="registerData.confirmPassword"
                  required
                  #confirmPassword="ngModel"
                />
                <button
                  type="button"
                  class="password-toggle neon-password-toggle"
                  (click)="toggleConfirmPassword()"
                >
                  <svg *ngIf="!showConfirmPassword" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <svg *ngIf="showConfirmPassword" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                </button>
              </div>
              <div class="form-error neon-error" *ngIf="confirmPassword.invalid && confirmPassword.touched">
                Please confirm your password
              </div>
            </div>
          </div>

          <div class="form-group animate-slide-up">
            <label class="checkbox-label neon-checkbox-label">
              <input type="checkbox" [(ngModel)]="agreeToTerms" name="agreeToTerms" required>
              <span class="checkmark neon-checkmark"></span>
              I agree to the <a href="#" class="terms-link neon-terms-link">Terms of Service</a> and <a href="#" class="terms-link neon-terms-link">Privacy Policy</a>
            </label>
            <div class="form-error neon-error" *ngIf="!agreeToTerms && registerForm.submitted">
              You must agree to the terms and conditions
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg auth-submit neon-submit"
            [disabled]="registerForm.invalid || isLoading"
            [class.animate-pulse]="isLoading"
          >
            <span *ngIf="!isLoading">Create Account</span>
            <div *ngIf="isLoading" class="loading-state">
              <div class="spinner neon-spinner"></div>
              <span>Creating account...</span>
            </div>
          </button>
        </form>

        <!-- Footer -->
        <div class="auth-footer animate-fade-in">
          <p>Already have an account? <a routerLink="/login" class="neon-link">Sign in here</a></p>
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

    .neon-bg {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .neon-card {
      background: var(--white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--space-3xl);
      width: 100%;
      max-width: 500px;
      position: relative;
      z-index: 1;
    }

    .neon-logo {
      margin-bottom: var(--space-lg);
      display: flex;
      justify-content: center;
    }

    .neon-title {
      margin: 0 0 var(--space-sm) 0;
      color: var(--gray-900);
      font-size: 1.75rem;
    }

    .neon-subtitle {
      color: var(--gray-600);
      margin: 0;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
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

    .neon-label {
      font-weight: 500;
      color: var(--gray-700);
      font-size: 0.875rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .neon-input-wrapper {
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

    .neon-icon {
      position: absolute;
      left: var(--space-md);
      color: var(--gray-400);
      z-index: 1;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      background: var(--white);
    }

    .neon-input {
      width: 100%;
      padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      background: var(--white);
    }

    .neon-select {
      width: 100%;
      padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      background: var(--white);
      padding-left: 3rem;
      cursor: pointer;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .neon-input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .neon-select:focus {
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

    .neon-password-toggle {
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

    .neon-password-toggle:hover {
      color: var(--gray-600);
    }

    .form-error {
      color: var(--error);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .neon-error {
      color: var(--error);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm);
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--gray-700);
      line-height: 1.4;
    }

    .neon-checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm);
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--gray-700);
      line-height: 1.4;
    }

    .checkbox-label input[type="checkbox"] {
      display: none;
    }

    .neon-checkbox-label input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 16px;
      height: 16px;
      border: 2px solid var(--gray-300);
      border-radius: var(--radius-sm);
      position: relative;
      transition: all var(--transition-fast);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .neon-checkmark {
      width: 16px;
      height: 16px;
      border: 2px solid var(--gray-300);
      border-radius: var(--radius-sm);
      position: relative;
      transition: all var(--transition-fast);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
    }

    .neon-checkbox-label input[type="checkbox"]:checked + .neon-checkmark {
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

    .neon-checkbox-label input[type="checkbox"]:checked + .neon-checkmark::after {
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

    .terms-link {
      color: var(--primary-blue);
      text-decoration: none;
    }

    .neon-terms-link {
      color: var(--primary-blue);
      text-decoration: none;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .neon-terms-link:hover {
      text-decoration: underline;
    }

    .auth-submit {
      width: 100%;
      margin-top: var(--space-md);
    }

    .neon-submit {
      width: 100%;
      margin-top: var(--space-md);
    }

    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
    }

    .neon-spinner {
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

      .form-row {
        grid-template-columns: 1fr;
      }

      .auth-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class Register implements OnInit {
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  agreeToTerms = false;
  isLoading = false;

  ngOnInit() {
    // Initialize component
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.registerData.firstName && this.registerData.lastName && this.registerData.email && this.registerData.role && this.registerData.password && this.agreeToTerms) {
      this.isLoading = true;
      
      // Simulate registration API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Registration attempt:', this.registerData);
        // Here you would typically call your registration service
        // and redirect to login or dashboard on success
      }, 2000);
    }
  }
}
