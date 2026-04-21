(function () {
  'use strict';

  const MESHERY_LOGO_URL =
    'https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg';
  const POWERED_BY_TEXT = 'Powered by Meshery Authors';
  const POWERED_BY_SELECTOR =
    'a[href="https://allurereport.org"], a[href="https://allurereport.org/"]';
  const CUSTOM_NAV_ID = 'meshery-report-nav';
  const LEGACY_NAV_BUTTON_TEXT = 'report';
  const LEGACY_NAV_PANEL_TOKENS = ['report', 'graphs', 'timeline'];
  const SECTION_ICON_SELECTOR =
    'button, [role="button"], [role="menuitemcheckbox"], [role="menuitem"], [class*="menu-item"]';
  const OBSERVER_OPTIONS = { childList: true, subtree: true };
  let brandingScheduled = false;
  let legacyNavHiddenOnce = false;

  function createMesheryLogo(className, size) {
    const logo = document.createElement('img');
    logo.className = className;
    logo.src = MESHERY_LOGO_URL;
    logo.alt = 'Meshery logo';
    logo.width = size;
    logo.height = size;
    return logo;
  }

  function createBrandingContent() {
    const wrapper = document.createElement('span');
    wrapper.className = 'meshery-powered-by';

    const text = document.createElement('span');
    text.className = 'meshery-powered-by__text';
    text.textContent = POWERED_BY_TEXT;

    wrapper.append(createMesheryLogo('meshery-powered-by__logo', 18), text);
    return wrapper;
  }

  function normalizeText(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function replaceElementWithLogo(element, className, size) {
    if (!element || element.dataset.mesheryLogo === 'true') {
      return false;
    }

    const logo = createMesheryLogo(className, size);
    logo.dataset.mesheryLogo = 'true';
    element.replaceWith(logo);
    return true;
  }

  function replacePoweredBy() {
    let changed = false;

    document.querySelectorAll(POWERED_BY_SELECTOR).forEach((anchor) => {
      if (anchor.dataset.mesheryPoweredBy === 'true') {
        return;
      }

      anchor.dataset.mesheryPoweredBy = 'true';
      anchor.href = 'https://meshery.io';
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.classList.add('meshery-powered-by-link');
      anchor.replaceChildren(createBrandingContent());
      changed = true;
    });

    return changed;
  }

  function normalizePathname(pathname) {
    const resolvedPathname = new URL(pathname, window.location.href).pathname;
    const withoutIndex = resolvedPathname.replace(/\/index\.html$/, '/');
    return withoutIndex === '/' ? withoutIndex : withoutIndex.replace(/\/+$/, '');
  }

  function getReportNavigationItems() {
    if (!Array.isArray(window.mesheryReportNav)) {
      return [];
    }

    return window.mesheryReportNav.filter((item) => item && item.href && item.label);
  }

  function createReportNavigation() {
    const navItems = getReportNavigationItems();

    if (!navItems.length) {
      return null;
    }

    const nav = document.createElement('nav');
    nav.id = CUSTOM_NAV_ID;
    nav.className = 'meshery-report-nav';
    nav.setAttribute('aria-label', 'Dashboard navigation');

    const list = document.createElement('div');
    list.className = 'meshery-report-nav__list';

    const currentPath = normalizePathname(window.location.pathname);

    navItems.forEach((item) => {
      const link = document.createElement('a');
      const itemPath = normalizePathname(item.href);

      link.className = 'meshery-report-nav__link';
      link.href = item.href;
      link.textContent = item.label;

      if (itemPath === currentPath) {
        link.classList.add('meshery-report-nav__link--active');
        link.setAttribute('aria-current', 'page');
      }

      list.appendChild(link);
    });

    nav.appendChild(list);
    return nav;
  }

  function insertReportNavigation() {
    if (document.getElementById(CUSTOM_NAV_ID)) {
      return false;
    }

    const nav = createReportNavigation();

    if (!nav) {
      return false;
    }

    const appRoot = document.getElementById('app');

    if (appRoot && appRoot.parentNode) {
      appRoot.parentNode.insertBefore(nav, appRoot);
    } else {
      document.body.prepend(nav);
    }

    return true;
  }

  function hideLegacyReportMenu() {
    if (legacyNavHiddenOnce) {
      return false;
    }

    let changed = false;

    document.querySelectorAll('button').forEach((button) => {
      if (button.dataset.mesheryLegacyNavHidden === 'true') {
        return;
      }

      if (normalizeText(button.textContent) !== LEGACY_NAV_BUTTON_TEXT) {
        return;
      }

      button.dataset.mesheryLegacyNavHidden = 'true';
      button.hidden = true;
      button.setAttribute('aria-hidden', 'true');
      button.style.display = 'none';
      changed = true;
    });

    document.querySelectorAll('[role="complementary"], aside').forEach((panel) => {
      if (panel.dataset.mesheryLegacyNavHidden === 'true') {
        return;
      }

      const panelText = normalizeText(panel.textContent);
      const isLegacyNavPanel = LEGACY_NAV_PANEL_TOKENS.every((token) => panelText.includes(token));

      if (!isLegacyNavPanel) {
        return;
      }

      panel.dataset.mesheryLegacyNavHidden = 'true';
      panel.hidden = true;
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
      changed = true;
    });

    if (changed) {
      legacyNavHiddenOnce = true;
    }

    return changed;
  }

  function replaceLoaderLogo() {
    let changed = false;

    document.querySelectorAll('[data-testid="loader"] svg').forEach((icon) => {
      changed = replaceElementWithLogo(icon, 'meshery-loader-logo', 40) || changed;
    });

    return changed;
  }

  function replaceSectionPickerLogos() {
    let changed = false;

    document.querySelectorAll(SECTION_ICON_SELECTOR).forEach((element) => {
      if (normalizeText(element.textContent).includes('report')) {
        const icon = element.querySelector('svg');
        changed = replaceElementWithLogo(icon, 'meshery-section-logo', 14) || changed;
      }
    });

    return changed;
  }

  function hasPendingBrandingTargets() {
    if (document.querySelector(`${POWERED_BY_SELECTOR}:not([data-meshery-powered-by="true"])`)) {
      return true;
    }

    if (document.querySelector('[data-testid="loader"] svg:not([data-meshery-logo="true"])')) {
      return true;
    }

    return Array.from(document.querySelectorAll(SECTION_ICON_SELECTOR)).some((element) => {
      if (!normalizeText(element.textContent).includes('report')) {
        return false;
      }

      return Boolean(element.querySelector('svg:not([data-meshery-logo="true"])'));
    });
  }

  function applyBranding() {
    insertReportNavigation();
    hideLegacyReportMenu();
    replacePoweredBy();
    replaceLoaderLogo();
    replaceSectionPickerLogos();
  }

  function scheduleBranding() {
    if (brandingScheduled) {
      return;
    }

    brandingScheduled = true;
    window.requestAnimationFrame(() => {
      brandingScheduled = false;
      applyBranding();
    });
  }

  function observeBranding() {
    const observer = new MutationObserver(() => {
      if (hasPendingBrandingTargets()) {
        scheduleBranding();
      }
    });

    observer.observe(document.body, OBSERVER_OPTIONS);
    scheduleBranding();
  }

  if (document.body) {
    observeBranding();
  } else {
    window.addEventListener('DOMContentLoaded', observeBranding, { once: true });
  }
})();
