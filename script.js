/**
 * Mohammed Nashid K — Portfolio JavaScript Application
 * Aesthetic: White & Electric Sky-Blue Theme with Ambient Light Orbs
 * Direct match to media_1793634915878_b8f8a12e.png
 * Enhanced with GSAP & ScrollTrigger Cinematic Motion Suite from Reference Video
 */

// Idempotency guard: prevent duplicate initialization if loaded multiple times
if (window.__NASHID_PORTFOLIO_INIT__) {
  // Already initialized
} else {
  window.__NASHID_PORTFOLIO_INIT__ = true;

  document.addEventListener('DOMContentLoaded', () => {

    const hasGSAP = typeof gsap !== 'undefined';
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasGSAP && hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      if (typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
      }
      document.documentElement.classList.add('gsap-active');
    }

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
    document.querySelectorAll('button, a, .filter-pill-btn, .toolkit-chip-item').forEach(el => {
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
        if (hasGSAP) {
          gsap.from('.drawer-nav-item', {
            x: 40,
            opacity: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
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
    // 2B. TOP NAVBAR ACTIVE LINK SCROLLSPY & SMOOTH SCROLL
    // =========================================================================
    const navPillLinks = document.querySelectorAll('.nav-link-item, .nav-pill-link');
    const pageSections = document.querySelectorAll('header.hero-wrapper[id], section[id]');

    function updateActiveNavLink() {
      const scrollPos = window.scrollY + 140;
      pageSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navPillLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    // Smooth navigation anchor scrolling with GSAP ScrollTo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (hasGSAP && typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: targetEl, offsetY: 70 },
              ease: 'power3.inOut'
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // =========================================================================
    // 3. SERVICE DELIVERABLES ACCORDION
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
          if (hasGSAP && !isOpen) {
            gsap.from(panel.querySelectorAll('li'), {
              y: 10,
              opacity: 0,
              stagger: 0.05,
              duration: 0.35,
              ease: 'power2.out'
            });
          }
        }
      });
    });

    // =========================================================================
    // 4. FEATURED PROJECTS FILTERING
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
            if (hasGSAP) {
              gsap.fromTo(card, { opacity: 0, y: 25, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
            } else {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 20);
            }
          } else {
            if (hasGSAP) {
              gsap.to(card, { opacity: 0, y: 15, duration: 0.25, onComplete: () => { card.style.display = 'none'; } });
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(15px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 250);
            }
          }
        });
      });
    });

    // =========================================================================
    // 5. PROMPT & CONCEPT INSPECTOR MODAL
    // =========================================================================
    const projectData = {
      porsche: {
        title: 'Porsche 911 — Cinematic AI Commercial',
        badge: 'AI CINEMATIC VIDEO • 4K RENDER',
        desc: 'High-octane luxury automotive commercial engineered for fluid camera sweeps, photorealistic paint reflections, and dynamic cinematic lighting.',
        prompt: '/imagine prompt: Hyper-realistic cinematic commercial shot of a glossy metallic slate grey Porsche 911 speeding on a mountain coastal highway at dusk, golden hour sun reflections on curved metal, cinematic 35mm anamorphic lens, motion blur background, 8k resolution, photorealistic render --ar 16:9 --style raw --v 6.0',
        engine: 'Kling AI + Midjourney v6',
        ar: '16:9 Cinema 4K',
        video: 'assets/project-porsche.mp4',
        img: 'assets/project-velocity.svg'
      },
      mkframes: {
        title: 'M.K Art & Frames — Commercial Showcase',
        badge: 'COMMERCIAL REEL • 4K ULTRA HD',
        desc: 'Commercial architectural visualization and dynamic brand showcase crafted for M.K Art & Frames, highlighting bespoke frame galleries, luxury showroom interiors, and artisanal craftsmanship.',
        prompt: '/imagine prompt: Ultra-realistic architectural commercial showcase of M.K Art & Frames showroom, elegant contemporary gallery interiors with warm ambient track lighting, bespoke handcrafted picture frames lining luxury textured accent walls, smooth cinematic tracking shot, 8k, photorealistic architectural digest style --ar 9:16 --v 6.0',
        engine: 'Kling AI + Topaz Video AI',
        ar: '9:16 Vertical Reel (4K)',
        video: 'assets/project-mk-frames.mp4',
        img: 'assets/project-cyberpunk.svg'
      },
      cocowhite: {
        title: 'CoCoWhite — Touch of Purity Commercial',
        badge: 'BRAND CAMPAIGN • 9:16 4K REEL',
        desc: 'A multi-scene cinematic brand commercial for CoCoWhite premium tissues ("Touch of Purity — A Little Essential. Everywhere."). Follows dynamic everyday lifestyle vignettes including toddler finger-painting, fine dining hospitality, corporate workspace cleanup, gym fitness recovery, and gentle baby nursery care.',
        prompt: '/imagine prompt: Cinematic commercial lifestyle campaign for CoCoWhite premium tissues, vibrant purple and azure blue gradient box, seamless transitions between diverse daily moments: messy colorful kid finger-painting, elegant restaurant candlelit dining, spilled coffee in sunny modern office, sweaty athletic woman in fitness gym, mother gently dabbing newborn baby with ultra-soft white tissue, macro hero packshot on dewy reflective surface with condensation droplets, shot on ARRI Alexa Mini, 8k resolution, cinematic lighting --ar 9:16 --v 6.0',
        engine: 'Minimax Hailuo AI + Kling AI + Premiere Pro',
        ar: '9:16 Vertical Reel (4K)',
        video: 'assets/project-cocowhite.mp4',
        img: 'assets/project-cocowhite.jpg'
      },
      cyberpunk: {
        title: 'Cyberpunk Neon Noir — Cinematic AI Commercial',
        badge: 'AI CINEMATIC VIDEO • 4K RENDER',
        desc: 'An evocative glimpse into a high-density neo-Tokyo rainscape. Engineered for fluid camera tracking, realistic neon precipitation reflections, and photorealistic skin subsurface scattering on futuristic cyborg characters.',
        prompt: '/imagine prompt: Cinematic medium wide shot of a futuristic street in Neo-Tokyo, pouring rain, glowing neon kanji signs reflected in puddles, cinematic red and cyan rim lighting, volumetric steam, anamorphic lens flare, 35mm film grain, 8k resolution, directed by Denis Villeneuve --ar 16:9 --style raw --v 6.0',
        engine: 'Midjourney v6 + Kling AI Camera Motion',
        ar: '16:9 Cinema Wide',
        img: 'assets/project-cyberpunk.svg'
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
          modalVideo.style.display = 'none';
        }
        modalImg.style.display = 'block';
        modalImg.src = data.img;
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

      if (hasGSAP) {
        gsap.fromTo('.project-modal-box', { scale: 0.9, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' });
      }
    }

    function closeProjectModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
      playClickSound(450, 'sine', 0.04);
    }

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
    // 6. RESUME MODAL HANDLER
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
        if (hasGSAP) {
          gsap.fromTo('.resume-modal-box', { scale: 0.92, opacity: 0, y: 25 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' });
        }
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

        const inquiry = { name, email, service, message, date: new Date().toISOString() };
        const inquiries = JSON.parse(localStorage.getItem('nashid_inquiries') || '[]');
        inquiries.push(inquiry);
        localStorage.setItem('nashid_inquiries', JSON.stringify(inquiries));

        formFeedback.className = 'form-status-alert success';
        formFeedback.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your creative brief for <strong>${service}</strong> has been received. Mohammed Nashid will review your project and get in touch with you at <strong>${email}</strong> shortly.`;

        if (hasGSAP) {
          gsap.fromTo(formFeedback, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' });
        }

        contactForm.reset();
      });
    }

    // =========================================================================
    // 9. HERO SECTION CINEMATIC ENTRANCE (DIRECT LOAD, NO LOCK SCREEN)
    // =========================================================================
    function triggerHeroEntrance() {
      document.body.classList.add('preloader-done');

      // Prepare tagline word masks
      const tagline = document.querySelector('.hero-tagline-phrase');
      if (tagline && !tagline.querySelector('.word-mask')) {
        const words = tagline.textContent.trim().split(/\s+/);
        tagline.innerHTML = words.map(w => `<span class="word-mask"><span class="word-reveal">${w}</span></span>`).join(' ');
      }

      if (hasGSAP && !prefersReducedMotion) {
        const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Navbar slide down
        heroTL.fromTo('#mainNavbar', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0);

        // Hero Brand left
        heroTL.fromTo('.hero-brand-left', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 0.1);

        // Stacked PORTFOLIO Graphic wipe
        heroTL.fromTo('.hero-portfolio-logo-img', { clipPath: 'inset(100% 0% 0% 0%)', y: 35, opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 1.1 }, 0.2);

        // Tagline Word-by-Word Reveal
        const taglineWords = document.querySelectorAll('.hero-tagline-phrase .word-reveal');
        if (taglineWords.length > 0) {
          heroTL.fromTo(taglineWords, { y: '120%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.08, duration: 0.95 }, 0.35);
        } else {
          heroTL.fromTo('.hero-tagline-phrase', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.35);
        }

        // Year Callout
        heroTL.fromTo('.spaced-year-callout', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0.5);

        // Hero Portrait Reveal (Crystal Clear, Zero Blur)
        heroTL.fromTo('.hero-portrait-theme-img',
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.1, ease: 'power3.out' },
          0.2
        );

      } else {
        const heroCol = document.querySelector('.hero-portrait-col');
        if (heroCol) heroCol.classList.add('floating');
      }
    }

    // Immediately trigger hero entrance
    triggerHeroEntrance();

    // =========================================================================
    // 10. SCROLL PROGRESS BAR & FLOATING CONTROLS
    // =========================================================================
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollProgressBar && docHeight > 0) {
        const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        scrollProgressBar.style.width = `${progressPercent}%`;
      }

      if (backToTopBtn) {
        if (scrollY > 420) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        if (hasGSAP && typeof ScrollToPlugin !== 'undefined') {
          gsap.to(window, { duration: 1.1, scrollTo: { y: 0 }, ease: 'power3.inOut' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        playClickSound(650, 'sine', 0.04);
      });
    }

    // =========================================================================
    // 11. AMBIENT BACKGROUND PARTICLE CANVAS (SUBTLE FLOATING EMBERS)
    // Matches video 00:01 - 00:46 ethereal ambient particles
    // =========================================================================
    const canvas = document.getElementById('ambientMotionCanvas');
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = 0;
      let height = 0;
      let particles = [];
      let mouseX = -1000;
      let mouseY = -1000;
      let animFrameId = null;

      function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
      });

      const particleCount = window.innerWidth < 768 ? 14 : 34;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 2 + 1,
          baseAlpha: Math.random() * 0.45 + 0.15,
          speedY: Math.random() * 0.45 + 0.25,
          driftSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.35 ? '56, 189, 248' : '186, 230, 253'
        });
      }

      function renderParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          p.x += Math.sin(p.phase) * 0.45;
          p.phase += p.driftSpeed;

          // Mouse proximity deflection
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const alphaPulse = p.baseAlpha + Math.sin(p.phase * 1.5) * 0.12;
          const alpha = Math.max(0.08, Math.min(0.75, alphaPulse));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
          ctx.shadowBlur = p.radius * 4;
          ctx.shadowColor = `rgba(${p.color}, 0.8)`;
          ctx.fill();
        }

        if (!document.hidden) {
          animFrameId = requestAnimationFrame(renderParticles);
        }
      }

      animFrameId = requestAnimationFrame(renderParticles);

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !animFrameId) {
          animFrameId = requestAnimationFrame(renderParticles);
        } else if (document.hidden && animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      });
    }

    // =========================================================================
    // 12. GSAP SCROLLTRIGGER REVEAL SYSTEM (STEP 3.B & STEP 4)
    // Word-masked typography reveals, staggered card cascades, clip-paths
    // =========================================================================
    if (hasGSAP && hasScrollTrigger && !prefersReducedMotion) {

      // A. Section Titles: Word-by-Word Clip-Path Reveal
      document.querySelectorAll('.section-title-large').forEach(title => {
        if (title.closest('#about')) return; // Handled in dedicated About Me timeline below
        if (!title.querySelector('.word-mask')) {
          const words = title.textContent.trim().split(/\s+/);
          title.innerHTML = words.map(w => `<span class="word-mask"><span class="word-reveal">${w}</span></span>`).join(' ');
        }

        const section = title.closest('section') || title.parentElement;
        const words = title.querySelectorAll('.word-reveal');

        gsap.from(words, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: '115%',
          opacity: 0,
          stagger: 0.05,
          duration: 0.85,
          ease: 'power4.out'
        });
      });

      // Section Micro-Tags & Subtitles
      document.querySelectorAll('.section-header-block').forEach(block => {
        if (block.closest('#about')) return;
        const tag = block.querySelector('.brand-accent-tag');
        const microTag = block.querySelector('.section-micro-tag');
        const subtitle = block.querySelector('.section-subtitle-text');

        if (tag) {
          gsap.from(tag, {
            scrollTrigger: { trigger: block, start: 'top 85%' },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(2)'
          });
        }

        if (microTag) {
          gsap.from(microTag, {
            scrollTrigger: { trigger: block, start: 'top 85%' },
            x: -25,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
          });
        }

        if (subtitle) {
          gsap.from(subtitle, {
            scrollTrigger: { trigger: block, start: 'top 85%' },
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out'
          });
        }
      });

      // =========================================================================
      // B. SECTION 02 ABOUT ME — EDITORIAL MOTION SUITE (MATCHING REFERENCE VIDEO)
      // Top-to-bottom line wipe, upward text reveal, staggered row-by-row 2x2 grid
      // =========================================================================
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutLine = aboutSection.querySelector('.about-editorial-line');
        const aboutTag = aboutSection.querySelector('.section-micro-tag');
        const aboutTitle = aboutSection.querySelector('.section-title-large');
        const aboutParas = aboutSection.querySelectorAll('.about-narrative-text p');
        const row1Cards = aboutSection.querySelectorAll('.about-pillar-card[data-pillar-row="1"]');
        const row2Cards = aboutSection.querySelectorAll('.about-pillar-card[data-pillar-row="2"]');

        if (aboutTitle && !aboutTitle.querySelector('.word-mask')) {
          const words = aboutTitle.textContent.trim().split(/\s+/);
          aboutTitle.innerHTML = words.map(w => `<span class="word-mask"><span class="word-reveal">${w}</span></span>`).join(' ');
        }
        const aboutWords = aboutTitle ? aboutTitle.querySelectorAll('.word-reveal') : null;

        const aboutTL = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          defaults: { ease: 'power3.out' }
        });

        // 1. Accent Line: draws top-to-bottom (Frame 0 -> Frame 3 in reference video)
        if (aboutLine) {
          aboutTL.fromTo(aboutLine,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.15, ease: 'power2.inOut' },
            0
          );
        }

        // 2. Micro Tag: subtle upward slide & fade
        if (aboutTag) {
          aboutTL.fromTo(aboutTag,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65 },
            0.1
          );
        }

        // 3. Title: word-masked slide up
        if (aboutWords && aboutWords.length > 0) {
          aboutTL.fromTo(aboutWords,
            { y: '115%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.08, duration: 0.8 },
            0.18
          );
        } else if (aboutTitle) {
          aboutTL.fromTo(aboutTitle,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.18
          );
        }

        // 4. Narrative Paragraphs: staggered upward fade-in
        if (aboutParas.length > 0) {
          aboutTL.fromTo(aboutParas,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
            0.32
          );
        }

        // 5. 2x2 Grid - Row 1 cards entrance (Frame 1 -> Frame 2 in reference video)
        if (row1Cards.length > 0) {
          aboutTL.fromTo(row1Cards,
            { y: 45, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.85 },
            0.38
          );
        }

        // 6. 2x2 Grid - Row 2 cards entrance (Frame 2 -> Frame 3 in reference video)
        if (row2Cards.length > 0) {
          aboutTL.fromTo(row2Cards,
            { y: 45, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.85 },
            0.58
          );
        }
      }

      // C. Section 03 Services Cards (STEP 3.D)
      const serviceCards = document.querySelectorAll('.service-card');
      if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
          scrollTrigger: { trigger: '.services-cards-grid', start: 'top 80%' },
          y: 65,
          opacity: 0,
          scale: 0.93,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out'
        });
      }

      // D. Section 04 Process Steps Entrance & Interactive Accordion
      const processCards = document.querySelectorAll('.process-card-v2');
      if (processCards.length > 0) {
        gsap.from(processCards, {
          scrollTrigger: { trigger: '.process-steps-grid', start: 'top 80%' },
          y: 50,
          opacity: 0,
          scale: 0.94,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out'
        });

        let activeTypingTimer = null;
        processCards.forEach(card => {
          card.addEventListener('click', () => {
            if (card.classList.contains('active')) return;

            // Deactivate other cards
            processCards.forEach(c => {
              c.classList.remove('active');
              const bar = c.querySelector('.process-card-bar');
              if (bar) bar.setAttribute('aria-expanded', 'false');
              const chev = c.querySelector('.process-chevron');
              if (chev) {
                chev.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>';
              }
            });

            // Activate clicked card
            card.classList.add('active');
            const bar = card.querySelector('.process-card-bar');
            if (bar) bar.setAttribute('aria-expanded', 'true');
            const chev = card.querySelector('.process-chevron');
            if (chev) {
              chev.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>';
            }

            // Typewriter effect on the newly opened card
            const textEl = card.querySelector('.process-typed-text');
            if (textEl && textEl.dataset.text) {
              if (activeTypingTimer) clearInterval(activeTypingTimer);
              const targetText = textEl.dataset.text;
              textEl.textContent = '';
              textEl.classList.add('typing');
              let i = 0;
              activeTypingTimer = setInterval(() => {
                textEl.textContent = targetText.slice(0, ++i);
                if (i >= targetText.length) {
                  clearInterval(activeTypingTimer);
                  textEl.classList.remove('typing');
                }
              }, 55);
            }

            playClickSound(650, 'sine', 0.04);
          });
        });
      }

      // E. Section 05 Featured Projects Gallery (STEP 3.C)
      const projectCardsEl = document.querySelectorAll('.themed-project-card');
      if (projectCardsEl.length > 0) {
        gsap.from(projectCardsEl, {
          scrollTrigger: { trigger: '#projectsGrid', start: 'top 80%' },
          y: 70,
          opacity: 0,
          scale: 0.93,
          stagger: 0.18,
          duration: 1,
          ease: 'power3.out'
        });
      }

      // F. Section 06 Contact & Footer (STEP 3.F)
      const contactMeta = document.querySelector('.contact-meta-group');
      const contactFormCard = document.querySelector('.contact-form-card');
      if (contactMeta) {
        gsap.from(contactMeta, {
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
          x: -50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      }
      if (contactFormCard) {
        gsap.from(contactFormCard, {
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
          x: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      }

      const footerRow = document.querySelector('.footer-row');
      if (footerRow) {
        gsap.from(footerRow, {
          scrollTrigger: { trigger: '.footer-row', start: 'top 95%' },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // I. Subtle Parallax Movement for Ambient Orbs & Arcs
      gsap.to('.hero-ambient-orb-bl', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
        y: 220,
        ease: 'none'
      });

      gsap.to('.hero-ambient-orb-tr', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 },
        y: 320,
        ease: 'none'
      });

      gsap.to('.hero-orbit-arcs-bg', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 0.6 },
        rotation: 180,
        ease: 'none'
      });

      gsap.to('.about-ambient-orb', {
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: 140,
        ease: 'none'
      });

    } else {
      // Fallback: reveal immediately if GSAP or reduced motion
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    }

    // =========================================================================
    // 13. DYNAMIC ANIMATED METRIC COUNTERS (VIDEO 00:08)
    // Counts numbers from 0 up to target when scrolled into view
    // =========================================================================
    function animateCounterElement(counter) {
      if (counter.getAttribute('data-animated') === 'true') return;
      const text = counter.textContent.trim();
      const match = text.match(/^(\D*)(\d+)(\D*)$/);
      if (match) {
        counter.setAttribute('data-animated', 'true');
        const prefix = match[1] || '';
        const targetNum = parseInt(match[2], 10);
        const suffix = match[3] || '';

        if (hasGSAP && !prefersReducedMotion) {
          let countObj = { val: 0 };
          gsap.to(countObj, {
            val: targetNum,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => {
              counter.textContent = `${prefix}${Math.round(countObj.val)}${suffix}`;
            },
            onComplete: () => {
              counter.textContent = text;
            }
          });
        }
      }
    }

    if (hasScrollTrigger) {
      document.querySelectorAll('.t-metric-val, .about-metric-number, .resume-stat-pill, .resume-metric-highlight .num').forEach(c => {
        ScrollTrigger.create({
          trigger: c,
          start: 'top 88%',
          onEnter: () => animateCounterElement(c),
          once: true
        });
      });
    }

    // =========================================================================
    // 14. INTERACTIVE 3D TILT WITH DYNAMIC SPECULAR GLARE (STEP 3.C - VIDEO 00:13 - 00:19)
    // Applies 3D perspective tilt and moving light sheen to cards on hover
    // =========================================================================
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && !prefersReducedMotion) {
      const tiltCards = document.querySelectorAll(
        '.themed-project-card, .service-card, .about-pillar-card, .process-card-v2'
      );

      tiltCards.forEach(card => {
        card.classList.add('tilt-card-target');

        let glare = card.querySelector('.card-specular-glare');
        if (!glare) {
          glare = document.createElement('div');
          glare.className = 'card-specular-glare';
          card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const maxTilt = 7.0; // Noticeable tilt
          const rotateX = -((y - centerY) / centerY) * maxTilt;
          const rotateY = ((x - centerX) / centerX) * maxTilt;

          if (hasGSAP) {
            gsap.to(card, {
              rotateX: rotateX,
              rotateY: rotateY,
              y: -8,
              transformPerspective: 1000,
              duration: 0.25,
              ease: 'power1.out'
            });
          } else {
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
          }

          glare.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(56, 189, 248, 0.25), transparent 75%)`;
          glare.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
          if (hasGSAP) {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              duration: 0.55,
              ease: 'power3.out'
            });
          } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
          }
          glare.style.opacity = '0';
        });
      });
    }

  });
}
