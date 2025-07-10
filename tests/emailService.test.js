const { sendEmail, getStatus } = require('../src/services/emailService');
const { v4: uuidv4 } = require('uuid');

test('sends email and returns success or failure', async () => {
  const key = uuidv4();
  const res = await sendEmail('test@domain.com', 'Hello', key);
  expect(['success', 'failed', 'rate_limited']).toContain(res.status);
  expect(['success', 'failed']).toContain(getStatus(key));
});

test('prevents duplicate sends', async () => {
  const key = uuidv4();
  await sendEmail('test@domain.com', 'First try', key);
  const second = await sendEmail('test@domain.com', 'Hello', key);
  expect(second.status).toBe('duplicate');
});
