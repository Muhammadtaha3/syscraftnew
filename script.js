// JavaScript for Sticky Navbar and Reveal on Scroll Animations

document.addEventListener("DOMContentLoaded", () => {
  // --- Sticky Navbar Logic ---
  const mainNavbar = document.getElementById("main-navbar");
  let stickyOffset = mainNavbar.offsetTop; // Get the initial offset of the navbar

  function handleStickyNavbar() {
    // If the current scroll position is greater than the navbar's initial offset,
    // add the 'sticky' class. Otherwise, remove it.
    if (window.pageYOffset > stickyOffset) {
      mainNavbar.classList.add("sticky");
    } else {
      mainNavbar.classList.remove("sticky");
    }
  }

  // Attach the scroll event listener to the window
  window.addEventListener("scroll", handleStickyNavbar);

  // Recalculate stickyOffset on window resize to handle responsive changes
  window.addEventListener("resize", () => {
    stickyOffset = mainNavbar.offsetTop;
  });

  // --- Reveal on Scroll Animation Logic ---
  // Select all elements that should reveal themselves on scroll
  const revealItems = document.querySelectorAll(".reveal-item");

  // Options for the Intersection Observer
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin around the root
    threshold: 0.1, // Trigger when 10% of the item is visible
  };

  // Create a new Intersection Observer instance
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // If the element is intersecting (i.e., visible in the viewport)
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible"); // Add the 'is-visible' class
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  // Observe each reveal item
  revealItems.forEach((item) => {
    observer.observe(item);
  });

  // --- Form Validation (Basic Example) ---
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    // Check if the form exists on the page
    contactForm.addEventListener("submit", (event) => {
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector("textarea");
      let isValid = true;

      // Basic email validation
      if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
        alert("Please enter a valid email address."); // Using alert for simplicity, consider custom modal for better UX
        isValid = false;
      }

      // Check if message is not empty
      if (messageInput.value.trim() === "") {
        alert("Please enter your message."); // Using alert for simplicity
        isValid = false;
      }

      if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
      } else {
        // If validation passes, you would typically send the form data to a server here.
        // For this example, we'll just show a success message.
        alert("Message sent successfully! We will get back to you soon.");
        contactForm.reset(); // Clear the form after submission
        event.preventDefault(); // Prevent actual form submission for this example
      }
    });
  }
});
