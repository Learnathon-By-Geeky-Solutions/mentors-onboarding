"use server";

import { db } from "@/lib/db";
import { jetbrainsLicenses } from "@/lib/schema";
import type { License } from "../license-list";

export async function getLicenses(): Promise<License[]> {
    const licenses = await db.select().from(jetbrainsLicenses);
    return licenses.filter((l): l is License => l.createdAt !== null);
}
