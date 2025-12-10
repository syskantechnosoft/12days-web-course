const fs = require('fs');
const path = require('path');

// Logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;
  
  // Console logging
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // File logging
  const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip}\n`;
  const logFile = path.join(__dirname, '..', 'access.log');
  
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
  
  // Measure response time
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Response sent with status ${res.statusCode} in ${duration}ms`);
  });
  
  next();
};

module.exports = logger;
