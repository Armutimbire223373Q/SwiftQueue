import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit, AfterViewInit {
  currentSection = 'hero';
  animatedStats = {
    patients: 0,
    doctors: 0,
    appointments: 0,
    satisfaction: 0
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only run animations in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.animateStats();
    }
  }

  ngAfterViewInit() {
    // Only setup scroll animations in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        this.setupScrollAnimations();
      }, 100);
    }
  }

  private animateStats() {
    // Check if we're in the browser before proceeding
    if (!isPlatformBrowser(this.platformId)) return;

    const targetStats = {
      patients: 5000,
      doctors: 150,
      appointments: 25000,
      satisfaction: 98
    };

    Object.keys(targetStats).forEach(key => {
      const target = targetStats[key as keyof typeof targetStats];
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        this.animatedStats[key as keyof typeof this.animatedStats] = Math.floor(current);
      }, 16);
    });
  }

  private setupScrollAnimations() {
    // Check if we're in the browser before proceeding
    if (!isPlatformBrowser(this.platformId)) return;

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver !== 'undefined') {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Check if document is available before using querySelectorAll
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          observer.observe(el);
        });
      }
    } else {
      // Fallback: animate all elements immediately
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('animate-in');
        });
      }
    }
  }
}
