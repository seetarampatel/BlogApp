// We will need our mongoose library
const mongoose = require(`mongoose`);

// Our schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

// Query Helper
BlogSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  });
};

BlogSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  });
};

// Exporting our blog model
module.exports = mongoose.model('Blog', BlogSchema);