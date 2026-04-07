// app.js — laadt config.json en vult de website-template in

fetch('config.json')
  .then(response => response.json())
  .then(data => {
    // ── Bedrijfsnaam ──
    const name = data.businessName || 'Kapperszaak';
    document.title = name;
    const pageTitle   = document.getElementById('page-title');
    const navLogo     = document.getElementById('nav-logo');
    const heroTitle   = document.getElementById('hero-title');
    const footerName  = document.getElementById('footer-name');
    if (pageTitle)  pageTitle.textContent  = name;
    if (navLogo)    navLogo.textContent    = name;
    if (heroTitle)  heroTitle.textContent  = name;
    if (footerName) footerName.textContent = name;

    // ── Contactgegevens ──
    const setContact = (id, value, href) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (href && value) {
        el.innerHTML = `<a href="${href}">${value}</a>`;
      } else {
        el.textContent = value || '—';
      }
    };
    setContact('contact-address',  data.address);
    setContact('contact-phone',    data.phone,    data.phone    ? `tel:${data.phone}`           : null);
    setContact('contact-email',    data.email,    data.email    ? `mailto:${data.email}`        : null);
    setContact('contact-whatsapp', data.whatsapp, data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/\D/g,'')}` : null);

    // ── Diensten ──
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid && Array.isArray(data.defaultServices) && data.defaultServices.length) {
      servicesGrid.innerHTML = '';
      data.defaultServices.forEach(service => {
        const card = document.createElement('div');
        card.className = 'glass service-card';
        card.innerHTML = `
          <div class="service-name">${service.serviceName || 'Dienst'}</div>
          <div class="service-price"><span>€</span>${service.price ?? '—'}</div>
        `;
        servicesGrid.appendChild(card);
      });
    } else if (servicesGrid) {
      servicesGrid.innerHTML = '<p>Geen diensten gevonden.</p>';
    }

    // ── Team ──
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && Array.isArray(data.teamMembers) && data.teamMembers.length) {
      teamGrid.innerHTML = '';
      data.teamMembers.forEach(member => {
        const memberName = member.name || 'Teamlid';
        const initials   = memberName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        const card = document.createElement('div');
        card.className = 'glass team-card';
        card.innerHTML = `
          <div class="team-avatar">${initials}</div>
          <div class="team-name">${memberName}</div>
          <div class="team-role">${member.role || ''}</div>
        `;
        teamGrid.appendChild(card);
      });
    } else if (teamGrid) {
      teamGrid.innerHTML = '<p>Geen teamleden gevonden.</p>';
    }

    // ── Openingstijden ──
    const hoursBody = document.getElementById('hours-body');
    if (hoursBody && data.openingHours && typeof data.openingHours === 'object') {
      const dayNames = {
        monday: 'Maandag', tuesday: 'Dinsdag', wednesday: 'Woensdag',
        thursday: 'Donderdag', friday: 'Vrijdag', saturday: 'Zaterdag', sunday: 'Zondag'
      };
      hoursBody.innerHTML = '';
      Object.entries(data.openingHours).forEach(([day, hours]) => {
        const row = document.createElement('tr');
        const isClosed = hours === 'closed' || hours === 'gesloten';
        row.innerHTML = `
          <td>${dayNames[day] || day}</td>
          <td>${isClosed ? 'Gesloten' : hours}</td>
        `;
        hoursBody.appendChild(row);
      });
    } else if (hoursBody) {
      hoursBody.innerHTML = '<tr><td colspan="2">Geen openingstijden gevonden.</td></tr>';
    }

    // ── Voettekst jaar ──
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  })
  .catch(error => console.error('Fout bij laden van config.json:', error));
