module.exports = {
  send: async (email, message) => {
    if (Math.random() < 0.2) throw new Error('Provider A failed');
    return true;
  }
};
