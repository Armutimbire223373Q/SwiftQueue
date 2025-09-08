import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../shared/navbar/navbar';

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

interface QuickAction {
  text: string;
  action: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Navbar],
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

  // Chatbot properties
  isChatbotOpen = false;
  chatMessages: ChatMessage[] = [];
  currentUserInput = '';
  isTyping = false;
  speechSynthesis!: SpeechSynthesis;
  currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.initializeSpeechSynthesis();
  }

  ngOnInit() {
    // Only run animations in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.animateStats();
      this.initializeChatbot();
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

  // Initialize text-to-speech
  initializeSpeechSynthesis() {
    if (isPlatformBrowser(this.platformId) && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
    }
  }

  // Speak the message out loud
  speakMessage(message: string) {
    if (this.speechSynthesis && isPlatformBrowser(this.platformId)) {
      // Stop any current speech
      if (this.currentUtterance) {
        this.speechSynthesis.cancel();
      }

      // Create new utterance
      this.currentUtterance = new SpeechSynthesisUtterance(message);
      this.currentUtterance.rate = 0.9; // Slightly slower for clarity
      this.currentUtterance.pitch = 1.0; // Normal pitch
      this.currentUtterance.volume = 0.8; // Good volume

      // Speak the message
      this.speechSynthesis.speak(this.currentUtterance);
    }
  }

  // Stop speaking
  stopSpeaking() {
    if (this.speechSynthesis && isPlatformBrowser(this.platformId)) {
      this.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  // Chatbot methods
  initializeChatbot() {
    // Add welcome message (but don't speak it yet - wait for user to click)
    this.addBotMessage("Hello! This is SwiftQueue assistant. Click on the button below to open the chatbot and how can I help you today?");
  }

  toggleChatbot() {
    if (!this.isChatbotOpen) {
      // Chatbot is opening - show interface immediately and start speaking
      this.isChatbotOpen = true;
      
      if (this.chatMessages.length === 0) {
        // First time opening - speak welcome message and show interface
        this.initializeChatbot();
        this.speakMessage("Hello! I'm your SwiftQueue assistant. How can I help you today?");
        
        // Show helpful suggestions after a short delay
        setTimeout(() => {
          const suggestionsMessage = "You can ask me about:\n• Patient registration\n• Booking appointments\n• Queue status\n• General information\n\nJust type your question or use the quick action buttons below!";
          this.speakMessage(suggestionsMessage);
          this.addBotMessage(suggestionsMessage);
        }, 1500);
        
      } else {
        // Returning user - speak welcome back message
        this.speakMessage("Welcome to SwiftQueue. How can I assist you today? 😊");
        this.addBotMessage("Welcome to SwiftQueue. How can I assist you today? 😊");
        
        // Show helpful suggestions
        setTimeout(() => {
          const suggestionsMessage = "You can ask me about:\n• Patient registration\n• Booking appointments\n• Queue status\n• General information\n\nJust type your question or use the quick action buttons below!";
          this.speakMessage(suggestionsMessage);
          this.addBotMessage(suggestionsMessage);
        }, 1000);
      }
    } else {
      // Chatbot is closing
      this.isChatbotOpen = false;
      this.stopSpeaking(); // Stop any ongoing speech
    }
  }

  // Auto-scroll to bottom of chat
  scrollToBottom() {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chatbot-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }

  sendMessage() {
    if (this.currentUserInput.trim()) {
      this.addUserMessage(this.currentUserInput);
      const userInput = this.currentUserInput.toLowerCase();
      this.currentUserInput = '';
      
      // Process the message
      this.processUserMessage(userInput);
    }
  }

  processUserMessage(message: string) {
    this.isTyping = true;
    
    // Simulate typing delay - much faster now!
    setTimeout(() => {
      this.isTyping = false;
      
      // Check for registration-related keywords
      if (this.isRegistrationQuestion(message)) {
        this.handleRegistrationQuestion(message);
      } else if (this.isAppointmentQuestion(message)) {
        this.handleAppointmentQuestion(message);
      } else if (this.isGeneralQuestion(message)) {
        this.handleGeneralQuestion(message);
      } else {
        this.addBotMessage("I'm not sure I understand. Could you please rephrase your question? You can ask me about patient registration, appointments, or general information.");
      }
    }, 300); // Reduced from 1000ms to 300ms for faster responses
  }

  isRegistrationQuestion(message: string): boolean {
    const registrationKeywords = [
      'register', 'registration', 'sign up', 'signup', 'new patient', 'create account',
      'patient account', 'join', 'enroll', 'become a patient', 'patient registration'
    ];
    return registrationKeywords.some(keyword => message.includes(keyword));
  }

  isAppointmentQuestion(message: string): boolean {
    const appointmentKeywords = [
      'appointment', 'book', 'schedule', 'visit', 'consultation', 'checkup',
      'make appointment', 'book appointment', 'schedule visit'
    ];
    return appointmentKeywords.some(keyword => message.includes(keyword));
  }

  isGeneralQuestion(message: string): boolean {
    const generalKeywords = [
      'what is', 'how does', 'explain', 'tell me about', 'information',
      'help', 'support', 'how to', 'what are'
    ];
    return generalKeywords.some(keyword => message.includes(keyword));
  }

  handleRegistrationQuestion(message: string) {
    if (message.includes('patient') || message.includes('new')) {
      this.addBotMessage("Great! I can help you with patient registration. You have two options:\n\n1. **Quick Registration**: Go directly to our patient dashboard to book appointments\n2. **Full Registration**: Create a complete patient account\n\nWhich would you prefer?");
      
      // Add quick action buttons
      setTimeout(() => {
        this.addBotMessage("Quick actions:", [
          { text: "Go to Patient Dashboard", action: "patient-dashboard" },
          { text: "Create Patient Account", action: "patient-register" }
        ]);
      }, 500);
    } else {
      this.addBotMessage("I'd be happy to help you with registration! Are you looking to register as a patient or as healthcare staff?");
    }
  }

  handleAppointmentQuestion(message: string) {
    this.addBotMessage("I can help you book an appointment! You can either:\n\n1. **Book without account**: Go directly to our patient dashboard\n2. **Create an account first**: For better appointment management\n\nWould you like to book an appointment now?");
    
    setTimeout(() => {
      this.addBotMessage("Quick actions:", [
        { text: "Book Appointment Now", action: "patient-dashboard" },
        { text: "Create Account First", action: "patient-register" }
      ]);
    }, 500);
  }

  handleGeneralQuestion(message: string) {
    if (message.includes('swiftqueue') || message.includes('what is')) {
      this.addBotMessage("SwiftQueue is a healthcare management platform that revolutionizes patient care through intelligent scheduling, real-time queue management, and seamless communication between patients and healthcare providers.\n\nKey features:\n• Real-time queue updates\n• Smart appointment scheduling\n• Mobile-friendly interface\n• Secure patient data management");
    } else if (message.includes('how') && message.includes('work')) {
      this.addBotMessage("Here's how SwiftQueue works:\n\n1. **Book Appointment**: Choose department, date, and time\n2. **Get in Queue**: Receive your queue position instantly\n3. **Real-time Updates**: Stay informed about your status\n4. **Get Served**: Receive notification when it's your turn\n\nWould you like to try it out?");
    } else {
      this.addBotMessage("I'm here to help! You can ask me about:\n• What SwiftQueue is\n• How the system works\n• Patient registration\n• Booking appointments\n• Queue management");
    }
  }

  handleQuickAction(action: string) {
    switch (action) {
      case 'patient-dashboard':
        this.addBotMessage("Taking you to the patient dashboard where you can book appointments and manage your healthcare needs!");
        setTimeout(() => {
          this.router.navigate(['/patient']);
        }, 1500);
        break;
      case 'patient-register':
        this.addBotMessage("Taking you to create a patient account for better appointment management!");
        setTimeout(() => {
          this.router.navigate(['/patient-register']);
        }, 1500);
        break;
      default:
        this.addBotMessage("I'm not sure what you'd like to do. Could you please clarify?");
    }
  }

  addUserMessage(message: string) {
    this.chatMessages.push({
      type: 'user',
      content: message,
      timestamp: new Date()
    });
    this.scrollToBottom(); // Auto-scroll after user message
  }

  addBotMessage(message: string, quickActions?: QuickAction[]) {
    this.chatMessages.push({
      type: 'bot',
      content: message,
      timestamp: new Date(),
      quickActions: quickActions
    });
    
    // Speak the message out loud!
    this.speakMessage(message);
    
    // Auto-scroll to show new message
    this.scrollToBottom();
  }

  formatMessage(content: string): string {
    return content.replace(/\n/g, '<br>');
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
