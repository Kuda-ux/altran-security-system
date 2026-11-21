/**
 * Central branding configuration for the Altran Security Management System.
 *
 * To rebrand for a different company, update ONLY this file.
 * All company-specific strings, colors, URLs, and contacts are defined here.
 */

const branding = {
  // ─── Company Identity ───────────────────────────────────────────────
  companyName: 'Altran Security',
  companyNameFull: 'Altran Security (Pvt) Ltd',
  companyShortName: 'Altran',
  companySlogan: 'Protecting What Matters',
  companyTagline: 'Advanced Security Operations Platform',

  // ─── Legal / Footer Text ────────────────────────────────────────────
  legalEntity: 'ALTRAN SECURITY (PVT) LTD',
  footerText: 'ALTRAN SECURITY (PVT) LTD · ALL ACCESS LOGGED',
  copyrightText: '© 2026 Altran Security (Pvt) Ltd',
  privacyNotice: 'Privacy Notice: By signing in you consent to Altran Security collecting, processing, and storing your login credentials, IP address, device information, and activity logs for security, audit, and operational purposes. Access is monitored and recorded. Unauthorized use is prohibited and may be subject to legal action.',

  // ─── Portal Descriptions ────────────────────────────────────────────
  portals: {
    admin: {
      title: 'Headquarters Operations',
      subtitle: 'Admin Sign In',
      description: 'Enter your credentials to access the dashboard',
      buttonText: 'Access Dashboard',
    },
    security: {
      title: 'Supervisor & Guard Control',
      subtitle: 'Supervisor Sign In',
      description: 'Access the security control portal',
      buttonText: 'Access Control Portal',
    },
    staff: {
      title: 'Guard Attendance & Patrols',
      subtitle: 'Guard Sign In',
      description: 'Clock in, track patrols, and manage your shift',
      buttonText: 'Access Guard Portal',
    },
  },

  // ─── Theme Colors (from Altran logo) ────────────────────────────────
  colors: {
    black: '#0a0a0a',
    surface: '#111111',
    surfaceElevated: '#1a1a1a',
    border: '#1f1f1f',
    borderLight: '#2a2a2a',
    primary: '#005890',       // Altran dark blue
    primaryHover: '#0070b0',
    primaryDark: '#004a70',
    primarySurface: 'rgba(0, 88, 144, 0.08)',
    primarySurfaceHover: 'rgba(0, 88, 144, 0.15)',
    accent: '#33c1e7',         // Altran cyan/teal accent
    accentHover: '#4dd0f0',
    text: '#ffffff',
    textSecondary: '#888888',
    textMuted: '#555555',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },

  // ─── Assets ─────────────────────────────────────────────────────────
  logoPath: '/altran-logo.jpg',
  logoAlt: 'Altran Security',
  faviconPath: '/altran-logo.jpg',

  // ─── URLs ───────────────────────────────────────────────────────────
  // These are set via environment variables in production.
  // The fallbacks here are for local development only.
  apiBaseUrl: process.env.REACT_APP_API_URL || null,
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || null,

  // ─── Contact Info ───────────────────────────────────────────────────
  supportEmail: 'support@altransecurity.co.zw',
  supportPhone: '+263 242 000 000',
  address: 'Harare, Zimbabwe',

  // ─── Payment Methods ────────────────────────────────────────────────
  paymentMethods: ['cash', 'ecocash', 'inbucks', 'mastercard', 'other'],

  // ─── Industries ─────────────────────────────────────────────────────
  industries: [
    'Retail', 'Corporate Office', 'Industrial', 'Residential',
    'Healthcare', 'Education', 'Hospitality', 'Government',
    'Mining', 'Agriculture', 'Financial', 'Other',
  ],

  // ─── Visitor Purposes ───────────────────────────────────────────────
  visitorPurposes: [
    'Meeting', 'Delivery', 'Interview', 'Maintenance',
    'Personal Visit', 'Contractor', 'Client', 'Other',
  ],

  // ─── Incident Categories ────────────────────────────────────────────
  incidentCategories: [
    'Access breach', 'Theft', 'Trespass', 'Injury',
    'Property damage', 'Fire', 'Suspicious activity', 'Other',
  ],

  // ─── Weapon Types ───────────────────────────────────────────────────
  weaponTypes: [
    'Pistol', 'Revolver', 'Shotgun', 'Rifle', 'Taser', 'Baton', 'Other',
  ],

  // ─── Clearance Statuses ─────────────────────────────────────────────
  clearanceStatuses: ['not_cleared', 'cleared', 'suspended'],

  // ─── Version ────────────────────────────────────────────────────────
  version: '2.0.0',
};

export default branding;
