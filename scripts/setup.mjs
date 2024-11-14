import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

async function setup() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    console.log('Connecting to database...');
    const sql = neon(process.env.DATABASE_URL);

    // Run migrations from SQL file
    console.log('Running migrations...');
    const migrationSQL = fs.readFileSync(
      join(__dirname, '../drizzle/0000_flimsy_madame_hydra.sql'),
      'utf-8'
    );
    
    // Split and clean up SQL statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('-->'));

    // Execute each statement separately
    for (const statement of statements) {
      if (statement) {
        await sql`${statement}`;
      }
    }
    console.log('Migrations completed');

    // Check for existing admin
    console.log('Checking for existing admin...');
    const [existingAdmin] = await sql`SELECT id FROM admins LIMIT 1`;

    if (!existingAdmin) {
      console.log('Creating default admin...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await sql`
        INSERT INTO admins (email, password)
        VALUES (${'admin@learnathon.com'}, ${hashedPassword})
      `;
      console.log('Default admin created');
    }

    // Check for existing tech stacks
    console.log('Checking for existing tech stacks...');
    const [existingStack] = await sql`SELECT id FROM tech_stacks LIMIT 1`;

    if (!existingStack) {
      console.log('Creating default tech stacks...');
      const defaultStacks = [
        { name: '.NET', icon: 'devicon-dotnetcore-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'PHP', icon: 'devicon-php-plain' },
        { name: 'Unity', icon: 'devicon-unity-original' },
        { name: 'MERN', icon: 'devicon-mongodb-plain' },
        { name: 'Cross-Platform', icon: 'devicon-flutter-plain' },
      ];

      for (const stack of defaultStacks) {
        await sql`
          INSERT INTO tech_stacks (name, icon)
          VALUES (${stack.name}, ${stack.icon})
        `;
      }
      console.log('Default tech stacks created');
    }

    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}