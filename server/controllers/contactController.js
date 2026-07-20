const Contact = require('../models/Contact');
const getTransporter = require('../config/nodemailer');

// Input Sanitization helper to prevent XSS injection in HTML emails or DB
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
    let savedContact = null;
    try {
      // Create new contact entry
      const newContact = new Contact({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage
      });
      savedContact = await newContact.save();
      console.log('Contact message saved successfully to MongoDB Atlas.');
    } catch (dbError) {
      // Log the database error but do not halt email operations
      console.error('Error saving to MongoDB:', dbError.message);
    }

    // 3. Initialize Nodemailer Transporter
    const transporter = getTransporter();

    if (transporter) {
      // 4. Create Email to Owner (Logesh Raja S)
      const ownerMailOptions = {
        from: `"${cleanName}" <${process.env.EMAIL_USER}>`, // Sent via authorized Gmail SMTP
        to: process.env.RECEIVER_EMAIL || 'logeshraja006@gmail.com',
        replyTo: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
              .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
              .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 25px; text-align: center; color: #ffffff; }
              .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
              .body { padding: 30px 25px; }
              .section-heading { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #ea580c; letter-spacing: 1.5px; margin-bottom: 12px; }
              .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
              .meta-table td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
              .meta-label { font-weight: 600; color: #475569; width: 100px; }
              .meta-value { color: #0f172a; }
              .msg-content { background-color: #f8fafc; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155; border-left: 4px solid #f97316; white-space: pre-wrap; }
              .footer { background-color: #0f172a; color: #94a3b8; text-align: center; padding: 15px; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2>New Contact Inquiry Received</h2>
              </div>
              <div class="body">
                <div class="section-heading">Visitor Information</div>
                <table class="meta-table">
                  <tr>
                    <td class="meta-label">Name:</td>
                    <td class="meta-value">${cleanName}</td>
                  </tr>
                  <tr>
                    <td class="meta-label">Email:</td>
                    <td class="meta-value"><a href="mailto:${cleanEmail}" style="color: #ea580c; text-decoration: none;">${cleanEmail}</a></td>
                  </tr>
                  <tr>
                    <td class="meta-label">Subject:</td>
                    <td class="meta-value" style="font-weight: 600;">${cleanSubject}</td>
                  </tr>
                </table>
                
                <div class="section-heading">Message Body</div>
                <div class="msg-content">${cleanMessage}</div>
              </div>
              <div class="footer">
                Automated notification from Logesh Raja S Portfolio
              </div>
            </div>
          </body>
          </html>
        `
      };

      // 5. Create Auto-Reply Email to Visitor (Visitor Confirmation)
      const visitorMailOptions = {
        from: `"Logesh Raja S" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: `Thank you for contacting me!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
              .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
              .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center; color: #ffffff; }
              .header h2 { margin: 0; font-size: 22px; font-weight: 700; }
              .header p { margin: 5px 0 0 0; font-size: 12px; color: #f97316; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }
              .body { padding: 30px 25px; font-size: 14.5px; line-height: 1.6; color: #334155; }
              .message-quote { border-left: 3px solid #cbd5e1; padding-left: 15px; margin: 20px 0; color: #64748b; font-style: italic; }
              .social-bar { margin: 25px 0; text-align: center; }
              .social-btn { display: inline-block; background-color: #f97316; color: #ffffff !important; padding: 10px 22px; font-weight: 700; text-decoration: none; border-radius: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
              .footer { background-color: #0f172a; color: #64748b; text-align: center; padding: 15px; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2>Logesh Raja S</h2>
                <p>Full-Stack Developer</p>
              </div>
              <div class="body">
                <p>Hi ${cleanName.split(' ')[0]},</p>
                
                <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
                
                <p>Here is a copy of your inquiry details:</p>
                <div class="message-quote">
                  <strong>Subject:</strong> ${cleanSubject}<br>
                  <strong>Message:</strong> ${cleanMessage}
                </div>

                <p>In the meantime, feel free to review my active projects and profile links:</p>
                <div class="social-bar">
                  <a href="https://github.com/logeshraja-06" class="social-btn" target="_blank">Connect on GitHub</a>
                </div>
                
                <p style="margin-top: 30px; font-size: 13px; color: #64748b;">
                  Warm regards,<br>
                  <strong>Logesh Raja S</strong><br>
                  Full-Stack & AI Developer<br>
                  Email: logeshraja006@gmail.com
                </p>
              </div>
              <div class="footer">
                This is an automated delivery confirmation. Please do not reply directly to this email.
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send emails
      await transporter.sendMail(ownerMailOptions);
      
      try {
        await transporter.sendMail(visitorMailOptions);
      } catch (visitorMailError) {
        console.error('Visitor Auto-Reply Failed:', visitorMailError.message);
      }
    } else {
      console.warn('Transporter not configured. Skipping email delivery.');
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.'
    });

  } catch (error) {
    console.error('Contact Form Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while sending your message. Please try again later.'
    });
  }
};
