const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'allure-results');
const envFile = path.join(resultsDir, 'environment.properties');

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

if (!fs.existsSync(envFile)) {
  const content = `Browser=Chrome
Environment=Staging
OS=${process.platform}
NodeVersion=${process.version}
`;
  fs.writeFileSync(envFile, content);
  console.log('Created environment.properties');
} else {
  console.log('environment.properties already exists');
}
