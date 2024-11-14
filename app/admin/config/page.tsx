import { db } from "@/lib/db";
import { configurations } from "@/lib/schema";
import ConfigForm from "./config-form";

export default async function ConfigPage() {
	const [config] = await db.select().from(configurations);

	const sanitizedConfig = {
		...config,
		githubToken: config.githubToken ?? undefined,
		githubOrgName: config.githubOrgName ?? undefined,
		githubTeamSlug: config.githubTeamSlug ?? undefined,
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
			<div className="max-w-2xl">
				<ConfigForm initialConfig={sanitizedConfig} />
			</div>
		</div>
	);
}
