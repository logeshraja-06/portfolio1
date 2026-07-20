const Contact = require('../models/Contact');

// Input Sanitization helper to prevent XSS injection in DB
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Email validation helper
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    const { name, email, subject, message } = req.body;

    // 1. Backend Input Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields (Name, Email, Subject, Message) are required.'
      });
    }

    const cleanName = sanitizeString(name.trim());
    const cleanEmail = email.trim();
    const cleanSubject = sanitizeString(subject.trim());
    const cleanMessage = sanitizeString(message.trim());

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Name must be at least 2 characters.'
      });
    }

    if (!validateEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    if (cleanSubject.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Subject must be at least 3 characters.'
      });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters.'
      });
    }

    // 2. Save to MongoDB Atlas (MERN Requirement)
    const newContact = new Contact({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage
    });
    
    await newContact.save();
    console.log('Contact message saved successfully to MongoDB Atlas.');

    return res.status(200).json({
      success: true,
      message: 'Message saved successfully.'
    });

  } catch (error) {
    console.error('Contact Form Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while saving your message. Please try again later.'
    });
  }
};
