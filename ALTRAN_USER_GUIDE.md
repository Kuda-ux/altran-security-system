# Altran Security Management System
## User Guide — Version 2.0

---

## 1. Welcome

The Altran Security Management System is a complete security operations platform for managing client sites, visitors, guards, patrols, incidents, assets, vehicles, and weapons — all from one dashboard.

This guide explains how to use each part of the system. No technical knowledge is required.

---

## 2. Accessing the System

| Portal | URL | Who uses it |
|---|---|---|
| **Landing Page** | `https://<your-app>.vercel.app` | Everyone |
| **Admin / Owner HQ** | `https://<your-app>.vercel.app/admin/login` | Administrators & building owners |
| **Security / Supervisor** | `https://<your-app>.vercel.app/security/login` | Supervisors & guards on duty |
| **Guard Portal** | `https://<your-app>.vercel.app/staff/login` | Guards (staff) |
| **Visitor Check-In** | Scanned QR code only | Visitors (no login needed) |

> **Note:** Replace `<your-app>` with your actual Vercel URL.

---

## 3. Login Credentials

### Default Administrator Account

| Field | Value |
|---|---|
| Email | `admin@altransecurity.co.zw` |
| Password | `60yvMAvYGd9bY1TuAa1!` |
| Role | Administrator (full access) |

> ⚠️ **Change the admin password immediately after first login.** Go to **Admin → Settings → Security → Change Password**.

### Other Accounts

Administrators and owners create accounts for their team under **Admin → Staff Management**. Each person receives their own email and password. Guards and supervisors log in through their respective portals.

---

## 4. The Four Portals

### 4.1 Visitor Check-In (Public — no login)

Visitors never need an account. Each client site has a **printed QR code** at the entrance.

**How it works:**
1. Visitor scans the QR code with their phone camera
2. A check-in page opens showing the site name
3. They enter: **Full Name, Phone Number, ID Number, Purpose of visit**
4. They tap **Check In** — done
5. To leave, they scan the same QR again and tap **Check Out**

The system recognises returning devices, so a visitor who is already inside sees a **Check Out** button instead of the form.

> Visitor ID numbers are encrypted and stored securely.

### 4.2 Guard Portal (`/staff`)

For guards (role: `staff`).

**Features:**
- **Clock In / Clock Out** — tap to start/end shift; hours are calculated automatically
- **My QR Pass** — digital ID badge guards show at the gate
- **Visitor Management** — manually register or check out visitors
- **Asset Lookup** — verify checkpoint codes
- **Patrol** — start patrol rounds and scan checkpoints
- **Attendance History** — view past shifts and weekly hours

### 4.3 Security / Supervisor Portal (`/security`)

For supervisors and duty officers (roles: `security`, `supervisor`).

**Features:**
- **Live Dashboard** — visitors currently inside, guards on duty, today's activity (auto-refreshes every 30 seconds)
- **QR Scanner** — scan guard QR passes to record site entry/exit
- **Incident Reporting** — log and track security incidents
- **Visitor Search & Checkout** — find any visitor and check them out manually
- **Guard Attendance View** — see who is inside the site right now

### 4.4 Admin / Owner HQ (`/admin`)

Full management console (roles: `admin`, `owner`).

| Section | What it does |
|---|---|
| **Operations** | Live overview: guards on duty, patrols, incidents, attendance, vehicles, weapons |
| **Guard E-Files** | Personnel records, clearance status, documents |
| **Incidents** | Create and resolve incident reports |
| **Asset Tags** | Register checkpoints and generate printable QR labels |
| **Vehicles** | Fleet registry and driver assignments |
| **Weapons** | Armory registry, issue/return tracking |
| **Client Sites** | Add/edit sites, company details, entry QR codes |
| **Staff** | Create accounts, assign roles, reset passwords, generate QR passes |
| **Reports** | Patrol accountability, attendance exports, login activity |
| **Settings** | Profile and password management |

---

## 5. Common Tasks — Step by Step

### 5.1 Add a New Client Site

1. Log in as **Admin** → **Client Sites**
2. Click **Add Site**
3. Fill in: site name, address, company name, contact phone/email, industry
4. Click **Save**
5. Click the **QR code icon** on the site card to display and print the entry QR code
6. Stick the printed QR code at the site entrance

### 5.2 Add a Guard / Staff Member

1. **Admin → Staff Management** → **Add Staff**
2. Enter: full name, email, phone, role (`staff`, `security`, or `supervisor`), assigned site
3. Set a temporary password
4. Save — then click **Generate QR** to create their gate pass
5. Print the QR pass for the guard to carry

### 5.3 Record an Incident

**From the Security Portal:**
1. Go to **Incidents** → **Report Incident**
2. Fill in: title, category, severity (low/medium/high/critical), description, people involved, actions taken
3. Submit — the incident appears in the HQ dashboard immediately

**From Admin HQ:** same process under **Incidents**.

Incident status flow: `Open → Under Review → Resolved → Closed`

### 5.4 Run a Patrol

1. Guard logs into **Guard Portal** → taps **Start Patrol**
2. At each checkpoint, scan the asset QR tag (or type the code)
3. The app tracks progress — all checkpoints must be scanned
4. Tap **Complete Patrol** when finished
5. Supervisors see patrol completion in **Reports → Guard Patrols**

### 5.5 Issue a Weapon to a Guard

1. Guard must first have **clearance status = Cleared** (set in **Guard E-Files**)
2. **Admin → Weapons** → find the weapon → **Issue**
3. Select the guard, note the condition, confirm
4. The weapon shows as *Issued* with the holder's name
5. On return, use **Return** and record the condition

> Only cleared guards can receive weapons — the system blocks issuance otherwise.

### 5.6 Export Reports

**Admin → Reports → Attendance & Exports**
- Choose date range and site
- Download Excel files: Visitor Log, Staff Attendance, Guard Logsheet, Login Activity

---

## 6. QR Codes Explained

| QR Type | Encodes | Used for |
|---|---|---|
| **Site Entry QR** | Visitor check-in URL | Printed at entrances — visitors scan to sign in/out |
| **Staff QR Pass** | `staff:<id>` | Guards show this; security scans it at the gate |
| **Asset QR Tag** | `asset:<id>` | Patrol checkpoints — guards scan during rounds |
| **Payment QR** | Payment details JSON | Rent payment verification |

---

## 7. Security & Access Rules

- **All logins are logged** — every attempt (success or failure) is recorded with IP address and time
- **5 failed password attempts** locks the account for 30 minutes — contact your admin to unlock
- **Accounts can be deactivated** — deactivated users cannot log in
- **Visitor ID numbers are encrypted** at rest
- **Each portal only shows what the role needs** — guards can't see admin data, owners only see their own sites

---

## 8. Troubleshooting

| Problem | Solution |
|---|---|
| "Account locked" message | Wait 30 minutes or ask admin to unlock (Staff → select user → Unlock) |
| Can't log in | Check you're on the right portal (admin/security/staff) and using the correct role |
| Visitor QR doesn't work | Confirm the site is active and the QR is for the correct site |
| Camera won't open for QR scan | Grant camera permission; QR scanning requires HTTPS (works on the live site, not `localhost`) |
| Data looks outdated | Pages auto-refresh; pull down or click refresh |
| Forgot password | Only admins can reset passwords — ask your administrator |

---

## 9. Getting Help

| Contact | Details |
|---|---|
| **System Support** | `support@altransecurity.co.zw` |
| **Phone** | `+263 242 000 000` |
| **Address** | Harare, Zimbabwe |

For urgent issues, contact your system administrator first — they can reset passwords, unlock accounts, and manage user access.

---

*Altran Security (Pvt) Ltd — Protecting What Matters*
