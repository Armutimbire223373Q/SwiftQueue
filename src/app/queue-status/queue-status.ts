import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Patient {
  id: string;
  name: string;
  ticketNumber: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedWait: string;
  status: 'waiting' | 'in-progress' | 'completed';
  checkInTime: string;
}

interface Department {
  name: string;
  currentlyServing: string;
  queueLength: number;
  averageWait: string;
  status: 'active' | 'paused' | 'closed';
}

@Component({
  selector: 'app-queue-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="queue-status">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1>Live Queue Status</h1>
          <p class="header-subtitle">Real-time monitoring of all department queues</p>
        </div>
        <div class="header-actions">
          <div class="status-indicator">
            <div class="indicator-dot"></div>
            <span>Live Updates</span>
          </div>
          <button class="btn btn-outline">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
            </svg>
            Refresh
          </button>
          <button class="btn btn-primary">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Call Next Patient
          </button>
        </div>
      </div>

      <!-- Department Overview -->
      <div class="departments-grid">
        <div class="department-card" *ngFor="let dept of departments" [ngClass]="'status-' + dept.status">
          <div class="dept-header">
            <h3>{{ dept.name }}</h3>
            <div class="dept-status" [ngClass]="'badge-' + getStatusColor(dept.status)">
              {{ dept.status | titlecase }}
            </div>
          </div>
          <div class="dept-stats">
            <div class="stat">
              <div class="stat-label">Currently Serving</div>
              <div class="stat-value">{{ dept.currentlyServing }}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Queue Length</div>
              <div class="stat-value">{{ dept.queueLength }}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Avg Wait</div>
              <div class="stat-value">{{ dept.averageWait }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Queue -->
      <div class="queue-section">
        <div class="section-header">
          <h2>Patient Queue</h2>
          <div class="queue-filters">
            <button class="filter-btn active" (click)="setActiveFilter('all')">All</button>
            <button class="filter-btn" (click)="setActiveFilter('waiting')">Waiting</button>
            <button class="filter-btn" (click)="setActiveFilter('in-progress')">In Progress</button>
            <button class="filter-btn" (click)="setActiveFilter('urgent')">Urgent</button>
          </div>
        </div>

        <div class="queue-list">
          <div class="queue-item" 
               *ngFor="let patient of getFilteredPatients()" 
               [ngClass]="'priority-' + patient.priority">
            <div class="patient-info">
              <div class="patient-header">
                <div class="ticket-number">{{ patient.ticketNumber }}</div>
                <div class="priority-badge" [ngClass]="'badge-' + getPriorityColor(patient.priority)">
                  {{ patient.priority | titlecase }}
                </div>
              </div>
              <div class="patient-name">{{ patient.name }}</div>
              <div class="patient-details">
                <span class="department">{{ patient.department }}</span>
                <span class="check-in">Checked in: {{ patient.checkInTime }}</span>
              </div>
            </div>
            
            <div class="queue-status">
              <div class="wait-time">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
                <span>{{ patient.estimatedWait }}</span>
              </div>
              <div class="status-badge" [ngClass]="'badge-' + getStatusColor(patient.status)">
                {{ patient.status | titlecase }}
              </div>
            </div>

            <div class="queue-actions">
              <button class="btn btn-sm btn-outline" *ngIf="patient.status === 'waiting'">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Call
              </button>
              <button class="btn btn-sm btn-secondary" *ngIf="patient.status === 'in-progress'">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Complete
              </button>
              <button class="btn btn-sm btn-outline">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
                Info
              </button>
            </div>
          </div>
        </div>

        <div class="queue-empty" *ngIf="getFilteredPatients().length === 0">
          <svg width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
          </svg>
          <h3>No patients in queue</h3>
          <p>All patients have been served or there are no patients matching the current filter.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .queue-status {
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

    .status-indicator {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--gray-700);
    }

    .indicator-dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .departments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-lg);
      margin-bottom: var(--space-2xl);
    }

    .department-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      padding: var(--space-lg);
      transition: all var(--transition-normal);
      border-left: 4px solid var(--gray-300);
    }

    .department-card.status-active {
      border-left-color: var(--success);
    }

    .department-card.status-paused {
      border-left-color: var(--warning);
    }

    .department-card.status-closed {
      border-left-color: var(--error);
    }

    .department-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }

    .dept-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
    }

    .dept-header h3 {
      margin: 0;
      color: var(--gray-900);
      font-size: 1.125rem;
    }

    .dept-status {
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .dept-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
    }

    .stat {
      text-align: center;
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin-bottom: var(--space-xs);
      text-transform: uppercase;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .queue-section {
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

    .queue-filters {
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

    .queue-list {
      max-height: 600px;
      overflow-y: auto;
    }

    .queue-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-lg);
      border-bottom: 1px solid var(--gray-100);
      transition: all var(--transition-fast);
      gap: var(--space-lg);
    }

    .queue-item:hover {
      background: var(--gray-50);
    }

    .queue-item.priority-urgent {
      background: rgba(220, 53, 69, 0.05);
      border-left: 4px solid var(--error);
    }

    .queue-item.priority-high {
      background: rgba(255, 193, 7, 0.05);
      border-left: 4px solid var(--warning);
    }

    .patient-info {
      flex: 1;
    }

    .patient-header {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-bottom: var(--space-sm);
    }

    .ticket-number {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-blue);
      font-family: var(--font-mono);
    }

    .priority-badge {
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .patient-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: var(--space-xs);
    }

    .patient-details {
      display: flex;
      gap: var(--space-lg);
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .queue-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
    }

    .wait-time {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .status-badge {
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .queue-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .queue-empty {
      text-align: center;
      padding: var(--space-3xl);
      color: var(--gray-500);
    }

    .queue-empty svg {
      margin-bottom: var(--space-lg);
      opacity: 0.5;
    }

    .queue-empty h3 {
      margin: 0 0 var(--space-sm) 0;
      color: var(--gray-700);
    }

    .queue-empty p {
      margin: 0;
      max-width: 400px;
      margin: 0 auto;
    }

    .badge-success { background: var(--success); color: var(--white); }
    .badge-warning { background: var(--warning); color: var(--gray-900); }
    .badge-error { background: var(--error); color: var(--white); }
    .badge-info { background: var(--info); color: var(--white); }
    .badge-primary { background: var(--primary-blue); color: var(--white); }

    @media (max-width: 1024px) {
      .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-md);
      }

      .header-actions {
        justify-content: space-between;
      }

      .departments-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .queue-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-md);
      }

      .patient-header {
        justify-content: space-between;
      }

      .queue-status {
        flex-direction: row;
        justify-content: space-between;
      }

      .queue-actions {
        justify-content: center;
      }

      .section-header {
        flex-direction: column;
        gap: var(--space-md);
        align-items: stretch;
      }

      .queue-filters {
        justify-content: center;
      }
    }
  `]
})
export class QueueStatus {
  activeFilter = 'all';

  departments: Department[] = [
    { name: 'Emergency', currentlyServing: 'E-045', queueLength: 12, averageWait: '15m', status: 'active' },
    { name: 'General Medicine', currentlyServing: 'G-023', queueLength: 8, averageWait: '25m', status: 'active' },
    { name: 'Pediatrics', currentlyServing: 'P-012', queueLength: 5, averageWait: '18m', status: 'active' },
    { name: 'Cardiology', currentlyServing: 'C-008', queueLength: 15, averageWait: '35m', status: 'paused' },
    { name: 'Orthopedics', currentlyServing: 'O-005', queueLength: 6, averageWait: '20m', status: 'active' },
    { name: 'Dermatology', currentlyServing: '-', queueLength: 0, averageWait: '0m', status: 'closed' }
  ];

  patients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      ticketNumber: 'E-046',
      department: 'Emergency',
      priority: 'urgent',
      estimatedWait: '5m',
      status: 'waiting',
      checkInTime: '09:15 AM'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      ticketNumber: 'G-024',
      department: 'General Medicine',
      priority: 'medium',
      estimatedWait: '12m',
      status: 'waiting',
      checkInTime: '09:30 AM'
    },
    {
      id: '3',
      name: 'Michael Brown',
      ticketNumber: 'P-013',
      department: 'Pediatrics',
      priority: 'high',
      estimatedWait: '8m',
      status: 'in-progress',
      checkInTime: '09:45 AM'
    },
    {
      id: '4',
      name: 'Emily Davis',
      ticketNumber: 'C-009',
      department: 'Cardiology',
      priority: 'medium',
      estimatedWait: '20m',
      status: 'waiting',
      checkInTime: '10:00 AM'
    },
    {
      id: '5',
      name: 'David Miller',
      ticketNumber: 'O-006',
      department: 'Orthopedics',
      priority: 'low',
      estimatedWait: '15m',
      status: 'waiting',
      checkInTime: '10:15 AM'
    }
  ];

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }

  getFilteredPatients(): Patient[] {
    if (this.activeFilter === 'all') {
      return this.patients;
    }
    if (this.activeFilter === 'urgent') {
      return this.patients.filter(p => p.priority === 'urgent');
    }
    return this.patients.filter(p => p.status === this.activeFilter);
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': 'success',
      'paused': 'warning',
      'closed': 'error',
      'waiting': 'warning',
      'in-progress': 'info',
      'completed': 'success'
    };
    return colors[status] || 'primary';
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'low': 'success',
      'medium': 'warning',
      'high': 'error',
      'urgent': 'error'
    };
    return colors[priority] || 'primary';
  }
}
