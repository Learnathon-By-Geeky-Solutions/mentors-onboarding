'use server'

import { db } from "@/lib/db";
import { techStacks } from "@/lib/schema";

export async function getTechStacks() {
    try {
        const results = await db.select().from(techStacks);
        return results.map((stack) => ({
            ...stack,
            icon: stack.icon || "",
        }));
    } catch (error) {
        console.error("Failed to fetch tech stacks:", error);
        return [];
    }
}