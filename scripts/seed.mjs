import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    neonConfig.fetchConnectionCache = true;
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Check if admin exists
    const [existingAdmin] = await db.select().from('admins').limit(1);

    if (!existingAdmin) {
      // Create default admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.insert('admins').values({
        email: 'admin@learnathon.com',
        password: hashedPassword,
      });
      console.log('Default admin created successfully');
    } else {
      console.log('Admin already exists, skipping seed');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();