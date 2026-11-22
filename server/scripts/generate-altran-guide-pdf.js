// Generates ALTRAN_USER_GUIDE.pdf with Altran branding
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ size: 'A4', margin: 50, info: { Title: 'Altran Security User Guide', Author: 'Altran Security (Pvt) Ltd' } });
doc.pipe(fs.createWriteStream(path.join(__dirname, '../../ALTRAN_USER_GUIDE.pdf')));

const BLUE = '#005890', CYAN = '#33c1e7', DARK = '#0a0a0a', GRAY = '#555555', LIGHT = '#f0f4f8';
const logoPath = path.join(__dirname, '../../client/public/altran-logo.jpg');

function heading(text, size = 16) {
  doc.moveDown(0.8).font('Helvetica-Bold').fontSize(size).fillColor(BLUE).text(text).moveDown(0.3);
}
function sub(text) { doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK).text(text).moveDown(0.2); }
function body(text) { doc.font('Helvetica').fontSize(10).fillColor('#333333').text(text, { lineGap: 2 }).moveDown(0.4); }
function bullet(text) { doc.font('Helvetica').fontSize(10).fillColor('#333333').text('•  ' + text, { indent: 10, lineGap: 1 }).moveDown(0.15); }
function tableRow(cols, widths, bold = false) {
  let x = doc.page.margins.left;
  const y = doc.y;
  if (bold) doc.rect(x, y, doc.page.width - 100, 18).fill(LIGHT);
  doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9).fillColor('#333333');
  cols.forEach((c, i) => { doc.text(c, x + 4, y + 4, { width: widths[i] - 8, lineBreak: false }); x += widths[i]; });
  doc.y = y + 20;
}

// ===== COVER =====
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).lineWidth(2).stroke(BLUE);
if (fs.existsSync(logoPath)) doc.image(logoPath, doc.page.width / 2 - 45, 140, { width: 90 });
doc.font('Helvetica-Bold').fontSize(30).fillColor('#ffffff').text('ALTRAN SECURITY', 0, 270, { align: 'center' });
doc.font('Helvetica').fontSize(14).fillColor(CYAN).text('MANAGEMENT SYSTEM', 0, 310, { align: 'center' });
doc.font('Helvetica').fontSize(11).fillColor('#aaaaaa').text('User Guide', 0, 340, { align: 'center' });
doc.font('Helvetica').fontSize(10).fillColor('#888888').text('Version 2.0  |  November 2026', 0, 365, { align: 'center' });
doc.font('Helvetica').fontSize(9).fillColor('#666666').text('Altran Security (Pvt) Ltd — Protecting What Matters', 0, doc.page.height - 90, { align: 'center' });
doc.addPage();

// ===== 1. WELCOME =====
heading('1. Welcome');
body('The Altran Security Management System is a complete security operations platform for managing client sites, visitors, guards, patrols, incidents, assets, vehicles, and weapons — all from one dashboard. This guide explains how to use each part of the system. No technical knowledge is required.');

// ===== 2. ACCESS =====
heading('2. Accessing the System');
const urls = [
  ['Landing Page', 'https://altran-security-system-client.vercel.app', 'Everyone'],
  ['Admin / Owner HQ', '.../admin/login', 'Administrators & building owners'],
  ['Security / Supervisor', '.../security/login', 'Supervisors & guards on duty'],
  ['Guard Portal', '.../staff/login', 'Guards (staff)'],
  ['Visitor Check-In', 'QR code only', 'Visitors (no login needed)'],
];
tableRow(['Portal', 'URL', 'Who uses it'], [140, 190, 120], true);
urls.forEach(r => tableRow(r, [140, 190, 120]));
doc.moveDown(0.6);

// ===== 3. CREDENTIALS =====
heading('3. Login Credentials');
sub('Default Administrator Account');
tableRow(['Field', 'Value'], [80, 200], true);
tableRow(['Email', 'admin@altransecurity.co.zw'], [80, 200]);
tableRow(['Password', '60yvMAvYGd9bY1TuAa1!'], [80, 200]);
tableRow(['Role', 'Administrator (full access)'], [80, 200]);
doc.moveDown(0.3);
doc.font('Helvetica-Oblique').fontSize(9).fillColor('#b45309').text('IMPORTANT: Change the admin password immediately after first login via Admin → Settings → Security → Change Password.');
doc.moveDown(0.4);
body('Other accounts are created by administrators and owners under Admin → Staff Management. Each person receives their own email and password.');

// ===== 4. PORTALS =====
heading('4. The Four Portals');
sub('4.1 Visitor Check-In (Public — no login)');
body('Each client site has a printed QR code at the entrance. Visitors scan it with their phone camera, enter their name, phone, ID number, and purpose, then tap Check In. To leave, they scan the same QR and tap Check Out. The system recognises returning devices automatically. Visitor ID numbers are encrypted and stored securely.');
sub('4.2 Guard Portal (/staff)');
['Clock In / Clock Out with automatic hour calculation', 'My QR Pass — digital gate badge', 'Visitor registration and checkout', 'Asset lookup and Patrol rounds', 'Attendance history and weekly hours'].forEach(bullet);
sub('4.3 Security / Supervisor Portal (/security)');
['Live dashboard: visitors inside, guards on duty (auto-refresh 30s)', 'QR Scanner — record guard site entry/exit', 'Incident reporting and tracking', 'Visitor search and manual checkout', 'Guard attendance view'].forEach(bullet);
sub('4.4 Admin / Owner HQ (/admin)');
['Operations — live overview of all sites', 'Guard E-Files — personnel records and clearance', 'Incidents, Asset Tags, Vehicles, Weapons', 'Client Sites — add sites and print entry QR codes', 'Staff — accounts, roles, passwords, QR passes', 'Reports — patrol accountability and Excel exports', 'Settings — profile and password'].forEach(bullet);

// ===== 5. TASKS =====
heading('5. Common Tasks — Step by Step');
sub('5.1 Add a New Client Site');
['Admin → Client Sites → Add Site', 'Enter name, address, company, contact, industry', 'Save, then click the QR icon to display/print the entry QR', 'Stick the printed QR at the site entrance'].forEach(bullet);
sub('5.2 Add a Guard / Staff Member');
['Admin → Staff Management → Add Staff', 'Enter name, email, phone, role, assigned site, temp password', 'Save → Generate QR to create their gate pass', 'Print the pass for the guard'].forEach(bullet);
sub('5.3 Record an Incident');
['Security Portal → Incidents → Report Incident (or Admin → Incidents)', 'Fill title, category, severity, description, people involved', 'Submit — appears on HQ dashboard instantly', 'Status flow: Open → Under Review → Resolved → Closed'].forEach(bullet);
sub('5.4 Run a Patrol');
['Guard Portal → Start Patrol', 'Scan each asset QR checkpoint (or type the code)', 'All checkpoints must be scanned to complete', 'Supervisors track completion in Reports → Guard Patrols'].forEach(bullet);
sub('5.5 Issue a Weapon');
['Guard must have clearance status = Cleared (Guard E-Files)', 'Admin → Weapons → Issue → select guard, note condition', 'Weapon shows Issued with holder name', 'On return use Return and record condition'].forEach(bullet);
sub('5.6 Export Reports');
['Admin → Reports → Attendance & Exports', 'Choose date range and site', 'Download Excel: Visitor Log, Attendance, Guard Logsheet, Login Activity'].forEach(bullet);

// ===== 6. QR CODES =====
heading('6. QR Codes Explained');
tableRow(['QR Type', 'Purpose'], [140, 200], true);
tableRow(['Site Entry QR', 'Visitor check-in URL — printed at entrances'], [140, 200]);
tableRow(['Staff QR Pass', 'Guard gate pass — scanned by security'], [140, 200]);
tableRow(['Asset QR Tag', 'Patrol checkpoints — scanned during rounds'], [140, 200]);
tableRow(['Payment QR', 'Rent payment verification'], [140, 200]);
doc.moveDown(0.5);

// ===== 7. SECURITY =====
heading('7. Security & Access Rules');
['All logins are logged with IP address and time', '5 failed password attempts locks the account for 30 minutes — contact admin to unlock', 'Deactivated accounts cannot log in', 'Visitor ID numbers are encrypted at rest', 'Each portal only shows what the role needs'].forEach(bullet);

// ===== 8. TROUBLESHOOTING =====
heading('8. Troubleshooting');
tableRow(['Problem', 'Solution'], [160, 180], true);
[
  ['Account locked', 'Wait 30 min or ask admin to unlock (Staff → Unlock)'],
  ['Cannot log in', 'Check correct portal and role'],
  ['Visitor QR fails', 'Confirm site is active and QR is correct'],
  ['Camera will not open', 'Grant camera permission; requires HTTPS'],
  ['Forgot password', 'Only admins can reset — ask your administrator'],
].forEach(r => tableRow(r, [160, 180]));
doc.moveDown(0.5);

// ===== 9. HELP =====
heading('9. Getting Help');
tableRow(['Contact', 'Details'], [100, 200], true);
tableRow(['System Support', 'support@altransecurity.co.zw'], [100, 200]);
tableRow(['Phone', '+263 242 000 000'], [100, 200]);
tableRow(['Address', 'Harare, Zimbabwe'], [100, 200]);
doc.moveDown(1);
doc.font('Helvetica-Oblique').fontSize(9).fillColor(GRAY).text('For urgent issues, contact your system administrator first — they can reset passwords, unlock accounts, and manage user access.', { align: 'center' });
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(10).fillColor(BLUE).text('Altran Security (Pvt) Ltd — Protecting What Matters', { align: 'center' });

doc.end();
console.log('PDF generated: ALTRAN_USER_GUIDE.pdf');
