/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT (main.js)
 * Clean, interactive script handling navigation, filtering, modals,
 * and contact email reveal functionality.
 * ==========================================================================
 */

// Portfolio Configuration (Change your email and details here)
const PORTFOLIO_CONFIG = {
  myEmail: "farhan.masud.mn@gmail.com",
  authorName: "Farhan Masud Nayem",
};

document.addEventListener("DOMContentLoaded", () => {
  initCurrentYear();
  initStickyHeader();
  initMobileNavigation();
  initScrollSpy();
  initSmoothScroll();
  initBackToTop();
  initGalleryFilter();
  initLightbox();
  initContactEmailReveal();
  initBibtexCitation();
});

/* --------------------------------------------------------------------------
   1. DYNAMIC FOOTER YEAR
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER ON SCROLL
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    const icon = mobileToggle.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  });

  // Close mobile menu when any nav link is clicked
  const navLinks = navMenu.querySelectorAll(".nav-link, .btn");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      }
    });
  });

  // Close menu on click outside
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      navMenu.classList.remove("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    }
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHT)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   5. SMOOTH SCROLLING FOR ALL ANCHOR LINKS & BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopButtons = document.querySelectorAll(".back-to-top, #backToTop, .floating-back-to-top, [data-action='back-to-top']");
  const floatingBtn = document.getElementById("floatingBackToTop");

  backToTopButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
  });

  if (floatingBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        floatingBtn.classList.add("visible");
      } else {
        floatingBtn.classList.remove("visible");
      }
    }, { passive: true });
  }
}

function initSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      // Handle Back to Top or targets that point to top / fixed header
      if (
        targetId === "#header" ||
        targetId === "#top" ||
        this.classList.contains("back-to-top") ||
        this.id === "backToTop"
      ) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. GALLERY FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedFilter = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (selectedFilter === "all" || itemCategory === selectedFilter) {
          item.style.display = "block";
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.opacity = "1";
          }, 50);
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. LIGHTBOX MODAL (GALLERY PREVIEWS)
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const closeBtn = document.getElementById("lightboxClose");

  if (!lightbox || !lightboxImg || !lightboxTitle) return;

  // Make openLightbox globally accessible for onclick in HTML
  window.openLightbox = function (src, title) {
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "Gallery Preview";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeLightbox = function (e) {
    if (
      !e ||
      e.target === lightbox ||
      e.target.closest("#lightboxClose") ||
      e.target.classList.contains("lightbox-close")
    ) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", () => window.closeLightbox());
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      window.closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT EMAIL REVEAL & FORM INTERACTION
   Requirement: "and contact section if someone push ,,then show it my email."
   -------------------------------------------------------------------------- */
function initContactEmailReveal() {
  const contactForm = document.getElementById("contactForm");
  const emailRevealModal = document.getElementById("emailRevealModal");
  const revealEmailSpan = document.getElementById("revealedEmailAddress");
  const copyEmailBtn = document.getElementById("copyRevealedEmailBtn");
  const openMailClientBtn = document.getElementById("openMailClientBtn");
  const directRevealBtn = document.getElementById("directRevealBtn");

  // Populate configured email
  if (revealEmailSpan) {
    revealEmailSpan.textContent = PORTFOLIO_CONFIG.myEmail;
  }

  // Helper to show the email reveal banner
  const displayEmailBanner = (customMessage) => {
    if (!emailRevealModal) return;
    emailRevealModal.classList.add("show");

    const headerNotice = document.getElementById("revealHeaderNotice");
    if (headerNotice && customMessage) {
      headerNotice.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${customMessage}`;
    }

    // Smooth scroll down to the revealed card so the user sees it immediately
    emailRevealModal.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // 1. Direct "Push to Reveal Email" button
  if (directRevealBtn) {
    directRevealBtn.addEventListener("click", () => {
      displayEmailBanner("Direct Contact Email Revealed:");
      showToast("Email address is displayed below!");
    });
  }

  // 2. When someone submits / pushes the contact form
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value || "";
      const subject = document.getElementById("subject")?.value || "Portfolio Contact";
      const message = document.getElementById("message")?.value || "";

      // Configure the mailto button with user's written contents
      if (openMailClientBtn) {
        const mailtoUrl = `mailto:${encodeURIComponent(
          PORTFOLIO_CONFIG.myEmail
        )}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(`Hello, my name is ${name}.\n\n${message}`)}`;
        openMailClientBtn.href = mailtoUrl;
      }

      // Show the email card as requested:
      displayEmailBanner(`Thanks ${name || "friend"}! Here is my direct email address:`);

      // Provide notification
      showToast(`Showing direct email: ${PORTFOLIO_CONFIG.myEmail}`);
    });
  }

  // 3. Copy Email button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      copyTextToClipboard(PORTFOLIO_CONFIG.myEmail, () => {
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        showToast("Email copied to clipboard!");
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Email';
        }, 3000);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. BIBTEX CITATION COPY
   -------------------------------------------------------------------------- */
function initBibtexCitation() {
  const bibtexBtns = document.querySelectorAll(".cite-bibtex-btn");

  bibtexBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const citation = btn.getAttribute("data-citation") || "@article{rivera2025,\n  author = {Rivera, A.},\n  title = {Robust Neural Implicit Surfaces},\n  year = {2025}\n}";
      copyTextToClipboard(citation, () => {
        showToast("BibTeX citation copied to clipboard!");
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. UTILITY: COPY TO CLIPBOARD & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function copyTextToClipboard(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
      fallbackCopyText(text, onSuccess);
    });
  } else {
    fallbackCopyText(text, onSuccess);
  }
}

function fallbackCopyText(text, onSuccess) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    if (onSuccess) onSuccess();
  } catch (err) {
    alert("Could not copy automatically. Email: " + text);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent-secondary);"></i> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

