import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  template: `
    <div class="auth-container">
      <app-navbar></app-navbar>
      
      <div class="auth-card">
        <div class="auth-header">
          <h1>Patient Registration</h1>
          <p>Create your patient account for better healthcare management</p>
        </div>

        <form class="auth-form" (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                class="form-input"
                placeholder="Enter first name"
                [(ngModel)]="registerData.firstName"
                required
                #firstName="ngModel"
              />
              <div class="form-error" *ngIf="firstName.invalid && firstName.touched">
                First name is required
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                class="form-input"
                placeholder="Enter last name"
                [(ngModel)]="registerData.lastName"
                required
                #lastName="ngModel"
              />
              <div class="form-error" *ngIf="lastName.invalid && lastName.touched">
                Last name is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-input"
              placeholder="Enter your email"
              [(ngModel)]="registerData.email"
              required
              #email="ngModel"
            />
            <div class="form-error" *ngIf="email.invalid && email.touched">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              class="form-input"
              placeholder="Enter phone number"
              [(ngModel)]="registerData.phone"
              required
              #phone="ngModel"
            />
            <div class="form-error" *ngIf="phone.invalid && phone.touched">
              Phone number is required
            </div>
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              class="form-input"
              [(ngModel)]="registerData.dateOfBirth"
              required
              #dateOfBirth="ngModel"
            />
            <div class="form-error" *ngIf="dateOfBirth.invalid && dateOfBirth.touched">
              Date of birth is required
            </div>
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              class="form-select"
              [(ngModel)]="registerData.gender"
              required
              #gender="ngModel"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <div class="form-error" *ngIf="gender.invalid && gender.touched">
              Please select your gender
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="password">Password</label>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                class="form-input"
                placeholder="Create password"
                [(ngModel)]="registerData.password"
                required
                #password="ngModel"
              />
              <button
                type="button"
                class="password-toggle"
                (click)="togglePassword()"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
              <div class="form-error" *ngIf="password.invalid && password.touched">
                Password is required
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                name="confirmPassword"
                class="form-input"
                placeholder="Confirm password"
                [(ngModel)]="registerData.confirmPassword"
                required
                #confirmPassword="ngModel"
              />
              <button
                type="button"
                class="password-toggle"
                (click)="toggleConfirmPassword()"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
              <div class="form-error" *ngIf="confirmPassword.invalid && confirmPassword.touched">
                Please confirm your password
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="agreeToTerms" name="agreeToTerms" required>
              I agree to the Terms of Service and Privacy Policy
            </label>
            <div class="form-error" *ngIf="!agreeToTerms && registerForm.submitted">
              You must agree to the terms and conditions
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg auth-submit"
            [disabled]="registerForm.invalid || isLoading"
          >
            <span *ngIf="!isLoading">Create Patient Account</span>
            <span *ngIf="isLoading">Creating account...</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Sign in here</a></p>
          <p>Or <a routerLink="/patient">book an appointment without account</a></p>
        </div>
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
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .auth-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      padding: 3rem;
      width: 100%;
      max-width: 500px;
      position: relative;
      z-index: 1;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      margin: 0 0 0.5rem 0;
      color: #111827;
      font-size: 1.75rem;
    }

    .auth-header p {
      color: #6b7280;
      margin: 0;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }

    .password-toggle {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .form-error {
      color: #dc2626;
      font-size: 0.75rem;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      color: #374151;
    }

    .checkbox-label input[type="checkbox"] {
      margin-top: 0.125rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
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

    .btn-primary:hover:not(:disabled) {
      background: #0052a3;
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .auth-submit {
      width: 100%;
      margin-top: 1rem;
    }

    .auth-footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .auth-footer p {
      color: #6b7280;
      margin: 0 0 0.5rem 0;
    }

    .auth-footer a {
      color: #0066cc;
      font-weight: 500;
      text-decoration: none;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .auth-container {
        padding: 1rem;
      }

      .auth-card {
        padding: 2rem;
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
export class PatientRegister implements OnInit {
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  agreeToTerms = false;
  isLoading = false;

  constructor(private router: Router) {}

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

    if (this.registerData.firstName && this.registerData.lastName && this.registerData.email && 
        this.registerData.phone && this.registerData.dateOfBirth && this.registerData.gender && 
        this.registerData.password && this.agreeToTerms) {
      this.isLoading = true;
      
      // Simulate registration API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Patient registration attempt:', this.registerData);
        
        // Show success message and redirect to patient dashboard
        alert('Patient account created successfully! Redirecting to patient dashboard...');
        this.router.navigate(['/patient']);
      }, 2000);
    }
  }
}
