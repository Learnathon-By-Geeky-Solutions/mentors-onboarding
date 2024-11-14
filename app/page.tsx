import { db } from '@/lib/db';
import { techStacks } from '@/lib/schema';
import { Logo } from '@/components/ui/logo';
import OnboardingForm from '@/components/onboarding-form';
import { Suspense } from 'react';
import Loading from './loading';

async function getTechStacks() {
  try {
    return await db.select().from(techStacks);
  } catch (error) {
    console.error('Failed to fetch tech stacks:', error);
    return [];
  }
}

export default async function Home() {
  const stacks = await getTechStacks();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
}