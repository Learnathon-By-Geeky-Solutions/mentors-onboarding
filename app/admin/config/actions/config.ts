"use server";

import { db } from "@/lib/db";
import { configurations } from "@/lib/schema";

export async function getConfiguration() {
    const [config] = await db.select().from(configurations);

    return {
        ...config,
        githubToken: config?.githubToken ?? "",
        githubOrgName: config?.githubOrgName ?? "",
        githubTeamSlug: config?.githubTeamSlug ?? "",
    };
}
