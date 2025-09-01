import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  template: `
    <div class="patient-container neon-patient">
      <app-navbar></app-navbar>
      
      <div class="patient-content">
        <div class="hero-section neon-patient-hero">
          <div class="hero-content animate-on-scroll">
            <h1 class="neon-patient-title">Patient Dashboard</h1>
            <p class="neon-patient-subtitle">Book appointments and track your queue status in real-time</p>
          </div>
          
          <!-- Neon Background Elements -->
          <div class="neon-bg-elements">
            <div class="neon-circle neon-circle-1"></div>
            <div class="neon-circle neon-circle-2"></div>
            <div class="neon-pulse neon-pulse-1"></div>
            <div class="neon-pulse neon-pulse-2"></div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Appointment Booking Form -->
          <div class="card appointment-form-card">
            <div class="card-header">
              <h2>Book New Appointment</h2>
              <p>Schedule your visit with our healthcare providers</p>
            </div>
            
            <form class="appointment-form" (ngSubmit)="bookAppointment()" #appointmentForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-input"
                    placeholder="Enter your full name"
                    [(ngModel)]="newAppointment.name"
                    required
                    #name="ngModel"
                  />
                  <div class="form-error" *ngIf="name.invalid && name.touched">
                    Name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-input"
                    placeholder="Enter your email"
                    [(ngModel)]="newAppointment.email"
                    required
                    #email="ngModel"
                  />
                  <div class="form-error" *ngIf="email.invalid && email.touched">
                    Valid email is required
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    class="form-select"
                    [(ngModel)]="newAppointment.department"
                    required
                    #department="ngModel"
                  >
                    <option value="">Select Department</option>
                    <option value="emergency">Emergency</option>
                    <option value="general">General Medicine</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="dermatology">Dermatology</option>
                  </select>
                  <div class="form-error" *ngIf="department.invalid && department.touched">
                    Please select a department
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    class="form-input"
                    [(ngModel)]="newAppointment.date"
                    required
                    #date="ngModel"
                  />
                  <div class="form-error" *ngIf="date.invalid && date.touched">
                    Please select a date
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="time">Preferred Time</label>
                <select
                  id="time"
                  name="time"
                  class="form-select"
                  [(ngModel)]="newAppointment.time"
                  required
                  #time="ngModel"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                <div class="form-error" *ngIf="time.invalid && time.touched">
                  Please select a time
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-large"
                [disabled]="appointmentForm.invalid || isBooking"
              >
                <span *ngIf="!isBooking">Book Appointment</span>
                <span *ngIf="isBooking">Booking...</span>
              </button>
            </form>
          </div>

          <!-- Current Queue Status -->
          <div class="card queue-status-card">
            <div class="card-header">
              <h2>Current Queue Status</h2>
              <p>Real-time updates on your appointment</p>
            </div>
            
            <div class="queue-info" *ngIf="currentAppointment; else noAppointment">
              <div class="status-badge" [class]="'status-' + currentAppointment.status">
                {{ currentAppointment.status | titlecase }}
              </div>
              
              <div class="queue-details">
                <div class="detail-item">
                  <span class="label">Department:</span>
                  <span class="value">{{ currentAppointment.department | titlecase }}</span>
                </div>
                
                <div class="detail-item">
                  <span class="label">Date:</span>
                  <span class="value">{{ formatDate(currentAppointment.date) }}</span>
                </div>
                
                <div class="detail-item">
                  <span class="label">Time:</span>
                  <span class="value">{{ currentAppointment.time }}</span>
                </div>
                
                <div class="detail-item" *ngIf="currentAppointment.queuePosition">
                  <span class="label">Queue Position:</span>
                  <span class="value queue-position">{{ currentAppointment.queuePosition }}</span>
                </div>
                
                <div class="detail-item" *ngIf="currentAppointment.estimatedWait">
                  <span class="label">Estimated Wait:</span>
                  <span class="value">{{ currentAppointment.estimatedWait }} minutes</span>
                </div>
              </div>
              
              <div class="queue-actions">
                <button class="btn btn-outline" (click)="checkQueueStatus()">
                  Refresh Status
                </button>
                <button class="btn btn-secondary" (click)="cancelAppointment()">
                  Cancel Appointment
                </button>
              </div>
            </div>
            
            <ng-template #noAppointment>
              <div class="no-appointment">
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
                <h3>No Active Appointment</h3>
                <p>Book an appointment to see your queue status here</p>
              </div>
            </ng-template>
          </div>

          <!-- Recent Appointments -->
          <div class="card appointments-card">
            <div class="card-header">
              <h2>Recent Appointments</h2>
              <p>Your appointment history</p>
            </div>
            
            <div class="appointments-list" *ngIf="appointments.length > 0; else noAppointments">
              <div class="appointment-item" *ngFor="let appointment of appointments">
                <div class="appointment-header">
                  <div class="appointment-date">
                    <span class="day">{{ getDay(appointment.date) }}</span>
                    <span class="month">{{ getMonth(appointment.date) }}</span>
                  </div>
                  <div class="appointment-status" [class]="'status-' + appointment.status">
                    {{ appointment.status | titlecase }}
                  </div>
                </div>
                
                <div class="appointment-details">
                  <h4>{{ appointment.department | titlecase }}</h4>
                  <p>{{ appointment.time }}</p>
                  <p class="appointment-name">{{ appointment.name }}</p>
                </div>
              </div>
            </div>
            
            <ng-template #noAppointments>
              <div class="no-appointments">
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
                <h3>No Appointments Yet</h3>
                <p>Your appointment history will appear here</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .patient-container {
      min-height: 100vh;
      background: #f8fafc;
    }

    .patient-content {
      padding-top: 70px;
    }

    .hero-section {
      background: linear-gradient(135deg, #0066cc 0%, #3385d6 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-content p {
      font-size: 1.125rem;
      opacity: 0.9;
    }

    .dashboard-grid {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: grid;
      gap: 2rem;
    }

    .card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .card-header h2 {
      margin: 0 0 0.5rem 0;
      color: #111827;
      font-size: 1.25rem;
    }

    .card-header p {
      margin: 0;
      color: #6b7280;
    }

    .appointment-form-card {
      grid-column: 1 / -1;
    }

    .appointment-form {
      padding: 1.5rem;
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

    .form-error {
      color: #dc2626;
      font-size: 0.75rem;
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

    .btn-outline {
      background: transparent;
      color: #0066cc;
      border: 1px solid #0066cc;
    }

    .btn-outline:hover {
      background: #0066cc;
      color: white;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .queue-status-card {
      grid-column: 1 / 2;
    }

    .queue-info {
      padding: 1.5rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }

    .status-confirmed {
      background: #d1fae5;
      color: #065f46;
    }

    .status-in-queue {
      background: #dbeafe;
      color: #1e40af;
    }

    .status-served {
      background: #dcfce7;
      color: #166534;
    }

    .queue-details {
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: #6b7280;
    }

    .value {
      color: #111827;
      font-weight: 600;
    }

    .queue-position {
      background: #0066cc;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
    }

    .queue-actions {
      display: flex;
      gap: 1rem;
    }

    .no-appointment,
    .no-appointments {
      text-align: center;
      padding: 3rem 1.5rem;
      color: #6b7280;
    }

    .no-appointment svg,
    .no-appointments svg {
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .no-appointment h3,
    .no-appointments h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }

    .no-appointment p,
    .no-appointments p {
      margin: 0;
    }

    .appointments-card {
      grid-column: 2 / 3;
    }

    .appointments-list {
      padding: 1.5rem;
    }

    .appointment-item {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      transition: all 0.15s ease;
    }

    .appointment-item:hover {
      border-color: #0066cc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .appointment-item:last-child {
      margin-bottom: 0;
    }

    .appointment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .appointment-date {
      text-align: center;
    }

    .day {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0066cc;
    }

    .month {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
    }

    .appointment-status {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      text-transform: uppercase;
    }

    .appointment-details h4 {
      margin: 0 0 0.5rem 0;
      color: #111827;
    }

    .appointment-details p {
      margin: 0 0 0.25rem 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .appointment-name {
      font-weight: 500;
      color: #374151 !important;
    }

    @media (max-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .queue-status-card,
      .appointments-card {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .queue-actions {
        flex-direction: column;
      }
    }
  `]
})
export class Patient implements OnInit {
  newAppointment = {
    name: '',
    email: '',
    department: '',
    date: '',
    time: ''
  };

  appointments: Appointment[] = [];
  currentAppointment: Appointment | null = null;
  isBooking = false;

  ngOnInit() {
    this.loadMockData();
  }

  loadMockData() {
    // Mock data for demonstration
    this.appointments = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'cardiology',
        date: '2024-01-15',
        time: '10:00',
        type: 'consultation',
        status: 'served'
      },
      {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'general',
        date: '2024-01-20',
        time: '14:00',
        type: 'checkup',
        status: 'confirmed',
        queuePosition: 3,
        estimatedWait: 25
      }
    ];

    // Set current appointment if there's a confirmed one
    this.currentAppointment = this.appointments.find(apt => apt.status === 'confirmed') || null;
  }

  bookAppointment() {
    if (this.newAppointment.name && this.newAppointment.email && this.newAppointment.department && this.newAppointment.date && this.newAppointment.time) {
      this.isBooking = true;
      
      // Simulate API call
      setTimeout(() => {
        const appointment: Appointment = {
          id: Date.now().toString(),
          name: this.newAppointment.name,
          email: this.newAppointment.email,
          department: this.newAppointment.department,
          date: this.newAppointment.date,
          time: this.newAppointment.time,
          type: 'consultation',
          status: 'confirmed',
          queuePosition: Math.floor(Math.random() * 10) + 1,
          estimatedWait: Math.floor(Math.random() * 30) + 15
        };

        this.appointments.unshift(appointment);
        this.currentAppointment = appointment;
        this.resetForm();
        this.isBooking = false;
        
        // Show success message
        alert('Appointment booked successfully!');
      }, 2000);
    }
  }

  resetForm() {
    this.newAppointment = {
      name: '',
      email: '',
      department: '',
      date: '',
      time: ''
    };
  }

  checkQueueStatus() {
    if (this.currentAppointment) {
      // Simulate status update
      if (this.currentAppointment.queuePosition && this.currentAppointment.queuePosition > 1) {
        this.currentAppointment.queuePosition = Math.max(1, this.currentAppointment.queuePosition - 1);
        this.currentAppointment.estimatedWait = Math.max(5, (this.currentAppointment.estimatedWait || 15) - 5);
        
        if (this.currentAppointment.queuePosition === 1) {
          this.currentAppointment.status = 'in-queue';
          alert('You are next in line!');
        } else {
          alert(`Queue status refreshed! You are now #${this.currentAppointment.queuePosition} in line.`);
        }
      } else {
        alert('Queue status refreshed!');
      }
    }
  }

  cancelAppointment() {
    if (this.currentAppointment && confirm('Are you sure you want to cancel this appointment?')) {
      this.currentAppointment.status = 'cancelled';
      this.currentAppointment = null;
      alert('Appointment cancelled successfully');
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  getDay(date: string): string {
    return new Date(date).getDate().toString();
  }

  getMonth(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'short' });
  }
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'in-queue' | 'served' | 'cancelled';
  queuePosition?: number;
  estimatedWait?: number;
} 