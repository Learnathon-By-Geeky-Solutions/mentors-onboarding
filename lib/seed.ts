import { db } from './db';
import { admins, techStacks } from './schema';
import bcrypt from 'bcryptjs';

export async function seed() {
  try {
    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(admins)
      .limit(1);

    if (existingAdmin.length === 0) {
      // Create default admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.insert(admins).values({
        email: 'admin@learnathon.com',
        password: hashedPassword,
      });
      console.log('Default admin created');
    }

    // Create default tech stacks if they don't exist
    const existingStacks = await db.select().from(techStacks).limit(1);
    
    if (existingStacks.length === 0) {
      const defaultStacks = [
        { name: '.NET', icon: 'devicon-dotnetcore-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'PHP', icon: 'devicon-php-plain' },
        { name: 'Unity', icon: 'devicon-unity-original' },
        { name: 'MERN', icon: 'devicon-mongodb-plain' }, // Using MongoDB as the representative icon
        { name: 'Cross-Platform', icon: 'devicon-flutter-plain' }, // Using Flutter as the representative icon
      ];

      await db.insert(techStacks).values(defaultStacks);
      console.log('Default tech stacks created');
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}