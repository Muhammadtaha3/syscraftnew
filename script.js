document.addEventListener("DOMContentLoaded", function () {
  const websiteBody = document.getElementById("website-body");
  const mainNavbar = document.getElementById("main-navbar");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbar = document.getElementById("main-nav");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll("#main-nav ul li a");

  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleIcon = themeToggleBtn
    ? themeToggleBtn.querySelector("i")
    : null;

  // --- Theme Mode Functionality ---
  const savedTheme = localStorage.getItem("theme"); // Get saved theme from local storage

  // Function to apply a theme
  function applyTheme(theme) {
    if (theme === "light") {
      websiteBody.classList.add("light-mode");
      if (themeToggleIcon) themeToggleIcon.className = "fas fa-sun"; // Change to sun icon
    } else {
      websiteBody.classList.remove("light-mode");
      if (themeToggleIcon) themeToggleIcon.className = "fas fa-moon"; // Change to moon icon
    }
  }

  // Set initial theme on load
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    // If no theme saved, check system preference (default to light if system is light)
    applyTheme("light");
  } else {
    // Default to dark mode if no saved preference and system is not light
    applyTheme("dark");
  }

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      let currentTheme = websiteBody.classList.contains("light-mode")
        ? "light"
        : "dark";
      if (currentTheme === "light") {
        applyTheme("dark");
        localStorage.setItem("theme", "dark"); // Save preference
      } else {
        applyTheme("light");
        localStorage.setItem("theme", "light"); // Save preference
      }
    });
  }
  // --- End Theme Mode Functionality ---

  // Sticky Navbar functionality
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      mainNavbar.classList.add("sticky");
    } else {
      mainNavbar.classList.remove("sticky");
    }
  });

  // Toggle Side Navbar on Hamburger click
  hamburgerMenu.addEventListener("click", function () {
    navbar.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll"); // Disable scroll when menu is open
  });

  // Close Side Navbar on Overlay click
  navOverlay.addEventListener("click", function () {
    navbar.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // Close Side Navbar when a link is clicked (for smooth scrolling)
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Form Submission
  const contactForm = document.querySelector(".contact-form");
  const submitButton = document.getElementById("submit-button");
  const buttonText = submitButton
    ? submitButton.querySelector(".button-text")
    : null;
  const spinnerElement = submitButton
    ? submitButton.querySelector(".spinner")
    : null;
  const messageModal = document.getElementById("message-modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModalButton = document.querySelector(".close-button");
  const modalIcon = document.getElementById("modal-icon"); // New: Modal icon element

  if (
    contactForm &&
    submitButton &&
    messageModal &&
    modalMessage &&
    closeModalButton &&
    buttonText &&
    spinnerElement &&
    modalIcon // Check for the new modal icon
  ) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      submitButton.classList.add("loading"); // This class will hide text and show spinner via CSS

      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // Simulate success/failure

        submitButton.classList.remove("loading"); // Remove loading class to revert button state

        if (isSuccess) {
          modalMessage.textContent = "Your message has been sent successfully!";
          modalIcon.className = "fas fa-check-circle success-icon"; // Green check icon
          messageModal
            .querySelector(".modal-content")
            .classList.remove("error");
          messageModal.querySelector(".modal-content").classList.add("success");
          contactForm.reset(); // Clear the form fields
        } else {
          modalMessage.textContent =
            "Failed to send message. Please try again.";
          modalIcon.className = "fas fa-times-circle error-icon"; // Red cross icon
          messageModal
            .querySelector(".modal-content")
            .classList.remove("success");
          messageModal.querySelector(".modal-content").classList.add("error");
        }
        messageModal.style.display = "flex"; // Show the modal
      }, 2000); // Simulate 2-second delay
    });

    closeModalButton.addEventListener("click", function () {
      messageModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == messageModal) {
        messageModal.style.display = "none";
      }
    });
  } else {
    console.warn(
      "Contact form elements or their children not found. Form submission functionality might be affected."
    );
  }

  // Scroll Reveal Animation with staggered effect
  const revealItems = document.querySelectorAll(".reveal-item");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const itemPoint = 150; // Adjust this value to control when the animation triggers

      if (itemTop < windowHeight - itemPoint) {
        if (!item.classList.contains("revealed")) {
          // Apply a delay based on its index within the collection
          // This creates a staggered/cascading effect for items in a grid/list
          item.style.transitionDelay = `${index * 0.1}s`; // 0s, 0.1s, 0.2s, etc.
          item.classList.add("revealed");
        }
      } else {
        // Optional: remove 'revealed' class if element goes out of view again
        // to re-trigger animation on scroll up/down. Uncomment if desired.
        // if (item.classList.contains("revealed")) {
        //     item.classList.remove("revealed");
        //     item.style.transitionDelay = '0s'; // Reset delay
        // }
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on load to reveal elements already in view
});
