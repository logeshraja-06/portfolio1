const nodemailer = require('nodemailer');

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('WARNING: EMAIL_USER or EMAIL_PASS is missing in environment variables. Email sending features will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
};

module.exports = getTransporter;
