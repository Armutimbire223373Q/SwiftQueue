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
      background: #f8fafc;
    }

    .staff-content {
      padding-top: 70px;
    }

    .hero-section {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
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
      grid-template-columns: 1fr 1fr;
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

    .queue-overview-card {
      grid-column: 1 / -1;
    }

    .queue-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      padding: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #059669;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .current-queue-card {
      grid-column: 1 / 2;
    }

    .queue-list {
      padding: 1.5rem;
    }

    .queue-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      transition: all 0.15s ease;
    }

    .queue-item:hover {
      border-color: #059669;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .queue-item:last-child {
      margin-bottom: 0;
    }

    .queue-position {
      width: 40px;
      height: 40px;
      background: #059669;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .patient-info {
      flex: 1;
    }

    .patient-info h4 {
      margin: 0 0 0.25rem 0;
      color: #111827;
    }

    .patient-info p {
      margin: 0 0 0.125rem 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .department {
      color: #059669 !important;
      font-weight: 500;
    }

    .estimated-wait {
      color: #dc2626 !important;
      font-weight: 500;
    }

    .queue-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .appointments-card {
      grid-column: 2 / 3;
    }

    .appointments-filters {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 1rem;
    }

    .filter-select {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }

    .appointments-list {
      padding: 1.5rem;
      max-height: 500px;
      overflow-y: auto;
    }

    .appointment-item {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      transition: all 0.15s ease;
    }

    .appointment-item:hover {
      border-color: #059669;
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

    .appointment-time {
      text-align: center;
    }

    .time {
      display: block;
      font-size: 1.125rem;
      font-weight: 700;
      color: #059669;
    }

    .date {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      text-transform: uppercase;
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

    .status-delayed {
      background: #fef3c7;
      color: #92400e;
    }

    .status-skipped {
      background: #fee2e2;
      color: #991b1b;
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

    .queue-info {
      color: #059669 !important;
      font-weight: 500;
    }

    .appointment-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .quick-actions-card {
      grid-column: 1 / -1;
    }

    .quick-actions {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
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
      background: #059669;
      color: white;
    }

    .btn-primary:hover {
      background: #047857;
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: #059669;
      border: 1px solid #059669;
    }

    .btn-outline:hover {
      background: #059669;
      color: white;
    }

    .btn-success {
      background: #059669;
      color: white;
    }

    .btn-warning {
      background: #d97706;
      color: white;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }

    .empty-queue {
      text-align: center;
      padding: 3rem 1.5rem;
      color: #6b7280;
    }

    .empty-queue svg {
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-queue h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }

    .empty-queue p {
      margin: 0;
    }

    @media (max-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .current-queue-card,
      .appointments-card {
        grid-column: 1 / -1;
      }
      
      .queue-stats {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .queue-stats {
        grid-template-columns: 1fr;
      }
      
      .queue-item {
        flex-direction: column;
        text-align: center;
      }
      
      .queue-actions {
        justify-content: center;
      }
      
      .appointments-filters {
        flex-direction: column;
      }
      
      .quick-actions {
        grid-template-columns: 1fr;
      }
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