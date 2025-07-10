module.exports = async function retry(fn, retries = 3, delay = 100) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
    }
  }
};
