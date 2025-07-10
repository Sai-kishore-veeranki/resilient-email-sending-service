module.exports = {
  send: async (email, message) => {
    if (Math.random() < 0.8) throw new Error('Provider B failed');
    return true;
  }
};
