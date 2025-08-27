import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'procedure' | 'checkup';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="appointments">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1>Appointment Management</h1>
          <p class="header-subtitle">Schedule and manage patient appointments</p>
        </div>
        <div class="header-actions">
          <div class="date-selector">
            <input 
              type="date" 
              class="form-input"
              [(ngModel)]="selectedDate"
              (change)="onDateChange()"
            />
          </div>
          <button class="btn btn-outline">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
            </svg>
            Export Schedule
          </button>
          <button class="btn btn-primary" (click)="showNewAppointmentForm = true">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            New Appointment
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon bg-primary">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ getTodayAppointments().length }}</div>
            <div class="stat-label">Today's Appointments</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-success">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ getCompletedToday().length }}</div>
            <div class="stat-label">Completed Today</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-warning">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ getPendingAppointments().length }}</div>
            <div class="stat-label">Pending Confirmation</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-info">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ getUpcomingAppointments().length }}</div>
            <div class="stat-label">Upcoming This Week</div>
          </div>
        </div>
      </div>

      <!-- New Appointment Form -->
      <div class="appointment-form-overlay" *ngIf="showNewAppointmentForm">
        <div class="appointment-form-modal">
          <div class="form-header">
            <h2>Schedule New Appointment</h2>
            <button class="close-btn" (click)="showNewAppointmentForm = false">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            </button>
          </div>
          
          <form class="appointment-form" (ngSubmit)="createAppointment()" #appointmentForm="ngForm">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Patient Name</label>
                <input 
                  type="text" 
                  class="form-input" 
                  placeholder="Enter patient name"
                  [(ngModel)]="newAppointment.patientName"
                  name="patientName"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Doctor</label>
                <select 
                  class="form-select"
                  [(ngModel)]="newAppointment.doctorName"
                  name="doctorName"
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Dr. Williams">Dr. Williams</option>
                  <option value="Dr. Brown">Dr. Brown</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Department</label>
                <select 
                  class="form-select"
                  [(ngModel)]="newAppointment.department"
                  name="department"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Emergency">Emergency</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Appointment Type</label>
                <select 
                  class="form-select"
                  [(ngModel)]="newAppointment.type"
                  name="type"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="procedure">Procedure</option>
                  <option value="checkup">Checkup</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date</label>
                <input 
                  type="date" 
                  class="form-input"
                  [(ngModel)]="newAppointment.date"
                  name="date"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Time</label>
                <input 
                  type="time" 
                  class="form-input"
                  [(ngModel)]="newAppointment.time"
                  name="time"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Notes (Optional)</label>
              <textarea 
                class="form-textarea" 
                rows="3"
                placeholder="Additional notes or special requirements"
                [(ngModel)]="newAppointment.notes"
                name="notes"
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="showNewAppointmentForm = false">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="appointmentForm.invalid">
                Schedule Appointment
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Appointments List -->
      <div class="appointments-section">
        <div class="section-header">
          <h2>Appointments for {{ formatDate(selectedDate) }}</h2>
          <div class="appointment-filters">
            <button 
              class="filter-btn" 
              [class.active]="activeFilter === 'all'"
              (click)="setFilter('all')"
            >
              All
            </button>
            <button 
              class="filter-btn" 
              [class.active]="activeFilter === 'scheduled'"
              (click)="setFilter('scheduled')"
            >
              Scheduled
            </button>
            <button 
              class="filter-btn" 
              [class.active]="activeFilter === 'confirmed'"
              (click)="setFilter('confirmed')"
            >
              Confirmed
            </button>
            <button 
              class="filter-btn" 
              [class.active]="activeFilter === 'completed'"
              (click)="setFilter('completed')"
            >
              Completed
            </button>
          </div>
        </div>

        <div class="appointments-grid">
          <div class="appointment-card" 
               *ngFor="let appointment of getFilteredAppointments()"
               [ngClass]="'status-' + appointment.status">
            <div class="appointment-time">
              <div class="time">{{ appointment.time }}</div>
              <div class="date">{{ formatDate(appointment.date) }}</div>
            </div>
            
            <div class="appointment-details">
              <div class="patient-name">{{ appointment.patientName }}</div>
              <div class="appointment-meta">
                <span class="doctor">{{ appointment.doctorName }}</span>
                <span class="department">{{ appointment.department }}</span>
                <span class="type">{{ appointment.type | titlecase }}</span>
              </div>
              <div class="appointment-notes" *ngIf="appointment.notes">
                {{ appointment.notes }}
              </div>
            </div>

            <div class="appointment-status">
              <div class="status-badge" [ngClass]="'badge-' + getStatusColor(appointment.status)">
                {{ appointment.status | titlecase }}
              </div>
              <div class="appointment-actions">
                <button class="btn btn-sm btn-outline" *ngIf="appointment.status === 'scheduled'">
                  Confirm
                </button>
                <button class="btn btn-sm btn-success" *ngIf="appointment.status === 'confirmed'">
                  Start
                </button>
                <button class="btn btn-sm btn-secondary" *ngIf="appointment.status === 'in-progress'">
                  Complete
                </button>
                <button class="btn btn-sm btn-outline">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="no-appointments" *ngIf="getFilteredAppointments().length === 0">
          <svg width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
          </svg>
          <h3>No appointments found</h3>
          <p>No appointments scheduled for the selected date and filter.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointments {
      animation: fadeIn 0.5s ease-out;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-xl);
      gap: var(--space-lg);
    }

    .header-content h1 {
      margin: 0 0 var(--space-sm) 0;
      color: var(--gray-900);
    }

    .header-subtitle {
      color: var(--gray-600);
      margin: 0;
      font-size: 1rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      flex-shrink: 0;
    }

    .date-selector input {
      min-width: 150px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-lg);
      margin-bottom: var(--space-xl);
    }

    .stat-card {
      background: var(--white);
      padding: var(--space-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      display: flex;
      align-items: center;
      gap: var(--space-md);
      transition: all var(--transition-normal);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }

    .stat-icon.bg-primary { background: var(--gradient-primary); }
    .stat-icon.bg-success { background: var(--gradient-success); }
    .stat-icon.bg-warning { background: var(--accent-orange); }
    .stat-icon.bg-info { background: var(--primary-blue-light); }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: var(--space-xs);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 500;
    }

    .appointment-form-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: var(--space-lg);
    }

    .appointment-form-modal {
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg);
      border-bottom: 1px solid var(--gray-200);
    }

    .form-header h2 {
      margin: 0;
      color: var(--gray-900);
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: var(--space-sm);
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast);
    }

    .close-btn:hover {
      color: var(--gray-600);
    }

    .appointment-form {
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-md);
      margin-top: var(--space-lg);
    }

    .appointments-section {
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      overflow: hidden;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg);
      border-bottom: 1px solid var(--gray-200);
      background: var(--gradient-card);
    }

    .section-header h2 {
      margin: 0;
      color: var(--gray-900);
    }

    .appointment-filters {
      display: flex;
      gap: var(--space-sm);
    }

    .filter-btn {
      padding: var(--space-sm) var(--space-md);
      background: transparent;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-600);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .filter-btn:hover {
      background: var(--gray-50);
      border-color: var(--gray-400);
    }

    .filter-btn.active {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
      color: var(--white);
    }

    .appointments-grid {
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .appointment-card {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      padding: var(--space-lg);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      transition: all var(--transition-fast);
    }

    .appointment-card:hover {
      border-color: var(--primary-blue);
      box-shadow: var(--shadow-md);
    }

    .appointment-card.status-confirmed {
      border-left: 4px solid var(--success);
    }

    .appointment-card.status-in-progress {
      border-left: 4px solid var(--info);
      background: rgba(0, 102, 204, 0.02);
    }

    .appointment-card.status-completed {
      border-left: 4px solid var(--success);
      background: rgba(40, 167, 69, 0.02);
    }

    .appointment-time {
      text-align: center;
      min-width: 80px;
    }

    .time {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-blue);
    }

    .date {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin-top: var(--space-xs);
    }

    .appointment-details {
      flex: 1;
    }

    .patient-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: var(--space-xs);
    }

    .appointment-meta {
      display: flex;
      gap: var(--space-lg);
      font-size: 0.875rem;
      color: var(--gray-600);
      margin-bottom: var(--space-xs);
    }

    .appointment-notes {
      font-size: 0.875rem;
      color: var(--gray-500);
      font-style: italic;
    }

    .appointment-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-sm);
    }

    .status-badge {
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .appointment-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .no-appointments {
      text-align: center;
      padding: var(--space-3xl);
      color: var(--gray-500);
    }

    .no-appointments svg {
      margin-bottom: var(--space-lg);
      opacity: 0.5;
    }

    .no-appointments h3 {
      margin: 0 0 var(--space-sm) 0;
      color: var(--gray-700);
    }

    .no-appointments p {
      margin: 0;
      max-width: 400px;
      margin: 0 auto;
    }

    .badge-scheduled { background: var(--warning); color: var(--gray-900); }
    .badge-confirmed { background: var(--success); color: var(--white); }
    .badge-in-progress { background: var(--info); color: var(--white); }
    .badge-completed { background: var(--success); color: var(--white); }
    .badge-cancelled { background: var(--error); color: var(--white); }

    @media (max-width: 1024px) {
      .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-md);
      }

      .header-actions {
        justify-content: space-between;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .appointment-card {
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-md);
      }

      .appointment-time {
        text-align: left;
      }

      .appointment-status {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        gap: var(--space-md);
        align-items: stretch;
      }

      .appointment-filters {
        justify-content: center;
      }
    }
  `]
})
export class Appointments {
  selectedDate = new Date().toISOString().split('T')[0];
  activeFilter = 'all';
  showNewAppointmentForm = false;

  newAppointment = {
    patientName: '',
    doctorName: '',
    department: '',
    type: '',
    date: '',
    time: '',
    notes: ''
  };

  appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      department: 'Cardiology',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      type: 'consultation',
      status: 'confirmed',
      notes: 'First-time consultation for chest pain'
    },
    {
      id: '2',
      patientName: 'Sarah Wilson',
      doctorName: 'Dr. Johnson',
      department: 'General Medicine',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      type: 'checkup',
      status: 'scheduled'
    },
    {
      id: '3',
      patientName: 'Michael Brown',
      doctorName: 'Dr. Williams',
      department: 'Orthopedics',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      type: 'follow-up',
      status: 'in-progress'
    },
    {
      id: '4',
      patientName: 'Emily Davis',
      doctorName: 'Dr. Brown',
      department: 'Pediatrics',
      date: new Date().toISOString().split('T')[0],
      time: '16:30',
      type: 'procedure',
      status: 'completed'
    }
  ];

  onDateChange() {
    // Filter appointments based on selected date
    console.log('Date changed to:', this.selectedDate);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getFilteredAppointments(): Appointment[] {
    let filtered = this.appointments.filter(apt => apt.date === this.selectedDate);
    
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === this.activeFilter);
    }
    
    return filtered.sort((a, b) => a.time.localeCompare(b.time));
  }

  getTodayAppointments(): Appointment[] {
    const today = new Date().toISOString().split('T')[0];
    return this.appointments.filter(apt => apt.date === today);
  }

  getCompletedToday(): Appointment[] {
    const today = new Date().toISOString().split('T')[0];
    return this.appointments.filter(apt => apt.date === today && apt.status === 'completed');
  }

  getPendingAppointments(): Appointment[] {
    return this.appointments.filter(apt => apt.status === 'scheduled');
  }

  getUpcomingAppointments(): Appointment[] {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && aptDate <= nextWeek;
    });
  }

  createAppointment() {
    if (this.newAppointment.patientName && this.newAppointment.doctorName) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        patientName: this.newAppointment.patientName,
        doctorName: this.newAppointment.doctorName,
        department: this.newAppointment.department,
        date: this.newAppointment.date,
        time: this.newAppointment.time,
        type: this.newAppointment.type as any,
        status: 'scheduled',
        notes: this.newAppointment.notes
      };

      this.appointments.push(appointment);
      this.showNewAppointmentForm = false;
      this.resetForm();
    }
  }

  resetForm() {
    this.newAppointment = {
      patientName: '',
      doctorName: '',
      department: '',
      type: '',
      date: '',
      time: '',
      notes: ''
    };
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'scheduled': 'scheduled',
      'confirmed': 'confirmed',
      'in-progress': 'in-progress',
      'completed': 'completed',
      'cancelled': 'cancelled'
    };
    return colors[status] || 'scheduled';
  }
}
