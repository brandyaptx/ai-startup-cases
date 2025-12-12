(function () {
  const isCasePage = document.querySelector('.article-container') !== null;
  const isHomePage = document.querySelector('.cases-grid') !== null;

  function addAdSlot(target, position = 'after', size = 'horizontal') {
    if (!target) return;
    const slot = document.createElement('div');
    slot.className = `ad-slot ad-slot-${size}`;
    slot.setAttribute('role', 'complementary');
    slot.innerHTML = `<strong>广告占位：待接入 Adsense</strong><span class="ad-note">审核通过后替换为正式广告代码，当前仅为示意且不跟踪用户。</span>`;

    if (position === 'before') {
      target.insertAdjacentElement('beforebegin', slot);
    } else if (position === 'inside-start') {
      target.insertAdjacentElement('afterbegin', slot);
    } else {
      target.insertAdjacentElement('afterend', slot);
    }
  }

  function ensureLazyLoading() {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      img.loading = 'lazy';
      if (!img.alt) {
        img.alt = 'AI startup illustration';
      }
    });
  }

  function initCookieBanner() {
    const key = 'asc_cookie_consent';
    if (localStorage.getItem(key)) return;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p>本站使用 Cookies 改善体验，并可能在未来接入 Adsense/分析工具。继续浏览即表示同意；你可随时清除 Cookies。</p>
      <div class="cookie-actions">
        <button class="cookie-accept">同意</button>
        <button class="cookie-later">稍后提醒</button>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      localStorage.setItem(key, 'yes');
      banner.remove();
    });
    banner.querySelector('.cookie-later').addEventListener('click', () => banner.remove());
  }

  function addAdSlots() {
    if (isHomePage) {
      const hero = document.querySelector('.hero');
      addAdSlot(hero, 'after', 'horizontal');
      const casesSection = document.getElementById('cases');
      addAdSlot(casesSection, 'after', 'rectangle');
    }

    if (isCasePage) {
      const header = document.querySelector('.article-header');
      addAdSlot(header, 'after', 'horizontal');
      const related = document.querySelector('.related-cases');
      addAdSlot(related, 'before', 'rectangle');
    }
  }

  function init() {
    ensureLazyLoading();
    initCookieBanner();
    addAdSlots();
  }

  init();
})(); 
