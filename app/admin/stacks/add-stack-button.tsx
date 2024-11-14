'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

export function AddStackButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    discordUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/stacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to add stack');

      toast({
        title: 'Success',
        description: 'Tech stack added successfully',
      });
      setOpen(false);
      setFormData({ name: '', icon: '', discordUrl: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add tech stack',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="add-stack-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Stack
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Tech Stack</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Stack Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Input
              placeholder="DevIcon Class (e.g., devicon-react-plain)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Find icons at <a href="https://devicon.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">devicon.dev</a>
            </p>
          </div>
          <div>
            <Input
              placeholder="Discord Invite URL"
              value={formData.discordUrl}
              onChange={(e) =>
                setFormData({ ...formData, discordUrl: e.target.value })
              }
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Stack'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}