import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QueueData {
  department: string;
  currentQueue: number;
  averageWait: string;
  status: 'low' | 'medium' | 'high';
}

interface StatsCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Queue Management Dashboard</h1>
          <p class="header-subtitle">Real-time overview of hospital queue status and performance</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
            </svg>
            Refresh Data
          </button>
          <button class="btn btn-primary">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Add Patient
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card" *ngFor="let stat of statsCards">
          <div class="stat-icon" [ngClass]="'bg-' + getIconColor(stat.icon)">
            <div [innerHTML]="getIconSvg(stat.icon)"></div>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">{{ stat.title }}</h3>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-change" [ngClass]="'text-' + getTrendColor(stat.trend)">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" *ngIf="stat.trend === 'up'">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" *ngIf="stat.trend === 'down'">
                <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{{ stat.change }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Queue Status Grid -->
      <div class="content-grid">
        <!-- Current Queues -->
        <div class="card">
          <div class="card-header">
            <h2>Department Queue Status</h2>
            <span class="badge badge-success">Live</span>
          </div>
          <div class="card-body">
            <div class="queue-list">
              <div class="queue-item" *ngFor="let queue of queueData">
                <div class="queue-info">
                  <div class="queue-department">{{ queue.department }}</div>
                  <div class="queue-meta">
                    <span class="queue-count">{{ queue.currentQueue }} patients</span>
                    <span class="queue-wait">{{ queue.averageWait }} avg wait</span>
                  </div>
                </div>
                <div class="queue-status">
                  <div class="status-indicator" [ngClass]="'status-' + queue.status"></div>
                  <span class="status-text" [ngClass]="'text-' + getStatusColor(queue.status)">
                    {{ getStatusText(queue.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card">
          <div class="card-header">
            <h2>Recent Activity</h2>
            <button class="btn btn-sm btn-outline">View All</button>
          </div>
          <div class="card-body">
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivity">
                <div class="activity-icon" [ngClass]="'bg-' + activity.type">
                  <div [innerHTML]="getActivityIcon(activity.type)"></div>
                </div>
                <div class="activity-content">
                  <div class="activity-title">{{ activity.title }}</div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <div class="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div class="card-body">
            <div class="actions-grid">
              <button class="action-btn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                <span>Register Patient</span>
              </button>
              <button class="action-btn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
                <span>Schedule Appointment</span>
              </button>
              <button class="action-btn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Update Queue</span>
              </button>
              <button class="action-btn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      animation: fadeIn 0.5s ease-out;
    }

    .dashboard-header {
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
      gap: var(--space-md);
      flex-shrink: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

    .stat-title {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0 0 var(--space-xs) 0;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: var(--space-xs);
    }

    .stat-change {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--space-lg);
    }

    .queue-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .queue-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .queue-item:hover {
      border-color: var(--primary-blue);
      background: rgba(0, 102, 204, 0.02);
    }

    .queue-department {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: var(--space-xs);
    }

    .queue-meta {
      display: flex;
      gap: var(--space-md);
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .queue-status {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: var(--radius-full);
    }

    .status-indicator.status-low { background: var(--success); }
    .status-indicator.status-medium { background: var(--warning); }
    .status-indicator.status-high { background: var(--error); }

    .status-text {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }

    .activity-icon.bg-success { background: var(--success); }
    .activity-icon.bg-info { background: var(--info); }
    .activity-icon.bg-warning { background: var(--warning); }

    .activity-title {
      font-weight: 500;
      color: var(--gray-900);
      font-size: 0.875rem;
    }

    .activity-time {
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }

    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-lg);
      background: var(--gray-50);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      color: var(--gray-700);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .action-btn:hover {
      background: var(--white);
      border-color: var(--primary-blue);
      color: var(--primary-blue);
      transform: translateY(-1px);
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: stretch;
      }

      .header-actions {
        justify-content: stretch;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Dashboard {
  statsCards: StatsCard[] = [
    {
      title: 'Total Patients Today',
      value: '247',
      change: '+12% from yesterday',
      trend: 'up',
      icon: 'users'
    },
    {
      title: 'Average Wait Time',
      value: '23m',
      change: '-8% from yesterday',
      trend: 'down',
      icon: 'clock'
    },
    {
      title: 'Active Queues',
      value: '8',
      change: 'Same as yesterday',
      trend: 'stable',
      icon: 'list'
    },
    {
      title: 'Appointments Today',
      value: '156',
      change: '+5% from yesterday',
      trend: 'up',
      icon: 'calendar'
    }
  ];

  queueData: QueueData[] = [
    { department: 'Emergency', currentQueue: 12, averageWait: '15m', status: 'high' },
    { department: 'General Medicine', currentQueue: 8, averageWait: '25m', status: 'medium' },
    { department: 'Pediatrics', currentQueue: 5, averageWait: '18m', status: 'low' },
    { department: 'Cardiology', currentQueue: 15, averageWait: '35m', status: 'high' },
    { department: 'Orthopedics', currentQueue: 6, averageWait: '20m', status: 'low' },
    { department: 'Dermatology', currentQueue: 3, averageWait: '12m', status: 'low' }
  ];

  recentActivity = [
    { title: 'Patient John Doe checked in', time: '2 minutes ago', type: 'success' },
    { title: 'Emergency queue updated', time: '5 minutes ago', type: 'info' },
    { title: 'Dr. Smith completed consultation', time: '8 minutes ago', type: 'success' },
    { title: 'Appointment scheduled for tomorrow', time: '12 minutes ago', type: 'info' },
    { title: 'Queue wait time exceeded threshold', time: '15 minutes ago', type: 'warning' }
  ];

  getIconColor(icon: string): string {
    const colors: { [key: string]: string } = {
      'users': 'primary',
      'clock': 'warning',
      'list': 'info',
      'calendar': 'success'
    };
    return colors[icon] || 'primary';
  }

  getTrendColor(trend: string): string {
    const colors: { [key: string]: string } = {
      'up': 'success',
      'down': 'error',
      'stable': 'muted'
    };
    return colors[trend] || 'muted';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'low': 'success',
      'medium': 'warning',
      'high': 'error'
    };
    return colors[status] || 'muted';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'low': 'Low',
      'medium': 'Moderate',
      'high': 'High'
    };
    return texts[status] || 'Unknown';
  }

  getIconSvg(icon: string): string {
    const icons: { [key: string]: string } = {
      'users': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>',
      'clock': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>',
      'list': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/></svg>',
      'calendar': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>'
    };
    return icons[icon] || '';
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'success': '<svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>',
      'info': '<svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/></svg>',
      'warning': '<svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/></svg>'
    };
    return icons[type] || '';
  }
}
