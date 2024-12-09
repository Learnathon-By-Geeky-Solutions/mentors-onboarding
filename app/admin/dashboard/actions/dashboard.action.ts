"use server";

import { db } from "@/lib/db";
import { techStacks, participants, jetbrainsLicenses } from "@/lib/schema";

export type DashboardStats = {
    participantsCount: number;
    stacksCount: number;
    availableLicensesCount: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
    const [participantsCount, stacksCount, licensesCount] = await Promise.all([
        db.select().from(participants).execute(),
        db.select().from(techStacks).execute(),
        db.select().from(jetbrainsLicenses).execute(),
    ]);

    return {
        participantsCount: participantsCount.length,
        stacksCount: stacksCount.length,
        availableLicensesCount: licensesCount.filter((l) => !l.usedBy).length,
    };
}
