"use server";

import { db } from "@/lib/db";
import { techStacks } from "@/lib/schema";

export type Stack = {
    id: string;
    name: string;
    icon: string; 
    discordUrl: string | null;
};

export async function getStacks(): Promise<Stack[]> {
    const stacks = await db
        .select()
        .from(techStacks)
        .then((stacks) =>
            stacks.map((stack) => ({
                ...stack,
                icon: stack.icon ?? "",
            }))
        );

    return stacks;
}
