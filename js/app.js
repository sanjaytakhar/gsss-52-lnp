/**
 * GOVERNMENT SENIOR SECONDARY SCHOOL 52 LNP
 * Interactive Client Controller & Dynamic Rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page Preloader Fadeout
  window.addEventListener('load', () => {
    const preloader = document.getElementById('pagePreloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 500);
    }
  });

  let currentLang = 'en'; // 'en' or 'hi'
  let currentNoticeFilter = 'all';
  let currentGalleryFilter = 'all';

  // DOM Elements
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langToggleText = document.getElementById('langToggleText');
  const statsContainer = document.getElementById('statsContainer');
  const quickCardsContainer = document.getElementById('quickCardsContainer');
  const eventsListContainer = document.getElementById('eventsListContainer');
  const newsListContainer = document.getElementById('newsListContainer');
  const noticesTableBody = document.getElementById('noticesTableBody');
  const streamsContainer = document.getElementById('streamsContainer');
  const facilitiesContainer = document.getElementById('facilitiesContainer');
  const schemesContainer = document.getElementById('schemesContainer');
  const facultyContainer = document.getElementById('facultyContainer');
  const galleryContainer = document.getElementById('galleryContainer');
  const testimonialsContainer = document.getElementById('testimonialsContainer');

  // Modals & Drawers
  const admissionModal = document.getElementById('admissionModal');
  const openAdmissionBtns = document.querySelectorAll('.open-admission-modal');
  const closeAdmissionBtn = document.getElementById('closeAdmissionBtn');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mainNavbar = document.getElementById('mainNavbar');

  // Initial Render
  renderAll();

  // Language Switcher Event
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      if (langToggleText) {
        langToggleText.textContent = currentLang === 'en' ? 'हिन्दी' : 'English';
      }
      document.documentElement.lang = currentLang;
      renderAll();
      showToast(currentLang === 'hi' ? 'भाषा हिन्दी में बदली गई।' : 'Language switched to English.', 'info');
    });
  }

  // Navbar Scroll Shadow & Mobile Dock Active State Tracking
  const sections = document.querySelectorAll('section[id]');
  const dockItems = document.querySelectorAll('.dock-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      if (mainNavbar) mainNavbar.classList.add('navbar-scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      if (mainNavbar) mainNavbar.classList.remove('navbar-scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }

    // Update active mobile dock tab based on visible section
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        dockItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else if (item.getAttribute('href')?.startsWith('#')) {
            item.classList.remove('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Drawer Toggle
  if (mobileMenuToggle && mobileDrawer && mobileDrawerOverlay) {
    const toggleDrawer = (open) => {
      if (open) {
        mobileDrawer.classList.add('open');
        mobileDrawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('open');
        mobileDrawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    mobileMenuToggle.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
    mobileDrawerOverlay.addEventListener('click', () => toggleDrawer(false));

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleDrawer(false);
      }
    });

    // Close when clicking link in drawer
    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.drawer-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        toggleDrawer(false);
      });
    });
  }

  // Admission Modal
  openAdmissionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileDrawerOverlay.classList.remove('open');
      }
      if (admissionModal) {
        admissionModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeAdmissionBtn && admissionModal) {
    closeAdmissionBtn.addEventListener('click', () => {
      admissionModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Global Search Modal
  if (searchTriggerBtn && searchModal && closeSearchBtn) {
    searchTriggerBtn.addEventListener('click', () => {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (globalSearchInput) globalSearchInput.focus();
      }, 150);
    });

    closeSearchBtn.addEventListener('click', () => {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    if (globalSearchInput) {
      globalSearchInput.addEventListener('input', (e) => {
        handleGlobalSearch(e.target.value);
      });
    }
  }

  // Notice Filter Buttons
  document.querySelectorAll('.filter-tab[data-notice-filter]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab[data-notice-filter]').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentNoticeFilter = e.target.getAttribute('data-notice-filter');
      renderNotices();
    });
  });

  // Gallery Filter Buttons
  document.querySelectorAll('.filter-tab[data-gallery-filter]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab[data-gallery-filter]').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentGalleryFilter = e.target.getAttribute('data-gallery-filter');
      renderGallery();
    });
  });

  // Admission Form Steps
  setupAdmissionForm();

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(currentLang === 'hi' 
        ? 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।' 
        : 'Thank you! Your inquiry has been submitted successfully.', 'success');
      contactForm.reset();
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(currentLang === 'hi' 
        ? 'विद्यालय सूचना पत्र की सदस्यता दर्ज कर ली गई है।' 
        : 'Subscribed to school updates successfully!', 'success');
      newsletterForm.reset();
    });
  }

  /**
   * Master Render Function
   */
  function renderAll() {
    updateStaticTexts();
    renderStats();
    renderQuickCards();
    renderEvents();
    renderNews();
    renderNotices();
    renderStreams();
    renderFacilities();
    renderSchemes();
    renderFaculty();
    renderGallery();
    renderTestimonials();
  }

  /**
   * Update Text for Elements with Data Attributes
   */
  function updateStaticTexts() {
    document.querySelectorAll('[data-i18n-en]').forEach(el => {
      const textEn = el.getAttribute('data-i18n-en');
      const textHi = el.getAttribute('data-i18n-hi') || textEn;
      el.textContent = currentLang === 'hi' ? textHi : textEn;
    });

    document.querySelectorAll('[data-i18n-placeholder-en]').forEach(el => {
      const phEn = el.getAttribute('data-i18n-placeholder-en');
      const phHi = el.getAttribute('data-i18n-placeholder-hi') || phEn;
      el.placeholder = currentLang === 'hi' ? phHi : phEn;
    });
  }

  /**
   * Render Stats Bar
   */
  function renderStats() {
    if (!statsContainer || !window.SCHOOL_DATA) return;
    statsContainer.innerHTML = window.SCHOOL_DATA.stats.map(item => `
      <div class="stat-item">
        <span class="stat-num">${item.num}</span>
        <span class="stat-label">${currentLang === 'hi' ? item.labelHi : item.labelEn}</span>
      </div>
    `).join('');
  }

  /**
   * Render Quick Access Cards (Figma 5 Tiles)
   */
  function renderQuickCards() {
    if (!quickCardsContainer || !window.SCHOOL_DATA) return;
    quickCardsContainer.innerHTML = window.SCHOOL_DATA.quickAccess.map(card => `
      <a href="${card.link}" class="quick-card liquid-glass-card">
        <div class="quick-card-icon">
          <i class="${card.icon}"></i>
        </div>
        <h3 class="quick-card-title">${currentLang === 'hi' ? card.titleHi : card.titleEn}</h3>
        <p class="quick-card-desc">${currentLang === 'hi' ? card.descHi : card.descEn}</p>
      </a>
    `).join('');
  }

  /**
   * Render Events
   */
  function renderEvents() {
    if (!eventsListContainer || !window.SCHOOL_DATA) return;
    if (window.SCHOOL_DATA.upcomingEvents.length === 0) {
      eventsListContainer.innerHTML = `
        <div class="event-card text-center" style="padding: 36px 16px; justify-content: center; flex-direction: column; border-radius: var(--r-md);">
          <i class="fa-regular fa-calendar-check" style="font-size: 2rem; color: var(--brand-gold); margin-bottom: 8px; opacity: 0.85;"></i>
          <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 2px;">
            ${currentLang === 'hi' ? 'वर्तमान में कोई आगामी कार्यक्रम निर्धारित नहीं है' : 'No Upcoming Events Scheduled'}
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">
            ${currentLang === 'hi' ? 'नवीन कार्यक्रमों की तिथियां शीघ्र यहाँ प्रदर्शित की जाएंगी।' : 'New session dates and upcoming schedules will appear here.'}
          </p>
        </div>
      `;
      return;
    }
    eventsListContainer.innerHTML = window.SCHOOL_DATA.upcomingEvents.map(event => `
      <div class="event-card">
        <div class="event-date-badge">
          <span class="event-month">${currentLang === 'hi' ? event.monthHi : event.monthEn}</span>
          <span class="event-day">${event.day}</span>
        </div>
        <div class="event-info">
          <h4>${currentLang === 'hi' ? event.titleHi : event.titleEn}</h4>
          <div class="event-meta">
            <span><i class="fa-regular fa-clock me-1"></i> ${currentLang === 'hi' ? event.timeHi : event.timeEn}</span>
            <span><i class="fa-solid fa-location-dot me-1"></i> ${currentLang === 'hi' ? event.venueHi : event.venueEn}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Latest News
   */
  function renderNews() {
    if (!newsListContainer || !window.SCHOOL_DATA) return;
    if (window.SCHOOL_DATA.latestNews.length === 0) {
      newsListContainer.innerHTML = `
        <div class="news-card text-center" style="padding: 36px 16px; justify-content: center; flex-direction: column; border-radius: var(--r-md);">
          <i class="fa-regular fa-newspaper" style="font-size: 2rem; color: var(--brand-sky); margin-bottom: 8px; opacity: 0.85;"></i>
          <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 2px;">
            ${currentLang === 'hi' ? 'नवीनतम समाचार एवं प्रेस विज्ञप्ति' : 'School News & Press Updates'}
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">
            ${currentLang === 'hi' ? 'नवीन गतिविधियां एवं उपलब्धियां शीघ्र यहाँ प्रकाशित होंगी।' : 'Recent achievements and official updates will appear here.'}
          </p>
        </div>
      `;
      return;
    }
    newsListContainer.innerHTML = window.SCHOOL_DATA.latestNews.map(item => `
      <div class="news-card">
        <img src="${item.image}" alt="${item.titleEn}" class="news-thumb" loading="lazy">
        <div class="news-content">
          <h4 class="news-title">${currentLang === 'hi' ? item.titleHi : item.titleEn}</h4>
          <p class="news-desc">${currentLang === 'hi' ? item.descHi : item.descEn}</p>
          <span class="news-date"><i class="fa-regular fa-calendar me-1"></i> ${item.date}</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Notice Board Table with Filter
   */
  function renderNotices() {
    if (!noticesTableBody || !window.SCHOOL_DATA) return;
    const filtered = currentNoticeFilter === 'all' 
      ? window.SCHOOL_DATA.notices 
      : window.SCHOOL_DATA.notices.filter(n => n.category === currentNoticeFilter);

    if (filtered.length === 0) {
      noticesTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center" style="padding: 48px 20px;">
            <div style="font-size: 2.2rem; color: var(--brand-gold); margin-bottom: 12px; opacity: 0.8;">
              <i class="fa-solid fa-bullhorn"></i>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
              ${currentLang === 'hi' ? 'वर्तमान में कोई नवीन सूचना उपलब्ध नहीं है' : 'No Active Notices at This Moment'}
            </h4>
            <p style="font-size: 0.85rem; max-width: 460px; margin: 0 auto; color: var(--text-secondary);">
              ${currentLang === 'hi' ? 'नवीन विभागीय आदेश, समय सारणी एवं परिपत्र शीघ्र ही यहाँ प्रकाशित किए जाएंगे।' : 'New official departmental orders, exam schedules, and circulars will be published here.'}
            </p>
          </td>
        </tr>
      `;
      return;
    }

    noticesTableBody.innerHTML = filtered.map((n, idx) => `
      <tr>
        <td style="font-weight: 600; color: var(--color-primary);">#${idx + 1}</td>
        <td>
          <div style="font-weight: 600; color: var(--color-text-main);">
            ${currentLang === 'hi' ? n.titleHi : n.titleEn}
            ${n.isNew ? `<span class="badge-new">${currentLang === 'hi' ? 'नया' : 'NEW'}</span>` : ''}
          </div>
          <small class="text-muted">Category: ${n.category.toUpperCase()} • Size: ${n.fileSize}</small>
        </td>
        <td style="white-space: nowrap; color: var(--color-text-muted); font-size: 0.85rem;">
          <i class="fa-regular fa-calendar-days me-1"></i> ${n.date}
        </td>
        <td style="text-align: right;">
          <button class="btn btn-sm btn-outline-navy" onclick="downloadNoticeMock('${n.id}', '${currentLang === 'hi' ? n.titleHi : n.titleEn}')">
            <i class="fa-solid fa-file-arrow-down me-1"></i> ${currentLang === 'hi' ? 'डाउनलोड' : 'Download'}
          </button>
        </td>
      </tr>
    `).join('');
  }

  /**
   * Render Academic Streams
   */
  function renderStreams() {
    if (!streamsContainer || !window.SCHOOL_DATA) return;
    streamsContainer.innerHTML = window.SCHOOL_DATA.academicStreams.map(stream => `
      <div class="stream-card liquid-glass-card">
        <div class="stream-card-banner">
          <img src="${stream.banner}" alt="${stream.nameEn}" loading="lazy">
          <span class="stream-badge">${stream.badge}</span>
        </div>
        <div class="stream-body">
          <h3 class="stream-title">${currentLang === 'hi' ? stream.nameHi : stream.nameEn}</h3>
          <p class="stream-desc">${currentLang === 'hi' ? stream.descHi : stream.descEn}</p>
          <div class="stream-subjects-list">
            <div class="stream-subjects-title">${currentLang === 'hi' ? 'मुख्य विषय' : 'Key Subjects'}</div>
            <div class="subject-tags">
              ${stream.subjects.map(s => `<span class="subject-tag">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Facilities
   */
  function renderFacilities() {
    if (!facilitiesContainer || !window.SCHOOL_DATA) return;
    facilitiesContainer.innerHTML = window.SCHOOL_DATA.facilities.map(fac => `
      <div class="facility-card liquid-glass-card">
        <img src="${fac.image}" alt="${fac.titleEn}" class="facility-img" loading="lazy">
        <div class="facility-content">
          <h3 class="facility-title">${currentLang === 'hi' ? fac.titleHi : fac.titleEn}</h3>
          <p class="facility-desc">${currentLang === 'hi' ? fac.descHi : fac.descEn}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Welfare Schemes
   */
  function renderSchemes() {
    if (!schemesContainer || !window.SCHOOL_DATA) return;
    schemesContainer.innerHTML = window.SCHOOL_DATA.schemes.map(sch => `
      <div class="scheme-card">
        <div class="scheme-card-header">
          <div class="scheme-icon">
            <i class="${sch.icon}"></i>
          </div>
          <h3 class="scheme-card-title">${currentLang === 'hi' ? sch.titleHi : sch.titleEn}</h3>
        </div>
        <p class="scheme-desc">${currentLang === 'hi' ? sch.descHi : sch.descEn}</p>
      </div>
    `).join('');
  }

  /**
   * Render Faculty Directory
   */
  function renderFaculty() {
    if (!facultyContainer || !window.SCHOOL_DATA) return;
    facultyContainer.innerHTML = window.SCHOOL_DATA.faculty.map(f => `
      <div class="faculty-card liquid-glass-card">
        <img src="${f.photo}" alt="${f.name}" class="faculty-photo" loading="lazy">
        <h4 class="faculty-name">${currentLang === 'hi' ? f.nameHi : f.name}</h4>
        <div class="faculty-designation">${currentLang === 'hi' ? f.designationHi : f.designationEn}</div>
        <div class="faculty-subject"><i class="fa-solid fa-book-bookmark me-1"></i> ${currentLang === 'hi' ? f.subjectHi : f.subjectEn}</div>
      </div>
    `).join('');
  }

  /**
   * Render Gallery with Filter
   */
  function renderGallery() {
    if (!galleryContainer || !window.SCHOOL_DATA) return;
    const filtered = currentGalleryFilter === 'all'
      ? window.SCHOOL_DATA.gallery
      : window.SCHOOL_DATA.gallery.filter(g => g.category === currentGalleryFilter);

    galleryContainer.innerHTML = filtered.map(item => `
      <div class="gallery-item" onclick="openLightbox('${item.image}', '${currentLang === 'hi' ? item.titleHi : item.titleEn}')">
        <img src="${item.image}" alt="${item.titleEn}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-tag">${currentLang === 'hi' ? item.tagHi : item.tagEn}</span>
          <div class="gallery-caption">${currentLang === 'hi' ? item.titleHi : item.titleEn}</div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Testimonials
   */
  function renderTestimonials() {
    if (!testimonialsContainer || !window.SCHOOL_DATA) return;
    testimonialsContainer.innerHTML = window.SCHOOL_DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <p class="testimonial-text">"${currentLang === 'hi' ? t.quoteHi : t.quoteEn}"</p>
        <div class="testimonial-author">
          <img src="${t.avatar}" alt="${t.author}" class="author-avatar" loading="lazy">
          <div>
            <div class="author-name">${currentLang === 'hi' ? t.authorHi : t.author}</div>
            <div class="author-role">${currentLang === 'hi' ? t.roleHi : t.roleEn}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Setup Multi-step Admission Form Logic
   */
  function setupAdmissionForm() {
    let currentStep = 1;
    const stepNodes = document.querySelectorAll('.step-node');
    const stepContents = document.querySelectorAll('.step-content');
    const nextBtn = document.getElementById('stepNextBtn');
    const prevBtn = document.getElementById('stepPrevBtn');
    const submitBtn = document.getElementById('stepSubmitBtn');
    const admissionForm = document.getElementById('onlineAdmissionForm');

    const updateStepUI = () => {
      stepNodes.forEach((node, idx) => {
        const stepNum = idx + 1;
        node.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
          node.classList.add('active');
        } else if (stepNum < currentStep) {
          node.classList.add('completed');
        }
      });

      stepContents.forEach((c, idx) => {
        c.style.display = (idx + 1 === currentStep) ? 'block' : 'none';
      });

      if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
      if (nextBtn) nextBtn.style.display = currentStep < 3 ? 'inline-flex' : 'none';
      if (submitBtn) submitBtn.style.display = currentStep === 3 ? 'inline-flex' : 'none';
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentInputs = document.querySelectorAll(`.step-content[data-step="${currentStep}"] input[required], .step-content[data-step="${currentStep}"] select[required]`);
        let valid = true;
        currentInputs.forEach(input => {
          if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = '#E53935';
          } else {
            input.style.borderColor = '';
          }
        });

        if (!valid) {
          showToast(currentLang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.', 'info');
          return;
        }

        if (currentStep === 2) {
          const sName = document.getElementById('admStudentName')?.value || 'Student';
          const sClass = document.getElementById('admClassSelect')?.value || 'Class';
          const sGender = document.getElementById('admGenderSelect')?.value || 'N/A';
          const pName = document.getElementById('admFatherName')?.value || 'Guardian';
          const pMobile = document.getElementById('admMobile')?.value || 'N/A';

          const previewBox = document.getElementById('admSummaryPreview');
          if (previewBox) {
            previewBox.innerHTML = `
              <div style="background: var(--color-neutral-bg); padding: 16px; border-radius: 8px; border: 1px solid var(--color-border);">
                <h4 style="color: var(--color-primary-dark); font-weight: 700; margin-bottom: 8px;"><i class="fa-solid fa-id-card me-2"></i> ${currentLang === 'hi' ? 'आवेदन पूर्वावलोकन' : 'Application Summary'}</h4>
                <div style="font-size: 0.9rem; line-height: 1.8;">
                  <div><strong>${currentLang === 'hi' ? 'विद्यार्थी का नाम:' : 'Student Name:'}</strong> ${sName} (${sGender})</div>
                  <div><strong>${currentLang === 'hi' ? 'कक्षा / संकाय:' : 'Applying For:'}</strong> ${sClass}</div>
                  <div><strong>${currentLang === 'hi' ? 'अभिभावक का नाम:' : 'Parent / Guardian:'}</strong> ${pName}</div>
                  <div><strong>${currentLang === 'hi' ? 'संपर्क मोबाइल:' : 'Contact Mobile:'}</strong> ${pMobile}</div>
                  <div><strong>${currentLang === 'hi' ? 'विद्यालय:' : 'School:'}</strong> Govt. Sr. Sec. School 52 LNP (UDISE: 08010205201)</div>
                </div>
              </div>
            `;
          }
        }

        if (currentStep < 3) {
          currentStep++;
          updateStepUI();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepUI();
        }
      });
    }

    if (admissionForm) {
      admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const appNum = 'GSSS52LNP-' + Math.floor(100000 + Math.random() * 900000);
        showToast(currentLang === 'hi' 
          ? `सफल! आपका आवेदन क्रमांक है: ${appNum}` 
          : `Success! Your Application Number is: ${appNum}`, 'success');
        
        admissionForm.reset();
        currentStep = 1;
        updateStepUI();
        if (admissionModal) {
          admissionModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    updateStepUI();
  }

  /**
   * Global Search Handler
   */
  function handleGlobalSearch(query) {
    if (!searchResultsContainer) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      searchResultsContainer.innerHTML = `<div class="text-muted text-center py-4">${currentLang === 'hi' ? 'खोजने हेतु कुछ टाइप करें...' : 'Type to search notices, courses, faculty, schemes...'}</div>`;
      return;
    }

    let results = [];

    // Search Notices
    if (window.SCHOOL_DATA && window.SCHOOL_DATA.notices) {
      window.SCHOOL_DATA.notices.forEach(n => {
        if (n.titleEn.toLowerCase().includes(q) || n.titleHi.includes(q)) {
          results.push({ type: 'Notice', title: currentLang === 'hi' ? n.titleHi : n.titleEn, meta: n.date, link: '#notices' });
        }
      });
    }

    // Search Streams
    if (window.SCHOOL_DATA && window.SCHOOL_DATA.academicStreams) {
      window.SCHOOL_DATA.academicStreams.forEach(s => {
        if (s.nameEn.toLowerCase().includes(q) || s.nameHi.includes(q) || s.subjects.some(sub => sub.toLowerCase().includes(q))) {
          results.push({ type: 'Academic Stream', title: currentLang === 'hi' ? s.nameHi : s.nameEn, meta: s.subjects.join(', '), link: '#academics' });
        }
      });
    }

    // Search Faculty
    if (window.SCHOOL_DATA && window.SCHOOL_DATA.faculty) {
      window.SCHOOL_DATA.faculty.forEach(f => {
        if (f.name.toLowerCase().includes(q) || f.nameHi.includes(q) || f.subjectEn.toLowerCase().includes(q) || f.subjectHi.includes(q)) {
          results.push({ type: 'Faculty', title: currentLang === 'hi' ? f.nameHi : f.name, meta: currentLang === 'hi' ? f.subjectHi : f.subjectEn, link: '#faculty' });
        }
      });
    }

    // Search Schemes
    if (window.SCHOOL_DATA && window.SCHOOL_DATA.schemes) {
      window.SCHOOL_DATA.schemes.forEach(sc => {
        if (sc.titleEn.toLowerCase().includes(q) || sc.titleHi.includes(q)) {
          results.push({ type: 'Govt Scheme', title: currentLang === 'hi' ? sc.titleHi : sc.titleEn, meta: 'Student Welfare', link: '#schemes' });
        }
      });
    }

    if (results.length === 0) {
      searchResultsContainer.innerHTML = `<div class="text-muted text-center py-4">${currentLang === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No matching results found.'}</div>`;
      return;
    }

    searchResultsContainer.innerHTML = results.map(r => `
      <a href="${r.link}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('open'); document.body.style.overflow='';" style="display: block; padding: 12px; border-bottom: 1px solid var(--color-border); transition: background 0.15s;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--color-secondary); background: rgba(21,101,192,0.1); padding: 2px 6px; border-radius: 4px;">${r.type}</span>
        <div style="font-weight: 600; color: var(--color-primary-dark); margin-top: 4px;">${r.title}</div>
        <small class="text-muted">${r.meta}</small>
      </a>
    `).join('');
  }
});

/**
 * Global Helpers
 */
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-success' : 'fa-circle-info text-primary'}"></i>
    <span style="font-size: 0.88rem; font-weight: 600;">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

window.downloadNoticeMock = function(noticeId, title) {
  showToast(`Downloading official circular: "${title}" (PDF)...`, 'info');
  setTimeout(() => {
    showToast(`Circular #${noticeId} downloaded successfully.`, 'success');
  }, 1000);
};

window.openLightbox = function(imageUrl, caption) {
  let lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';
    lightbox.innerHTML = `
      <button id="closeLightboxBtn" style="position:absolute;top:20px;right:20px;color:#fff;font-size:32px;background:none;border:none;cursor:pointer;">&times;</button>
      <img id="lightboxImg" src="" style="max-width:90%;max-height:80vh;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
      <div id="lightboxCaption" style="color:#fff;margin-top:16px;font-size:1.1rem;font-weight:600;text-align:center;"></div>
    `;
    document.body.appendChild(lightbox);

    document.getElementById('closeLightboxBtn').onclick = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    };

    lightbox.onclick = (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
  }

  document.getElementById('lightboxImg').src = imageUrl;
  document.getElementById('lightboxCaption').textContent = caption;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

// Global Portal Modal Handler for Results, TC, and Downloads
window.openPortalModal = function(type) {
  const modal = document.getElementById('servicesModal');
  const title = document.getElementById('servicesModalTitle');
  const body = document.getElementById('servicesModalBody');
  const closeBtn = document.getElementById('closeServicesBtn');

  if (!modal || !title || !body) return;

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (type === 'results') {
    title.textContent = 'RBSE Board Exam Result Portal 2026-27';
    body.innerHTML = `
      <form id="resultCheckForm" onsubmit="event.preventDefault(); handleResultSearch();">
        <div class="form-group">
          <label class="form-label">Select Class / Exam</label>
          <select id="resClassSelect" class="form-select" required>
            <option value="12th Science">Class 12th Senior Secondary (Science)</option>
            <option value="12th Agriculture">Class 12th Senior Secondary (Agriculture)</option>
            <option value="12th Arts">Class 12th Senior Secondary (Arts)</option>
            <option value="10th Secondary">Class 10th Secondary Examination</option>
            <option value="8th Board">Class 8th Board Examination</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Enter RBSE Roll Number / Shala Darpan Student ID *</label>
          <input type="text" id="resRollInput" class="form-input" required placeholder="e.g. 2605201" style="font-weight: 700; letter-spacing: 1px;">
        </div>
        <button type="submit" class="btn btn-primary btn-sm w-100" style="width: 100%; margin-top: 8px;">
          <i class="fa-solid fa-magnifying-glass me-1"></i> Check & Download Marksheet
        </button>
      </form>
      <div id="resultOutputArea" style="margin-top: 16px;"></div>
    `;
  } else if (type === 'tc') {
    title.textContent = 'Online Transfer Certificate (TC) Application';
    body.innerHTML = `
      <form id="tcApplyForm" onsubmit="event.preventDefault(); handleTCSubmit();">
        <div class="form-group">
          <label class="form-label">Student's Full Name *</label>
          <input type="text" class="form-input" required placeholder="Student Name as per School Register">
        </div>
        <div class="form-group">
          <label class="form-label">Scholar Registration No. (SR No.) / Admission No. *</label>
          <input type="text" class="form-input" required placeholder="e.g. SR-52-1082">
        </div>
        <div class="form-group">
          <label class="form-label">Last Class Passed / Studied *</label>
          <select class="form-select" required>
            <option value="12">Class 12th Passed</option>
            <option value="10">Class 10th Passed</option>
            <option value="8">Class 8th Passed</option>
            <option value="other">Other Class</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Reason for TC *</label>
          <input type="text" class="form-input" required placeholder="e.g. Higher Education in College / Family Relocation">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Mobile Number *</label>
          <input type="tel" class="form-input" required placeholder="Parent 10-digit mobile">
        </div>
        <button type="submit" class="btn btn-navy btn-sm" style="width: 100%; margin-top: 8px;">
          <i class="fa-solid fa-paper-plane me-1"></i> Submit TC Application
        </button>
      </form>
    `;
  } else if (type === 'downloads') {
    title.textContent = 'Official Forms & Syllabus Download Center';
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-neutral-bg);">
          <div>
            <div style="font-weight: 700; color: var(--color-primary-dark);">1. School Offline Admission Form 2026-27 (प्रवेश फॉर्म)</div>
            <small class="text-muted">PDF format • 340 KB</small>
          </div>
          <button class="btn btn-sm btn-outline-navy" onclick="downloadNoticeMock('AF-01', 'Offline Admission Form')"><i class="fa-solid fa-download"></i></button>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-neutral-bg);">
          <div>
            <div style="font-weight: 700; color: var(--color-primary-dark);">2. RBSE Class 11-12 Complete Syllabus (Science, Arts, Agri)</div>
            <small class="text-muted">PDF format • 1.2 MB</small>
          </div>
          <button class="btn btn-sm btn-outline-navy" onclick="downloadNoticeMock('SYL-12', 'RBSE 11-12 Syllabus')"><i class="fa-solid fa-download"></i></button>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-neutral-bg);">
          <div>
            <div style="font-weight: 700; color: var(--color-primary-dark);">3. Fee Concession & Scholarship Declaration Format</div>
            <small class="text-muted">PDF format • 210 KB</small>
          </div>
          <button class="btn btn-sm btn-outline-navy" onclick="downloadNoticeMock('SCH-04', 'Fee Concession Format')"><i class="fa-solid fa-download"></i></button>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.handleResultSearch = function() {
  const roll = (document.getElementById('resRollInput')?.value || '').trim();
  const output = document.getElementById('resultOutputArea');
  if (!output) return;

  const data = window.SCHOOL_DATA?.boardResults2026;
  if (!data) return;

  const student = data.artsStudents.find(s => s.roll === roll || s.name.toLowerCase() === roll.toLowerCase()) 
               || data.scienceStudents.find(s => s.roll === roll || s.name.toLowerCase() === roll.toLowerCase());

  if (!student) {
    output.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1.5px solid #EF4444; border-radius: 8px; padding: 14px; text-align: center; color: #EF4444;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 1.5rem; margin-bottom: 6px;"></i>
        <div><strong>No Result Found for Roll No / Name: "${roll}"</strong></div>
        <small style="color: var(--text-secondary);">Please verify your 7-digit RBSE Roll Number (e.g. 3359329 or 2737271).</small>
      </div>
    `;
    return;
  }

  if (typeof window.openStudentScorecard === 'function') {
    window.openStudentScorecard(student.roll);
  }
};

window.handleTCSubmit = function() {
  const reqNo = 'TC-52LNP-' + Math.floor(1000 + Math.random() * 9000);
  showToast(`TC Request submitted successfully! Reference No: ${reqNo}. School office will verify and issue in 2 working days.`, 'success');
  const modal = document.getElementById('servicesModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ==========================================================================
// 3D INTERACTIVE MOUSE PARALLAX & TILT ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('home');
  const floatingItems = document.querySelectorAll('.floating-3d-item');

  if (heroSection && floatingItems.length > 0) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatingItems.forEach((item, index) => {
        const factor = (index + 1) * 18;
        const rotateX = -y * factor;
        const rotateY = x * factor;
        const translateZ = (index + 1) * 12;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      floatingItems.forEach(item => {
        item.style.transform = '';
      });
    });
  }

  // 3D Card Hover Tilt Controller
  const tiltCards = document.querySelectorAll('.quick-card, .stream-card, .facility-card, .scheme-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// Theme Switcher (Liquid Glass & BB-8 Droid Toggle)
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggleSwitch');
  
  function playBB8Beep(isNight) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      if (isNight) {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
      } else {
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
      }
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function applyTheme(theme, showNotification = false) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('gsss_theme', 'light');
      if (themeToggle) themeToggle.checked = false;
      if (showNotification && typeof showToast === 'function') {
        showToast('☀️ Light Mode (Crystal Glass) activated.', 'info');
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('gsss_theme', 'dark');
      if (themeToggle) themeToggle.checked = true;
      if (showNotification && typeof showToast === 'function') {
        showToast('🌙 Dark Mode (Liquid Glass) activated.', 'info');
      }
    }
  }

  // Load saved theme or default to Dark
  const savedTheme = localStorage.getItem('gsss_theme') || 'dark';
  applyTheme(savedTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      const isNight = e.target.checked;
      playBB8Beep(isNight);
      applyTheme(isNight ? 'dark' : 'light', true);
    });
  }
});

// ==========================================================================
// 3D PARALLAX TILT & HOVER ENGINE (HERO 3D CAMPUS MODEL)
// ==========================================================================
function init3DCampusModel() {
  const card = document.getElementById('heroModelCard');
  if (!card) return;

  let bounds = card.getBoundingClientRect();
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let isHovered = false;

  function updateBounds() {
    bounds = card.getBoundingClientRect();
  }

  window.addEventListener('resize', updateBounds, { passive: true });
  window.addEventListener('scroll', updateBounds, { passive: true });

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    card.classList.add('is-hovering');
    updateBounds();
  });

  card.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const percentX = Math.max(0, Math.min(1, x / bounds.width));
    const percentY = Math.max(0, Math.min(1, y / bounds.height));

    // Tilt range: -14 to +14 deg
    targetRotateX = (0.5 - percentY) * 24;
    targetRotateY = (percentX - 0.5) * 24;

    card.style.setProperty('--mouse-x', `${(percentX * 100).toFixed(1)}%`);
    card.style.setProperty('--mouse-y', `${(percentY * 100).toFixed(1)}%`);
    card.style.setProperty('--shine-x', `${(percentX * 100).toFixed(1)}%`);
    card.style.setProperty('--shine-y', `${(percentY * 100).toFixed(1)}%`);
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
    card.classList.remove('is-hovering');
    targetRotateX = 0;
    targetRotateY = 0;
  });

  // Touch / Mobile Tilt Support
  card.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const x = touch.clientX - bounds.left;
      const y = touch.clientY - bounds.top;
      const percentX = Math.max(0, Math.min(1, x / bounds.width));
      const percentY = Math.max(0, Math.min(1, y / bounds.height));
      targetRotateX = (0.5 - percentY) * 18;
      targetRotateY = (percentX - 0.5) * 18;
      isHovered = true;
      card.classList.add('is-hovering');
    }
  }, { passive: true });

  card.addEventListener('touchend', () => {
    isHovered = false;
    card.classList.remove('is-hovering');
    targetRotateX = 0;
    targetRotateY = 0;
  });

  // Smooth lerp loop
  function renderLoop() {
    if (isHovered) {
      currentRotateX += (targetRotateX - currentRotateX) * 0.14;
      currentRotateY += (targetRotateY - currentRotateY) * 0.14;

      card.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1.035, 1.035, 1.035)`;
    } else {
      currentRotateX += (0 - currentRotateX) * 0.08;
      currentRotateY += (0 - currentRotateY) * 0.08;

      if (Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
        card.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      } else {
        card.style.transform = '';
      }
    }
    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}

document.addEventListener('DOMContentLoaded', () => {
  init3DCampusModel();
});
