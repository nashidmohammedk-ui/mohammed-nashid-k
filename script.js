/**
 * Mohammed Nashid K — Portfolio JavaScript Application
 * Aesthetic: White & Electric Sky-Blue Theme with Ambient Light Orbs
 * Direct match to media_1793634915878_b8f8a12e.png
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. TACTILE AUDIO SYNTHESIZER (Web Audio API)
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = false;

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIconOn = document.getElementById('soundIconOn');
  const soundIconOff = document.getElementById('soundIconOff');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playClickSound(freq = 720, type = 'sine', duration = 0.035) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted without interaction
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        playClickSound(800, 'sine', 0.05);
      } else {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
      }
    });
  }

  // Bind subtle click sound to interactive elements
  document.querySelectorAll('button, a, .filter-pill-btn').forEach(el => {
    el.addEventListener('click', () => {
      playClickSound(580, 'triangle', 0.03);
    });
  });

  // =========================================================================
  // 2. SLIDE-OUT NAVIGATION DRAWER
  // =========================================================================
  const drawerOpenBtn = document.getElementById('drawerOpenBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const navDrawerBackdrop = document.getElementById('navDrawerBackdrop');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-item a');

  function openNavDrawer() {
    if (navDrawerBackdrop) {
      navDrawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      playClickSound(650, 'sine', 0.04);
    }
  }

  function closeNavDrawer() {
    if (navDrawerBackdrop) {
      navDrawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      playClickSound(450, 'sine', 0.03);
    }
  }

  if (drawerOpenBtn) {
    drawerOpenBtn.addEventListener('click', openNavDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeNavDrawer);
  }

  if (navDrawerBackdrop) {
    navDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === navDrawerBackdrop) {
        closeNavDrawer();
      }
    });
  }

  drawerNavLinks.forEach(link => {
    link.addEventListener('click', closeNavDrawer);
  });

  // =========================================================================
  // 2B. RECTANGULAR TOP NAVBAR ACTIVE LINK SCROLLSPY
  // =========================================================================
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  const navLinkedSections = Array.from(navLinkItems)
    .map(link => document.getElementById(link.getAttribute('href').replace('#', '')))
    .filter(Boolean);

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    
    // Check from bottom to top to find the current active section
    let currentActiveId = '';
    for (let i = navLinkedSections.length - 1; i >= 0; i--) {
      const section = navLinkedSections[i];
      if (scrollPos >= section.offsetTop - 60) {
        currentActiveId = section.getAttribute('id');
        break;
      }
    }

    if (!currentActiveId && navLinkedSections.length > 0) {
      currentActiveId = navLinkedSections[0].getAttribute('id');
    }

    navLinkItems.forEach(link => {
      if (link.getAttribute('href') === `#${currentActiveId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // =========================================================================
  // 3. 3D PARALLAX TILT ON ABOUT ME PORTRAIT STAGE
  // =========================================================================
  const portraitStage = document.getElementById('aboutPortraitStage');
  if (portraitStage) {
    portraitStage.addEventListener('mousemove', (e) => {
      const rect = portraitStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      portraitStage.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    portraitStage.addEventListener('mouseleave', () => {
      portraitStage.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      portraitStage.style.transition = 'transform 0.5s ease';
    });

    portraitStage.addEventListener('mouseenter', () => {
      portraitStage.style.transition = 'none';
    });
  }

  // =========================================================================
  // 4. SERVICE DELIVERABLES ACCORDION
  // =========================================================================
  const expandBtns = document.querySelectorAll('.service-expand-trigger');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (panel) {
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        const textSpan = btn.querySelector('span');
        if (textSpan) {
          textSpan.textContent = isOpen ? 'View Deliverables' : 'Hide Deliverables';
        }
      }
    });
  });

  // =========================================================================
  // 5. FEATURED PROJECTS FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const projectCards = document.querySelectorAll('.themed-project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 6. PROMPT & CONCEPT INSPECTOR MODAL
  // =========================================================================
  const projectData = {
    cyberpunk: {
      title: 'Porsche 911 — Cinematic AI Commercial',
      badge: 'AI CINEMATIC VIDEO • 4K RENDER',
      desc: 'High-octane luxury automotive commercial engineered for fluid camera sweeps, photorealistic paint reflections, volumetric atmospheric lighting, and precision motion pacing.',
      prompt: 'Cinematic commercial film of a sleek Porsche 911 driving through dramatic atmospheric landscapes, volumetric golden hour and neon night lighting, ultra-realistic car paint reflections, high-speed tracking camera, 8k resolution, photorealistic cinematic grade --ar 16:9 --v 6.0',
      engine: 'Kling AI + Midjourney v6',
      ar: '16:9 Cinema 4K',
      img: 'assets/project-cyberpunk.svg',
      video: 'assets/project-porsche.mp4'
    },
    perfume: {
      title: 'Aura Luxury Perfume — Brand Commercial',
      badge: 'COMMERCIAL • PRODUCT VISUALIZATION',
      desc: 'Created for a luxury fragrance brand. Showcasing fluid dynamics of amber perfume, crystalline glass refraction, floating gold dust particles, and soft moody studio lighting.',
      prompt: '/imagine prompt: Commercial product photography of a luxury minimalist perfume bottle with gold cap, rich amber liquid inside, sitting on black marble reflection pool, soft golden volumetric light beam, floating golden dust particles, cinematic chiaroscuro lighting, shot on Hasselblad H6D-100c --ar 16:9 --v 6.0',
      engine: 'Midjourney v6 + Runway Gen-3 Alpha',
      ar: '16:9 4K Commercial',
      img: 'assets/project-perfume.svg'
    },
    kerala: {
      title: 'Kerala Chronicles: Myth & Motion',
      badge: 'CULTURAL NARRATIVE • VISUAL ART',
      desc: 'Reimagining the sacred heritage of Kerala’s Theyyam and Kathakali rituals. Generated with authentic ceremonial costumes, vivid crimson firelight, sacred face paint geometry, and organic atmospheric haze.',
      prompt: '/imagine prompt: Hyper-detailed portrait of a sacred Theyyam ritual dancer in Kerala India, ornate towering crimson headdress with gold ornaments, intense gaze, intricate facial patterns, surrounded by temple oil torch flames and smoke, dramatic midnight lighting, cultural authenticity, cinematic realism --ar 16:9 --v 6.0',
      engine: 'AI Motion Synthesis + DaVinci Resolve',
      ar: '16:9 Cultural Epic',
      img: 'assets/project-kerala.svg'
    },
    architect: {
      title: "The Architect's Dream — Spatial Visuals",
      badge: 'SPATIAL COMPOSITION • ARCHITECTURE',
      desc: 'A prompt engineering masterclass in brutalist cantilever architecture, water reflections, volumetric sunset rays, and dramatic architectural human scale.',
      prompt: '/imagine prompt: Monumental brutalist concrete modern museum cantilevered over an expansive calm reflecting pool, golden hour twilight sky, sharp geometrical shadows, floor-to-ceiling glass pavilions, solitary silhouette figure walking on terrace, architectural digest editorial --ar 16:9 --v 6.0',
      engine: 'Midjourney v6 Spatial Prompting',
      ar: '16:9 Architectural',
      img: 'assets/project-architect.svg'
    },
    velocity: {
      title: 'Velocity X: Apex Motion — Automotive Reel',
      badge: 'SHORT-FORM REELS • FAST-PACED EDIT',
      desc: 'High-octane automotive reel formatted for social media and commercial teasers. Features motion-blurred speed streaks, headlight flare, and custom sound design.',
      prompt: '/imagine prompt: Sleek matte black prototype hypercar speeding through a rainy coastal mountain tunnel at midnight, glowing red taillight streak trail, wet asphalt reflections, dynamic low camera angle tracking shot, cinematic motion blur, shutter angle 180 --ar 16:9 --v 6.0',
      engine: 'Kling AI + Adobe Premiere Pro',
      ar: '16:9 & 9:16 Social Reel',
      img: 'assets/project-velocity.svg'
    },
    chrono: {
      title: 'Chrono Voyagers — Sci-Fi Narrative Short',
      badge: 'SCI-FI NARRATIVE • WORLD-BUILDING',
      desc: 'An original cinematic sci-fi narrative concept exploring human explorers venturing into interdimensional portals. Maintained strict character visual continuity across scene cuts.',
      prompt: '/imagine prompt: Cinematic wide shot of an astronaut floating in zero gravity approaching a colossal glowing ultraviolet portal in deep space, cosmic nebula background, detailed spacesuit textures, gold reflective helmet visor, interstellar cinematic awe --ar 16:9 --v 6.0',
      engine: 'Midjourney v6 + Luma Dream Machine',
      ar: '16:9 Cinema Scope',
      img: 'assets/project-chrono.svg'
    }
  };

  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalProjectImg');
  const modalVideo = document.getElementById('modalProjectVideo');
  const modalBadge = document.getElementById('modalProjectBadge');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalPrompt = document.getElementById('modalProjectPrompt');
  const modalEngine = document.getElementById('modalProjectEngine');
  const modalAR = document.getElementById('modalProjectAR');
  const copyPromptBtn = document.getElementById('copyPromptBtn');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    if (data.video && modalVideo) {
      modalVideo.src = data.video;
      modalVideo.style.display = 'block';
      modalImg.style.display = 'none';
      modalVideo.play().catch(() => {});
    } else {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
        modalVideo.style.display = 'none';
      }
      modalImg.src = data.img;
      modalImg.style.display = 'block';
    }

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalPrompt.textContent = data.prompt;
    modalEngine.textContent = data.engine;
    modalAR.textContent = data.ar;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    playClickSound(750, 'sine', 0.05);
  }

  function closeProjectModal() {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    modal.classList.remove('open');
    document.body.style.overflow = '';
    playClickSound(450, 'sine', 0.04);
  }

  // Bind project card click & button click
  document.querySelectorAll('.themed-project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-id');
      openProjectModal(projId);
    });
  });

  document.querySelectorAll('.btn-open-prompt-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Copy Prompt to Clipboard
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalPrompt.textContent).then(() => {
        const originalText = copyPromptBtn.textContent;
        copyPromptBtn.textContent = 'Copied!';
        playClickSound(950, 'sine', 0.04);
        setTimeout(() => {
          copyPromptBtn.textContent = originalText;
        }, 1800);
      });
    });
  }

  // =========================================================================
  // 6B. RESUME MODAL HANDLER
  // =========================================================================
  const resumeModal = document.getElementById('resumeModal');
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const resumeHireBtn = document.getElementById('resumeHireBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      playClickSound(750, 'sine', 0.05);
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
      playClickSound(450, 'sine', 0.04);
    }
  }

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', openResumeModal);
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeHireBtn) {
    resumeHireBtn.addEventListener('click', closeResumeModal);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });

  // =========================================================================
  // 7. COPY EMAIL UTILITY
  // =========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailDisplay = document.getElementById('emailDisplay');
  if (copyEmailBtn && emailDisplay) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailDisplay.textContent.trim()).then(() => {
        playClickSound(900, 'sine', 0.05);
        const originalSvg = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--blue-vibrant); font-weight:bold;">Copied!</span>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalSvg;
        }, 2000);
      });
    });
  }

  // =========================================================================
  // 8. INTERACTIVE CONTACT FORM SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const service = document.getElementById('projectType').value;
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !email || !message) return;

      playClickSound(900, 'triangle', 0.08);

      // Save inquiry to localStorage
      const inquiry = { name, email, service, message, date: new Date().toISOString() };
      const inquiries = JSON.parse(localStorage.getItem('nashid_inquiries') || '[]');
      inquiries.push(inquiry);
      localStorage.setItem('nashid_inquiries', JSON.stringify(inquiries));

      formFeedback.className = 'form-status-alert success';
      formFeedback.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your creative brief for <strong>${service}</strong> has been received. Mohammed Nashid will review your project and get in touch with you at <strong>${email}</strong> shortly.`;

      contactForm.reset();
    });
  }

  // =========================================================================
  // 9. CINEMATIC MOTION & SCROLL REVEAL (PAGE 1 HERO & PAGE 2 ABOUT ME)
  // Replicating smooth rising entrance, floating breathing loop, and parallax from reference video
  // =========================================================================
  const heroPortraitImg = document.querySelector('.hero-portrait-theme-img');
  const heroPortraitCol = document.querySelector('.hero-portrait-col');
  const aboutSection = document.getElementById('about');
  const aboutPortraitWrap = document.querySelector('.about-poster-portrait-wrap');

  // Trigger breathing float loop on Hero portrait after entrance rise animation finishes
  if (heroPortraitImg && heroPortraitCol) {
    heroPortraitImg.addEventListener('animationend', (e) => {
      if (e.animationName === 'heroPortraitRise') {
        heroPortraitCol.classList.add('floating');
      }
    });
  }

  // IntersectionObserver for Page 2 (About Me) entrance motion
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('in-view');
          if (aboutPortraitWrap) {
            setTimeout(() => {
              aboutPortraitWrap.classList.add('floating');
            }, 1200);
          }
        }
      });
    }, { threshold: 0.12 });

    aboutObserver.observe(aboutSection);
  }

  // Smooth cinematic scroll parallax between Page 1 and Page 2
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        // Subtle upward parallax for hero portrait during scroll
        if (heroPortraitImg && scrolled < windowHeight * 1.2) {
          const shiftY = scrolled * 0.14;
          heroPortraitImg.style.setProperty('--hero-scroll-shift-y', `${shiftY * -1}px`);
        }

        // Subtle parallax depth for about portrait
        if (aboutSection && aboutPortraitWrap) {
          const rect = aboutSection.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const aboutShiftY = (progress - 0.5) * -20;
            aboutPortraitWrap.style.setProperty('--about-shift-y', `${aboutShiftY}px`);
          }
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

});
