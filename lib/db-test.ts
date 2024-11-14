import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

neonConfig.fetchConnectionCache = true;

export async function testDatabaseConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  try {
    const sql = neon(connectionString);
    const db = drizzle(sql, { schema });
    
    // Try to execute a simple query
    const result = await db.select().from(schema.admins).limit(1);
    return { success: true, message: 'Database connection successful', data: result };
  } catch (error) {
    console.error('Database connection error:', error);
    return { 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}