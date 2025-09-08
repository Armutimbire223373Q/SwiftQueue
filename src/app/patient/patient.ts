import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
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

          <!-- Emergency Ambulance Booking -->
          <div class="card emergency-card">
            <div class="card-header emergency-header">
              <h2>🚑 Emergency Ambulance Service</h2>
              <p>Request immediate medical transport for emergencies</p>
            </div>
            
            <div class="emergency-content">
              <div class="emergency-alert">
                <div class="alert-icon">⚠️</div>
                <div class="alert-text">
                  <strong>For life-threatening emergencies, call 999 immediately!</strong>
                  <br>This service is for non-critical medical transport needs.
                </div>
              </div>
              
              <div class="emergency-actions">
                <button class="btn btn-emergency" (click)="goToAmbulanceBooking()">
                  <span class="btn-icon">🚑</span>
                  Request Emergency Ambulance
                </button>
                <div class="emergency-info">
                  <div class="info-item">
                    <span class="info-label">Response Time:</span>
                    <span class="info-value">10-45 minutes</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Emergency Line:</span>
                    <span class="info-value">999</span>
                  </div>
                </div>
              </div>
            </div>
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
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
      position: relative;
      overflow: hidden;
    }

    .patient-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 20, 147, 0.05) 0%, transparent 50%);
      animation: neon-bg-pulse 8s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes neon-bg-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }

    .patient-content {
      padding-top: 70px;
      position: relative;
      z-index: 1;
    }

    .hero-section {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(138, 43, 226, 0.1));
      animation: hero-glow 6s ease-in-out infinite alternate;
    }

    @keyframes hero-glow {
      0% { opacity: 0.3; transform: scale(1); }
      100% { opacity: 0.6; transform: scale(1.05); }
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .neon-patient-title {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #00d4ff, #8a2be2, #ff1493);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
      animation: title-glow 3s ease-in-out infinite alternate;
    }

    @keyframes title-glow {
      0% { text-shadow: 0 0 30px rgba(0, 212, 255, 0.5); }
      100% { text-shadow: 0 0 50px rgba(138, 43, 226, 0.8); }
    }

    .neon-patient-subtitle {
      font-size: 1.25rem;
      color: #e2e8f0;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .neon-bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1;
    }

    .neon-circle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent);
      animation: float 6s ease-in-out infinite;
    }

    .neon-circle-1 {
      width: 200px;
      height: 200px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .neon-circle-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    .neon-pulse {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.3), transparent);
      animation: pulse 4s ease-in-out infinite;
    }

    .neon-pulse-1 {
      width: 100px;
      height: 100px;
      top: 30%;
      right: 25%;
      animation-delay: 1s;
    }

    .neon-pulse-2 {
      width: 80px;
      height: 80px;
      bottom: 30%;
      left: 20%;
      animation-delay: 3s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.2); opacity: 0.6; }
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(138, 43, 226, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(0, 212, 255, 0.3);
    }

    .card:hover::before {
      opacity: 1;
    }

    .card-header {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(138, 43, 226, 0.1));
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card-header h2 {
      color: #00d4ff;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }

    .card-header p {
      color: #e2e8f0;
      margin: 0;
      opacity: 0.8;
    }

    .appointment-form {
      padding: 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: #e2e8f0;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
      font-size: 1rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #00d4ff;
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
    }

    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .form-error {
      color: #ff6b6b;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 107, 107, 0.1);
      border-radius: 0.25rem;
      border-left: 3px solid #ff6b6b;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #00d4ff, #8a2be2);
      color: white;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #6b7280, #4b5563);
      color: white;
    }

    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4);
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

    .queue-status-card {
      grid-column: 1 / 2;
    }

    .emergency-card {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(233, 69, 96, 0.1));
      border: 2px solid rgba(255, 107, 107, 0.3);
      animation: emergency-pulse 3s ease-in-out infinite;
    }

    .emergency-header {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(233, 69, 96, 0.2));
    }

    .emergency-header h2 {
      color: #ff6b6b;
      text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    }

    .emergency-content {
      padding: 1.5rem;
    }

    .emergency-alert {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255, 107, 107, 0.1);
      border: 2px solid rgba(255, 107, 107, 0.3);
      border-radius: 0.75rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
    }

    .alert-icon {
      font-size: 1.5rem;
      animation: alert-pulse 2s ease-in-out infinite;
    }

    @keyframes alert-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .alert-text {
      color: #ffffff;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .emergency-actions {
      text-align: center;
    }

    .btn-emergency {
      background: linear-gradient(135deg, #ff6b6b, #e94560);
      color: white;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      margin-bottom: 1rem;
    }

    .btn-emergency:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }

    .btn-icon {
      font-size: 1.1rem;
      margin-right: 0.5rem;
    }

    .emergency-info {
      display: flex;
      justify-content: space-around;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .info-label {
      color: #cbd5e1;
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }

    .info-value {
      color: #ffffff;
      font-weight: 600;
      font-size: 0.9rem;
    }

    @keyframes emergency-pulse {
      0%, 100% { 
        border-color: rgba(255, 107, 107, 0.3);
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.1);
      }
      50% { 
        border-color: rgba(255, 107, 107, 0.5);
        box-shadow: 0 0 30px rgba(255, 107, 107, 0.2);
      }
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
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .status-pending {
      background: linear-gradient(135deg, #fef3c7, #f59e0b);
      color: #92400e;
    }

    .status-confirmed {
      background: linear-gradient(135deg, #d1fae5, #10b981);
      color: #065f46;
    }

    .status-in-queue {
      background: linear-gradient(135deg, #dbeafe, #3b82f6);
      color: #1e40af;
    }

    .status-served {
      background: linear-gradient(135deg, #dcfce7, #22c55e);
      color: #166534;
    }

    .queue-details {
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .detail-item:hover {
      background: rgba(255, 255, 255, 0.05);
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.5rem;
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: #cbd5e1;
    }

    .value {
      color: #ffffff;
      font-weight: 600;
    }

    .queue-position {
      background: linear-gradient(135deg, #0066cc, #00d4ff);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
    }

    .queue-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .no-appointment,
    .no-appointments {
      text-align: center;
      padding: 3rem 1.5rem;
      color: #cbd5e1;
      font-style: italic;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        padding: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .hero-section {
        padding: 2rem 1rem;
      }

      .neon-patient-title {
        font-size: 2.5rem;
      }
    }

    /* Animation Classes */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #00d4ff, #8a2be2);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #8a2be2, #00d4ff);
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

  constructor(private router: Router) {}

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

  goToAmbulanceBooking() {
    this.router.navigate(['/ambulance-booking']);
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