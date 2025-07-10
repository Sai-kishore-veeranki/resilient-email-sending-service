const { v4: uuidv4 } = require('uuid');
const { sendEmail, getStatus } = require('./services/emailService');

(async () => {
  const key = uuidv4();
  const result = await sendEmail('test@example.com', 'Hello!', key);
  console.log('Result:', result);
  console.log('Status:', getStatus(key));
})();
    