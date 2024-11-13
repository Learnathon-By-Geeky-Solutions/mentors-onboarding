import { useState } from 'react';

interface UseGitHubReturn {
  inviteToOrg: (username: string) => Promise<void>;
  addToTeam: (username: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useGitHub(): UseGitHubReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const orgName = import.meta.env.VITE_ORG_NAME;
  const teamSlug = import.meta.env.VITE_TEAM_SLUG;

  async function inviteToOrg(username: string) {
    setLoading(true);
    setError(null);

    try {
      // First check if user exists
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!userResponse.ok) {
        throw new Error('GitHub user not found');
      }

      // Check if user is already a member
      const membershipResponse = await fetch(
        `https://api.github.com/orgs/${orgName}/memberships/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (membershipResponse.ok) {
        const membership = await membershipResponse.json();
        if (membership.state === 'active') {
          throw new Error('User is already a member of the organization');
        }
        if (membership.state === 'pending') {
          throw new Error('User has already been invited');
        }
      }

      // Send invitation
      const inviteResponse = await fetch(
        `https://api.github.com/orgs/${orgName}/memberships/${username}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({ role: 'member' }),
        }
      );

      if (!inviteResponse.ok) {
        const data = await inviteResponse.json();
        throw new Error(data.message || 'Failed to send invitation');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function addToTeam(username: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/orgs/${orgName}/teams/${teamSlug}/memberships/${username}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add to team');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { inviteToOrg, addToTeam, loading, error };
}