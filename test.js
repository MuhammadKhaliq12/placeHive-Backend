console.log('Testing server startup...');

try {
  console.log('Loading config...');
  const config = require('./src/config');
  console.log('Config loaded successfully');
  console.log('Port:', config.PORT);
  console.log('MongoDB URI:', config.MONGODB_URI);

  console.log('Loading express...');
  const express = require('express');
  const app = express();

  console.log('Setting up routes...');
  app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
  });

  console.log('Starting server...');
  const server = app.listen(config.PORT, () => {
    console.log(`✅ Server running on port ${config.PORT}`);
    console.log(`Test endpoint: http://localhost:${config.PORT}/test`);
  });

  // Keep the process alive
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close();
    process.exit(0);
  });

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
