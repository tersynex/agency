document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const yearNode = document.querySelector('[data-year]');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const assistantWidget = document.querySelector('.assistant-widget');
  const assistantToggle = assistantWidget?.querySelector('.assistant-toggle');
  const assistantPanel = assistantWidget?.querySelector('.assistant-panel');
  const assistantClose = assistantWidget?.querySelector('.assistant-close');
  const assistantMessages = assistantWidget?.querySelector('.assistant-messages');
  const assistantForm = assistantWidget?.querySelector('.assistant-form');
  const assistantInput = assistantWidget?.querySelector('input[name="question"]');

  const assistantAnswers = (question) => {
    const text = question.toLowerCase();
    if (text.includes('how long') || text.includes('timeline') || text.includes('duration') || text.includes('days')) {
      return 'Timelines depend on scope. A focused design task can move quickly, while a brand, website, or campaign system needs more stages. We confirm a clear delivery schedule before work begins.';
    }
    if (text.includes('revision') || text.includes('change') || text.includes('feedback')) {
      return 'Yes. Feedback is built into the process through structured revision rounds agreed in the project scope, so the work stays focused and moves forward clearly.';
    }
    if (text.includes('website') || text.includes('web') || text.includes('development') || text.includes('app')) {
      return 'Yes. We design and build responsive websites, landing pages, interfaces, and front-end experiences with a focus on clarity, performance, and conversion.';
    }
    if (text.includes('ai') || text.includes('visual') || text.includes('image')) {
      return 'We create art-directed AI visuals for campaigns, concepts, products, editorial work, and social content, always shaped around the brand direction.';
    }
    if (text.includes('social') || text.includes('instagram') || text.includes('content')) {
      return 'Our social work includes content systems, campaign creatives, covers, reels graphics, and platform-ready visual direction that keeps the brand recognizable.';
    }
    if (text.includes('motion') || text.includes('video') || text.includes('reel')) {
      return 'We create short-form edits, motion graphics, animated assets, and launch visuals designed for social feeds and campaigns.';
    }
    if (text.includes('who') || text.includes('client') || text.includes('business')) {
      return 'We work with ambitious businesses and teams that want a clearer, more premium, and more memorable digital presence, from focused tasks to larger launches.';
    }
    if (text.includes('deliverable') || text.includes('deliver') || text.includes('get')) {
      return 'Deliverables are tailored to the brief and can include brand systems, visual assets, websites, landing pages, interfaces, campaigns, content systems, and development.';
    }
    if (text.includes('price') || text.includes('cost') || text.includes('pricing') || text.includes('budget')) {
      return 'Our starting points cover focused design, multi-asset brand systems, and larger web or campaign work. Visit Pricing for the full packages, or contact us for a tailored quote.';
    }
    if (text.includes('service') || text.includes('do you') || text.includes('offer')) {
      return 'Tersynex works across branding, graphic design, web and product design, development, AI visuals, social media, motion, and creative strategy.';
    }
    if (text.includes('process') || text.includes('work') || text.includes('start')) {
      return 'We start with your goals and context, shape a clear direction, then build and refine the right creative system. Tell us about your idea on the Contact page.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('whatsapp') || text.includes('talk')) {
      return 'You can reach the studio through the Contact page, email hello@tersynex.com, or WhatsApp using the green button below.';
    }
    if (text.includes('brand') || text.includes('identity') || text.includes('logo')) {
      return 'For a stronger brand, we can help with positioning, identity direction, visual systems, social assets, and a digital presence that feels coherent and memorable.';
    }
    return 'I can explain our services, websites, branding, AI visuals, social content, motion, pricing, timelines, revisions, deliverables, clients, or contact options. Ask me anything about Tersynex.';
  };

  const addAssistantMessage = (text, type) => {
    if (!assistantMessages) return;
    const message = document.createElement('p');
    message.className = `assistant-message assistant-message-${type}`;
    message.textContent = text;
    assistantMessages.appendChild(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  };

  const setAssistantOpen = (isOpen) => {
    if (!assistantPanel || !assistantToggle) return;
    assistantPanel.classList.toggle('open', isOpen);
    assistantPanel.setAttribute('aria-hidden', String(!isOpen));
    assistantToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) assistantInput?.focus();
  };

  if (assistantToggle && assistantPanel) {
    assistantToggle.addEventListener('click', () => {
      setAssistantOpen(!assistantPanel.classList.contains('open'));
    });
    assistantClose?.addEventListener('click', () => setAssistantOpen(false));
    assistantForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const question = assistantInput?.value.trim();
      if (!question) return;
      addAssistantMessage(question, 'user');
      if (assistantInput) assistantInput.value = '';
      window.setTimeout(() => addAssistantMessage(assistantAnswers(question), 'bot'), 280);
    });
    assistantWidget.querySelectorAll('.assistant-prompts button').forEach((prompt) => {
      prompt.addEventListener('click', () => {
        const question = prompt.textContent.trim();
        addAssistantMessage(question, 'user');
        window.setTimeout(() => addAssistantMessage(assistantAnswers(question), 'bot'), 280);
      });
    });
    document.addEventListener('click', (event) => {
      if (!assistantWidget.contains(event.target)) setAssistantOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setAssistantOpen(false);
    });
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));

  const projectModal = document.querySelector('#project-modal');
  const projectCards = document.querySelectorAll('[data-project]');
  const projectData = {
    northpeak: {
      title: 'NorthPeak Studio',
      copy: 'A sharper identity and lead journey for a studio ready to move from referrals into a more intentional digital presence.',
      scope: 'Brand strategy, identity, landing page',
      outcome: 'Clearer positioning and a stronger first impression',
      approach: 'Premium visual language with a focused conversion path'
    },
    horizon: {
      title: 'Horizon Capital',
      copy: 'A calm, credible web experience designed to make a complex financial offer easier to understand and act on.',
      scope: 'UX direction, website design, development',
      outcome: 'Simplified decision-making for high-intent visitors',
      approach: 'Structured content hierarchy and trust-led design'
    },
    urbannest: {
      title: 'UrbanNest',
      copy: 'A campaign system that gave a growing property brand a consistent visual voice across social and digital touchpoints.',
      scope: 'Campaign creative, content system, growth support',
      outcome: 'More consistent communication across every campaign',
      approach: 'Modular creative built for speed and repetition'
    },
    kinetic: {
      title: 'Kinetic Labs',
      copy: 'A strategic reset for a technology team that needed its website to communicate expertise without sounding generic.',
      scope: 'Positioning, messaging, creative direction',
      outcome: 'A more distinct and confident market position',
      approach: 'Sharper narrative supported by a restrained visual system'
    },
    summit: {
      title: 'Summit Works',
      copy: 'A brand story and website foundation built to help a service business look established, premium, and ready for larger opportunities.',
      scope: 'Brand story, web design, launch system',
      outcome: 'More confidence across sales and presentation materials',
      approach: 'Human-centered messaging with clean editorial layouts'
    },
    asterx: {
      title: 'AsterX',
      copy: 'A conversion asset suite for a product team launching into a competitive market and needing clarity at speed.',
      scope: 'Creative direction, campaign assets, landing page',
      outcome: 'A cohesive launch presence across key touchpoints',
      approach: 'Focused messaging paired with high-contrast visual rhythm'
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      const data = projectData[card.dataset.project];
      if (!projectModal || !data) return;
      document.querySelector('#project-modal-title').textContent = data.title;
      document.querySelector('#project-modal-copy').textContent = data.copy;
      document.querySelector('#project-modal-scope').textContent = data.scope;
      document.querySelector('#project-modal-outcome').textContent = data.outcome;
      document.querySelector('#project-modal-approach').textContent = data.approach;
      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((control) => {
    control.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProjectModal();
  });
});


// INDEX INLINE JAVASCRIPT
// Hero background slideshow
    const images = ["images/back.png","images/back2.png","images/back3.png","images/back4.png"];
		const backgrounds = document.querySelectorAll(".bg-image");
		let currentImage = 0;

		images.forEach((src) => { const image = new Image(); image.src = src; });

		setInterval(() => {
			if (!backgrounds.length) return;
			backgrounds[currentImage].classList.remove("active");
			currentImage = (currentImage + 1) % backgrounds.length;
			backgrounds[currentImage].classList.add("active");
		}, 6000);

		// One shared scroll loop keeps all scroll-linked effects inexpensive.
		const siteNav = document.getElementById("site-nav");
		const progressBar = document.createElement("div");
		const scrollSections = document.querySelectorAll(".section, .about, .contact-section");
		const hero = document.querySelector(".hero");
		const heroImages = document.querySelectorAll(".bg-image");
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let scrollTicking = false;

		progressBar.className = "scroll-progress";
		progressBar.setAttribute("aria-hidden", "true");
		document.body.appendChild(progressBar);

		const updateScrollEffects = () => {
			const scrollTop = window.scrollY;
			const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
			const pageProgress = documentHeight > 0 ? scrollTop / documentHeight : 0;

			progressBar.style.transform = `scaleX(${pageProgress})`;
			siteNav?.classList.toggle("is-scrolled", scrollTop > 24);

			const heroProgress = Math.min(scrollTop, window.innerHeight) / Math.max(window.innerHeight, 1);
			if (hero && heroProgress < 1.1 && !reduceMotion) {
				const shift = scrollTop * 0.06;
				heroImages.forEach((image) => {
					image.style.transform = `scale(${1 + scrollTop / 28000}) translate3d(0, ${shift}px, 0)`;
				});
			}

			scrollSections.forEach((section) => {
				const bounds = section.getBoundingClientRect();
				const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
				section.style.setProperty("--scroll-progress", progress.toFixed(3));
			});

			scrollTicking = false;
		};

		window.addEventListener("scroll", () => {
			if (scrollTicking) return;
			scrollTicking = true;
			requestAnimationFrame(updateScrollEffects);
		}, { passive: true });
		updateScrollEffects();

		// Scroll reveal
		const revealItems = document.querySelectorAll(".reveal");
		const revealObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					revealObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

		revealItems.forEach((item, index) => {
			item.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
			revealObserver.observe(item);
		});

		// Subtle 3D tilt on service cards (Apple-style, cursor-driven, no motion when idle)
		const tiltCards = document.querySelectorAll(".service-card");
		const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

		if (supportsHover && !reduceMotion) {
			tiltCards.forEach((card) => {
				card.addEventListener("mousemove", (e) => {
					const rect = card.getBoundingClientRect();
					const px = (e.clientX - rect.left) / rect.width - 0.5;
					const py = (e.clientY - rect.top) / rect.height - 0.5;
					card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
				});
				card.addEventListener("mouseleave", () => {
					card.style.transform = "";
				});
			});
		}

		// Footer year
    const footerYear = document.getElementById("footer-year");
    if (footerYear) footerYear.textContent = `© ${new Date().getFullYear()} Tersynex`;
