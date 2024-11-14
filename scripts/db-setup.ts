import { seed } from '../lib/seed';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from '../lib/schema';

neonConfig.fetchConnectionCache = true;

async function main() {
  try {
    // Connect to database
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });

    // Run migrations
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed');

    // Seed data
    console.log('Seeding database...');
    await seed();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

main();