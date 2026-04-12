const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'allure-report');
const customScript = path.join(__dirname, 'custom-script.js');
const customStyle = path.join(__dirname, 'custom-style.css');
const assetFiles = ['custom-script.js', 'custom-style.css'];
const skippedDirectories = new Set(['data', 'history', 'widgets']);
const styleTag = '    <link rel="stylesheet" href="custom-style.css">\n';
const navDataMarker = 'window.mesheryReportNav =';
const scriptTag = '    <script defer src="custom-script.js"></script>\n';
const navLabelOverrides = {
  '': 'Home',
  dashboard: 'Dashboard',
  meshery: 'Meshery',
  mesheryctl: 'Mesheryctl',
  layer5Cloud: 'Layer5 Cloud',
  kanvas: 'Kanvas',
};
const navOrder = new Map([
  ['', 0],
  ['dashboard', 1],
  ['meshery', 2],
  ['mesheryctl', 3],
  ['layer5Cloud', 4],
  ['kanvas', 5],
]);

function findReportPages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectories.has(entry.name)) {
        continue;
      }

      pages.push(...findReportPages(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === 'index.html') {
      pages.push(entryPath);
    }
  }

  return pages;
}

function injectBeforeClosingTag(html, tagName, snippet) {
  const closingTagPattern = new RegExp(`</${tagName}>`, 'i');

  if (!closingTagPattern.test(html)) {
    throw new Error(`Unable to inject ${tagName} customization: closing tag not found.`);
  }

  return html.replace(closingTagPattern, (match) => `${snippet}${match}`);
}

function formatReportLabel(relativeDir) {
  if (relativeDir in navLabelOverrides) {
    return navLabelOverrides[relativeDir];
  }

  const reportName = relativeDir.split(path.sep).filter(Boolean).pop() || 'Home';
  return reportName
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toRelativeHref(fromDir, toDir) {
  const relativePath = path.relative(fromDir, toDir).split(path.sep).join('/');
  return relativePath ? `${relativePath}/` : './';
}

function compareNavEntries(left, right) {
  const leftOrder = navOrder.get(left.relativeDir) ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = navOrder.get(right.relativeDir) ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.label.localeCompare(right.label);
}

function buildNavEntries(reportPages) {
  return reportPages
    .map((reportPage) => {
      const reportPageDir = path.dirname(reportPage);
      const relativeDir = path.relative(reportDir, reportPageDir);

      return {
        label: formatReportLabel(relativeDir),
        relativeDir,
        reportPageDir,
      };
    })
    .sort(compareNavEntries);
}

function createNavDataScript(currentPageDir, navEntries) {
  const navData = navEntries.map(({ label, relativeDir, reportPageDir }) => ({
    id: relativeDir || 'home',
    label,
    href: toRelativeHref(currentPageDir, reportPageDir),
  }));

  return `    <script>${navDataMarker} ${JSON.stringify(navData)};</script>\n`;
}

function ensureInjectedMarkup(html, navDataScript) {
  let updated = html;

  if (!updated.includes('custom-style.css')) {
    updated = injectBeforeClosingTag(updated, 'head', styleTag);
  }

  if (!updated.includes(navDataMarker)) {
    updated = injectBeforeClosingTag(updated, 'body', navDataScript);
  }

  if (!updated.includes('custom-script.js')) {
    updated = injectBeforeClosingTag(updated, 'body', scriptTag);
  }

  return updated;
}

function copyAssets(targetDir) {
  const assetSources = {
    'custom-script.js': customScript,
    'custom-style.css': customStyle,
  };

  for (const assetFile of assetFiles) {
    fs.copyFileSync(assetSources[assetFile], path.join(targetDir, assetFile));
  }
}

if (!fs.existsSync(reportDir)) {
  throw new Error(`Report directory not found: ${reportDir}`);
}

const reportPages = findReportPages(reportDir);
const copiedAssetDirs = new Set();
const navEntries = buildNavEntries(reportPages);

for (const reportPage of reportPages) {
  const reportPageDir = path.dirname(reportPage);
  const html = fs.readFileSync(reportPage, 'utf8');
  const navDataScript = createNavDataScript(reportPageDir, navEntries);
  const updatedHtml = ensureInjectedMarkup(html, navDataScript);

  if (!copiedAssetDirs.has(reportPageDir)) {
    copyAssets(reportPageDir);
    copiedAssetDirs.add(reportPageDir);
  }

  if (updatedHtml !== html) {
    fs.writeFileSync(reportPage, updatedHtml);
  }
}

console.log(`Customized ${reportPages.length} report page(s).`);
