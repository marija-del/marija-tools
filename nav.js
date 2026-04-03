document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.textContent = `
    #pr-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: 58px;
      background: rgba(15, 20, 7, 0.97);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      backdrop-filter: blur(12px);
      display: flex; align-items: center;
      padding: 0 28px; gap: 0;
    }
    #pr-nav .nav-brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; margin-right: 32px; white-space: nowrap;
    }
    #pr-nav .nav-brand-text {
      font-family: 'DM Sans', 'Inter', sans-serif;
      font-size: 18px; font-weight: 700; color: white; letter-spacing: -0.3px;
    }
    #pr-nav .nav-brand-sub {
      font-family: 'DM Sans', 'Inter', sans-serif;
      font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.3);
      letter-spacing: 1.5px; text-transform: uppercase; margin-top: 1px;
    }
    #pr-nav .nav-divider {
      width: 1px; height: 20px; background: rgba(255,255,255,0.12); margin-right: 28px;
    }
    #pr-nav .nav-links { display: flex; gap: 2px; flex: 1; }
    #pr-nav .nav-link {
      font-family: 'DM Sans', 'Inter', sans-serif;
      font-size: 13px; font-weight: 500;
      color: rgba(255,255,255,0.45);
      text-decoration: none; padding: 6px 12px;
      border-radius: 8px; transition: all 0.18s; white-space: nowrap;
    }
    #pr-nav .nav-link:hover { color: white; background: rgba(255,255,255,0.07); }
    #pr-nav .nav-link.active { color: #9ebe2e; background: rgba(158,190,46,0.1); font-weight: 600; }
    #pr-nav .nav-right { display: flex; align-items: center; gap: 8px; }
    #pr-nav .status-pill {
      display: flex; align-items: center; gap: 6px;
      font-family: 'DM Sans', 'Inter', sans-serif; font-size: 11px; font-weight: 600;
      color: rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px; padding: 4px 10px;
      transition: all 0.3s;
    }
    #pr-nav .status-pill.online  { color: #9ebe2e; border-color: rgba(158,190,46,0.3); background: rgba(158,190,46,0.08); }
    #pr-nav .status-pill.offline { color: #f87171; border-color: rgba(248,113,113,0.25); background: rgba(248,113,113,0.08); }
    #pr-nav .status-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: 0.9; }
    #pr-nav .status-pill.online .status-dot { animation: navpulse 2s infinite; }
    @keyframes navpulse { 0%,100%{opacity:.9} 50%{opacity:.3} }
  `;
  document.head.appendChild(style);

  document.body.style.paddingTop = '98px';

  const path = window.location.pathname;
  function active(href) {
    if (href === '/') return path === '/' || path === '/index.html';
    return path === href;
  }

  const links = [
    { href: '/',                label: 'Home' },
    { href: '/crosscheck.html', label: 'Cross-Checker' },
    { href: '/strategy.html',   label: 'Strategy' },
    { href: '/analysis.html',   label: 'Citation Analyser' },
  ];

  const linksHTML = links.map(l =>
    `<a href="${l.href === '/' ? 'index.html' : l.href.replace('/', '')}" class="nav-link${active(l.href) ? ' active' : ''}">${l.label}</a>`
  ).join('');

  const ogmIcon = `<svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="5" width="16" height="16" rx="2.5" fill="white"/>
    <rect x="8" y="0" width="16" height="16" rx="2.5" fill="white" opacity="0.45"/>
  </svg>`;

  const nav = document.createElement('nav');
  nav.id = 'pr-nav';
  nav.innerHTML = `
    <a href="index.html" class="nav-brand">
      ${ogmIcon}
      <div>
        <div class="nav-brand-text">ogm</div>
      </div>
    </a>
    <div class="nav-divider"></div>
    <div class="nav-links">${linksHTML}</div>
    <div class="nav-right">
      <div class="status-pill" id="nav-status">
        <div class="status-dot"></div>
        <span id="nav-status-label">Checking</span>
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  fetch('http://localhost:3456/health')
    .then(r => r.json())
    .then(() => {
      document.getElementById('nav-status').className = 'status-pill online';
      document.getElementById('nav-status-label').textContent = 'Server online';
    })
    .catch(() => {
      document.getElementById('nav-status').className = 'status-pill offline';
      document.getElementById('nav-status-label').textContent = 'Server offline';
    });
});
