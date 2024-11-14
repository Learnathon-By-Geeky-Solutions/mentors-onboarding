import { db } from './db';
import { techStacks, admins, configurations, jetbrainsLicenses, participants } from './schema';
import { eq } from 'drizzle-orm';

export async function getTechStacks() {
  try {
    return await db.select().from(techStacks);
  } catch (error) {
    console.error('Failed to fetch tech stacks:', error);
    return [];
  }
}

export async function getAdmins() {
  try {
    return await db.select().from(admins);
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    return [];
  }
}

export async function getConfigurations() {
  try {
    return await db.select().from(configurations);
  } catch (error) {
    console.error('Failed to fetch configurations:', error);
    return [];
  }
}

export async function getLicenses() {
  try {
    return await db.select().from(jetbrainsLicenses);
  } catch (error) {
    console.error('Failed to fetch licenses:', error);
    return [];
  }
}

export async function getParticipants() {
  try {
    return await db.select().from(participants);
  } catch (error) {
    console.error('Failed to fetch participants:', error);
    return [];
  }
}

export async function getParticipantByGithub(username: string) {
  try {
    const [participant] = await db
      .select()
      .from(participants)
      .where(eq(participants.githubUsername, username));
    return participant;
  } catch (error) {
    console.error('Failed to fetch participant:', error);
    return null;
  }
}