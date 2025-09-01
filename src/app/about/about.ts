import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  template: `
    <div class="about-container neon-about">
      <app-navbar></app-navbar>
      
      <div class="about-content">
        <div class="hero-section neon-about-hero">
          <div class="hero-content animate-on-scroll">
            <h1 class="neon-about-title">About SwiftQueue</h1>
            <p class="neon-about-subtitle">Revolutionizing healthcare through intelligent digital queuing</p>
          </div>
          
          <!-- Neon Background Elements -->
          <div class="neon-bg-elements">
            <div class="neon-circle neon-circle-1"></div>
            <div class="neon-circle neon-circle-2"></div>
            <div class="neon-pulse neon-pulse-1"></div>
            <div class="neon-pulse neon-pulse-2"></div>
          </div>
        </div>

        <div class="about-sections neon-about-sections">
          <div class="section neon-about-section animate-on-scroll">
            <div class="section-icon neon-section-icon">
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
            </div>
            <h2 class="neon-section-title">Our Mission</h2>
            <p class="neon-section-text">SwiftQueue is dedicated to transforming the patient experience in healthcare facilities by providing intelligent, efficient, and user-friendly digital queuing solutions. We believe that waiting for healthcare should be stress-free and transparent.</p>
          </div>

          <div class="section neon-about-section animate-on-scroll">
            <div class="section-icon neon-section-icon">
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
            </div>
            <h2 class="neon-section-title">How It Works</h2>
            <p class="neon-section-text">Our AI-powered system intelligently manages patient queues, providing real-time updates, estimated wait times, and seamless communication between patients and healthcare providers. This reduces wait times and improves overall patient satisfaction.</p>
          </div>

          <div class="section neon-about-section animate-on-scroll">
            <div class="section-icon neon-section-icon">
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <h2 class="neon-section-title">Key Features</h2>
            <ul class="neon-features-list">
              <li class="neon-feature-item">Real-time queue monitoring</li>
              <li class="neon-feature-item">Intelligent appointment scheduling</li>
              <li class="neon-feature-item">Automated notifications</li>
              <li class="neon-feature-item">Mobile-friendly interface</li>
              <li class="neon-feature-item">Comprehensive reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
      position: relative;
      overflow: hidden;
    }

    .about-container::before {
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

    .about-content {
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

    .about-sections {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      position: relative;
      z-index: 1;
    }

    .section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 1rem;
      border: 2px solid rgba(0, 212, 255, 0.2);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(0, 212, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .section::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .section:hover::before {
      left: 100%;
    }

    .section:hover {
      transform: translateY(-5px);
      border-color: #00ffff;
      box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(0, 212, 255, 0.3),
        0 0 30px rgba(0, 212, 255, 0.2);
    }

    .section-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(45deg, #00d4ff, #00ffff);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
      animation: neon-icon-pulse 2s ease-in-out infinite;
    }

    @keyframes neon-icon-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
      50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
    }

    .section h2 {
      color: #00ffff;
      text-shadow: 0 0 8px #00ffff;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }

    .section p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 1rem;
      text-align: center;
    }

    .neon-features-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .neon-feature-item {
      color: rgba(255, 255, 255, 0.8);
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0, 212, 255, 0.2);
      position: relative;
      padding-left: 2rem;
    }

    .neon-feature-item:before {
      content: '✦';
      color: #00ffff;
      text-shadow: 0 0 8px #00ffff;
      position: absolute;
      left: 0;
      animation: neon-bullet-pulse 2s ease-in-out infinite;
    }

    @keyframes neon-bullet-pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }

    .neon-feature-item:last-child {
      border-bottom: none;
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
      
      .about-sections {
        padding: 2rem 1rem;
      }
      
      .section {
        padding: 1.5rem;
      }
    }

    /* Neon Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .about-container::before,
      .neon-circle,
      .neon-pulse,
      .section::before,
      .hero-content h1,
      .hero-content p,
      .section-icon {
        animation: none;
      }
    }
  `]
})
export class About {
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