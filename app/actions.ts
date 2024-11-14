"use server";

import { db } from '@/lib/db';
import { admins, techStacks, participants, jetbrainsLicenses, configurations } from '@/lib/schema';

export async function getAdmins() {
  return await db.select().from(admins);
}

export async function getTechStacks() {
  return await db.select().from(techStacks);
}

export async function getParticipants() {
  return await db.select().from(participants);
}

export async function getLicenses() {
  return await db.select().from(jetbrainsLicenses);
}

export async function getConfigurations() {
  return await db.select().from(configurations);
}