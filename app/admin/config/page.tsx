'use client'

import { useEffect, useState } from 'react';
import ConfigForm from "./config-form";
import { getConfiguration } from "./actions/config";

export default function ConfigPage() {
    const [config, setConfig] = useState<{
		githubToken: string;
		githubOrgName: string;
		githubTeamSlug: string;
		id: string;
		updatedAt: Date | null;
	}|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const data = await getConfiguration();
                setConfig(data);
            } catch (error) {
                console.error('Error fetching configuration:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
                <div className="max-w-2xl">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
            <div className="max-w-2xl">
                {config && <ConfigForm initialConfig={config} />}
            </div>
        </div>
    );
}