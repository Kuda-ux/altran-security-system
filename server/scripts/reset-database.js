/**
 * Database Reset Script for Security Management System
 *
 * This script clears ALL test data from the production database while
 * preserving the table schema. After clearing, it re-creates the default
 * admin account.
 *
 * Usage:
 *   DATABASE_URL=your_neon_connection_string node server/scripts/reset-database.js
 *
 * Optional env vars for admin credentials:
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_PHONE
 *
 * WARNING: This will permanently delete all data. Use with caution.
 */

require('dotenv').config();
const { Pool } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function resetDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is required.');
    console.error('Usage: DATABASE_URL=your_connection_string node server/scripts/reset-database.js');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  console.log('========================================');
  console.log(' Security Management - Database Reset');
  console.log('========================================\n');

  try {
    // Tables to clear (order matters due to potential references)
    const tables = [
      'patrol_scans',
      'patrol_rounds',
      'weapon_assignments',
      'weapons',
      'vehicle_tracking',
      'vehicles',
      'employee_documents',
      'incident_reports',
      'assets',
      'staff_entries',
      'staff_attendance',
      'visitors',
      'payments',
      'tenants',
      'sync_queue',
      'login_logs',
      'buildings',
      'clients',
      'users'
    ];

    console.log('Clearing all tables...\n');

    for (const table of tables) {
      try {
        const result = await pool.query(`DELETE FROM ${table}`);
        console.log(`  [OK] ${table} - ${result.rowCount} records deleted`);
      } catch (err) {
        if (err.message.includes('does not exist')) {
          console.log(`  [SKIP] ${table} - table does not exist`);
        } else {
          console.log(`  [WARN] ${table} - ${err.message}`);
        }
      }
    }

    console.log('\n----------------------------------------');
    console.log('Creating default admin account...\n');

    // Create default admin from env vars
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe@123';
    const adminName = process.env.ADMIN_NAME || 'System Administrator';
    const adminPhone = process.env.ADMIN_PHONE || '+263000000000';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminId = uuidv4();
    const now = new Date().toISOString();

    await pool.query(
      `INSERT INTO users (id, email, password, full_name, role, phone, created_at, updated_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [adminId, adminEmail, hashedPassword, adminName, 'admin', adminPhone, now, now, 1]
    );

    console.log('  [OK] Admin account created');
    console.log('       Email:', adminEmail);
    console.log('       Password:', adminPassword);
    console.log('\n========================================');
    console.log(' Database reset complete!');
    console.log(' Please change the admin password after');
    console.log(' first login via Settings > Change Password.');
    console.log('========================================\n');

  } catch (err) {
    console.error('\nFATAL ERROR:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

resetDatabase();
