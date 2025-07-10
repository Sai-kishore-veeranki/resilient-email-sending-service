const providerA = require('../providers/mockProviderA');
const providerB = require('../providers/mockProviderB');
const retry = require('../utils/retry');
const rateLimit = require('../utils/rateLimiter');
const CircuitBreaker = require('../utils/circuitBreaker');
const logger = require('../utils/logger');

const idempotencyStore = new Set();
const statusMap = new Map();

const circuitA = new CircuitBreaker();
const circuitB = new CircuitBreaker();

async function sendEmail(email, message, idempotencyKey) {
  if (idempotencyStore.has(idempotencyKey)) {
    logger.info('Duplicate email send prevented.');
    return { status: 'duplicate' };
  }

  if (!rateLimit(email)) {
    logger.error('Rate limit exceeded.');
    return { status: 'rate_limited' };
  }

  idempotencyStore.add(idempotencyKey);

  const providers = [
    () => circuitA.call(() => retry(() => providerA.send(email, message))),
    () => circuitB.call(() => retry(() => providerB.send(email, message)))
  ];

  for (let i = 0; i < providers.length; i++) {
    try {
      await providers[i]();
      statusMap.set(idempotencyKey, 'success');
      logger.info(`Email sent via Provider ${i + 1}`);
      return { status: 'success' };
    } catch (err) {
      logger.error(`Provider ${i + 1} failed: ${err.message}`);
    }
  }

  statusMap.set(idempotencyKey, 'failed');
  return { status: 'failed' };
}

function getStatus(idempotencyKey) {
  return statusMap.get(idempotencyKey) || 'unknown';
}

module.exports = {
  sendEmail,
  getStatus
};
