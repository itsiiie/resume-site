// ===================================
// Configuration
// ===================================

const CONFIG = {
  navScrollThreshold: 100,
  toastDuration: 3000,
};

// ===================================
// Navigation
// ===================================

class Navigation {
  constructor() {
    this.nav = document.getElementById("nav");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.menuToggle = document.getElementById("menuToggle");
    this.navLinksContainer = document.querySelector(".nav-links");
    this.lastScroll = 0;
  }

  init() {
    this.handleScroll();
    this.handleActiveLink();
    this.handleMobileMenu();
  }

  handleScroll() {
    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.pageYOffset;

        // Hide/show nav on scroll
        if (currentScroll > CONFIG.navScrollThreshold) {
          if (currentScroll > this.lastScroll) {
            this.nav.classList.add("hide");
          } else {
            this.nav.classList.remove("hide");
          }
        }

        this.lastScroll = currentScroll;
      },
      { passive: true }
    );
  }

  handleActiveLink() {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  handleMobileMenu() {
    this.menuToggle.addEventListener("click", () => {
      this.menuToggle.classList.toggle("active");
      this.navLinksContainer.classList.toggle("active");
    });

    // Close menu when clicking a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.menuToggle.classList.remove("active");
        this.navLinksContainer.classList.remove("active");
      });
    });
  }
}

// ===================================
// Smooth Scroll
// ===================================

class SmoothScroller {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          const navHeight = document.querySelector(".nav").offsetHeight;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const resumeSection = document.getElementById("resume");
        if (resumeSection) {
          resumeSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }
}

// ===================================
// Intersection Observer Animations
// ===================================

class AnimationObserver {
  init() {
    const elements = document.querySelectorAll(
      ".section-header, .resume-viewer, .contact-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
  }
}

// ===================================
// Toast Notification
// ===================================

class Toast {
  constructor() {
    this.toast = document.getElementById("toast");
  }

  show(message, duration = CONFIG.toastDuration) {
    this.toast.textContent = message;
    this.toast.classList.add("show");

    setTimeout(() => {
      this.toast.classList.remove("show");
    }, duration);
  }
}

// ===================================
// Action Handlers
// ===================================

class ActionHandlers {
  constructor(toast) {
    this.toast = toast;
  }

  init() {
    this.handlePrint();
    this.handleShare();
    this.handleDownload();
  }

  handlePrint() {
    const printBtn = document.getElementById("printBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
        this.toast.show("Opening print dialog...");
      });
    }
  }

  handleShare() {
    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        const url = window.location.href;
        const title = document.title;

        if (navigator.share) {
          try {
            await navigator.share({ title, url });
            this.toast.show("Shared successfully!");
          } catch (err) {
            if (err.name !== "AbortError") {
              this.fallbackShare(url);
            }
          }
        } else {
          this.fallbackShare(url);
        }
      });
    }
  }

  fallbackShare(url) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => this.toast.show("Link copied to clipboard!"))
        .catch(() => this.toast.show("Unable to share"));
    } else {
      this.toast.show("Sharing not supported");
    }
  }

  handleDownload() {
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        this.toast.show("Downloading resume...");
      });
    }
  }
}

// ===================================
// Parallax Effect
// ===================================

class ParallaxEffect {
  init() {
    const heroBackground = document.querySelector(".hero-background");
    if (!heroBackground) return;

    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }
}

// ===================================
// Theme Switcher (Future Enhancement)
// ===================================

class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "dark";
  }

  init() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  toggle() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
  }
}

// ===================================
// Cursor Follow Effect (Optional)
// ===================================

class CursorEffect {
  init() {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "2px solid rgba(59, 130, 246, 0.5)",
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
      transition: "all 0.15s ease",
      zIndex: "9999",
      display: "none",
    });
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.display = "block";
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    // Enlarge on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .action-btn"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.borderColor = "rgba(59, 130, 246, 1)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.borderColor = "rgba(59, 130, 246, 0.5)";
      });
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.display = "none";
    });
  }
}

// ===================================
// Form Validation (For future contact form)
// ===================================

class FormValidator {
  validate(formData) {
    const errors = {};

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.email = "Valid email is required";
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ===================================
// Performance Monitoring
// ===================================

class PerformanceMonitor {
  static log() {
    if (window.performance && window.performance.timing) {
      window.addEventListener("load", () => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
      });
    }
  }
}

// ===================================
// Keyboard Navigation
// ===================================

class KeyboardNav {
  init() {
    document.addEventListener("keydown", (e) => {
      // ESC to close mobile menu
      if (e.key === "Escape") {
        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.querySelector(".nav-links");
        if (menuToggle && navLinks) {
          menuToggle.classList.remove("active");
          navLinks.classList.remove("active");
        }
      }

      // Enter or Space on buttons
      if (e.key === "Enter" || e.key === " ") {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains("action-btn")) {
          e.preventDefault();
          activeElement.click();
        }
      }
    });
  }
}

// ===================================
// Main App
// ===================================

class App {
  constructor() {
    this.toast = new Toast();
    this.navigation = new Navigation();
    this.smoothScroller = new SmoothScroller();
    this.animationObserver = new AnimationObserver();
    this.actionHandlers = new ActionHandlers(this.toast);
    this.parallaxEffect = new ParallaxEffect();
    this.keyboardNav = new KeyboardNav();
    this.themeManager = new ThemeManager();
  }

  init() {
    // Core functionality
    this.navigation.init();
    this.smoothScroller.init();
    this.animationObserver.init();
    this.actionHandlers.init();
    this.parallaxEffect.init();
    this.keyboardNav.init();
    this.themeManager.init();

    // Optional: Enable custom cursor on desktop
    if (window.innerWidth > 768 && !("ontouchstart" in window)) {
      const cursorEffect = new CursorEffect();
      cursorEffect.init();
    }

    // Performance monitoring in development
    if (window.location.hostname === "localhost") {
      PerformanceMonitor.log();
    }

    // Log initialization
    console.log("Portfolio initialized successfully");
  }
}

// ===================================
// Initialize on DOM Ready
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});

// ===================================
// Service Worker (PWA Support)
// ===================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered"))
      .catch((err) => console.log("Service Worker registration failed"));
  });
}

// ===================================
// Export for module systems
// ===================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = { App, Toast, Navigation };
}
