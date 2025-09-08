import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

interface PatientAppointment {
  id: string;
  name: string;
  email: string;
  department: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-queue' | 'served' | 'delayed' | 'skipped';
  queuePosition: number;
  estimatedWait: number;
  notes?: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  template: `
    <div class="staff-container neon-staff">
      <app-navbar></app-navbar>
      
      <div class="staff-content">
        <div class="hero-section neon-staff-hero">
          <div class="hero-content animate-on-scroll">
            <h1 class="neon-staff-title">Staff Dashboard</h1>
            <p class="neon-staff-subtitle">Manage patient appointments and queue status in real-time</p>
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
          <!-- Queue Overview -->
          <div class="card queue-overview-card">
            <div class="card-header">
              <h2>Queue Overview</h2>
              <p>Current queue status and statistics</p>
            </div>
            
            <div class="queue-stats">
              <div class="stat-item">
                <div class="stat-number">{{ getQueueStats().total }}</div>
                <div class="stat-label">Total Patients</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">{{ getQueueStats().waiting }}</div>
                <div class="stat-label">Waiting</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">{{ getQueueStats().served }}</div>
                <div class="stat-label">Served Today</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">{{ getQueueStats().averageWait }}min</div>
                <div class="stat-label">Avg Wait Time</div>
              </div>
            </div>
          </div>

          <!-- Current Queue -->
          <div class="card current-queue-card">
            <div class="card-header">
              <h2>Current Queue</h2>
              <p>Patients currently waiting</p>
            </div>
            
            <div class="queue-list" *ngIf="getCurrentQueue().length > 0; else emptyQueue">
              <div class="queue-item" *ngFor="let patient of getCurrentQueue(); let i = index">
                <div class="queue-position">{{ patient.queuePosition }}</div>
                
                <div class="patient-info">
                  <h4>{{ patient.name }}</h4>
                  <p class="department">{{ patient.department | titlecase }}</p>
                  <p class="time">{{ patient.time }}</p>
                  <p class="estimated-wait">Est. wait: {{ patient.estimatedWait }} min</p>
                </div>
                
                <div class="queue-actions">
                  <button 
                    class="btn btn-success btn-sm" 
                    (click)="servePatient(patient)"
                    [disabled]="patient.status !== 'in-queue'"
                  >
                    Serve
                  </button>
                  <button 
                    class="btn btn-warning btn-sm" 
                    (click)="delayPatient(patient)"
                  >
                    Delay
                  </button>
                  <button 
                    class="btn btn-secondary btn-sm" 
                    (click)="skipPatient(patient)"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
            
            <ng-template #emptyQueue>
              <div class="empty-queue">
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
                <h3>Queue is Empty</h3>
                <p>No patients are currently waiting</p>
              </div>
            </ng-template>
          </div>

          <!-- Patient Appointments -->
          <div class="card appointments-card">
            <div class="card-header">
              <h2>All Appointments</h2>
              <p>Manage patient appointments</p>
            </div>
            
            <div class="appointments-filters">
              <select class="filter-select" [(ngModel)]="statusFilter">
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-queue">In Queue</option>
                <option value="served">Served</option>
                <option value="delayed">Delayed</option>
                <option value="skipped">Skipped</option>
              </select>
              
              <select class="filter-select" [(ngModel)]="departmentFilter">
                <option value="">All Departments</option>
                <option value="emergency">Emergency</option>
                <option value="general">General Medicine</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>
            
            <div class="appointments-list">
              <div class="appointment-item" *ngFor="let appointment of getFilteredAppointments()">
                <div class="appointment-header">
                  <div class="appointment-time">
                    <span class="time">{{ appointment.time }}</span>
                    <span class="date">{{ formatDate(appointment.date) }}</span>
                  </div>
                  <div class="status-badge" [class]="'status-' + appointment.status">
                    {{ appointment.status | titlecase }}
                  </div>
                </div>
                
                <div class="appointment-details">
                  <h4>{{ appointment.name }}</h4>
                  <p class="email">{{ appointment.email }}</p>
                  <p class="department">{{ appointment.department | titlecase }}</p>
                  <p class="queue-info" *ngIf="appointment.queuePosition">
                    Queue: #{{ appointment.queuePosition }} | Wait: {{ appointment.estimatedWait }} min
                  </p>
                </div>
                
                <div class="appointment-actions">
                  <button 
                    class="btn btn-sm" 
                    [class]="getActionButtonClass(appointment.status)"
                    (click)="updateAppointmentStatus(appointment)"
                  >
                    {{ getActionButtonText(appointment.status) }}
                  </button>
                  
                  <button class="btn btn-outline btn-sm" (click)="addNotes(appointment)">
                    Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card quick-actions-card">
            <div class="card-header">
              <h2>Quick Actions</h2>
              <p>Common staff operations</p>
            </div>
            
            <div class="quick-actions">
              <button class="btn btn-primary" (click)="addNewPatient()">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                </svg>
                Add New Patient
              </button>
              
              <button class="btn btn-outline" (click)="exportQueue()">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
                </svg>
                Export Queue
              </button>
              
              <button class="btn btn-outline" (click)="sendNotifications()">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                Send Notifications
              </button>
              
              <button class="btn btn-outline" (click)="viewReports()">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .staff-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
      position: relative;
      overflow: hidden;
    }

    .staff-container::before {
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

    .staff-content {
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

    .neon-staff-title {
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

    .neon-staff-subtitle {
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

    .queue-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
    }

    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .stat-item:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(0, 212, 255, 0.3);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.2);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #00d4ff;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }

    .stat-label {
      color: #e2e8f0;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .queue-list {
      padding: 1.5rem;
      max-height: 500px;
      overflow-y: auto;
    }

    .queue-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }

    .queue-item:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(0, 212, 255, 0.3);
      transform: translateX(5px);
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.2);
    }

    .queue-item:last-child {
      margin-bottom: 0;
    }

    .queue-position {
      background: linear-gradient(135deg, #00d4ff, #8a2be2);
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
    }

    .patient-info {
      flex: 1;
    }

    .patient-info h4 {
      color: #ffffff;
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .patient-info p {
      color: #cbd5e1;
      margin: 0 0 0.25rem 0;
      font-size: 0.875rem;
    }

    .department {
      color: #00d4ff !important;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .time {
      color: #8a2be2 !important;
      font-weight: 600;
    }

    .estimated-wait {
      color: #ff1493 !important;
      font-weight: 600;
    }

    .queue-actions {
      display: flex;
      gap: 0.75rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.875rem;
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

    .btn-success {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }

    .btn-success:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    }

    .btn-success:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }

    .btn-warning:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }

    .btn-danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    .appointments-filters {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
    }

    .filter-select {
      padding: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
      transition: all 0.3s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: #00d4ff;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    }

    .appointments-list {
      padding: 1.5rem;
      max-height: 500px;
      overflow-y: auto;
    }

    .appointment-item {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }

    .appointment-item:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(0, 212, 255, 0.3);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.2);
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

    .appointment-time {
      text-align: center;
    }

    .time {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
      color: #00d4ff;
      text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    }

    .date {
      display: block;
      font-size: 0.75rem;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      text-transform: uppercase;
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

    .status-delayed {
      background: linear-gradient(135deg, #fef3c7, #f59e0b);
      color: #92400e;
    }

    .status-skipped {
      background: linear-gradient(135deg, #fee2e2, #ef4444);
      color: #991b1b;
    }

    .appointment-details h4 {
      color: #ffffff;
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .appointment-details p {
      color: #cbd5e1;
      margin: 0 0 0.25rem 0;
      font-size: 0.875rem;
    }

    .appointment-name {
      color: #00d4ff !important;
      font-weight: 600;
    }

    .empty-queue {
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

      .hero-section {
        padding: 2rem 1rem;
      }

      .neon-staff-title {
        font-size: 2.5rem;
      }

      .queue-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding: 1rem;
      }

      .queue-item {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .queue-actions {
        justify-content: center;
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
export class Staff implements OnInit {
  appointments: PatientAppointment[] = [];
  statusFilter = '';
  departmentFilter = '';

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
        time: '09:00',
        status: 'in-queue',
        queuePosition: 1,
        estimatedWait: 5
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        department: 'general',
        date: '2024-01-15',
        time: '09:30',
        status: 'in-queue',
        queuePosition: 2,
        estimatedWait: 15
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        department: 'pediatrics',
        date: '2024-01-15',
        time: '10:00',
        status: 'confirmed',
        queuePosition: 3,
        estimatedWait: 25
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        department: 'orthopedics',
        date: '2024-01-15',
        time: '10:30',
        status: 'pending',
        queuePosition: 4,
        estimatedWait: 35
      }
    ];
  }

  getQueueStats() {
    const total = this.appointments.length;
    const waiting = this.appointments.filter(apt => apt.status === 'in-queue').length;
    const served = this.appointments.filter(apt => apt.status === 'served').length;
    const averageWait = Math.round(
      this.appointments
        .filter(apt => apt.estimatedWait)
        .reduce((sum, apt) => sum + apt.estimatedWait, 0) / 
      this.appointments.filter(apt => apt.estimatedWait).length
    ) || 0;

    return { total, waiting, served, averageWait };
  }

  getCurrentQueue() {
    return this.appointments
      .filter(apt => apt.status === 'in-queue')
      .sort((a, b) => a.queuePosition - b.queuePosition);
  }

  getFilteredAppointments() {
    let filtered = this.appointments;
    
    if (this.statusFilter) {
      filtered = filtered.filter(apt => apt.status === this.statusFilter);
    }
    
    if (this.departmentFilter) {
      filtered = filtered.filter(apt => apt.department === this.departmentFilter);
    }
    
    return filtered.sort((a, b) => a.time.localeCompare(b.time));
  }

  servePatient(patient: PatientAppointment) {
    patient.status = 'served';
    this.reorderQueue();
    alert(`${patient.name} has been served`);
  }

  delayPatient(patient: PatientAppointment) {
    patient.status = 'delayed';
    patient.estimatedWait += 15;
    alert(`${patient.name} has been delayed by 15 minutes`);
  }

  skipPatient(patient: PatientAppointment) {
    patient.status = 'skipped';
    this.reorderQueue();
    alert(`${patient.name} has been skipped`);
  }

  reorderQueue() {
    const inQueue = this.appointments.filter(apt => apt.status === 'in-queue');
    inQueue.forEach((apt, index) => {
      apt.queuePosition = index + 1;
      apt.estimatedWait = Math.max(5, apt.estimatedWait - 10);
    });
  }

  updateAppointmentStatus(appointment: PatientAppointment) {
    const statuses = ['pending', 'confirmed', 'in-queue', 'served', 'delayed', 'skipped'];
    const currentIndex = statuses.indexOf(appointment.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    appointment.status = statuses[nextIndex] as any;
    
    if (appointment.status === 'in-queue') {
      appointment.queuePosition = this.getCurrentQueue().length + 1;
      appointment.estimatedWait = appointment.queuePosition * 10;
    }
    
    this.reorderQueue();
  }

  getActionButtonClass(status: string): string {
    const classes: { [key: string]: string } = {
      'pending': 'btn-warning',
      'confirmed': 'btn-primary',
      'in-queue': 'btn-success',
      'served': 'btn-secondary',
      'delayed': 'btn-warning',
      'skipped': 'btn-secondary'
    };
    return classes[status] || 'btn-outline';
  }

  getActionButtonText(status: string): string {
    const texts: { [key: string]: string } = {
      'pending': 'Confirm',
      'confirmed': 'Add to Queue',
      'in-queue': 'Serve',
      'served': 'Completed',
      'delayed': 'Delayed',
      'skipped': 'Skipped'
    };
    return texts[status] || 'Update';
  }

  addNotes(appointment: PatientAppointment) {
    const notes = prompt('Add notes for this appointment:');
    if (notes) {
      appointment.notes = notes;
      alert('Notes added successfully');
    }
  }

  addNewPatient() {
    alert('Add New Patient functionality would open a form here');
  }

  exportQueue() {
    alert('Queue exported successfully');
  }

  sendNotifications() {
    alert('Notifications sent to all waiting patients');
  }

  viewReports() {
    alert('Reports view would open here');
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
} 