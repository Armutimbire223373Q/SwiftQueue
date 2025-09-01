import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  template: `
    <div class="contact-container neon-contact">
      <app-navbar></app-navbar>
      
      <div class="contact-content">
        <div class="hero-section neon-contact-hero">
          <div class="hero-content animate-on-scroll">
            <h1 class="neon-contact-title">Contact Us</h1>
            <p class="neon-contact-subtitle">Get in touch with our team</p>
          </div>
          
          <!-- Neon Background Elements -->
          <div class="neon-bg-elements">
            <div class="neon-circle neon-circle-1"></div>
            <div class="neon-circle neon-circle-2"></div>
            <div class="neon-pulse neon-pulse-1"></div>
            <div class="neon-pulse neon-pulse-2"></div>
          </div>
        </div>

        <div class="contact-sections neon-contact-sections">
          <div class="contact-info neon-contact-info animate-on-scroll">
            <h2 class="neon-section-title">Get In Touch</h2>
            <p class="neon-section-text">Have questions about SwiftQueue? We'd love to hear from you.</p>
            
            <div class="contact-methods neon-contact-methods">
              <div class="contact-method neon-contact-method">
                <div class="contact-icon neon-contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="neon-method-title">Email</h3>
                  <p class="neon-method-text">info@swiftqueue.com</p>
                </div>
              </div>
              
              <div class="contact-method neon-contact-method">
                <div class="contact-icon neon-contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="neon-method-title">Phone</h3>
                  <p class="neon-method-text">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="contact-method neon-contact-method">
                <div class="contact-icon neon-contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="neon-method-title">Address</h3>
                  <p class="neon-method-text">123 Healthcare Ave<br>Medical District<br>City, State 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form neon-contact-form animate-on-scroll">
            <h2 class="neon-form-title">Send us a Message</h2>
            <form class="neon-form">
              <div class="form-group neon-form-group">
                <label for="name" class="neon-form-label">Name</label>
                <input type="text" id="name" placeholder="Your name" class="neon-form-input" />
              </div>
              
              <div class="form-group neon-form-group">
                <label for="email" class="neon-form-label">Email</label>
                <input type="email" id="email" placeholder="Your email" class="neon-form-input" />
              </div>
              
              <div class="form-group neon-form-group">
                <label for="subject" class="neon-form-label">Subject</label>
                <input type="text" id="subject" placeholder="Subject" class="neon-form-input" />
              </div>
              
              <div class="form-group neon-form-group">
                <label for="message" class="neon-form-label">Message</label>
                <textarea id="message" rows="5" placeholder="Your message" class="neon-form-textarea"></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary neon-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
      position: relative;
      overflow: hidden;
    }

    .contact-container::before {
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

    .contact-content {
      padding-top: 70px;
      position: relative;
      z-index: 1;
    }

    .hero-section {
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #00d4ff, #00ffff, #8a2be2);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: neon-title-shift 3s ease-in-out infinite;
      text-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
    }

    @keyframes neon-title-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .hero-content p {
      font-size: 1.25rem;
      color: #00ffff;
      text-shadow: 0 0 15px #00ffff;
      animation: neon-subtitle-pulse 2s ease-in-out infinite;
      font-weight: 500;
    }

    @keyframes neon-subtitle-pulse {
      0%, 100% { opacity: 0.9; }
      50% { opacity: 1; }
    }

    .contact-sections {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      position: relative;
      z-index: 1;
    }

    .contact-info {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 2px solid rgba(0, 212, 255, 0.2);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(0, 212, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .contact-info::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .contact-info:hover::before {
      left: 100%;
    }

    .contact-info:hover {
      transform: translateY(-5px);
      border-color: #00ffff;
      box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(0, 212, 255, 0.3),
        0 0 30px rgba(0, 212, 255, 0.2);
    }

    .neon-section-title {
      color: #00ffff;
      text-shadow: 0 0 8px #00ffff;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .neon-section-text {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 212, 255, 0.1);
      border-radius: 0.5rem;
      border: 1px solid rgba(0, 212, 255, 0.2);
      transition: all 0.3s ease;
    }

    .contact-method:hover {
      background: rgba(0, 212, 255, 0.2);
      border-color: #00ffff;
      transform: translateX(5px);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(45deg, #00d4ff, #00ffff);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
      animation: neon-icon-pulse 2s ease-in-out infinite;
    }

    @keyframes neon-icon-pulse {
      0%, 100% { box-shadow: 0 0 15px rgba(0, 212, 255, 0.4); }
      50% { box-shadow: 0 0 25px rgba(0, 212, 255, 0.6); }
    }

    .neon-method-title {
      color: #00ffff;
      text-shadow: 0 0 5px #00ffff;
      margin-bottom: 0.25rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .neon-method-text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
    }

    .contact-form {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 2px solid rgba(0, 212, 255, 0.2);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(0, 212, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .contact-form::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .contact-form:hover::before {
      left: 100%;
    }

    .contact-form:hover {
      transform: translateY(-5px);
      border-color: #00ffff;
      box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(0, 212, 255, 0.3),
        0 0 30px rgba(0, 212, 255, 0.2);
    }

    .neon-form-title {
      color: #00ffff;
      text-shadow: 0 0 8px #00ffff;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }

    .neon-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .neon-form-label {
      color: #00ffff;
      text-shadow: 0 0 5px #00ffff;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .neon-form-input,
    .neon-form-textarea {
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(0, 212, 255, 0.2);
      border-radius: 0.5rem;
      color: white;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .neon-form-input::placeholder,
    .neon-form-textarea::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .neon-form-input:focus,
    .neon-form-textarea:focus {
      outline: none;
      border-color: #00ffff;
      box-shadow: 
        0 0 0 3px rgba(0, 212, 255, 0.2),
        0 0 20px rgba(0, 212, 255, 0.3);
      transform: translateY(-2px);
    }

    .neon-submit-btn {
      background: linear-gradient(45deg, #00d4ff, #00ffff);
      border: none;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 
        0 0 20px rgba(0, 212, 255, 0.4),
        0 0 40px rgba(0, 212, 255, 0.2);
    }

    .neon-submit-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    .neon-submit-btn:hover::before {
      left: 100%;
    }

    .neon-submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 0 30px rgba(0, 212, 255, 0.6),
        0 0 60px rgba(0, 212, 255, 0.3),
        0 10px 20px rgba(0, 0, 0, 0.2);
    }

    /* Neon Background Elements */
    .neon-bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .neon-circle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
      animation: neon-float 6s ease-in-out infinite;
    }

    .neon-circle-1 {
      width: 200px;
      height: 200px;
      top: 10%;
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

    @keyframes neon-float {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
      50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
    }

    .neon-pulse {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 20, 147, 0.1) 0%, transparent 70%);
      animation: neon-pulse-animation 4s ease-in-out infinite;
    }

    .neon-pulse-1 {
      width: 120px;
      height: 120px;
      top: 30%;
      right: 25%;
      animation-delay: 1s;
    }

    .neon-pulse-2 {
      width: 80px;
      height: 80px;
      bottom: 30%;
      left: 25%;
      animation-delay: 3s;
    }

    @keyframes neon-pulse-animation {
      0%, 100% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.3); opacity: 0.5; }
    }

    /* Animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      
      .contact-sections {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem;
      }
      
      .contact-info,
      .contact-form {
        padding: 1.5rem;
      }
    }

    /* Neon Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .contact-container::before,
      .neon-circle,
      .neon-pulse,
      .contact-info::before,
      .contact-form::before,
      .hero-content h1,
      .hero-content p,
      .contact-icon {
        animation: none;
      }
    }
  `]
})
export class Contact {
  ngOnInit() {
    // Add scroll animations
    setTimeout(() => {
      this.setupScrollAnimations();
    }, 100);
  }

  private setupScrollAnimations() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  }
} 