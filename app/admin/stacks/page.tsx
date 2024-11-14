import { db } from "@/lib/db";
import { techStacks } from "@/lib/schema";
import { AddStackButton } from "./add-stack-button";
import { StackList } from "./stack-list";

export default async function StacksPage() {
	const stacks = await db
		.select()
		.from(techStacks)
		.then((stacks) =>
			stacks.map((stack) => ({
				...stack,
				icon: stack.icon ?? "",
			}))
		);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Tech Stacks</h1>
				<AddStackButton />
			</div>

			<StackList initialStacks={stacks} />
		</div>
	);
}
