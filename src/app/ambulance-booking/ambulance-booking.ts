import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

interface AmbulanceBookingData {
  id?: number;
  patient_name: string;
  phone: string;
  emergency_contact?: string;
  emergency_contact_phone?: string;
  pickup_address: string;
  destination?: string;
  emergency_level: 'low' | 'medium' | 'high' | 'critical';
  symptoms?: string;
  additional_notes?: string;
  status?: string;
  estimated_arrival?: string;
  created_at?: string;
}

@Component({
  selector: 'app-ambulance-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  template: `
    <div class="ambulance-container emergency-bg">
      <app-navbar></app-navbar>
      
      <div class="ambulance-content">
        <div class="hero-section emergency-hero">
          <div class="hero-content">
            <h1 class="emergency-title">🚑 Emergency Ambulance Service</h1>
            <p class="emergency-subtitle">Get immediate medical assistance when you need it most</p>
            <div class="emergency-alert">
              <div class="alert-icon">⚠️</div>
              <div class="alert-text">
                <strong>For life-threatening emergencies, call 999 immediately!</strong>
                <br>This service is for non-critical medical transport needs.
              </div>
            </div>
          </div>
          
          <!-- Emergency Background Elements -->
          <div class="emergency-bg-elements">
            <div class="pulse-circle pulse-1"></div>
            <div class="pulse-circle pulse-2"></div>
            <div class="pulse-circle pulse-3"></div>
          </div>
        </div>

        <div class="booking-section">
          <!-- Emergency Booking Form -->
          <div class="emergency-form-card">
            <div class="form-header">
              <h2>🚨 Request Emergency Ambulance</h2>
              <p>Fill out the form below to request immediate medical transport</p>
            </div>
            
            <form class="emergency-form" (ngSubmit)="bookAmbulance()" #ambulanceForm="ngForm">
              <!-- Emergency Level Selection -->
              <div class="emergency-level-section">
                <label class="form-label">Emergency Level *</label>
                <div class="emergency-level-options">
                  <div class="level-option" 
                       [class.selected]="newBooking.emergency_level === 'low'"
                       (click)="selectEmergencyLevel('low')">
                    <div class="level-indicator low"></div>
                    <div class="level-info">
                      <span class="level-name">Low Priority</span>
                      <span class="level-desc">Non-urgent transport</span>
                    </div>
                  </div>
                  
                  <div class="level-option" 
                       [class.selected]="newBooking.emergency_level === 'medium'"
                       (click)="selectEmergencyLevel('medium')">
                    <div class="level-indicator medium"></div>
                    <div class="level-info">
                      <span class="level-name">Medium Priority</span>
                      <span class="level-desc">Urgent but stable</span>
                    </div>
                  </div>
                  
                  <div class="level-option" 
                       [class.selected]="newBooking.emergency_level === 'high'"
                       (click)="selectEmergencyLevel('high')">
                    <div class="level-indicator high"></div>
                    <div class="level-info">
                      <span class="level-name">High Priority</span>
                      <span class="level-desc">Serious condition</span>
                    </div>
                  </div>
                  
                  <div class="level-option" 
                       [class.selected]="newBooking.emergency_level === 'critical'"
                       (click)="selectEmergencyLevel('critical')">
                    <div class="level-indicator critical"></div>
                    <div class="level-info">
                      <span class="level-name">Critical Emergency</span>
                      <span class="level-desc">Life-threatening</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Patient Information -->
              <div class="form-section">
                <h3>Patient Information</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="patient_name">Full Name *</label>
                    <input
                      type="text"
                      id="patient_name"
                      name="patient_name"
                      class="form-input"
                      placeholder="Enter patient's full name"
                      [(ngModel)]="newBooking.patient_name"
                      required
                      #patientName="ngModel"
                    />
                    <div class="form-error" *ngIf="patientName.invalid && patientName.touched">
                      Patient name is required
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      class="form-input"
                      placeholder="Enter contact phone number"
                      [(ngModel)]="newBooking.phone"
                      required
                      #phone="ngModel"
                    />
                    <div class="form-error" *ngIf="phone.invalid && phone.touched">
                      Phone number is required
                    </div>
                  </div>
                </div>
              </div>

              <!-- Emergency Contact -->
              <div class="form-section">
                <h3>Emergency Contact (Optional)</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="emergency_contact">Emergency Contact Name</label>
                    <input
                      type="text"
                      id="emergency_contact"
                      name="emergency_contact"
                      class="form-input"
                      placeholder="Name of emergency contact"
                      [(ngModel)]="newBooking.emergency_contact"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="emergency_contact_phone">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      id="emergency_contact_phone"
                      name="emergency_contact_phone"
                      class="form-input"
                      placeholder="Emergency contact phone number"
                      [(ngModel)]="newBooking.emergency_contact_phone"
                    />
                  </div>
                </div>
              </div>

              <!-- Location Information -->
              <div class="form-section">
                <h3>Location Information</h3>
                <div class="form-group">
                  <label for="pickup_address">Pickup Address *</label>
                  <textarea
                    id="pickup_address"
                    name="pickup_address"
                    class="form-textarea"
                    rows="3"
                    placeholder="Enter the exact pickup address including street, city, and landmarks"
                    [(ngModel)]="newBooking.pickup_address"
                    required
                    #pickupAddress="ngModel"
                  ></textarea>
                  <div class="form-error" *ngIf="pickupAddress.invalid && pickupAddress.touched">
                    Pickup address is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="destination">Destination Hospital (Optional)</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    class="form-input"
                    placeholder="Preferred hospital or medical facility"
                    [(ngModel)]="newBooking.destination"
                  />
                </div>
              </div>

              <!-- Medical Information -->
              <div class="form-section">
                <h3>Medical Information</h3>
                <div class="form-group">
                  <label for="symptoms">Symptoms/Medical Condition</label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    class="form-textarea"
                    rows="3"
                    placeholder="Describe the symptoms or medical condition requiring transport"
                    [(ngModel)]="newBooking.symptoms"
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="additional_notes">Additional Notes</label>
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    class="form-textarea"
                    rows="2"
                    placeholder="Any additional information that might help emergency responders"
                    [(ngModel)]="newBooking.additional_notes"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button
                  type="submit"
                  class="btn btn-emergency btn-large"
                  [disabled]="ambulanceForm.invalid || isBooking"
                >
                  <span *ngIf="!isBooking">
                    <span class="btn-icon">🚑</span>
                    Request Emergency Ambulance
                  </span>
                  <span *ngIf="isBooking">
                    <span class="btn-icon">⏳</span>
                    Processing Request...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Emergency Information Panel -->
          <div class="emergency-info-card">
            <div class="info-header">
              <h3>📋 Emergency Information</h3>
            </div>
            
            <div class="info-content">
              <div class="info-section">
                <h4>🚨 When to Call 999</h4>
                <ul class="emergency-list">
                  <li>Chest pain or heart attack symptoms</li>
                  <li>Severe bleeding that won't stop</li>
                  <li>Difficulty breathing</li>
                  <li>Unconsciousness or unresponsiveness</li>
                  <li>Severe head injury</li>
                  <li>Stroke symptoms (FAST)</li>
                </ul>
              </div>
              
              <div class="info-section">
                <h4>⏱️ Response Times</h4>
                <div class="response-times">
                  <div class="response-item">
                    <span class="response-level critical">Critical</span>
                    <span class="response-time">10-15 minutes</span>
                  </div>
                  <div class="response-item">
                    <span class="response-level high">High</span>
                    <span class="response-time">15-25 minutes</span>
                  </div>
                  <div class="response-item">
                    <span class="response-level medium">Medium</span>
                    <span class="response-time">25-35 minutes</span>
                  </div>
                  <div class="response-item">
                    <span class="response-level low">Low</span>
                    <span class="response-time">35-45 minutes</span>
                  </div>
                </div>
              </div>
              
              <div class="info-section">
                <h4>📞 Contact Information</h4>
                <div class="contact-info">
                  <div class="contact-item">
                    <span class="contact-label">Emergency Services:</span>
                    <span class="contact-value">999</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Ambulance Service:</span>
                    <span class="contact-value">0800 123 456</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Hospital Emergency:</span>
                    <span class="contact-value">0800 789 012</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Bookings -->
        <div class="recent-bookings-section" *ngIf="recentBookings.length > 0">
          <div class="section-header">
            <h2>Recent Ambulance Requests</h2>
            <p>Track your recent emergency transport requests</p>
          </div>
          
          <div class="bookings-grid">
            <div class="booking-card" *ngFor="let booking of recentBookings" [class]="'level-' + booking.emergency_level">
              <div class="booking-header">
                <div class="booking-status" [class]="'status-' + booking.status">
                  {{ booking.status | titlecase }}
                </div>
                <div class="booking-time">
                  {{ formatDate(booking.created_at) }}
                </div>
              </div>
              
              <div class="booking-details">
                <h4>{{ booking.patient_name }}</h4>
                <p class="booking-phone">{{ booking.phone }}</p>
                <p class="booking-address">{{ booking.pickup_address }}</p>
                <p class="booking-symptoms" *ngIf="booking.symptoms">{{ booking.symptoms }}</p>
              </div>
              
              <div class="booking-actions">
                <button class="btn btn-outline btn-sm" (click)="trackBooking(booking)">
                  Track Status
                </button>
                <button class="btn btn-secondary btn-sm" (click)="cancelBooking(booking)" *ngIf="booking.status === 'requested'">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ambulance-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%);
      position: relative;
      overflow: hidden;
    }

    .emergency-bg::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 20, 147, 0.05) 0%, transparent 50%);
      animation: emergency-pulse 4s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes emergency-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }

    .ambulance-content {
      padding-top: 70px;
      position: relative;
      z-index: 1;
    }

    .hero-section {
      text-align: center;
      padding: 3rem 2rem;
      position: relative;
      overflow: hidden;
    }

    .emergency-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ff6b6b, #e94560, #ff1493);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      text-shadow: 0 0 30px rgba(233, 69, 96, 0.5);
      animation: emergency-glow 3s ease-in-out infinite alternate;
    }

    @keyframes emergency-glow {
      0% { text-shadow: 0 0 30px rgba(233, 69, 96, 0.5); }
      100% { text-shadow: 0 0 50px rgba(255, 107, 107, 0.8); }
    }

    .emergency-subtitle {
      font-size: 1.25rem;
      color: #e2e8f0;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .emergency-alert {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: rgba(255, 107, 107, 0.1);
      border: 2px solid rgba(255, 107, 107, 0.3);
      border-radius: 1rem;
      padding: 1.5rem;
      margin: 2rem auto;
      max-width: 600px;
      backdrop-filter: blur(10px);
    }

    .alert-icon {
      font-size: 2rem;
      animation: alert-pulse 2s ease-in-out infinite;
    }

    @keyframes alert-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .alert-text {
      color: #ffffff;
      text-align: left;
      line-height: 1.6;
    }

    .emergency-bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1;
    }

    .pulse-circle {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(255, 107, 107, 0.3);
      animation: pulse-animation 3s ease-in-out infinite;
    }

    .pulse-1 {
      width: 100px;
      height: 100px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .pulse-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 1s;
    }

    .pulse-3 {
      width: 80px;
      height: 80px;
      bottom: 30%;
      left: 50%;
      animation-delay: 2s;
    }

    @keyframes pulse-animation {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.2); opacity: 0.3; }
      100% { transform: scale(1); opacity: 0.7; }
    }

    .booking-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .emergency-form-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .emergency-form-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 107, 107, 0.3);
    }

    .form-header {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(233, 69, 96, 0.1));
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .form-header h2 {
      color: #ff6b6b;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    }

    .form-header p {
      color: #e2e8f0;
      margin: 0;
      opacity: 0.8;
    }

    .emergency-form {
      padding: 2rem;
    }

    .emergency-level-section {
      margin-bottom: 2rem;
    }

    .emergency-level-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .level-option {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.05);
    }

    .level-option:hover {
      border-color: rgba(255, 107, 107, 0.3);
      background: rgba(255, 107, 107, 0.1);
    }

    .level-option.selected {
      border-color: #ff6b6b;
      background: rgba(255, 107, 107, 0.2);
      box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
    }

    .level-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .level-indicator.low { background: #10b981; }
    .level-indicator.medium { background: #f59e0b; }
    .level-indicator.high { background: #ef4444; }
    .level-indicator.critical { background: #dc2626; }

    .level-info {
      display: flex;
      flex-direction: column;
    }

    .level-name {
      font-weight: 600;
      color: #ffffff;
      font-size: 0.9rem;
    }

    .level-desc {
      color: #cbd5e1;
      font-size: 0.8rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h3 {
      color: #ff6b6b;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 107, 107, 0.3);
      padding-bottom: 0.5rem;
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

    .form-label {
      display: block;
      color: #e2e8f0;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
      font-size: 1rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      resize: vertical;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #ff6b6b;
      box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
      background: rgba(255, 255, 255, 0.1);
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
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

    .form-actions {
      margin-top: 2rem;
      text-align: center;
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
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-emergency {
      background: linear-gradient(135deg, #ff6b6b, #e94560);
      color: white;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      font-size: 1.1rem;
      padding: 1rem 2rem;
    }

    .btn-emergency:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }

    .btn-emergency:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    .emergency-info-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      overflow: hidden;
      height: fit-content;
    }

    .info-header {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(233, 69, 96, 0.1));
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .info-header h3 {
      color: #ff6b6b;
      font-size: 1.3rem;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    }

    .info-content {
      padding: 1.5rem;
    }

    .info-section {
      margin-bottom: 2rem;
    }

    .info-section:last-child {
      margin-bottom: 0;
    }

    .info-section h4 {
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .emergency-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .emergency-list li {
      color: #cbd5e1;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      padding-left: 1.5rem;
    }

    .emergency-list li::before {
      content: '⚠️';
      position: absolute;
      left: 0;
      top: 0.5rem;
    }

    .emergency-list li:last-child {
      border-bottom: none;
    }

    .response-times {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .response-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
      border-left: 4px solid;
    }

    .response-item:nth-child(1) { border-left-color: #dc2626; }
    .response-item:nth-child(2) { border-left-color: #ef4444; }
    .response-item:nth-child(3) { border-left-color: #f59e0b; }
    .response-item:nth-child(4) { border-left-color: #10b981; }

    .response-level {
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
    }

    .response-level.critical { color: #dc2626; }
    .response-level.high { color: #ef4444; }
    .response-level.medium { color: #f59e0b; }
    .response-level.low { color: #10b981; }

    .response-time {
      color: #cbd5e1;
      font-size: 0.9rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
    }

    .contact-label {
      color: #cbd5e1;
      font-size: 0.9rem;
    }

    .contact-value {
      color: #ffffff;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .recent-bookings-section {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .section-header h2 {
      color: #ffffff;
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .section-header p {
      color: #cbd5e1;
      margin: 0;
    }

    .bookings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .booking-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .booking-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .booking-card.level-critical { border-left: 4px solid #dc2626; }
    .booking-card.level-high { border-left: 4px solid #ef4444; }
    .booking-card.level-medium { border-left: 4px solid #f59e0b; }
    .booking-card.level-low { border-left: 4px solid #10b981; }

    .booking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .booking-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-requested { background: #f59e0b; color: #92400e; }
    .status-dispatched { background: #3b82f6; color: #1e40af; }
    .status-en_route { background: #8b5cf6; color: #5b21b6; }
    .status-arrived { background: #10b981; color: #065f46; }
    .status-completed { background: #059669; color: #064e3b; }
    .status-cancelled { background: #ef4444; color: #991b1b; }

    .booking-time {
      color: #cbd5e1;
      font-size: 0.8rem;
    }

    .booking-details h4 {
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .booking-phone,
    .booking-address,
    .booking-symptoms {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin: 0.25rem 0;
    }

    .booking-symptoms {
      font-style: italic;
      opacity: 0.8;
    }

    .booking-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .btn-outline {
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
    }

    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #6b7280, #4b5563);
      color: white;
    }

    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .booking-section {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .emergency-title {
        font-size: 2rem;
      }

      .emergency-level-options {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .bookings-grid {
        grid-template-columns: 1fr;
      }

      .booking-section {
        padding: 1rem;
      }

      .recent-bookings-section {
        padding: 1rem;
      }
    }
  `]
})
export class AmbulanceBooking implements OnInit {
  newBooking: AmbulanceBookingData = {
    patient_name: '',
    phone: '',
    emergency_contact: '',
    emergency_contact_phone: '',
    pickup_address: '',
    destination: '',
    emergency_level: 'medium',
    symptoms: '',
    additional_notes: ''
  };

  recentBookings: AmbulanceBookingData[] = [];
  isBooking = false;

  ngOnInit() {
    this.loadMockData();
  }

  selectEmergencyLevel(level: 'low' | 'medium' | 'high' | 'critical') {
    this.newBooking.emergency_level = level;
  }

  bookAmbulance() {
    if (this.isBooking) return;

    this.isBooking = true;
    
    // Simulate API call
    setTimeout(() => {
      const booking: AmbulanceBookingData = {
        ...this.newBooking,
        id: Date.now(),
        status: 'requested',
        created_at: new Date().toISOString()
      };

      this.recentBookings.unshift(booking);
      
      // Reset form
      this.newBooking = {
        patient_name: '',
        phone: '',
        emergency_contact: '',
        emergency_contact_phone: '',
        pickup_address: '',
        destination: '',
        emergency_level: 'medium',
        symptoms: '',
        additional_notes: ''
      };

      this.isBooking = false;
      
      // Show success message
      alert('Emergency ambulance request submitted successfully! You will receive a confirmation call shortly.');
    }, 2000);
  }

  trackBooking(booking: AmbulanceBookingData) {
    alert(`Tracking booking #${booking.id} - Status: ${booking.status}`);
  }

  cancelBooking(booking: AmbulanceBookingData) {
    if (confirm('Are you sure you want to cancel this ambulance request?')) {
      booking.status = 'cancelled';
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  loadMockData() {
    // Mock data for demonstration
    this.recentBookings = [
      {
        id: 1,
        patient_name: 'John Doe',
        phone: '+263 77 123 4567',
        pickup_address: '123 Main Street, Harare',
        emergency_level: 'high',
        status: 'dispatched',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
      },
      {
        id: 2,
        patient_name: 'Jane Smith',
        phone: '+263 77 987 6543',
        pickup_address: '456 Oak Avenue, Bulawayo',
        emergency_level: 'medium',
        status: 'requested',
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
      }
    ];
  }
}
