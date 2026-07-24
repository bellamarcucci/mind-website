import { useEffect, useState } from 'react';
import Reveal from './components/Reveal.jsx';
import Parallax from './components/Parallax.jsx';

const assets = './assets';

const pillars = [
  {
    title: 'Marketing',
    icon: `${assets}/icon-marketing.png`,
    copy: 'Data-driven strategies that turn ideas into measurable growth.',
  },
  {
    title: 'Intelligence',
    icon: `${assets}/icon-intelligence.png`,
    copy: 'AI solutions designed around the needs of your business.',
  },
  {
    title: 'Design',
    icon: `${assets}/icon-design.png`,
    copy: 'Purposeful experiences that connect, engage, and convert.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    setScrolled(previousScrollY > 20);

    const update = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < previousScrollY) {
        setScrolled(false);
      } else if (currentScrollY > previousScrollY && currentScrollY > 20) {
        setScrolled(true);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const closeMenu = () => setOpen(false);
  const navigateToSection = (event) => {
    const href = event.currentTarget.getAttribute('href');
    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();
    closeMenu();
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    if (href === '#who-we-are') {
      const rect = target.getBoundingClientRect();
      const centeredTop = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;

      window.scrollTo({
        top: Math.max(0, centeredTop - 120),
        behavior,
      });
    } else {
      target.scrollIntoView({ behavior, block: 'center' });
    }

    window.history.replaceState(null, '', href);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="header-logo" href="#top" aria-label="MIND home" onClick={closeMenu}>
        <img src={`${assets}/mind-logo-mark.png`} alt="MIND" />
      </a>

      <button
        className={`menu-toggle ${open ? 'is-open' : ''}`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav id="primary-navigation" className={`primary-nav ${open ? 'is-open' : ''}`}>
        <a href="#who-we-are" onClick={navigateToSection}>Who we are</a>
        <a href="#what-we-do" onClick={navigateToSection}>What we do</a>
        <a href="#custom-ai" onClick={navigateToSection}>Custom AI</a>
        <a href="#contact" onClick={navigateToSection}>Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow--one" />
      <div className="hero-glow hero-glow--two" />

      <Parallax className="hero-person" strength={0.035}>
        <img
          src={`${assets}/hero-laptop-person.png`}
          alt="Creative professional working on a laptop"
          fetchPriority="high"
        />
      </Parallax>

      <h1 className="hero-title" id="hero-title">
        <span>Intelligence</span>
        <span>that drives</span>
        <span>growth.</span>
      </h1>

      {/* <a className="hero-scroll" href="#who-we-are" aria-label="Scroll to learn more">
        <span>Explore</span>
        <ArrowIcon />
      </a> */}
    </section>
  );
}

function Intro() {
  return (
    <section className="intro section-pad" id="who-we-are">
      <Reveal className="intro-card">
        <p className="eyebrow">Where strategy meets intelligence</p>
        <p className="intro-lead">
          MIND combines marketing, design, and tailored AI solutions to help businesses
          grow smarter, connect better, and move forward with purpose.
        </p>

        <div className="pillars">
          {pillars.map((pillar, index) => (
            <Reveal className="pillar" delay={index * 110} key={pillar.title}>
              <div className="pillar-icon-wrap">
                <img src={pillar.icon} alt="" aria-hidden="true" />
              </div>
              <h2>{pillar.title}</h2>
              <p>{pillar.copy}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function AccessibleGrowth() {
  return (
    <section className="accessible-growth" aria-labelledby="accessible-title">
      <div className="pattern-layer" />
      <Reveal className="accessible-copy" direction="left">
        <h2 id="accessible-title">
          AI made accessible.
          <span>Growth made possible.</span>
        </h2>
      </Reveal>
      <div className="woman-phone">
        <img src={`${assets}/woman-phone.png`} alt="Woman using a smartphone" loading="lazy" />
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="what-we-do section-pad" id="what-we-do" aria-labelledby="what-title">
      <Reveal className="section-title-stack" direction="left">
        <h2 id="what-title">
          What
          <span>we</span>
          <span>do</span>
        </h2>
      </Reveal>

      <Reveal className="what-card" direction="right">
        <p className="what-kicker">From digital strategy to intelligent conversations.</p>
        <p>
          We help your business strengthen its digital presence and grow through strategic
          marketing and custom AI solutions built around your unique needs.
        </p>
        <p>
          Our digital marketing strategies combine audience insights, brand positioning,
          content, search, paid media, and conversion-focused experiences aligned with your goals.
        </p>
      </Reveal>
    </section>
  );
}

function AIPowered() {
  return (
    <section className="ai-powered" id="custom-ai" aria-labelledby="ai-powered-title">
      <h2 id="ai-powered-title" className="sr-only">AI-powered custom solutions</h2>
      <Parallax className="ai-powered-visual" strength={0.025}>
        <img src={`${assets}/ai-powered-banner.png`} alt="AI-powered visual with luminous data trails" loading="lazy" />
      </Parallax>

      <div className="ai-solution section-pad">
        <Reveal className="ai-copy-card" direction="left">
          <p>
            We create AI chat experiences tailored to your business’s knowledge, services,
            processes, and voice. From customer support and product recommendations to lead
            qualification and internal automation, every solution is designed to solve your real
            business needs.
          </p>
          {/* <a className="text-link" href="#contact">
            Start a conversation <ArrowIcon />
          </a> */}
        </Reveal>

        <Parallax className="reservation-phone" strength={0.06}>
          <img
            src={`${assets}/ai-reservation-phone.png`}
            alt="AI table reservation assistant displayed on a smartphone"
            loading="lazy"
          />
        </Parallax>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="use-cases section-pad" aria-labelledby="use-cases-title">
      <Reveal className="use-cases-heading">
        <h2 id="use-cases-title">Built for every business.</h2>
      </Reveal>

      <div className="use-case-grid">
        <Reveal className="use-card use-card--wide">
          <div className="use-card-visual use-card-visual--laptop">
            <img
              src={`${assets}/personal-projects-laptop.png`}
              alt="Personal portfolio AI assistant displayed on a laptop"
              loading="lazy"
            />
          </div>
          <div className="use-card-copy">
            <h3>
              <a
                className="use-card-title-link"
                href="https://isabellamarcucci.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Personal projects
              </a>
            </h3>
            <p>Turn a portfolio or personal brand into an interactive, always-available experience.</p>
            <a
              href="https://isabellamarcucci.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try it now <ArrowIcon />
            </a>
          </div>
        </Reveal>

        <Reveal className="use-card use-card--compact" delay={90}>
          <div className="use-card-copy use-card-copy--centered">
            <h3>Your ecommerce</h3>
            <p>Guide shoppers to the right product with natural, useful conversations.</p>
          </div>
          <div className="use-card-visual use-card-visual--phone">
            <img
              src={`${assets}/ecommerce-phone.png`}
              alt="AI product recommendation assistant displayed on a smartphone"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal className="use-card use-card--compact" delay={180}>
          <div className="use-card-copy use-card-copy--centered">
            <h3>Analyse your data</h3>
            <p>Make campaign performance easier to understand and act on.</p>
          </div>
          <div className="use-card-visual use-card-visual--phone use-card-visual--data">
            <img
              src={`${assets}/data-analysis-phone.png`}
              alt="AI campaign insights assistant displayed on a smartphone"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="demo-wrap">
        <a className="button button--primary" href="#contact">
          Request a Demo
        </a>
      </Reveal>
    </section>
  );
}

function MindYourBusiness() {
  return (
    <section className="mind-business" aria-labelledby="mind-business-title">
      <div className="mind-business-bg" />
      <div className="mind-business-card-position">
        <Reveal className="mind-business-card" direction="left">
            <h2 id="mind-business-title">
            <span className="mind-business-word--blurred">Mind</span>
            <span>your</span>
            <span>business.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/mrejrvwe', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus('error');
    }
  };

  return (
    <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
      <div className="contact-card">
        <Reveal className="contact-copy" direction="left">
          <h2 id="contact-title">
            Have a project
            <span>in mind?</span>
          </h2>
          <p>
            Whether you need a stronger digital presence, a smarter marketing strategy, or a custom
            AI solution,
            <strong>MIND is ready to help bring your next idea to life.</strong>
          </p>
        </Reveal>

        <Reveal className="contact-panel" direction="right">
          <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="Email address" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="5" required placeholder="Tell us about your project" />
              </label>
              <button
                className="button button--submit"
                type="submit"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send'}
              </button>
              <div className="form-status" aria-live="polite">
                {formStatus === 'success' && (
                  <p className="form-success">
                    Thank you! Your message has been sent successfully. We’ll get back to you soon.
                  </p>
                )}

                {formStatus === 'error' && (
                  <p className="form-error">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
          </form>
        </Reveal>

        <div className="social-links" aria-label="Social links">
              <a href="#instagram" aria-label="Instagram">
                <img src={`${assets}/social-instagram.png`} alt="" aria-hidden="true" />
                <span>Mind.ai</span>
              </a>
              <a href="#whatsapp" aria-label="WhatsApp">
                <img src={`${assets}/social-whatsapp.png`} alt="" aria-hidden="true" />
                <span>(999) 999-9999</span>
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <img src={`${assets}/social-linkedin.png`} alt="" aria-hidden="true" />
                <span>Mind.ai</span>
              </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={`${assets}/mind-logo-full.png`} alt="MIND — Marketing, Intelligence & Design" />
        <p>Marketing, design, and custom AI solutions built to move your business forward.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="#who-we-are">Who we are</a>
        <a href="#what-we-do">What we do</a>
        <a href="#custom-ai">Custom AI</a>
        <a href="#contact">Contact</a>
      </nav>
      <p className="copyright">© 2026 MIND. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Intro />
        <AccessibleGrowth />
        <WhatWeDo />
        <AIPowered />
        <UseCases />
        <MindYourBusiness />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
