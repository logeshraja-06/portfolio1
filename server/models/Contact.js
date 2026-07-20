const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please add a valid email address'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true,
    minlength: [3, 'Subject must be at least 3 characters']
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
