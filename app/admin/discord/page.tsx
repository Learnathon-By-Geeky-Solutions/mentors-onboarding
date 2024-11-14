import { db } from "@/lib/db";
import { techStacks } from "@/lib/schema";
import { DiscordList } from "./discord-list";

export default async function DiscordPage() {
	const stacks = await db.select().from(techStacks);
	const mappedStacks = stacks.map((stack) => ({
		...stack,
		icon: stack.icon ?? "", // Convert null to empty string
	}));

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-gray-900">Discord Servers</h1>
			<div className="max-w-3xl">
				<DiscordList initialStacks={mappedStacks} />
			</div>
		</div>
	);
}
