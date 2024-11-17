import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { participants, jetbrainsLicenses } from "@/lib/schema";
import { eq, isNull } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const { githubUsername } = await request.json();
        // Check if the participant already has a license assigned
        const [participant] = await db
            .select()
            .from(participants)
            .where(eq(participants.githubUsername, githubUsername))
            .limit(1);

        if (participant && participant.licenseId) {
            // Fetch the license details
            const [existingLicense] = await db
                .select()
                .from(jetbrainsLicenses)
                .where(eq(jetbrainsLicenses.id, participant.licenseId))
                .limit(1);

            if (existingLicense) {
                return NextResponse.json(existingLicense);
            }
        }

        // Get an available license
        const [license] = await db
            .select()
            .from(jetbrainsLicenses)
            .where(isNull(jetbrainsLicenses.usedBy))
            .limit(1);

        if (!license) {
            throw new Error("No licenses available");
        }

        // Assign license to participant
        const [updatedLicense] = await db
            .update(jetbrainsLicenses)
            .set({
                usedBy: githubUsername,
                usedAt: new Date(),
            })
            .where(eq(jetbrainsLicenses.id, license.id))
            .returning();

        // Update participant record
        await db
            .update(participants)
            .set({
                licenseAssigned: true,
                licenseId: license.id,
            })
            .where(eq(participants.githubUsername, githubUsername));

        return NextResponse.json(updatedLicense);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
