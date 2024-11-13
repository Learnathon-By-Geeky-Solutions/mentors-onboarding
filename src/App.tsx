import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserPlus } from 'lucide-react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Step } from './components/Step';
import { useGitHub } from './hooks/useGitHub';

function App() {
  const [username, setUsername] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const { inviteToOrg, addToTeam, loading, error } = useGitHub();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteToOrg(username);
      setCurrentStep(2);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleJoinTeam = async () => {
    try {
      await addToTeam(username);
      setCurrentStep(3);
      // Play celebration effects
      const audio = new Audio('/success.mp3');
      audio.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <img
            src="https://cdn.baseline.is/static/content/logos/CmpiZrcBVWQnEYx5qnwpwz-Learnathon_logo_Blue.png"
            alt="Learnathon Logo"
            className="h-12 mx-auto mb-8"
          />
          <h1 className="text-3xl font-bold text-[#1B3765] mb-4">
            Join Learnathon Community
          </h1>
          <p className="text-gray-600">
            Follow these steps to become a participant in our community
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-8">
            <Step
              step={1}
              title="GitHub Username"
              description="Enter your GitHub username to receive an invitation"
              active={currentStep === 1}
              completed={currentStep > 1}
            />
            <Step
              step={2}
              title="Accept Invitation"
              description="Check your email and accept the organization invitation"
              active={currentStep === 2}
              completed={currentStep > 2}
            />
            <Step
              step={3}
              title="Join as Participant"
              description="Join the participants team"
              active={currentStep === 3}
              completed={currentStep > 3}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {currentStep === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your GitHub username"
                required
                error={error}
              />
              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                <UserPlus className="w-5 h-5 mr-2 flex-shrink-0" />
                Send Invitation
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Please check your email and accept the invitation to join the
                organization. Once accepted, click the button below.
              </p>
              <Button onClick={handleJoinTeam} loading={loading}>
                Join as Participant
              </Button>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-[#1890BA]">
                🎉 Welcome to the team!
              </h3>
              <p className="text-gray-600">
                You're now officially a participant in the Learnathon
                community. Get ready for an amazing learning journey!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;