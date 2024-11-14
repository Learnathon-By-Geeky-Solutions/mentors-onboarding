import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon, neonConfig } from '@neondatabase/serverless';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

async function main() {
  try {
    neonConfig.fetchConnectionCache = true;
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    console.log('Running migrations...');
    
    await migrate(db, {
      migrationsFolder: join(__dirname, '../drizzle'),
    });
    
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();