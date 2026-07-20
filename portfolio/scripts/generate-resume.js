const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Initialize PDF Document
const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 36,
    bottom: 36,
    left: 40,
    right: 40
  }
});

const outputPath = path.join(__dirname, '../public/resume.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Typography & Color Palette (Premium theme matching the website)
const COLOR_PRIMARY = '#0f172a';      // Deep slate / navy
const COLOR_SECONDARY = '#334155';    // Slate
const COLOR_MUTED = '#64748b';        // Muted slate for metadata
const COLOR_ACCENT = '#ea580c';       // Warm orange accent
const COLOR_BORDER = '#e2e8f0';       // Light gray line
const COLOR_BG_PANEL = '#f8fafc';     // Light card background

const fontRegular = 'Helvetica';
const fontBold = 'Helvetica-Bold';
const fontOblique = 'Helvetica-Oblique';
const fontBoldOblique = 'Helvetica-BoldOblique';

const pageHeight = 841.89;
const pageWidth = 595.28;
const leftMargin = 40;
const rightMargin = pageWidth - 40;
const contentWidth = rightMargin - leftMargin;

let y = 36;

// Helper: Horizontal Line
function drawDivider(color = COLOR_BORDER, thickness = 0.5) {
  doc.moveTo(leftMargin, y)
     .lineTo(rightMargin, y)
     .strokeColor(color)
     .lineWidth(thickness)
     .stroke();
}

// 1. Header (Name, Subtitle, and Contact Info)
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(22)
   .text('LOGESH RAJA S', leftMargin, y);

y = doc.y + 4;

doc.fillColor(COLOR_ACCENT)
   .font(fontBold)
   .fontSize(10)
   .text('FULL-STACK DEVELOPER (MERN) | AI DEVELOPER | UI/UX DESIGNER', leftMargin, y, { characterSpacing: 0.5 });

y = doc.y + 6;

// Contact info in columns or inline
const contactLine1 = 'Aruppukottai, Tamil Nadu  |  +91 96003 20520  |  logeshraja006@gmail.com';
const contactLine2 = 'LinkedIn: linkedin.com/in/logesh-raja-s-b9b159310  |  GitHub: github.com/logeshraja-06';

doc.fillColor(COLOR_MUTED)
   .font(fontRegular)
   .fontSize(8.5);

doc.text(contactLine1, leftMargin, y);
y = doc.y + 2;
doc.text(contactLine2, leftMargin, y);

y = doc.y + 8;
drawDivider(COLOR_PRIMARY, 1.5);
y = doc.y + 8;

// Helper: Section Headings
function addSectionHeader(title) {
  y += 6;
  doc.fillColor(COLOR_ACCENT)
     .font(fontBold)
     .fontSize(10)
     .text(title.toUpperCase(), leftMargin, y, { characterSpacing: 1 });
  
  y = doc.y + 2;
  drawDivider(COLOR_BORDER, 0.75);
  y = doc.y + 6;
}

// 2. Professional Summary
addSectionHeader('Professional Summary');
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text(
     'Motivated and detail-oriented Computer Science Engineering student with hands-on experience in MERN stack development. Proficient in Java, JavaScript, React.js, Node.js, Express.js, and MongoDB. Developed real-world projects including an AI Fake News Detection System and a Campus Resource Booking Platform. Strong problem-solving, teamwork, and communication skills with a passion for building scalable web applications. Seeking an entry-level Front-End or Full-Stack Developer role to contribute and grow in the IT industry.',
     leftMargin,
     y,
     { width: contentWidth, align: 'justify', lineGap: 1.5 }
   );

y = doc.y;

// 3. Technical Skills
addSectionHeader('Technical Skills');

const skills = [
  { category: 'Languages', value: 'JavaScript (ES6+), Java, Python, SQL' },
  { category: 'Frontend', value: 'React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap' },
  { category: 'Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
  { category: 'Database & Cloud', value: 'MongoDB, Mongoose, MySQL, SQL Server, Oracle Cloud (OCI)' },
  { category: 'Tools & Practices', value: 'Git, GitHub, Version Control, Axios, Postman, UI/UX Design, DSA (LeetCode)' }
];

skills.forEach(skill => {
  doc.fillColor(COLOR_PRIMARY)
     .font(fontBold)
     .fontSize(8.5)
     .text(skill.category + ': ', leftMargin, y, { continued: true })
     .fillColor(COLOR_SECONDARY)
     .font(fontRegular)
     .text(skill.value);
  y = doc.y + 2;
});

// 4. Experience
addSectionHeader('Experience');

// Intern 1
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Intern — Team Infosoft', leftMargin, y, { continued: true })
   .font(fontRegular)
   .fillColor(COLOR_MUTED)
   .text('  |  Tirunelveli, Tamil Nadu', { continued: false });

doc.font(fontBold)
   .fillColor(COLOR_ACCENT)
   .text('Feb 2025 – Present', leftMargin, y, { align: 'right' });

y = doc.y + 4;
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text('• Engineered full-stack features across the MERN stack — building React.js UI components and Node.js/Express.js REST APIs for live web applications.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });
y = doc.y + 2;
doc.text('• Collaborated with the development team on version control (Git/GitHub) workflows and code reviews for feature integration.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });

y = doc.y + 6;

// Intern 2
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Intern — Postulates Info Tech Private Limited', leftMargin, y, { continued: true })
   .font(fontRegular)
   .fillColor(COLOR_MUTED)
   .text('  |  Thoothukudi, Tamil Nadu', { continued: false });

doc.font(fontBold)
   .fillColor(COLOR_ACCENT)
   .text('Jul 2025', leftMargin, y, { align: 'right' });

y = doc.y + 4;
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text('• Applied cloud computing fundamentals across all 3 service models (IaaS, PaaS, SaaS), covering virtualization and deployment models.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });
y = doc.y + 2;
doc.text('• Analyzed cloud infrastructure, networking, and security concepts through hands-on exposure to cloud storage systems.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });

y = doc.y;

// 5. Projects
addSectionHeader('Projects');

// Project 1
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Campus Resource Booking Platform', leftMargin, y, { continued: true })
   .font(fontRegular)
   .fillColor(COLOR_MUTED)
   .text('  |  React.js, Node.js, Express.js, MongoDB, JWT, Bootstrap', { continued: false });

doc.font(fontBold)
   .fillColor(COLOR_ACCENT)
   .text('2025', leftMargin, y, { align: 'right' });

y = doc.y + 4;
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text('• Architected role-based dashboards for 3 user roles (Student, Faculty, Admin) with secure JWT-based authentication.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });
y = doc.y + 2;
doc.text('• Engineered a resource search and booking system covering 3+ resource types with real-time conflict validation and full CRUD operations.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });

y = doc.y + 6;

// Project 2
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('AI Fake News Detection System', leftMargin, y, { continued: true })
   .font(fontRegular)
   .fillColor(COLOR_MUTED)
   .text('  |  React.js, Python, Flask, NLP, Scikit-Learn, Tailwind CSS', { continued: false });

doc.font(fontBold)
   .fillColor(COLOR_ACCENT)
   .text('2025', leftMargin, y, { align: 'right' });

y = doc.y + 4;
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text('• AI-driven web application verifying article credibility. Architected NLP sentiment parsing pipelines and integrated ML classifiers.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });

y = doc.y + 6;

// Project 3
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Contact Management System', leftMargin, y, { continued: true })
   .font(fontRegular)
   .fillColor(COLOR_MUTED)
   .text('  |  React.js, Node.js, Express.js, MongoDB Atlas, Mongoose, Axios', { continued: false });

doc.font(fontBold)
   .fillColor(COLOR_ACCENT)
   .text('2025', leftMargin, y, { align: 'right' });

y = doc.y + 4;
doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8.5)
   .text('• Engineered RESTful APIs handling core contact fields via Axios for seamless client-server communication. Deployed on Vercel.', leftMargin + 10, y, { width: contentWidth - 10, lineGap: 1 });

y = doc.y;

// 6. Education & Certifications
addSectionHeader('Education & Certifications');

const colWidth = (contentWidth - 20) / 2;

// Col 1: Education
let col1Y = y;
doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Education', leftMargin, col1Y);
col1Y = doc.y + 4;

doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(8.5)
   .text('AAA College of Engineering & Technology', leftMargin, col1Y);
col1Y = doc.y + 2;

doc.fillColor(COLOR_SECONDARY)
   .font(fontRegular)
   .fontSize(8)
   .text('B.E. Computer Science Engineering\nAug 2023 – Present', leftMargin, col1Y, { width: colWidth, lineGap: 1.5 });

// Col 2: Certifications
let col2Y = y;
const col2X = leftMargin + colWidth + 20;

doc.fillColor(COLOR_PRIMARY)
   .font(fontBold)
   .fontSize(9.5)
   .text('Certifications', col2X, col2Y);
col2Y = doc.y + 4;

const certs = [
  'OCI 2025 Certified Multicloud Architect Professional',
  'Data Analytics with Python — NPTEL 12-Week Course',
  'MongoDB Certified Developer — Credly'
];

certs.forEach(cert => {
  doc.fillColor(COLOR_SECONDARY)
     .font(fontRegular)
     .fontSize(8)
     .text('• ' + cert, col2X, col2Y, { width: colWidth, lineGap: 1 });
  col2Y = doc.y + 2;
});

// Finish PDF writing
doc.end();
console.log('PDF generated successfully at public/resume.pdf');
