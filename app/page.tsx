'use client'

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import OnboardingForm from "@/components/onboarding-form";
import Loading from "./loading";
import { getTechStacks } from "./actions/tech-stacks";

export default function Home() {
    const [stacks, setStacks] = useState<{
		icon: string;
		id: string;
		name: string;
		createdAt: Date | null;
		discordUrl: string | null;
	}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStacks = async () => {
            try {
                const data = await getTechStacks();
                setStacks(data);
            } catch (error) {
                console.error('Error fetching tech stacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStacks();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-12">
                    <Logo className="mb-8" />
                    <h1 className="text-3xl font-bold text-white text-center mb-4">
                        Welcome to Learnathon
                    </h1>
                    <p className="text-lg text-white/80 text-center max-w-2xl">
                        Join our community of developers and start your learning journey.
                        Follow the steps below to get access to all resources.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6">
                    <OnboardingForm initialStacks={stacks} />
                </div>
            </div>
        </div>
    );
}
