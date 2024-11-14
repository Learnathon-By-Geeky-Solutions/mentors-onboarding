import { db } from "@/lib/db";
import { jetbrainsLicenses } from "@/lib/schema";
import { AddLicenseButton } from "./add-license-button";
import { LicenseList } from "./license-list";
import { UploadLicenses } from "./upload-licenses";
import type { License } from "./license-list";

export default async function LicensesPage() {
	const licenses = await db.select().from(jetbrainsLicenses);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">JetBrains Licenses</h1>
				<div className="flex gap-2">
					<UploadLicenses />
					<AddLicenseButton />
				</div>
			</div>

			<LicenseList
				initialLicenses={licenses.filter(
					(l): l is License => l.createdAt !== null
				)}
			/>
		</div>
	);
}
