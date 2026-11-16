/* EeZee Conceptz — interactions (no dependencies) */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CONTACT_EMAIL = 'hello@eezeeconceptz.org';

  /* ---------- header shadow ---------- */
  const header = $('.header');
  const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#mobile-menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- pinned story: scroll drives tabs ---------- */
  const story = $('#story');
  if (story) {
    const imgs = $$('.story__bg img', story);
    const slides = $$('.story__slide', story);
    const tabs = $$('.tabs-glass [role="tab"]', story);
    const bar = $('.story__progress', story);
    let current = 0;
    const show = (i) => {
      if (i === current) return;
      current = i;
      imgs.forEach((im, k) => im.classList.toggle('on', k === i));
      slides.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
      tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i)));
    };
    const progress = () => {
      const r = story.getBoundingClientRect();
      const total = story.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      bar.style.width = (p * 100).toFixed(2) + '%';
      show(Math.min(slides.length - 1, Math.floor(p * slides.length * 0.999)));
    };
    window.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);
    progress();
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      const total = story.offsetHeight - window.innerHeight;
      const top = story.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / slides.length);
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    }));
  }

  /* ---------- generic tablist with arrow-key support ---------- */
  const tablist = (list, onSelect) => {
    const tabs = $$('[role="tab"]', list);
    const select = (i, focus) => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      onSelect(i, tabs[i]);
    };
    tabs.forEach((t, i) => {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (k) { e.preventDefault(); select((i + k + tabs.length) % tabs.length, true); }
      });
    });
  };

  /* ---------- releases tabs ---------- */
  const relTabs = $('#releases [role="tablist"]');
  if (relTabs) {
    tablist(relTabs, (i) => {
      $$('#releases .feature-panel').forEach((p, k) => { p.hidden = k !== i; p.classList.toggle('on', k === i); });
    });
  }

  /* ---------- video player ---------- */
  const screen = $('#player-screen');
  if (screen) {
    const thumb = $('#player-thumb');
    const play = $('#player-play');
    const title = $('#player-title');
    const artist = $('#player-artist');
    let currentId = 'UfqkltkUjZA';
    const reset = () => {
      const f = $('iframe', screen); if (f) f.remove();
      thumb.hidden = false; play.hidden = false;
    };
    play.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${currentId}?autoplay=1&rel=0`;
      f.title = title.textContent;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      screen.appendChild(f);
      thumb.hidden = true; play.hidden = true;
    });
    tablist($('.vlist'), (i, btn) => {
      reset();
      currentId = btn.dataset.id;
      thumb.src = `https://i.ytimg.com/vi/${currentId}/maxresdefault.jpg`;
      title.textContent = btn.dataset.title;
      artist.textContent = btn.dataset.artist;
      play.setAttribute('aria-label', `Play video: ${btn.dataset.artist} – ${btn.dataset.title}`);
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  const faqs = $$('.acc details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* ---------- multi-step contact form ---------- */
  const form = $('#contact-form');
  if (form) {
    const steps = $$('.fstep', form);
    const nav = $$('.stepnav li');
    const next = $('#form-next');
    const back = $('#form-back');
    const count = $('#form-count');
    const barEl = $('#form-bar');
    let step = 1;
    const total = 4;
    const data = () => Object.fromEntries(new FormData(form).entries());

    const setErr = (input, msg) => {
      const e = input.parentElement.querySelector('.err');
      if (e) e.textContent = msg || '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    const validate = (n) => {
      let ok = true;
      $$(`[data-step="${n}"] [required]`, form).forEach((inp) => {
        let msg = '';
        if (!inp.value.trim()) msg = 'This field is required.';
        else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) msg = 'Please enter a valid email address.';
        setErr(inp, msg);
        if (msg && ok) { inp.focus(); ok = false; }
      });
      return ok;
    };
    const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const buildSummary = () => {
      const d = data();
      const rows = [['Reason', d.subject], ['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Organisation', d.organisation], ['Message', d.message]]
        .filter(([, v]) => v && v.trim());
      $('#form-summary').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v.trim())}</dd></div>`).join('');
    };
    const render = () => {
      steps.forEach((s) => { s.hidden = s.dataset.step !== String(step); });
      const done = step === 'done';
      count.textContent = done ? 'Sent' : `${step} / ${total}`;
      barEl.style.width = done ? '100%' : `${(step / total) * 100}%`;
      nav.forEach((li, k) => {
        li.classList.toggle('on', !done && k + 1 === step);
        li.classList.toggle('done', done || k + 1 < step);
      });
      back.hidden = done || step === 1;
      next.hidden = done;
      next.innerHTML = step === total
        ? 'Send message <svg class="i"><use href="#i-arrow-ur"/></svg>'
        : 'Next <svg class="i"><use href="#i-arrow-r"/></svg>';
    };
    const send = async () => {
      const d = data();
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        // Wire this to your backend (Supabase edge function, n8n/Make webhook, Formspree…)
        try {
          const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
          if (!res.ok) throw new Error(res.statusText);
          $('#done-text').textContent = 'Your message has been sent. Our team will reply within two working days.';
        } catch (err) {
          $('#done-text').textContent = `Something went wrong. Please email us at ${CONTACT_EMAIL}.`;
        }
      } else {
        const body = [`Name: ${d.name}`, `Email: ${d.email}`, d.phone && `Phone: ${d.phone}`, d.organisation && `Organisation: ${d.organisation}`, '', d.message]
          .filter((x) => x !== undefined && x !== '').join('\n');
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[Website] ${d.subject}`)}&body=${encodeURIComponent(body)}`;
      }
      step = 'done';
      render();
    };
    next.addEventListener('click', () => {
      if (step === total) { send(); return; }
      if (!validate(step)) return;
      step += 1;
      if (step === total) buildSummary();
      render();
    });
    back.addEventListener('click', () => { if (step > 1) { step -= 1; render(); } });
    form.addEventListener('submit', (e) => { e.preventDefault(); next.click(); });
    form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') setErr(e.target, ''); });
    render();
  }

  /* ---------- newsletter (mailto fallback) ---------- */
  const news = $('#news-form');
  if (news) news.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#news-email').value.trim();
    if (!email) return;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent(`Please add ${email} to the EeZee Conceptz newsletter.`)}`;
  });

  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
