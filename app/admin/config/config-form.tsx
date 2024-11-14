'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Config = {
  id?: string;
  githubToken?: string;
  githubOrgName?: string;
  githubTeamSlug?: string;
};

export default function ConfigForm({ initialConfig }: { initialConfig?: Config }) {
  const [config, setConfig] = useState<Config>(initialConfig || {});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error('Failed to save configuration');

      toast({
        title: 'Success',
        description: 'Configuration saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save configuration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>GitHub Configuration</CardTitle>
          <CardDescription>
            Configure GitHub integration settings for participant onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub Token</label>
            <Input
              type="password"
              value={config.githubToken || ''}
              onChange={(e) =>
                setConfig({ ...config, githubToken: e.target.value })
              }
              placeholder="Enter GitHub token"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Organization Name</label>
            <Input
              value={config.githubOrgName || ''}
              onChange={(e) =>
                setConfig({ ...config, githubOrgName: e.target.value })
              }
              placeholder="Enter GitHub organization name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Slug</label>
            <Input
              value={config.githubTeamSlug || ''}
              onChange={(e) =>
                setConfig({ ...config, githubTeamSlug: e.target.value })
              }
              placeholder="Enter GitHub team slug"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}